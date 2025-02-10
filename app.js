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

    const darkLight = document.getElementById('theme-toggle');
    const iconDark = document.getElementById('icon-dark');
    const iconLight = document.getElementById('icon-light');

    darkLight.addEventListener('click', () => {
        iconDark.classList.toggle('hidden');
        iconLight.classList.toggle('hidden');
        document.body.classList.toggle('dark-theme');
    });

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
            const statusImg = document.createElement('div');
            statusImg.classList.add('task-status');
            // e altera a img conforme o status
            statusImg.innerHTML = tarefa.status === 'pendente' ? 
                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>` : 
                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>`;
            statusImg.alt = tarefa.status;

            statusImg.addEventListener('click', () => {
                tarefa.status = tarefa.status === 'pendente' ? 'concluido' : 'pendente';
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const deleteImg = document.createElement('div');
            deleteImg.classList.add('task-delete');
            deleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                   </svg>`;

            deleteImg.addEventListener('click', () => {
                tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const editImg = document.createElement('div');
            editImg.classList.add('task-edit');
            editImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                  </svg>`;

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
            const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // lista do navgegador
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

            const statusImg = document.createElement('div');
            statusImg.classList.add('task-status');
            statusImg.innerHTML = tarefa.status === 'pendente' ? 
                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>` : 
                `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>`;
            statusImg.alt = tarefa.status;

            statusImg.addEventListener('click', () => {
                tarefa.status = tarefa.status === 'pendente' ? 'concluido' : 'pendente';
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const deleteImg = document.createElement('div');
            deleteImg.classList.add('task-delete');
            deleteImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                   </svg>`;

            deleteImg.addEventListener('click', () => {
                tarefas.splice(index, 1);
                localStorage.setItem('tarefas', JSON.stringify(tarefas));
                atualizarListaTarefas(filtro);
            });

            const editImg = document.createElement('div');
            editImg.classList.add('task-edit');
            editImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                  </svg>`;

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