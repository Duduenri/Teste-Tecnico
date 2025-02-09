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
- **Separação de Arquivos CSS**: Decidi separar os arquivos CSS em componentes distintos para facilitar a edição e reutilização do código.
- **Adaptação do HTML via JavaScript**: Inicialmente, planejei migrar algumas funcionalidades do JavaScript para o HTML, mas devido a uma série de bugs, decidi manter a lógica no arquivo `app.js`. Acredito que o arquivo está de fácil compreensão e com comentários nas partes que necessitam de mais clareza.
- **HTML Limpo e Semântico**: Mantive o HTML o mais limpo e semântico possível para melhorar a legibilidade e a manutenção do código.


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
