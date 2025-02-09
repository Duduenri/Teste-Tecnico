# To-Do List

## Descrição das Funcionalidades Implementadas
Este projeto é uma aplicação de lista de tarefas (To-Do List) que permite aos usuários adicionar, editar, excluir e marcar tarefas como concluídas. As principais funcionalidades incluem:
- Adicionar novas tarefas com título e descrição.
- Editar tarefas existentes.
- Excluir tarefas.
- Marcar tarefas como pendentes ou concluídas.
- Filtrar tarefas por todas, pendentes ou concluídas.
- Pesquisar tarefas por título ou descrição.


## Decisões Técnicas
Durante o desenvolvimento do projeto, tomei as seguintes decisões técnicas:
- **CSS Flexbox**: Optei por utilizar o Flexbox no CSS para garantir uma melhor adaptação responsiva, tanto para dispositivos móveis quanto para desktops.
- **Modal para a edição da tarefa**: A implementação de modais para a edição de tarefas permite uma interface de usuário mais limpa e intuitiva, evitando a navegação para outras páginas ou recarregamentos desnecessários.
- **Eventos e Manipulação Dinâmica do DOM**: Optei por utilizar eventos do DOM como `DOMContentLoaded`, `submit`, `click` e `input` para garantir que a aplicação responda de forma eficiente às interações do usuário. A criação e manipulação de elementos HTML são feitas dinamicamente via JavaScript, o que permite uma atualização em tempo real da interface do usuário sem a necessidade de recarregar a página.
- **Adaptação do HTML via JavaScript**: Inicialmente, planejei transferir algumas funcionalidades do JavaScript para o HTML para simplificar a estrutura do código. No entanto, encontrei diversos bugs durante essa migração, pois no fluxo de desenvolvimento acabei criando essas funcionalidades primeiramente no `app.js`. Ao tentar migrar, surgiram certos bugs. Após analisar o código finalizado, decidi manter a lógica no arquivo `app.js`, onde posso controlar melhor a criação e manipulação dos elementos HTML de forma dinâmica. Acredito que essa abordagem torna o código mais fácil de entender e manter, especialmente com os meus comentários explicativos nas partes mais complexas.

## Melhorias Futuras
Para futuras melhorias, planejo implementar as seguintes funcionalidades:
- **Integração com Google Agenda**: Integrar a aplicação com o Google Agenda para um melhor controle das tarefas.
- **Nível de Prioridade nas Tarefas**: Adicionar a funcionalidade de definir níveis de prioridade para as tarefas.
- **Campo de Conclusão de Tarefas**: Adicionar um campo para escrever observações sobre como a tarefa foi realizada ao marcá-la como concluída.

## Como Executar o Projeto
1. Clone o repositório para o seu ambiente local.
2. Abra o arquivo `index.html` em um navegador web.
3. Utilize a aplicação para gerenciar suas tarefas.

## Estrutura do Projeto
- `index.html`: Estrutura HTML da aplicação.
- `app.js`: Lógica JavaScript para manipulação das tarefas.
- `styles/`: Pasta contendo os arquivos CSS para estilização da aplicação.