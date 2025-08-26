import { verificarListaVazia } from './dom-utils.js';
// Agora também importamos salvarListas para gravar no localStorage
import { listas, listaAtivaId, listaAtivaNome, salvarListas } from './state.js';

export function inicializarToDos() {
    const botaoCriarToDo = document.querySelector('.botao__criar_to_do');
    const botaoVoltar = document.querySelector('.botao__voltar');
    const telaListas = document.querySelector('.tela__listas');
    const telaTodos = document.querySelector('.tela__to_dos');
    const tituloTodos = document.querySelector('.titulo__lista_todos');
    let proximoIdToDo = listas[listaAtivaId]?.length || 0; // inicia com base no que já existe

    // Voltar para tela de listas
    botaoVoltar.addEventListener('click', () => {
        telaListas.style.display = 'block';
        telaTodos.style.display = 'none';
    });

    // Criação de novo To-Do
    botaoCriarToDo.addEventListener('click', () => {

        const novoToDo = {
            id: proximoIdToDo++,
            texto: 'Nova tarefa',
            feito: false,
            prioridade: 'baixa'
        };

        if (!listas[listaAtivaId]) {
            listas[listaAtivaId] = [];
        }

        listas[listaAtivaId].push(novoToDo);

        salvarListas(); // <-- salva no localStorage sempre que cria
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

    //Event listener para apagar os To-dos
    ulToDo.addEventListener('click', (e) => {
        const apagarToDoLixeira = e.target.closest('.to__do_lixeira');

        if (apagarToDoLixeira) {
            const li = e.target.closest('li');
            const id = Number(li.dataset.id);

            // Remove do array usando o ID
            listas[listaAtivaId] = listas[listaAtivaId].filter(todo => todo.id !== id);

            salvarListas(); // <-- salva no localStorage sempre que apaga
            renderizarToDos();
        }
    });

    const toDos = listas[listaAtivaId] || [];
    const toDosOrdenados = ordenarPorPrioridade(toDos);

    // Ordenador de prioridade To-do
    function ordenarPorPrioridade(toDos) {
        const prioridadePeso = {
            alta: 3,
            normal: 2,
            baixa: 1
        };

        return toDos.sort((a, b) => prioridadePeso[b.prioridade] - prioridadePeso[a.prioridade]);
    }

    toDosOrdenados.forEach(todo => {

        const li = document.createElement('li');
        li.classList.add('li__to_do');
        li.dataset.id = todo.id;

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
            salvarListas(); // <-- salva no localStorage ao marcar/desmarcar
        });
        
        checkbox.addEventListener('click', () => {
            input.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        });

        function salvarToDoNome(input, li, todo) {
            const nome = input.value.trim() || 'Nova tarefa';
            todo.texto = nome;
            li.dataset.texto = nome; // salva no dataset do <li>
            input.value = nome;
            salvarListas(); // <-- salva no localStorage ao editar nome
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nova tarefa';
        input.value = todo.texto;
        input.style.textDecoration = todo.feito ? 'line-through' : 'none';
        checkbox.checked = todo.feito;
        input.classList.add('input__to_do');

        // Atualiza o texto conforme o usuário digita
        input.addEventListener('input', () => {
            todo.texto = input.value;
            salvarListas(); // <-- salva no localStorage enquanto digita
        });

        input.addEventListener('blur', () => {
            salvarToDoNome(input, li, todo);
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarToDoNome(input, li, todo);
                input.blur();
            }
        });

        const toDoLixeira = document.createElement('img');
        toDoLixeira.classList.add('to__do_lixeira');
        toDoLixeira.src = './assets/Trash.svg';
        toDoLixeira.alt = 'Lixeira';

        const marcadorPrioridade = document.createElement('div');
        marcadorPrioridade.classList.add('marcador__prioridade', `prioridade-${todo.prioridade}`);
    
        marcadorPrioridade.addEventListener('click', () => {
            const seletor = document.createElement('div');
            seletor.classList.add('seletor__prioridade');

            ['baixa', 'normal', 'alta'].forEach(nivel => {
                const opcao = document.createElement('div');
                opcao.classList.add('opcao__prioridade', `prioridade-${nivel}`);
                opcao.dataset.valor = nivel;
                seletor.appendChild(opcao);

                opcao.addEventListener('click', () => {
                    todo.prioridade = nivel;
                    salvarListas(); // <-- salva no localStorage ao mudar prioridade
                    renderizarToDos(); // atualiza visual e reordena chamando a função de novo
                });
            });

            // Remove seletor anterior se existir
            const seletorExistente = li.querySelector('.seletor__prioridade');
            if (seletorExistente) seletorExistente.remove();

            li.appendChild(seletor);
        });

        divLi.appendChild(checkbox);
        divLi.appendChild(input);

        botaoToDo.appendChild(marcadorPrioridade);
        botaoToDo.appendChild(divLi);
        botaoToDo.appendChild(toDoLixeira);

        li.appendChild(botaoToDo);
        ulToDo.appendChild(li);
    });

    verificarListaVazia(ulToDo, mensagemVazia);
}
