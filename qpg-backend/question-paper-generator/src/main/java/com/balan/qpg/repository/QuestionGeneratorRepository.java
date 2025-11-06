package com.balan.qpg.repository;

import com.balan.qpg.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuestionGeneratorRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT * FROM question q " +
            "WHERE q.subject_id = :subjectId " +
            "AND (:type IS NULL OR q.type = :type) " +
            "AND (:difficulty IS NULL OR q.difficulty = :difficulty) " +
            "AND (:topics IS NULL OR q.topic = ANY(:topics)) " +
            "AND (:excludedIds IS NULL OR q.id NOT IN (:excludedIds)) " +
            "ORDER BY random() LIMIT :limit", nativeQuery = true)
    List<Question> findRandomQuestions(
            @Param("subjectId") Long subjectId,
            @Param("type") String type,
            @Param("difficulty") String difficulty,
            @Param("topics") String[] topics,
            @Param("excludedIds") Long[] excludedIds,
            @Param("limit") int limit
    );

    @Query(value = "SELECT COUNT(*) FROM question q WHERE q.subject_id = :subjectId " +
            "AND (:type IS NULL OR q.type = :type) " +
            "AND (:difficulty IS NULL OR q.difficulty = :difficulty)", nativeQuery = true)
    int countQuestionsByFilters(
            @Param("subjectId") Long subjectId,
            @Param("type") String type,
            @Param("difficulty") String difficulty
    );
}
