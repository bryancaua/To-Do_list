import { verificarListaVazia } from './dom-utils.js';
import { setListaAtiva, listas, salvarListas } from './state.js';
import { inicializarToDos } from './to-dos.js';

let contadorListas = Object.keys(listas).length;

export function inicializarListas() {
    const botaoCriarLista = document.querySelector('.botao__criar_lista');
    const ulListas = document.getElementById('ul__listas');
    const telaListas = document.querySelector('.tela__listas');
    const telaTodos = document.querySelector('.tela__to_dos');
    const tituloTodos = document.querySelector('.titulo__lista_todos');
    const mensagemVazia = document.querySelector('.tela__listas .mensagem__vazia');

    // Renderiza listas salvas
    Object.entries(listas).forEach(([id]) => criarElementoLista(id));
    verificarListaVazia(ulListas, mensagemVazia);

    // Criar nova lista
    botaoCriarLista.addEventListener('click', () => {
        contadorListas++;
        listas[String(contadorListas)] = { nome: '', todos: [] };
        salvarListas();
        criarElementoLista(String(contadorListas));
        verificarListaVazia(ulListas, mensagemVazia);
    });

    // Eventos de clique nas listas
    ulListas.addEventListener('click', (e) => {
        const alvoLixeira = e.target.closest('.lista__lixeira');
        const alvoAbrir = e.target.closest('.icone__seta');

        // Excluir lista
        if (alvoLixeira) {
            const li = e.target.closest('li');
            delete listas[li.dataset.id];
            salvarListas();
            li.remove();
            verificarListaVazia(ulListas, mensagemVazia);
            return;
        }

        // Abrir lista
        if (alvoAbrir) {
            const li = alvoAbrir.closest('li');
            setListaAtiva(li.dataset.id, li.dataset.nome || 'Nova Lista');
            telaListas.style.display = 'none';
            telaTodos.style.display = 'block';
            tituloTodos.textContent = li.dataset.nome;
            inicializarToDos(); // agora listaAtivaId já está definida
        }
    });

    // Função para criar elemento visual da lista
    function criarElementoLista(id) {
        const li = document.createElement('li');
        li.classList.add('lista__item');
        li.dataset.id = id;
        li.dataset.nome = listas[id].nome || '';

        const botaoLixeiraListas = document.createElement('button');
        botaoLixeiraListas.classList.add('lista__botao_lixeira');
        const imgLixeira = document.createElement('img');
        imgLixeira.classList.add('lista__lixeira');
        imgLixeira.src = './assets/Trash.svg';
        imgLixeira.alt = 'Lixeira';
        botaoLixeiraListas.appendChild(imgLixeira);

        const botaoListas = document.createElement('button');
        botaoListas.classList.add('botao__li_seta');
        const divListas = document.createElement('div');
        divListas.classList.add('conteudo__lista');
        const inputListas = document.createElement('input');
        inputListas.type = 'text';
        inputListas.placeholder = 'Nova Lista';
        inputListas.value = listas[id].nome || '';
        inputListas.classList.add('input__nome_lista');

        const imgSeta = document.createElement('img');
        imgSeta.classList.add('icone__seta');
        imgSeta.src = './assets/CaretRight.svg';
        imgSeta.alt = 'Seta direita';

        // evita salvar duas vezes (Enter + blur)
        let salvando = false;

        function salvarNome() {
            if (salvando) return;
            salvando = true;

            const nome = inputListas.value.trim() || 'Nova Lista';
            li.dataset.nome = nome;
            listas[id].nome = nome;
            salvarListas();

            // mantém o input e normaliza o valor (sem trocar DOM)
            inputListas.value = nome;

            salvando = false;
        }

        inputListas.addEventListener('blur', salvarNome);
        inputListas.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                salvarNome();
                // opcional: tirar o foco sem duplicar salvamento
                inputListas.blur();
            }
        });

        divListas.appendChild(inputListas);
        divListas.appendChild(imgSeta);
        botaoListas.appendChild(divListas);

        li.appendChild(botaoLixeiraListas);
        li.appendChild(botaoListas);
        ulListas.appendChild(li);
    }
}
