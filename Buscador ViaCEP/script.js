const numCep = document.querySelector('#cep');
console.log(numCep.value);

document.querySelector('form').addEventListener('submit', (evento) => {
    evento.preventDefault();
});

const mensagem = document.querySelector("#mensagem");

numCep.addEventListener('blur', () => {
    const valor = numCep.value.replace(/[^0-9]/g, "");
    numCep.value = valor;
    validarCep(valor);
});

async function validarCep(valor) {

    if (valor.length === 8) {
        console.log('CEP válido em quantidade de dígitos');
        mensagem.textContent = ("Buscando dados do endereço..");
        const dados = await buscarCep(valor);
        if (dados === null) {
            mensagem.textContent = "";
            return alert("CEP inexistente, tente novamente!");
        }

        cidade.value = dados.localidade;
        estado.value = dados.estado;
        logradouro.value = dados.logradouro;
        bairro.value = dados.bairro;

        numCep.disabled = false;
        cidade.disabled = false;
        estado.disabled = false;
        bairro.disabled = false;
        logradouro.disabled = false;

        console.log(dados);
        mensagem.textContent = "";

    } else {
        alert('CEP inválido, tente outra vez!');
    }
}

async function buscarCep(value) {

    const url = `https://viacep.com.br/ws/${value}/json/`;

    try {

        numCep.disabled = true;
        cidade.disabled = true;
        estado.disabled = true;
        bairro.disabled = true;
        logradouro.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(url);

        if (response.ok === false) {
            throw new Error('Resposta HTTP com problema!');
        }

        const dados = await response.json();


        if (dados.erro === "true") {
            console.warn(
                'Atenção: O CEP é inexistente na base dos Correios!'
            );
            numCep.disabled = false;
            cidade.disabled = false;
            estado.disabled = false;
            bairro.disabled = false;
            logradouro.disabled = false;

            mensagem.textContent = "";

            return null;
        }
        return dados;

    } catch (erro) {
        numCep.disabled = false;
        cidade.disabled = false;
        estado.disabled = false;
        bairro.disabled = false;
        logradouro.disabled = false;
        
        mensagem.textContent = "";
        alert("Não foi possível concluir a localização do CEP!");
        console.error(erro);

    }
}


const logradouro = document.querySelector("#logradouro");


const bairro = document.querySelector("#bairro");


const cidade = document.querySelector('#cidade');


const estado = document.querySelector('#estado');