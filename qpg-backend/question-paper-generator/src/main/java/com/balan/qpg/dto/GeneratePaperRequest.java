package com.balan.qpg.dto;

import java.util.List;
import java.util.Map;

public class GeneratePaperRequest {

    public static class Section {
        public String name; // Section A, Section B
        public String type; // MCQ or DESCRIPTIVE
        public int requiredQuestions;
        public int marksPerQuestion;
        public Map<String, Integer> difficultyDistribution; // {"EASY":50,"MEDIUM":30,"HARD":20}
        public Map<String, Integer> topicWeights; // optional {"Arrays":40,"Loops":60}
    }

    public String subject;  // subject name or ID
    public int totalMarks;
    public List<Section> sections;
    public boolean randomizeOrder = true;
    public boolean exportPdf = false;
    public Integer generatedByUserId;
}
