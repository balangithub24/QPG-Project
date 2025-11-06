package com.balan.qpg.dto;

import java.util.List;
import java.util.Map;

public class GeneratedPaperDTO {
    public Long id;
    public String subject;
    public int totalMarks;
    public List<Map<String, Object>> questions;
    public byte[] pdfBytes; // optional if PDF requested
}
