export function verificarListaVazia(ulElement, mensagemElement) {
    const itens = ulElement.querySelectorAll('li');
    mensagemElement.style.display = itens.length === 0 ? 'block' : 'none';
}