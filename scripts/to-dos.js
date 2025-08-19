import { verificarListaVazia } from './dom-utils.js';
import { listaAtivaNome } from './state.js';

export function inicializarToDos() {
    const botaoCriarToDo = document.querySelector('.botao__criar_to_do');
    const ulToDo = document.querySelector('.ul__to_do');
    const mensagemVazia = document.querySelector('.tela__to_dos .mensagem__vazia');
    const botaoVoltar = document.querySelector('.botao__voltar');
    const telaListas = document.querySelector('.tela__listas');
    const telaTodos = document.querySelector('.tela__to_dos');
    const tituloTodos = document.querySelector('.titulo__lista_todos');

    // Voltar para tela de listas
    botaoVoltar.addEventListener('click', () => {
        telaListas.style.display = 'block';
        telaTodos.style.display = 'none';
    });

    // Criação de novo To-Do
    botaoCriarToDo.addEventListener('click', () => {
        const li = document.createElement('li');
        li.classList.add('li__to_do');

        const botaoToDo = document.createElement('button');
        botaoToDo.classList.add('botao__to_do');

        const divLi = document.createElement('div');
        divLi.classList.add('div__li_to_do');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox__to_do');

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nova tarefa';
        input.classList.add('input__to_do');

        divLi.appendChild(checkbox);
        divLi.appendChild(input);
        botaoToDo.appendChild(divLi);
        li.appendChild(botaoToDo);

        ulToDo.appendChild(li);
        verificarListaVazia(ulToDo, mensagemVazia);
    });

    verificarListaVazia(ulToDo, mensagemVazia);

    // Atualiza título sempre que entrar nesta tela
    tituloTodos.textContent = listaAtivaNome || 'TO DO | YOUR LISTS';
}
