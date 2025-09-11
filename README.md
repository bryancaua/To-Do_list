🛠️ De ideia no papel a aplicação funcional — minha To‑Do List em JavaScript puro!

Eu queria me desafiar: nada de frameworks, nada de atalhos. Só HTML + CSS + JavaScript puro, para desenvolver minhas bases e aprimorar meus conhecimentos em JS, criando uma aplicação interativa.
O resultado? Uma To‑Do List completa, com:

✅ Criação, edição e exclusão de listas e tarefas
✅ Persistência de dados com localStorage 
✅ Estado global centralizado em state.js 
✅ Separação de responsabilidades por módulos (listas.js, to-dos.js, dom-utils.js) 
✅ Manipulação dinâmica de DOM (createElement, appendChild, dataset) 
✅ Ordenação de tarefas por prioridade (baixa, normal, alta) com seletor visual
✅ Marcação de concluído com checkbox + estilização automática 
✅ Delegação de eventos para evitar memory leaks e duplicação de listeners 
✅ Feedback visual quando a lista está vazia

🔍 O que aprendi no processo? 

Estruturar um projeto JavaScript modular desde o início faz TODA a diferença
localStorage é simples, mas exige cuidado para evitar sobrescrever dados
Delegação de eventos deixa o código mais limpo e eficiente
Pequenos detalhes de UX, como ordenar por prioridade ou manter a edição inline, aumentam muito a usabilidade.

💡 Tecnologias usadas:

HTML semântico
CSS responsivo (com atenção à tipografia e ícones SVG)
JavaScript ES6+ modular
E o mais importante: tudo isso rodando 100% no navegador, sem dependências externas.
