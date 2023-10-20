const API_ENDPOINT = '/contas';

// ----------- API Functions ----------- //

async function fetchAPI(endpoint, options = {}) {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Erro desconhecido.');
    }
    return response.json();
}

function listarContas() {
    return fetchAPI(API_ENDPOINT);
}

function createContaPessoal(contaPessoal) {
    return fetchAPI(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contaPessoal)
    });
}

function getContaPessoal(id) {
    return fetchAPI(`${API_ENDPOINT}/${id}`);
}

function updateContaPessoal(id, contaPessoal) {
    return fetchAPI(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contaPessoal)
    });
}

function deleteContaPessoal(id) {
    return fetchAPI(`${API_ENDPOINT}/${id}`, { method: 'DELETE' });
}

let contaEmEdicao = null;
// ----------- DOM Functions ----------- //


// ----------- Event Listeners ----------- //

document.getElementById('contaPessoalForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const contaPessoal = {
        nome: document.getElementById('nome').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        cpf: document.getElementById('cpf').value,
        saldoEmConta: parseFloat(document.getElementById('saldoEmConta').value.replace('R$', '').replace('.', '').replace(',', '.')),
        dataUltimoSaldo: document.getElementById('dataUltimoSaldo').value
    };

    try {
        let response;
        if (contaEmEdicao) {
            response = await updateContaPessoal(contaEmEdicao.id, contaPessoal);
        } else {
            response = await createContaPessoal(contaPessoal);
        }

        limparFormulario();
        mostrarAlertaSucesso(response.status === 204 ? 'editarSucessoAlert' : 'criarSucessoAlert');
        popularTabela();

    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
    }
});


// Função para eliminar uma conta
function eliminarConta(id) {
  abrirModalDeConfirmacao(id);
}

let lottieAnimation = null;

let deleteHandler = null;

function abrirModalDeConfirmacao(id) {
    const modal = new bootstrap.Modal(document.getElementById('confirmacaoModal'), {
        backdrop: 'static',
    });

    // Verifique se a animação já foi inicializada e destrua-a
    if (lottieAnimation) {
        lottieAnimation.destroy();
    }

    // Inicializa a animação Lottie
    lottieAnimation = lottie.loadAnimation({
        container: document.getElementById('lottieAnimation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animation/deleteAnimated.json',
    });

    const confirmarDelecaoBtn = document.getElementById('confirmarDelecao');
    if (deleteHandler) {
        confirmarDelecaoBtn.removeEventListener('click', deleteHandler);
    }

    deleteHandler = async () => {
        try {
            const response = await deleteContaPessoal(id);
            if (response.status === 204) {
                popularTabela();
                modal.hide();
                mostrarAlertaSucesso('deletarSucessoAlert');
            } else {
                const data = await response.json();
                console.log(data)
            }
        } catch (error) {
            console.error('Erro ao deletar a conta:', error);
        }
        modal.hide();
    };

    confirmarDelecaoBtn.addEventListener('click', deleteHandler);

    modal.show();
}

async function popularTabela() {
    // Limpa a tabela antes de preencher com os novos dados
    const tabelaBody = document.getElementById('contasTabela').querySelector('tbody');
    tabelaBody.innerHTML = ''; // Limpa os dados existentes na tabela

    // Mostrar o spinner enquanto os dados são carregados
    const spinner = document.getElementById('spinnerDiv');
    spinner.style.display = 'block';

    try {
        const contas = await listarContas();
        contas.forEach(conta => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${conta.nome}</td>
                <td>${formatarDataBr(conta.dataNascimento)}</td>
                <td>${conta.cpf}</td>
                <td>R$ ${parseFloat(conta.saldoEmConta).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>${formatarDataBr(conta.dataUltimoSaldo)}</td>
                <td>
                    <button type="button" class="btn btn-outline-light btn-sm" onclick="editarConta(${conta.id})"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Editar Dado">
                        <i class="fa-solid fa-pen-to-square" style="color: #1c6925;"></i>
                    </button>
                    <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarConta(${conta.id})"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Conta">
                        <i class="fa-solid fa-trash-can" style="color: #ff0022;"></i>
                    </button>
                </td>
            `;
            tabelaBody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao popular a tabela:', error);
    } finally {
        spinner.style.display = 'none'; // Esconde o spinner após os dados serem carregados
    }
}

