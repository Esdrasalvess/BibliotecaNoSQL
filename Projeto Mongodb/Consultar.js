async function carregarTabelaAutores() {
    const tabelaAutores = document.getElementById('tabela-autores').getElementsByTagName('tbody')[0];

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
                cellId.textContent = autor._id || 'N/A';  // ID do autor
                cellNome.textContent = autor.nome || 'N/A';  // Nome do autor
                cellIdade.textContent = autor.idade || 'N/A';  // Idade do autor
                cellNacionalidade.textContent = autor.nacionalidade || 'N/A';  // Nacionalidade do autor
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}


document.getElementById('consultar/consultarAutor').addEventListener('click', function(event) {
    event.preventDefault();  // Impede o recarregamento da página
    carregarTabelaAutores();  // Chama a função para carregar os autores
});