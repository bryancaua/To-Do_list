// index.js
import { inicializarToDos } from './to-dos.js';
import { inicializarListas } from './listas.js';

// Inicializa tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    inicializarListas();
    inicializarToDos();
});
