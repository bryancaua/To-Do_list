// Estado global das listas e lista ativa
export let listas = JSON.parse(localStorage.getItem('listas')) || {};
export let listaAtivaId = null;
export let listaAtivaNome = null;

// Define a lista ativa e cria no estado se não existir
export function setListaAtiva(id, nome) {
    listaAtivaId = String(id);
    listaAtivaNome = nome;

    if (!listas[listaAtivaId]) {
        listas[listaAtivaId] = { nome, todos: [] };
        salvarListas();
    }
}

// Salva o estado no localStorage
export function salvarListas() {
    localStorage.setItem('listas', JSON.stringify(listas));
}
