const botaoCriarLista = document.querySelector('.botao__criar_lista');
const ulListas = document.getElementById('ul__listas');


// Função de criar listas ao clique

botaoCriarLista.addEventListener('click', () => {
    
    const li = document.createElement ('li');
    const button = document.createElement ('button');
    const div = document.createElement ('div');
    const input = document.createElement ('input');
    const img = document.createElement ('img');

    li.classList.add('lista__item');
    button.classList.add('botao__li_seta');
    div.classList.add('conteudo__lista')
    input.classList.add('input__nome-lista');
    input.setAttribute('placeholder', 'Nova Lista');
    input.setAttribute('type', 'text');

    img.classList.add('icone__seta');
    img.setAttribute('src', './assets/CaretRight.svg');
    img.setAttribute('alt', 'Seta direita');
    
    div.appendChild(input);
    div.appendChild(img);
    button.appendChild(div);
    li.appendChild(button);
    ulListas.appendChild(li);
    
    verificarListaVazia();
})


// Função que irá verificar se a lista está vazia, caso sim, exibe uma sugestão ao usuário, se não, ela fica como 'none'

const mensagemListaVazia = document.querySelector('.mensagem__lista_vazia');

function verificarListaVazia() {
    const itensDaLista = ulListas.querySelectorAll('li') 
    
    if (itensDaLista.length === 0) {
        mensagemListaVazia.style.display = 'block';
    } else {
        mensagemListaVazia.style.display = 'none';
    }
}

verificarListaVazia();