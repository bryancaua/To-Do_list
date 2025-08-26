// Importa funções utilitárias e estado global
import { verificarListaVazia } from './dom-utils.js';
import { listas, listaAtivaId, listaAtivaNome, salvarListas } from './state.js';

// Função principal para inicializar a tela de To-Dos
export function inicializarToDos() {
    // Seletores de elementos da interface
    const botaoCriarToDo = document.querySelector('.botao__criar_to_do');
    const botaoVoltar = document.querySelector('.botao__voltar');
    const telaListas = document.querySelector('.tela__listas');
    const telaTodos = document.querySelector('.tela__to_dos');
    const tituloTodos = document.querySelector('.titulo__lista_todos');

    // Garante que a lista ativa existe no estado
    if (!listas[listaAtivaId]) {
        listas[listaAtivaId] = { nome: listaAtivaNome || 'Nova Lista', todos: [] };
        salvarListas();
    }

    // Próximo ID para novos To-Dos (incremental)
    let proximoIdToDo = listas[listaAtivaId].todos.length;

    // Botão "Voltar" para a tela de listas
    botaoVoltar.onclick = () => {
        telaListas.style.display = 'block';
        telaTodos.style.display = 'none';
    };

    // Botão "Criar To-Do" — uso .onclick para evitar múltiplos eventos acumulados
    botaoCriarToDo.onclick = () => {
        if (!listaAtivaId || !listas[listaAtivaId]) return;

        // Cria um novo objeto de tarefa
        const novoToDo = {
            id: proximoIdToDo++,
            texto: 'Nova tarefa',
            feito: false,
            prioridade: 'baixa' // padrão: verde
        };

        // Adiciona ao array da lista ativa e salva
        listas[listaAtivaId].todos.push(novoToDo);
        salvarListas();

        // Re-renderiza a lista de To-Dos
        renderizarToDos();
    };

    // Define o título da tela de To-Dos
    tituloTodos.textContent = listaAtivaNome || 'TO DO | YOUR LISTS';

    // Renderiza os To-Dos existentes
    renderizarToDos();
}

// Função para renderizar todos os To-Dos da lista ativa
export function renderizarToDos() {
    const ulToDo = document.querySelector('.ul__to_do');
    const mensagemVazia = document.querySelector('.tela__to_dos .mensagem__vazia');

    // Limpa a lista antes de renderizar
    ulToDo.innerHTML = '';

    // Evento de clique para excluir To-Do (delegação de evento)
    ulToDo.onclick = (e) => {
        const apagarToDoLixeira = e.target.closest('.to__do_lixeira');
        if (apagarToDoLixeira) {
            const li = e.target.closest('li');
            const id = Number(li.dataset.id);
            // Remove o To-Do pelo ID
            listas[listaAtivaId].todos = listas[listaAtivaId].todos.filter(todo => todo.id !== id);
            salvarListas();
            renderizarToDos();
        }
    };

    // Se não houver lista ativa, mostra mensagem de vazio
    if (!listaAtivaId || !listas[listaAtivaId]) {
        verificarListaVazia(ulToDo, mensagemVazia);
        return;
    }

    const toDos = listas[listaAtivaId].todos || [];

    // Ordena por prioridade (alta > normal > baixa)
    const prioridadePeso = { alta: 3, normal: 2, baixa: 1 };
    const toDosOrdenados = [...toDos].sort((a, b) => prioridadePeso[b.prioridade] - prioridadePeso[a.prioridade]);

    // Renderiza cada To-Do
    toDosOrdenados.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('li__to_do');
        li.dataset.id = todo.id;

        const botaoToDo = document.createElement('button');
        botaoToDo.classList.add('botao__to_do');

        // Marcador de prioridade (verde, amarelo, vermelho)
        const marcadorPrioridade = document.createElement('div');
        marcadorPrioridade.classList.add('marcador__prioridade', `prioridade-${todo.prioridade}`);
        marcadorPrioridade.addEventListener('click', () => {
            const seletorExistente = li.querySelector('.seletor__prioridade'); 
            if (seletorExistente) {
                seletorExistente.remove();
                return;
            }

            // Cria seletor de prioridade
            const seletor = document.createElement('div');
            seletor.classList.add('seletor__prioridade');
            ['baixa', 'normal', 'alta'].forEach(nivel => {
                const opcao = document.createElement('div');
                opcao.classList.add('opcao__prioridade', `prioridade-${nivel}`);
                opcao.dataset.valor = nivel;
                opcao.addEventListener('click', () => {
                    todo.prioridade = nivel;
                    salvarListas();
                    renderizarToDos();
                });
                seletor.appendChild(opcao);
            });
            li.appendChild(seletor);
        });

        const divLi = document.createElement('div');
        divLi.classList.add('div__li_to_do');

        // Checkbox para marcar como feito
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox__to_do');
        checkbox.checked = todo.feito;
        checkbox.addEventListener('change', () => {
            todo.feito = checkbox.checked;
            input.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            salvarListas();
        });

        // Campo de texto para o nome da tarefa
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Nova tarefa';
        input.value = todo.texto;
        input.style.textDecoration = todo.feito ? 'line-through' : 'none';
        input.classList.add('input__to_do');
        input.addEventListener('input', () => {
            todo.texto = input.value;
            salvarListas();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // evita quebra de linha
                const nome = input.value.trim() || 'Nova tarefa';
                todo.texto = nome;
                input.value = nome;
                salvarListas();
                input.blur(); // força o blur para fechar edição
            }
        });

        const toDoLixeira = document.createElement('img');
        toDoLixeira.classList.add('to__do_lixeira');
        toDoLixeira.src = './assets/Trash.svg';
        toDoLixeira.alt = 'Lixeira';

        // Monta a estrutura do item
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
