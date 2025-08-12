let contadorListas = 0; // contador global para gerar IDs únicos

const botaoCriarLista = document.querySelector('.botao__criar_lista');
const ulListas = document.getElementById('ul__listas');

botaoCriarLista.addEventListener('click', () => {
    contadorListas++; // incrementa para cada nova lista criada

    const li = document.createElement('li');
    const botaoLixeiraListas = document.createElement('button');
    const imgLixeira = document.createElement('img');
    const botaoListas = document.createElement('button');
    const divListas = document.createElement('div');
    const inputListas = document.createElement('input');
    const imgListas = document.createElement('img');

    li.classList.add('lista__item');
    li.dataset.id = contadorListas; // ID único
    li.dataset.nome = ''; // aqui salva o nome posteriormente

    botaoLixeiraListas.classList.add('lista__botao_lixeira');
    imgLixeira.classList.add('lista__lixeira');
    imgLixeira.setAttribute('src', './assets/Trash.svg');
    imgListas.setAttribute('alt', 'Lixeira');

    botaoListas.classList.add('botao__li_seta');
    divListas.classList.add('conteudo__lista');
    inputListas.classList.add('input__nome_lista');
    inputListas.setAttribute('placeholder', 'Nova Lista');
    inputListas.setAttribute('type', 'text');

    imgListas.classList.add('icone__seta');
    imgListas.setAttribute('src', './assets/CaretRight.svg');
    imgListas.setAttribute('alt', 'Seta direita');

    function salvarNome() {
        const nome = inputListas.value.trim() || 'Nova Lista';
        li.dataset.nome = nome; // salva no dataset
        divListas.innerHTML = `${nome} <img class="icone__seta" src="./assets/CaretRight.svg" alt="Seta direita">`;
    }

    inputListas.addEventListener('blur', salvarNome);
    inputListas.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // evita quebra de linha
            salvarNome();
        }
    });

    divListas.appendChild(inputListas);
    divListas.appendChild(imgListas);
    botaoListas.appendChild(divListas);
    botaoLixeiraListas.appendChild(imgLixeira);
    li.appendChild(botaoLixeiraListas);
    li.appendChild(botaoListas);
    ulListas.appendChild(li);

    verificarListaVazia();
});


ulListas.addEventListener('click', (e) => {
    if (e.target.closest('.lista__lixeira')) {
    const li = e.target.closest('li');
    li.remove();
    verificarListaVazia();
    }
});




// Função para checar se a lista está vazia

const mensagemListaVazia = document.querySelector('.mensagem__lista_vazia');

function verificarListaVazia() {
    const itensDaLista = ulListas.querySelectorAll('li');
    if (itensDaLista.length === 0) {
        mensagemListaVazia.style.display = 'block';
    } else {
        mensagemListaVazia.style.display = 'none';
    }
}

verificarListaVazia();
