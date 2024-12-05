async function carregarTabelaAutores() {
    const tabelaAutores = document.getElementById('tabelaAutores').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('/common/selectAutores');  

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

                cellId.textContent = autor._id ? autor._id.toString() : 'N/D'; 
                cellNome.textContent = autor.nome || 'N/D';  
                cellIdade.textContent = autor.idade || 'N/D';  
                cellNacionalidade.textContent = autor.nacionalidade || 'N/D'; 

               
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => editarAutor(autor._id); 
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = () => deletarAutor(autor._id);  // Passa o ID para o método de deletar
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

        if (!response.ok) {
            throw new Error('Falha ao carregar livros, status: ' + response.status);
        }

        const livros = await response.json();  
        console.log("Livros carregados:", autores);  

        tabelaAutores.innerHTML = '';

        if (livros && livros.length > 0) {
            livros.forEach(livro => {
                const linha = tabelaLivros.insertRow();
                linha.dataset.id = livro._id; 

                const cellId = linha.insertCell(0);
                const cellTitulo = linha.insertCell(1);
                const cellAutores = linha.insertCell(2);
                const cellAnoDePublicação = linha.insertCell(3);
                const cellAcoes = linha.insertCell(4); 

                cellId.textContent = livro.titulo || 'N/D'; 
                cellAutores.textContent = livro.autores || 'N/D';  
                cellAnoDePublicação.textContent = livro.ano_publicação || 'N/D'; 
               
                const editarBtn = document.createElement('button');
                editarBtn.textContent = 'Editar';
                editarBtn.classList.add('editarBtn');
                editarBtn.onclick = () => editarAutor(autor._id); 
                cellAcoes.appendChild(editarBtn);

                const deletarBtn = document.createElement('button');
                deletarBtn.textContent = 'Deletar';
                deletarBtn.classList.add('deletarBtn');
                deletarBtn.onclick = () => deletarAutor(autor._id);  // Passa o ID para o método de deletar
                cellAcoes.appendChild(deletarBtn);
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
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