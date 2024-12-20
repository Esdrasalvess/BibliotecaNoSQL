async function carregarTabelaAutores() {
    const tabelaAutores = document.getElementById('tabelaAutores').getElementsByTagName('tbody')[0];

    // Pegando valores dos campos de filtro
    const nome = document.getElementById('consultar/nome_autor').value;
    const idade = document.getElementById('consultar/idade_autor').value;
    const nacionalidade = document.getElementById('consultar/nacionalidade_autor').value;

    // Construindo os parâmetros de consulta
    const params = new URLSearchParams();
    if (nome) params.append('nome', nome);
    if (idade) params.append('idade', idade);
    if (nacionalidade) params.append('nacionalidade', nacionalidade);

    try {
        const response = await fetch(`/common/selectAutores?${params.toString()}`); // Incluindo os parâmetros

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

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

                cellId.textContent = autor._id || 'N/D'; 
                cellNome.textContent = autor.nome || 'N/D';  
                cellIdade.textContent = autor.idade || 'N/D';  
                cellNacionalidade.textContent = autor.nacionalidade || 'N/D'; 

                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => editar(autor._id); 
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = () => deletar(autor._id, 'Autores');
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
        const tituloLivro = document.getElementById('consultar/titulo_livro').value.trim();
        const nomeAutor = document.getElementById('consultar/nome_autor').value.trim();

        const queryParams = new URLSearchParams();
        if (tituloLivro) queryParams.append('titulo', tituloLivro);
        if (nomeAutor) queryParams.append('autores', nomeAutor);

        const response = await fetch(`/common/selectLivros?${queryParams.toString()}`);  

        if (!response.ok) {
            throw new Error('Falha ao carregar livros, status: ' + response.status);
        }

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
                const cellAnoDePublicacao = linha.insertCell(3);
                const cellAcoes = linha.insertCell(4); 

                cellId.textContent = livro._id || 'N/D'; 
                cellTitulo.textContent = livro.titulo || 'N/D';
                cellAutores.textContent = livro.autores.join(', ') || 'N/D';  
                cellAnoDePublicacao.textContent = livro.ano_publicacao || 'N/D'; 
            
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => editar(livro._id); 
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = () => deletar(livro._id, 'Livros');  
                cellAcoes.appendChild(deletarBtn);
            });
        } else {
            console.log('Nenhum livro encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar livros:', error);  
    }
}

document.getElementById('consultar/consultarLivro').addEventListener('click', function(event) {
    event.preventDefault();  
    carregarTabelaLivros(); 
});


document.getElementById('consultar/consultarLivro').addEventListener('click', function(event) {
    event.preventDefault();  
    carregarTabelaLivros(); 
});


async function deletar(id, tipo) { 
    event.preventDefault();
    try {
        const response = await fetch(`/consultas.html/deletar/deletar${tipo}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }) 
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar ${tipo}: ${response.status}`);
        }

        const resultado = await response.json();
        console.log(resultado.message); 

       
        if (tipo === 'Autores') {
            carregarTabelaAutores();
        } else if (tipo === 'Livros') {
            carregarTabelaLivros();
        }
    } catch (error) {
        console.error(`Erro ao deletar ${tipo}:`, error);
    }
}

async function atualizar(id, tipo, novosDados) {
    event.preventDefault(); 
    try {
        const response = await fetch(`/consultas.html/atualizar/atualizar${tipo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...novosDados })
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar ${tipo}: ${response.status}`);
        }

        const resultado = await response.json();
        alert(`Atualização de ${tipo} realizada com sucesso!`);
        console.log(`Dados atualizados para ${tipo}:`, resultado);
        console.log(resultado.message);

        if (tipo === 'Autores') {
            carregarTabelaAutores();
        } else if (tipo === 'Livros') {
            carregarTabelaLivros();
        }
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
