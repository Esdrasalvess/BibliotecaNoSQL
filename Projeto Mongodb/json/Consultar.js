async function carregarTabelaAutores() {
    const tabelaAutores = document.getElementById('tabelaAutores').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('/common/selectAutores');  

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

        const autores = await response.json();  
        console.log("Autores carregados:", autores);  // Log dos autores recebidos

        // Limpa a tabela antes de adicionar os novos dados
        tabelaAutores.innerHTML = '';

        if (autores && autores.length > 0) {
            autores.forEach(autor => {
                const linha = tabelaAutores.insertRow();

                // Adiciona as células para ID, nome, idade e nacionalidade
                const cellId = linha.insertCell(0); // Célula para o ID
                const cellNome = linha.insertCell(1); // Célula para o nome
                const cellIdade = linha.insertCell(2); // Célula para a idade
                const cellNacionalidade = linha.insertCell(3); // Célula para a nacionalidade

                // Preenche as células com os dados
                cellId.textContent = autor._id ? autor._id.toString() : 'N/D'; 
                cellNome.textContent = autor.nome || 'N/D';  // Nome do autor
                cellIdade.textContent = autor.idade || 'N/D';  // Idade do autor
                cellNacionalidade.textContent = autor.nacionalidade || 'N/D';  // Nacionalidade do autor
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}

async function carregarTabelaLivros() {
    const tabelaAutores = document.getElementById('tabelaLivros').getElementsByTagName('tbody')[0];

    try {
        const response = await fetch('/common/consultAutores');  

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

        const autores = await response.json();  
        console.log("Autores carregados:", autores); 

    
        tabelaAutores.innerHTML = '';

        if (autores && autores.length > 0) {
            autores.forEach(autor => {
                const linha = tabelaAutores.insertRow();

                // Adiciona as células para ID, nome, idade e nacionalidade
                const cellId = linha.insertCell(0); // Célula para o ID
                const cellNome = linha.insertCell(1); // Célula para o nome
                const cellIdade = linha.insertCell(2); // Célula para a idade
                const cellNacionalidade = linha.insertCell(3); // Célula para a nacionalidade

                // Preenche as células com os dados
                cellId.textContent = autor._id ? autor._id.toString() : 'N/D'; 
                cellNome.textContent = autor.nome || 'N/D';  // Nome do autor
                cellIdade.textContent = autor.idade || 'N/D';  // Idade do autor
                cellNacionalidade.textContent = autor.nacionalidade || 'N/D';  // Nacionalidade do autor
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