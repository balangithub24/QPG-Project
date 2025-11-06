package com.balan.qpg.service;

import com.balan.qpg.dto.GeneratePaperRequest;
import com.balan.qpg.dto.GeneratedPaperDTO;
import com.balan.qpg.model.GeneratedPaper;
import com.balan.qpg.model.Question;
import com.balan.qpg.repository.GeneratedPaperRepository;
import com.balan.qpg.repository.QuestionGeneratorRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class QuestionPaperGeneratorService {

    @Autowired
    private QuestionGeneratorRepository questionRepo;

    @Autowired
    private GeneratedPaperRepository generatedRepo;

    private final ObjectMapper mapper = new ObjectMapper();

    /**
     * Generates a question paper based on request input.
     */
    public GeneratedPaperDTO generatePaper(GeneratePaperRequest req, Long subjectId) {
        Set<Long> usedIds = new HashSet<>();
        List<Map<String, Object>> allQuestions = new ArrayList<>();
        int totalMarks = 0;

        // Loop through sections (e.g., Section A - MCQ, Section B - Descriptive)
        for (GeneratePaperRequest.Section sec : req.sections) {
            Map<String, Integer> diffCount = getDifficultySplit(sec.requiredQuestions, sec.difficultyDistribution);

            for (Map.Entry<String, Integer> entry : diffCount.entrySet()) {
                String difficulty = entry.getKey();
                int count = entry.getValue();

                Long[] excluded = usedIds.isEmpty() ? null : usedIds.toArray(new Long[0]);
                List<Question> picked = questionRepo.findRandomQuestions(
                        subjectId, sec.type, difficulty, null, excluded, count
                );

                for (Question q : picked) {
                    Map<String, Object> map = new LinkedHashMap<>();
                    map.put("id", q.getId());
                    map.put("text", q.getQuestionText());
                    map.put("marks", sec.marksPerQuestion);
                    map.put("section", sec.name);
                    map.put("difficulty", q.getDifficulty());
                    allQuestions.add(map);

                    usedIds.add(q.getId());
                    totalMarks += sec.marksPerQuestion;
                }
            }
        }

        // Randomize question order if enabled
        if (req.randomizeOrder) {
            Collections.shuffle(allQuestions);
        }

        // Convert list to JSON for database
        String json = "";
        try {
            json = mapper.writeValueAsString(allQuestions);
        } catch (Exception e) {
            System.err.println("Error serializing questions: " + e.getMessage());
        }

        // Save to DB
        GeneratedPaper paper = new GeneratedPaper(subjectId, req.generatedByUserId, Instant.now(), totalMarks, json);
        paper = generatedRepo.save(paper);

        // Build response
        GeneratedPaperDTO dto = new GeneratedPaperDTO();
        dto.id = paper.getId();
        dto.subject = req.subject;
        dto.totalMarks = totalMarks;
        dto.questions = allQuestions;

        // If PDF requested, generate it
        if (req.exportPdf) {
            dto.pdfBytes = createPdf(req, allQuestions, totalMarks);
        }

        return dto;
    }

    /**
     * Splits required questions based on difficulty distribution (e.g., 50% easy, 30% medium, 20% hard)
     */
    private Map<String, Integer> getDifficultySplit(int total, Map<String, Integer> dist) {
        Map<String, Integer> out = new LinkedHashMap<>();
        if (dist == null || dist.isEmpty()) {
            out.put("EASY", total);
            return out;
        }

        int totalPct = dist.values().stream().mapToInt(Integer::intValue).sum();
        int assigned = 0;

        for (Iterator<Map.Entry<String, Integer>> it = dist.entrySet().iterator(); it.hasNext();) {
            Map.Entry<String, Integer> e = it.next();
            int c = (int) Math.round(total * e.getValue() / (double) totalPct);
            if (!it.hasNext()) c = total - assigned; // assign leftover to last
            out.put(e.getKey(), c);
            assigned += c;
        }
        return out;
    }

    /**
     * Creates a PDF representation of the generated paper.
     */
    private byte[] createPdf(GeneratePaperRequest req, List<Map<String, Object>> questions, int totalMarks) {
        try {
            Document doc = new Document(PageSize.A4);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(doc, baos);
            doc.open();

            doc.add(new Paragraph("Question Paper"));
            doc.add(new Paragraph("Subject: " + req.subject));
            doc.add(new Paragraph("Total Marks: " + totalMarks));
            doc.add(Chunk.NEWLINE);

            int no = 1;
            for (Map<String, Object> q : questions) {
                doc.add(new Paragraph(no + ". (" + q.get("marks") + " marks) [" + q.get("section") + "]"));
                doc.add(new Paragraph((String) q.get("text")));
                doc.add(Chunk.NEWLINE);
                no++;
            }

            doc.close();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error while generating PDF: " + e.getMessage(), e);
        }
    }
}
