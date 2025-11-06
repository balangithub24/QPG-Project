package com.balan.qpg.service;

import com.balan.qpg.model.StudyMaterial;
import com.balan.qpg.repository.StudyMaterialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StudyMaterialService {

    @Autowired
    private StudyMaterialRepository repository;

    public StudyMaterial save(StudyMaterial material) {
        return repository.save(material);
    }

    public List<StudyMaterial> getAll() {
        return repository.findAll();
    }
}
