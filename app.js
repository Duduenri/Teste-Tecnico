document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarefa');
    const tituloInput = document.getElementById('titulo-tarefa');
    const descricaoInput = document.getElementById('descricao-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');
    const pesquisarInput = document.getElementById('pesquisar-tarefa');
    const todasTarefasBtn = document.getElementById('todas-tarefas');
    const pendentesBtn = document.getElementById('pendentes');
    const concluidosBtn = document.getElementById('concluidos');

    const editModal = document.getElementById('edit-modal');
    const closeModal = document.querySelector('.close');
    const formEditarTarefa = document.getElementById('form-editar-tarefa');
    const editarTituloInput = document.getElementById('editar-titulo-tarefa');
    const editarDescricaoInput = document.getElementById('editar-descricao-tarefa');

    let tarefaEditando = null; // var atualizavel, para permitir editar as tarefas

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
        listaTarefas.innerHTML = ''; // limpa lista para evitar o bug de tasks duplicadas
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        const tarefasFiltradas = tarefas.filter(tarefa => {
            if (filtro === 'todas') return true;
            return tarefa.status === filtro;
        });

        tarefasFiltradas.forEach((tarefa, index) => {
            const li = document.createElement('li'); // novo elemento
            li.classList.add('task-item'); // Adiciona a classe CSS
            if (tarefa.status === 'concluido') {
                li.style.backgroundColor = '#566F42'; // se a tarefa estiver concluida, atribuir background verde
            }

            // criar element html
            const titulo = document.createElement('div');
            titulo.textContent = tarefa.titulo;
            titulo.classList.add('task-title');

            const descricao = document.createElement('div');
            descricao.textContent = tarefa.descricao;
            descricao.classList.add('task-description');

            // cria elemento img
            const statusImg = document.createElement('img');
            statusImg.classList.add('task-status');
            // e altera a img conforme o status
            statusImg.src = tarefa.status === 'pendente' ? 'images/pendente.png' : 'images/concluido.png';
            statusImg.alt = tarefa.status;

            statusImg.addEventListener('click', () => {
                tarefa.status = tarefa.status === 'pendente' ? 'concluido' : 'pendente';
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const deleteImg = document.createElement('img');
            deleteImg.classList.add('task-delete');
            deleteImg.src = 'images/deletar.png';
            deleteImg.alt = 'Deletar';

            deleteImg.addEventListener('click', () => {
                tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const editImg = document.createElement('img');
            editImg.classList.add('task-edit');
            editImg.src = 'images/editar.png';
            editImg.alt = 'Editar';

            editImg.addEventListener('click', () => {
                tarefaEditando = { ...tarefa, index };
                editarTituloInput.value = tarefa.titulo;
                editarDescricaoInput.value = tarefa.descricao;
                editModal.style.display = 'block';
            });

            li.appendChild(titulo);
            li.appendChild(descricao);
            li.appendChild(statusImg);
            li.appendChild(deleteImg);
            li.appendChild(editImg);

            listaTarefas.appendChild(li);
        });
    }

    formEditarTarefa.addEventListener('submit', (event) => {
        event.preventDefault();

        if (tarefaEditando) {
            console.log('Salvando alterações para:', tarefaEditando);
            const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            tarefas[tarefaEditando.index] = {
                ...tarefas[tarefaEditando.index],
                titulo: editarTituloInput.value,
                descricao: editarDescricaoInput.value
            };
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            atualizarListaTarefas();
            editModal.style.display = 'none';
        }
    });

    closeModal.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        }
    });

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
            if (tarefa.status === 'concluido') {
                li.style.backgroundColor = '#566F42';
            }

            const titulo = document.createElement('div');
            titulo.textContent = tarefa.titulo;
            titulo.classList.add('task-title');

            const descricao = document.createElement('div');
            descricao.textContent = tarefa.descricao;
            descricao.classList.add('task-description');

            const statusImg = document.createElement('img');
            statusImg.classList.add('task-status');
            statusImg.src = tarefa.status === 'pendente' ? 'images/pendente.png' : 'images/concluido.png';
            statusImg.alt = tarefa.status;

            statusImg.addEventListener('click', () => {
                tarefa.status = tarefa.status === 'pendente' ? 'concluido' : 'pendente';
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const deleteImg = document.createElement('img');
            deleteImg.classList.add('task-delete');
            deleteImg.src = 'images/deletar.png';
            deleteImg.alt = 'Deletar';

            deleteImg.addEventListener('click', () => {
                tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const editImg = document.createElement('img');
            editImg.classList.add('task-edit');
            editImg.src = 'images/editar.png';
            editImg.alt = 'Editar';

            editImg.addEventListener('click', () => {
                tarefaEditando = { ...tarefa, index };
                editarTituloInput.value = tarefa.titulo;
                editarDescricaoInput.value = tarefa.descricao;
                editModal.style.display = 'block';
            });

            li.appendChild(titulo);
            li.appendChild(descricao);
            li.appendChild(statusImg);
            li.appendChild(deleteImg);
            li.appendChild(editImg);

            listaTarefas.appendChild(li);
        });
    });

    todasTarefasBtn.addEventListener('click', () => atualizarListaTarefas('todas'));
    pendentesBtn.addEventListener('click', () => atualizarListaTarefas('pendente'));
    concluidosBtn.addEventListener('click', () => atualizarListaTarefas('concluido'));

    atualizarListaTarefas();
});