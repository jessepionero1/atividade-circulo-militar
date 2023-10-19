// Função para mostrar o alerta de sucesso
function mostrarAlertaSucesso(alertId) {
  const alert = document.getElementById(alertId);
  alert.style.display = 'block';


}


function formatarDataBr(dataString) {
    // Se a data for null ou uma string vazia, retorne diretamente uma string vazia
    //console.log(dataString)
    if (dataString === null || dataString === "") {
        return "";
    }

    const date = new Date(dataString);

    // Se a data é inválida (NaN), retorne uma string vazia
    if (isNaN(date.getTime())) {
        return "";
    }

    // Se tudo estiver correto, retorne a data formatada
    return new Intl.DateTimeFormat('pt-BR').format(date);
}


// limpa os campos do formulario
function limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("saldoEmConta").value = "";
    document.getElementById("dataUltimoSaldo").value = "";
}

// Função para limpar as mensagens de erro quando o usuário começa a digitar
function limparMensagensDeErro() {
  // Seletor para todos os campos de entrada que você deseja monitorar
  const camposDeEntrada = document.querySelectorAll('.form-control');

  // Adicione um ouvinte de entrada a cada campo
  camposDeEntrada.forEach(campo => {
    campo.addEventListener('input', () => {
      // Obtém o elemento de mensagem de erro associado ao campo
      const mensagemErro = document.getElementById(`${campo.id}Error`);

      // Se a mensagem de erro existir e não estiver vazia, limpe-a
      if (mensagemErro && mensagemErro.textContent) {
        mensagemErro.textContent = '';
      }
    });
  });
}

// Adicione um ouvinte de evento "DOMContentLoaded" para chamar a função quando a página estiver carregada
document.addEventListener('DOMContentLoaded', () => {
  limparMensagensDeErro();
});
