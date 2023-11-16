const API_ENDPOINT = '/contas';
const tabelaBody = document.getElementById('contasTabela').querySelector('tbody');



async function handleDeleteConfirmationClick() {

}

async function refreshTabela() {
    try {
        // Limpeza do listener do botão confirmarDelecao antes de atualizar a tabela
        const confirmarDelecaoBtn = document.getElementById('confirmarDelecao');
        confirmarDelecaoBtn.removeEventListener('click', handleDeleteConfirmationClick);

        // Chama popularTabela para atualizar a tabela com os dados mais recentes
         popularTabela();
    } catch (error) {
        console.error('Erro ao atualizar a tabela:', error);
    }
}


// Função para criar uma nova conta
async function createContaPessoal(contaPessoal) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contaPessoal)
    });
    return response;
}

// Função para obter uma conta específica
async function getContaPessoal(id) {
    const response = await fetch(`${API_ENDPOINT}/${id}`);
    return response.json();
}

// Função para atualizar uma conta existente
async function updateContaPessoal(id, contaPessoal) {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contaPessoal)
    });
    return response;
}

// Função para deletar uma conta
async function deleteContaPessoal(id) {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'DELETE'
    });
    return response;
}

let contaEmEdicao = null;

// Função para editar uma conta
async function editarConta(id) {
    const conta = await getContaPessoal(id);

    document.getElementById('nome').value = conta.nome;
    document.getElementById('dataNascimento').value = conta.dataNascimento; // ajuste se necessário
    document.getElementById('cpf').value = conta.cpf;
    document.getElementById('saldoEmConta').value = parseFloat(conta.saldoEmConta).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    document.getElementById('dataUltimoSaldo').value = conta.dataUltimoSaldo; // ajuste se necessário

    contaEmEdicao = conta; // Armazenando a conta que estamos editando
}

// Função para submissão do formulário
document.getElementById('contaPessoalForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const dataUltimoSaldoValue = document.getElementById('dataUltimoSaldo').value;

    const contaPessoal = {
        nome: document.getElementById('nome').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        saldoEmConta: parseFloat(document.getElementById('saldoEmConta').value.replace('R$', '').replace('.', '').replace(',', '.')),

    };


      if (dataUltimoSaldoValue) {
            contaPessoal.dataUltimoSaldo = dataUltimoSaldoValue;
        } else {
            contaPessoal.dataUltimoSaldo = null;
        }




    try {
        let response;
        if (contaEmEdicao) {
            response = await updateContaPessoal(contaEmEdicao.id, contaPessoal);

        } else {
            response = await createContaPessoal(contaPessoal);
        }

        if (response.status === 204 || response.status === 201) {
            limparFormulario();

           if (contaEmEdicao) {
               mostrarAlertaSucesso('editarSucessoAlert');
             } else {
               mostrarAlertaSucesso('criarSucessoAlert');
             }
          refreshTabela();

        } else if (response.status === 400) {
            const data = await response.json();
            for (const campo in data) {
                const mensagemErro = data[campo];
                const errorDiv = document.getElementById(`${campo}Error`);
                if (errorDiv) {
                    errorDiv.textContent = mensagemErro;
                }
            }
        }
 contaEmEdicao = null;


    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
    }
});


let lottieAnimation = null;

// Função para abrir o modal de confirmação
function abrirModalDeConfirmacao(id) {
  const modal = new bootstrap.Modal(document.getElementById('confirmacaoModal'), {
    backdrop: 'static', // Evita fechar o modal ao clicar fora dele
  });

    // Verifique se a animação já foi inicializada e destrua-a
    if (lottieAnimation) {
      lottieAnimation.destroy();
    }

  // Inicializa a animação Lottie
  lottieAnimation = lottie.loadAnimation({
    container: document.getElementById('lottieAnimation'),
    renderer: 'svg',
    loop: true, // Defina como false se você quiser que a animação seja reproduzida apenas uma vez
    autoplay: true,
    path: 'animation/deleteAnimated.json', // Substitua pelo caminho para o seu arquivo JSON Lottie
  });

  const confirmarDelecaoBtn = document.getElementById('confirmarDelecao');
  confirmarDelecaoBtn.addEventListener('click', async () => {
    try {
      const response = await deleteContaPessoal(id);
      if (response.status === 204) {

          modal.hide(); // Fecha o modal após a ação de deleção
           mostrarAlertaSucesso('deletarSucessoAlert');
           refreshTabela();
      } else {
        const data = await response.json();


      }
    } catch (error) {
      console.error('Erro ao deletar a conta:', error);
    }
    modal.hide(); // Fecha o modal após a ação de deleção
  });

  modal.show(); // Abre o modal de confirmação
}
function mostrarAlertaSucesso(alertId) {
    const alert = document.getElementById(alertId);
    if (alert) {
        alert.style.display = 'block';
    } else {
        console.error('Elemento com ID', alertId, 'não encontrado');
    }
}


// Função para eliminar uma conta
function eliminarConta(id) {
  abrirModalDeConfirmacao(id);
}


// Função para listar contas
async function listarContas() {
    const response = await fetch(API_ENDPOINT);
    return response.json();
}


function popularTabela() {
    fetch(API_ENDPOINT).then(
        (res)=>res.json()
    ).then((response)=>{
        var tmpData = "";
        console.log(response);
        response.forEach((conta)=>{
            tmpData+="<tr>"
            tmpData+="<td>"+conta.nome+"</td>";
            tmpData+="<td>"+conta.dataNascimento+"</td>";
            tmpData+="<td>"+conta.cpf+"</td>";
            tmpData+="<td>"+conta.saldoEmConta+"</td>";
            tmpData+="<td>"+conta.dataUltimoSaldo+"</td>";
            tmpData+="<td><button type='button' class='btn btn-outline-light btn-sm' onclick='editarConta("+conta.id+")' data-bs-toggle='tooltip' data-bs-placement='top' title='Editar Dado'><i class='fa-solid fa-pen-to-square' style='color: #1c6925;'></i></button> <button type='button' class='btn btn-outline-light btn-sm' onclick='eliminarConta("+conta.id+")' data-bs-toggle='tooltip' data-bs-placement='top' title='Eliminar Conta'> <i class='fa-solid fa-trash-can' style='color: #ff0022;'></i></button></td>";
            tmpData+="</tr>";
        })
        document.getElementById("contasTabela").innerHTML = tmpData;
    })
}





