package br.com.cmcamp.atividade.repositories;

import br.com.cmcamp.atividade.entities.ContaPessoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Id;
import java.util.Optional;

@Repository
public interface ContaPessoalRepository extends JpaRepository<ContaPessoal, Id> {


    Optional<ContaPessoal> findById(Long id);

    void deleteById(Long id);

    boolean existsById(Long id);
}
