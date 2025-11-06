package com.balan.qpg.repository;

import com.balan.qpg.model.StudyMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StudyMaterialRepository extends JpaRepository<StudyMaterial, Long> {
}
