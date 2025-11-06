package com.balan.qpg.repository;

import com.balan.qpg.model.GeneratedPaper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneratedPaperRepository extends JpaRepository<GeneratedPaper, Long> {
}
