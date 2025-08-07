const botaoCriarLista = document.querySelector('.botao__criar_lista');
const ulListas = document.getElementById('ul__listas');


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

    img.classList.add("icone__seta");
    img.setAttribute('src', './assets/CaretRight.svg');
    img.setAttribute('alt', 'Seta direita');
    
    div.appendChild(input);
    div.appendChild(img);
    button.appendChild(div);
    li.appendChild(button);
    ulListas.appendChild(li);
    
})