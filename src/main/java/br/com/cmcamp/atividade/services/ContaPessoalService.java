package br.com.cmcamp.atividade.services;

import br.com.cmcamp.atividade.entities.ContaPessoal;

import java.util.List;
import java.util.Optional;

public interface ContaPessoalService {

    void update(ContaPessoal contaPessoal);

    void save(ContaPessoal contaPessoal);

    Optional<ContaPessoal> findById(Long id);

    List<ContaPessoal> findAll();

    void delete(Long id);
}
