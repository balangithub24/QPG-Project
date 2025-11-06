package com.balan.qpg.controller;

import com.balan.qpg.dto.GeneratePaperRequest;
import com.balan.qpg.dto.GeneratedPaperDTO;
import com.balan.qpg.service.QuestionPaperGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/papers")
public class PaperController {

    @Autowired
    private QuestionPaperGeneratorService generatorService;

    @PostMapping("/generate")
    public ResponseEntity<?> generate(@RequestBody GeneratePaperRequest req) {
        Long subjectId;
        try {
            subjectId = Long.parseLong(req.subject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid subject ID");
        }

        GeneratedPaperDTO dto = generatorService.generatePaper(req, subjectId);

        if (req.exportPdf && dto.pdfBytes != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=paper_" + dto.id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(dto.pdfBytes);
        }

        return ResponseEntity.ok(dto);
    }
}
