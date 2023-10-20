package br.com.cmcamp.atividade.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(of = "id")
public class ContaPessoal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank(message = "Insira um nome.")
    @Size(max = 150, message = "O nome deve ter no máximo 150 caracteres.")
    private String nome;

    @NotNull(message = "Insira uma data de nascimento.")
    private LocalDate dataNascimento;

    @NotBlank(message = "Insira um CPF.")
    @Size(max = 14, message = "O CPF deve ter no máximo 14 caracteres.")
    @CPF(message = "CPF inválido.")
    private String cpf;

    @NotNull(message = "Insira um saldo.")
    private BigDecimal saldoEmConta;

    @Column(nullable = true)
    private LocalDate dataUltimoSaldo;
}