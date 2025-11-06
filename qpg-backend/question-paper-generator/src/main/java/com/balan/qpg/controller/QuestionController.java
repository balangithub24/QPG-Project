package com.balan.qpg.controller;

import com.balan.qpg.model.Question;
import com.balan.qpg.repository.QuestionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/paper")
@CrossOrigin("*")
public class QuestionController {

    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/generate")
    public List<Question> generatePaper(@RequestParam String subject, @RequestParam int totalMarks) {

        List<Question> questions = questionRepository.findBySubject(subject);

        questions.sort(Comparator.comparingInt(Question::getMarks).reversed());

        List<Question> selected = new ArrayList<>();
        int accumulatedMarks = 0;

        for (Question q : questions) {
            if (accumulatedMarks + q.getMarks() <= totalMarks) {
                selected.add(q);
                accumulatedMarks += q.getMarks();
            }
            if (accumulatedMarks == totalMarks) break;
        }

        return selected;
    }
}
