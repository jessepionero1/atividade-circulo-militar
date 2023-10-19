
// Validação personalizada para limitar o número de caracteres em um campo de data
function limitarCaracteresData(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}
// Validaçao do campo saldoConta
document.getElementById('saldoEmConta').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Removendo caracteres não numéricos
    value = (parseInt(value) || 0) / 100; // Convertendo a entrada para um valor decimal

    // Usando Intl.NumberFormat para formatar o valor no padrão da moeda brasileira
    e.target.value = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
});

// validaça do campo cpf
document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Removendo caracteres não numéricos

    // Aplicando a máscara do CPF
    if (value.length <= 6) {
        value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    } else if (value.length <= 9) {
        value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    }

    e.target.value = value;
});


