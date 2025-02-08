document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarefa');
    const tituloInput = document.getElementById('titulo-tarefa');
    const descricaoInput = document.getElementById('descricao-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');
    const pesquisarInput = document.getElementById('pesquisar-tarefa');
    const todasTarefasBtn = document.getElementById('todas-tarefas');
    const pendentesBtn = document.getElementById('pendentes');
    const concluidosBtn = document.getElementById('concluidos');

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

    function atualizarListaTarefas(filtro = 'todas') {
        listaTarefas.innerHTML = '';
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        const tarefasFiltradas = tarefas.filter(tarefa => {
            if (filtro === 'todas') return true;
            return tarefa.status === filtro;
        });

        tarefasFiltradas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item'); // Adiciona a classe CSS

            const titulo = document.createElement('div');
            titulo.textContent = tarefa.titulo;
            titulo.classList.add('task-title');

            const descricao = document.createElement('div');
            descricao.textContent = tarefa.descricao;
            descricao.classList.add('task-description');

            li.appendChild(titulo);
            li.appendChild(descricao);

            listaTarefas.appendChild(li);
        });
    }

    pesquisarInput.addEventListener('input', () => {
        const termo = pesquisarInput.value.toLowerCase(); //termo digitado no input
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const tarefasFiltradas = tarefas.filter(tarefa => 
            tarefa.titulo.toLowerCase().includes(termo) || 
            tarefa.descricao.toLowerCase().includes(termo)
        );

        listaTarefas.innerHTML = '';
        tarefasFiltradas.forEach((tarefa, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item'); // class css

            const titulo = document.createElement('div');
            titulo.textContent = tarefa.titulo;
            titulo.classList.add('task-title');

            const descricao = document.createElement('div');
            descricao.textContent = tarefa.descricao;
            descricao.classList.add('task-description');

            li.appendChild(titulo);
            li.appendChild(descricao);

            listaTarefas.appendChild(li);
        });
    });

    todasTarefasBtn.addEventListener('click', () => atualizarListaTarefas('todas'));
    pendentesBtn.addEventListener('click', () => atualizarListaTarefas('pendente'));
    concluidosBtn.addEventListener('click', () => atualizarListaTarefas('concluido'));

    atualizarListaTarefas();
});