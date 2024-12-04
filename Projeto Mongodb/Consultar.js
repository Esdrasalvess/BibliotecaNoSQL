async function carregarAutores() {
    const selectAutor = document.getElementById('cadastrar/select_autores');

    try {
        const response = await fetch('/common/selectAutores');  

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

        const autores = await response.json();  

         
        if ( autores.length > 0) {
            autores.forEach(autor => { 
            
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}

async function carregarLivros() {
    const selectAutor = document.getElementById('cadastrar/select_livros');

    try {
        const response = await fetch('/common/selectLivros');  

        if (!response.ok) {
            throw new Error('Falha ao carregar livros, status: ' + response.status);
        }

        const autores = await response.json();  

   
const tabela = document.getElementById('tabelaAutores');
const tbody = tabela.querySelector('tbody'); 

autores.forEach(autor => {
    if (autor.nome || autor.idade || autor.nacionalidade) {
        const tr = document.createElement('tr');

        const tdNome = document.createElement('td');
        tdNome.textContent = autor.nome;
        tr.appendChild(tdNome);

        const tdIdade = document.createElement('td');
        tdIdade.textContent = autor.idade;
        tr.appendChild(tdIdade);

        const tdNacionalidade = document.createElement('td');
        tdNacionalidade.textContent = autor.nacionalidade;
        tr.appendChild(tdNacionalidade);

        tbody.appendChild(tr);
    }
});

      
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}