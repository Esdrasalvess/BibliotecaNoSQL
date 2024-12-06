async function carregarTabelaAutores() {
    const tabelaAutores = document.getElementById('tabelaAutores').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('/common/selectAutores');
        if (!response.ok) throw new Error('Falha ao carregar autores, status: ' + response.status);

        const autores = await response.json();
        console.log("Autores carregados:", autores);

        tabelaAutores.innerHTML = '';

        if (autores && autores.length > 0) {
            autores.forEach(autor => {
                const linha = tabelaAutores.insertRow();
                linha.dataset.id = autor._id;

                const cellId = linha.insertCell(0);
                const cellNome = linha.insertCell(1);
                const cellIdade = linha.insertCell(2);
                const cellNacionalidade = linha.insertCell(3);
                const cellAcoes = linha.insertCell(4);

                cellId.textContent = autor._id ? autor._id.toString() : 'N/D';
                cellNome.textContent = autor.nome || 'N/D';
                cellIdade.textContent = autor.idade || 'N/D';
                cellNacionalidade.textContent = autor.nacionalidade || 'N/D';

                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => abrirFormularioEdicao(autor._id, 'Autores', autor);
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = (event) => deletar(event, autor._id, 'Autores');
                cellAcoes.appendChild(deletarBtn);
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);
    }
}

async function carregarTabelaLivros() {
    const tabelaLivros = document.getElementById('tabelaLivros').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('/common/selectLivros');
        if (!response.ok) throw new Error('Falha ao carregar livros, status: ' + response.status);

        const livros = await response.json();
        console.log("Livros carregados:", livros);

        tabelaLivros.innerHTML = '';

        if (livros && livros.length > 0) {
            livros.forEach(livro => {
                const linha = tabelaLivros.insertRow();
                linha.dataset.id = livro._id;

                const cellId = linha.insertCell(0);
                const cellTitulo = linha.insertCell(1);
                const cellAutores = linha.insertCell(2);
                const cellAnoDePublicação = linha.insertCell(3);
                const cellAcoes = linha.insertCell(4);

                cellId.textContent = livro._id || 'N/D';
                cellTitulo.textContent = livro.titulo || 'N/D';
                cellAutores.textContent = livro.autores || 'N/D';
                cellAnoDePublicação.textContent = livro.ano_publicacao || 'N/D';

                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => abrirFormularioEdicao(livro._id, 'Livros', livro);
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = (event) => deletar(event, livro._id, 'Livros');
                cellAcoes.appendChild(deletarBtn);
            });
        } else {
            console.log('Nenhum livro encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

async function deletar(event, id, tipo) {
    event.preventDefault();
    try {
        const response = await fetch(`/consultas.html/deletar/deletar${tipo}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });

        if (!response.ok) throw new Error(`Erro ao deletar ${tipo}: ${response.status}`);
        const resultado = await response.json();
        console.log(resultado.message);

        tipo === 'Autores' ? carregarTabelaAutores() : carregarTabelaLivros();
    } catch (error) {
        console.error(`Erro ao deletar ${tipo}:`, error);
    }
}

function abrirFormularioEdicao(id, tipo, dados) {
    const formulario = document.getElementById('formularioEdicao');
    formulario.style.display = 'block';

    const camposContainer = document.getElementById('camposEdicao');
    camposContainer.innerHTML = '';

    if (tipo === 'Autores') {
        camposContainer.innerHTML = `
            <label>Nome: <input type="text" id="editarNome" value="${dados.nome || ''}"></label>
            <label>Idade: <input type="text" id="editarIdade" value="${dados.idade || ''}"></label>
            <label>Nacionalidade: <input type="text" id="editarNacionalidade" value="${dados.nacionalidade || ''}"></label>
        `;
    } else if (tipo === 'Livros') {
        camposContainer.innerHTML = `
            <label>Título: <input type="text" id="editarTitulo" value="${dados.titulo || ''}"></label>
            <label>Ano: <input type="text" id="editarAno" value="${dados.ano_publicacao || ''}"></label>
            <label>Autor: <input type="text" id="editarAutor" value="${dados.autores || ''}"></label>
        `;
    }

    document.getElementById('salvarEdicao').onclick = () => {
        const novosDados = tipo === 'Autores' ? {
            nome: document.getElementById('editarNome').value,
            idade: document.getElementById('editarIdade').value,
            nacionalidade: document.getElementById('editarNacionalidade').value
        } : {
            titulo: document.getElementById('editarTitulo').value,
            ano_publicacao: document.getElementById('editarAno').value,
            autores: document.getElementById('editarAutor').value
        };

        atualizar(id, tipo, novosDados);
        formulario.style.display = 'none';
    };
}

async function atualizar(id, tipo, novosDados) {
    try {
        const response = await fetch(`/consultas.html/atualizar/atualizar${tipo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...novosDados })
        });

        if (!response.ok) throw new Error(`Erro ao atualizar ${tipo}: ${response.status}`);
        const resultado = await response.json();
        alert(`Atualização de ${tipo} realizada com sucesso!`);
        console.log(`Dados atualizados para ${tipo}:`, resultado);

        tipo === 'Autores' ? carregarTabelaAutores() : carregarTabelaLivros();
    } catch (error) {
        console.error(`Erro ao atualizar ${tipo}:`, error);
    }
}

document.getElementById('consultar/consultarAutor').addEventListener('click', function(event) {
    event.preventDefault();  
    carregarTabelaAutores();  
});

document.getElementById('consultar/consultarLivro').addEventListener('click', function(event) {
    event.preventDefault();  
    carregarTabelaLivros(); 
});
