package com.balan.qpg.controller;

import com.balan.qpg.model.StudyMaterial;
import com.balan.qpg.service.StudyMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = "http://localhost:3000")
public class StudyMaterialController {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Autowired
    private StudyMaterialService service;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadMaterial(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile file
    ) throws Exception {

        // Ensure directory exists
        File folder = new File(UPLOAD_DIR);
        if (!folder.exists()) {
            folder.mkdir();
        }

        // Save file to folder
        String filePath = UPLOAD_DIR + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // Save metadata in DB
        StudyMaterial material = new StudyMaterial();
        material.setTitle(title);
        material.setFileName(file.getOriginalFilename());
        material.setUrl("http://localhost:8081/uploads/" + file.getOriginalFilename());

        service.save(material);

        return ResponseEntity.ok("Uploaded Successfully ✅");
    }

    @GetMapping
    public List<StudyMaterial> getAllMaterials() {
        return service.getAll();
    }
}
