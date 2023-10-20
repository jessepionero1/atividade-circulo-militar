// Função para mostrar o alerta de sucesso
function mostrarAlertaSucesso(alertId) {
  const alert = document.getElementById(alertId);
  alert.style.display = 'block';


}


function formatarDataBr(dataString) {
    if (dataString === null || dataString === "") {
        return "";
    }

    const date = new Date(dataString);

    if (isNaN(date.getTime())) {
        return "";
    }


    date.setDate(date.getDate() + 1);

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


function limparMensagensDeErro() {

  const camposDeEntrada = document.querySelectorAll('.form-control');


  camposDeEntrada.forEach(campo => {
    campo.addEventListener('input', () => {

      const mensagemErro = document.getElementById(`${campo.id}Error`);


      if (mensagemErro && mensagemErro.textContent) {
        mensagemErro.textContent = '';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
// Adicione um ouvinte de evento "DOMContentLoaded" para chamar a função quando a página estiver carregada


  // Função para mostrar o alerta de sucesso
  function mostrarAlertaSucesso(alertId) {
      const alerta = document.getElementById(alertId);

      console.log('ID:', alertId);
      console.log('Elemento:', alerta);

      if (alerta) {
          alerta.style.display = 'block';
          setTimeout(() => {
              alerta.style.display = 'none';
          }, 5000);
      } else {
          console.error('Elemento de alerta não encontrado:', alertId);
      }
  }

  limparMensagensDeErro();
 console.log("Iniciando popularTabela");
 popularTabela(); // Chame a função para popular a tabela quando a página estiver carregada
 console.log("Finalizando popularTabela");
});


