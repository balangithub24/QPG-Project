package com.balan.qpg.model;

import jakarta.persistence.*;
import java.time.Instant;
import java.util.Map;
import java.util.List;

@Entity
@Table(name = "generated_paper")
public class GeneratedPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long subjectId;
    private Integer createdBy;
    private Instant createdAt;
    private int totalMarks;

    @Column(columnDefinition = "jsonb")
    private String questionsJson; // store as JSON string

    public GeneratedPaper() {}

    public GeneratedPaper(Long subjectId, Integer createdBy, Instant createdAt, int totalMarks, String questionsJson) {
        this.subjectId = subjectId;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.totalMarks = totalMarks;
        this.questionsJson = questionsJson;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getSubjectId() { return subjectId; }
    public void setSubjectId(Long subjectId) { this.subjectId = subjectId; }

    public Integer getCreatedBy() { return createdBy; }
    public void setCreatedBy(Integer createdBy) { this.createdBy = createdBy; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public int getTotalMarks() { return totalMarks; }
    public void setTotalMarks(int totalMarks) { this.totalMarks = totalMarks; }

    public String getQuestionsJson() { return questionsJson; }
    public void setQuestionsJson(String questionsJson) { this.questionsJson = questionsJson; }
}
