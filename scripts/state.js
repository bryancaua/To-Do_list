export let listas = {}; // Mapeia cada lista por ID → array de to-dos
export let listaAtivaId = null;
export let listaAtivaNome = null;

export function setListaAtiva(id, nome) {
    listaAtivaId = id;
    listaAtivaNome = nome;

    if (!listas[id]) {
        listas[id] = []; // Garante que a lista tenha um array de tarefas
    }
}
