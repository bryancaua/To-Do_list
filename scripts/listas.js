import { verificarListaVazia } from './dom-utils.js';
import { setListaAtiva } from './state.js';
import { renderizarToDos } from './to-dos.js'

let contadorListas = 0;

export function inicializarListas() {
    const botaoCriarLista = document.querySelector('.botao__criar_lista');
    const ulListas = document.getElementById('ul__listas');
    const telaListas = document.querySelector('.tela__listas');
    const telaTodos = document.querySelector('.tela__to_dos');
    const tituloTodos = document.querySelector('.titulo__lista_todos');
    const mensagemVazia = document.querySelector('.tela__listas .mensagem__vazia');

    botaoCriarLista.addEventListener('click', () => {
        contadorListas++;

        const li = document.createElement('li');
        li.classList.add('lista__item');
        li.dataset.id = contadorListas;
        li.dataset.nome = '';

        // Botão lixeira
        const botaoLixeiraListas = document.createElement('button');
        botaoLixeiraListas.classList.add('lista__botao_lixeira');
        const imgLixeira = document.createElement('img');
        imgLixeira.classList.add('lista__lixeira');
        imgLixeira.src = './assets/Trash.svg';
        imgLixeira.alt = 'Lixeira';
        botaoLixeiraListas.appendChild(imgLixeira);

        // Botão da lista + conteúdo
        const botaoListas = document.createElement('button');
        botaoListas.classList.add('botao__li_seta');
        const divListas = document.createElement('div');
        divListas.classList.add('conteudo__lista');
        const inputListas = document.createElement('input');
        inputListas.type = 'text';
        inputListas.placeholder = 'Nova Lista';
        inputListas.classList.add('input__nome_lista');

        const imgSeta = document.createElement('img');
        imgSeta.classList.add('icone__seta');
        imgSeta.src = './assets/CaretRight.svg';
        imgSeta.alt = 'Seta direita';

        function salvarNome() {
            const nome = inputListas.value.trim() || 'Nova Lista';
            li.dataset.nome = nome;
            divListas.innerHTML = `${nome} <img class="icone__seta" src="./assets/CaretRight.svg" alt="Seta direita">`;
        }

        inputListas.addEventListener('blur', salvarNome);
        inputListas.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarNome();
            }
        });

        divListas.appendChild(inputListas);
        divListas.appendChild(imgSeta);
        botaoListas.appendChild(divListas);

        li.appendChild(botaoLixeiraListas);
        li.appendChild(botaoListas);
        ulListas.appendChild(li);

        verificarListaVazia(ulListas, mensagemVazia);
    });

    // Delegação de eventos da UL
    ulListas.addEventListener('click', (e) => {
        const alvoLixeira = e.target.closest('.lista__lixeira');
        const alvoAbrir = e.target.closest('.icone__seta');

        if (alvoLixeira) {
            e.target.closest('li').remove();
            verificarListaVazia(ulListas, mensagemVazia);
            return;
        }

        if (alvoAbrir) {
            const li = alvoAbrir.closest('li');
            setListaAtiva(li.dataset.id, li.dataset.nome || 'Nova Lista');
            telaListas.style.display = 'none';
            telaTodos.style.display = 'block';
            tituloTodos.textContent = li.dataset.nome;
            renderizarToDos(); // ← carrega os to-dos da lista atual
        }
    });

    verificarListaVazia(ulListas, mensagemVazia);
}
