package br.com.cmcamp.atividade.services;

import br.com.cmcamp.atividade.entities.ContaPessoal;
import br.com.cmcamp.atividade.repositories.ContaPessoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

/**
 * Implementação do serviço de ContaPessoal.
 */
@Service
@RequiredArgsConstructor
public class ContaPessoalImpl implements ContaPessoalService{

    private final ContaPessoalRepository contaPessoalRepository;

    @Override
    public void update(ContaPessoal contaPessoal) {

    }

    @Override
    @Transactional
    public void save(ContaPessoal contaPessoal) {
        contaPessoalRepository.save(contaPessoal);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ContaPessoal> findById(Long id) {
        try {
            return contaPessoalRepository.findById(id);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }


    @Override
    @Transactional(readOnly = true)
    public List<ContaPessoal> findAll() {
        return contaPessoalRepository.findAll();
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if(contaPessoalRepository.existsById(id)){
            contaPessoalRepository.deleteById(id);
        }

    }
}
