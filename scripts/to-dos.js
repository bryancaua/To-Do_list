import { verificarListaVazia } from './dom-utils.js';
import { listas, listaAtivaId, listaAtivaNome } from './state.js';

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
        const novoToDo = { texto: 'Nova tarefa', feito: false };

        if (!listas[listaAtivaId]) {
            listas[listaAtivaId] = [];
        }

        listas[listaAtivaId].push(novoToDo);
        renderizarToDos();
    });

    // Atualiza título sempre que entrar nesta tela
    tituloTodos.textContent = listaAtivaNome || 'TO DO | YOUR LISTS';
    renderizarToDos();
}

export function renderizarToDos() {
    const ulToDo = document.querySelector('.ul__to_do');
    const mensagemVazia = document.querySelector('.tela__to_dos .mensagem__vazia');

    ulToDo.innerHTML = '';

    const toDos = listas[listaAtivaId] || [];

    toDos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('li__to_do');

        const botaoToDo = document.createElement('button');
        botaoToDo.classList.add('botao__to_do');

        const divLi = document.createElement('div');
        divLi.classList.add('div__li_to_do');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox__to_do');
        checkbox.checked = todo.feito;
        checkbox.addEventListener('change', () => {
            todo.feito = checkbox.checked;
        });
        
        checkbox.addEventListener('click', () => {
            if (checkbox.checked) {
                input.style.textDecoration = 'line-through';    
            } else {
                input.style.textDecoration = 'none';   
            }
        })

        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.texto;
        input.classList.add('input__to_do');
        input.addEventListener('input', () => {
            todo.texto = input.value;
        });

        divLi.appendChild(checkbox);
        divLi.appendChild(input);
        botaoToDo.appendChild(divLi);
        li.appendChild(botaoToDo);
        ulToDo.appendChild(li);
    });

    verificarListaVazia(ulToDo, mensagemVazia);
}

