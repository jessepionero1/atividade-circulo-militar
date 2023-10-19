package br.com.cmcamp.atividade.controllers;

import br.com.cmcamp.atividade.entities.ContaPessoal;
import br.com.cmcamp.atividade.services.ContaPessoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


/**
 * Implementação dos Endpoints Conta Pessoal
 */
@RestController
@RequestMapping("/contas")
@RequiredArgsConstructor
public class ContaPessoalController {

    private final ContaPessoalService contaPessoalService;


    @GetMapping
    public ResponseEntity<List<ContaPessoal>> listAllContaPessoal() {
        List<ContaPessoal> todasContas = contaPessoalService.findAll();
        return ResponseEntity.ok(todasContas);
    }

    @PostMapping
    public ResponseEntity<Void> createContaPessoal(@Valid @RequestBody ContaPessoal contaPessoal) {
        System.out.println(contaPessoal);
        contaPessoalService.save(contaPessoal);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContaPessoal> getContaPessoal(@PathVariable Long id) {
        Optional<ContaPessoal> contaPessoal = contaPessoalService.findById(id);
        if (contaPessoal.isPresent()) {
            return ResponseEntity.ok(contaPessoal.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Void> updateContaPessoal(@PathVariable Long id, @Valid @RequestBody ContaPessoal contaPessoal) {
        Optional<ContaPessoal> existingConta = contaPessoalService.findById(id);
        if (existingConta.isPresent()) {
            contaPessoal.setId(id);
            contaPessoalService.save(contaPessoal);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContaPessoal(@PathVariable Long id) {
        Optional<ContaPessoal> contaPessoal = contaPessoalService.findById(id);
        if (contaPessoal.isPresent()) {
            contaPessoalService.delete(contaPessoal.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
