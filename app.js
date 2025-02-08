document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarefa');
    const tituloInput = document.getElementById('titulo-tarefa');
    const descricaoInput = document.getElementById('descricao-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = tituloInput.value;
        const descricao = descricaoInput.value;

        if (titulo && descricao) {
            const tarefa = {
                titulo: titulo,
                descricao: descricao,
                status: 'pendente'
            };

            console.log('Tarefa adicionada:', tarefa);

            // salvar
            let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            tarefas.push(tarefa);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));

            // limpar campos
            tituloInput.value = '';
            descricaoInput.value = '';

            //refresh
            atualizarListaTarefas();
        } else {
            console.log('Por favor, preencha todos os campos.');
        }
    });

    function atualizarListaTarefas() {
        listaTarefas.innerHTML = '';
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.textContent = `${tarefa.titulo}: ${tarefa.descricao} [${tarefa.status}]`;
            listaTarefas.appendChild(li);
        });
    }

    atualizarListaTarefas();
});