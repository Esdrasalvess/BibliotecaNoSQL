async function erro(response, data){
    if (response.ok && data.message != 'Coleção não reconhecida') {
            alert('Cadastro realizado com sucesso!');
    } else {
        alert('Erro ao cadastrar. Coleção não identificada');
    }
}

async function cadastrarLivros() {
    const titulo_livro = document.getElementById('cadastrar/titulo_livro').value;
    const selectAutor = document.getElementById('cadastrar/select_autores').value;
    
    const dado = {
        titulo: titulo_livro,
        autor: selectAutor
    };

    try {
        const response = await fetch('/cadastrar/cadastrarLivros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dado)
        });
        const data = await response.json();

       erro(response, data);
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Verifique o console.');
    }
}

async function cadastrarAutores() {
    const nome_autor = document.getElementById('cadastrar/nome_autor').value;
    const idade_autor = document.getElementById('cadastrar/idade_autor').value;
    const nacionalidade_autor = document.getElementById('cadastrar/nacionalidade_autor').value;
    
    const dado = {
        nome: nome_autor,
        idade: idade_autor,
        nacionalidade: nacionalidade_autor
    };

    
    try {
        const response = await fetch('/cadastrar/cadastrarAutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });
        const data = await response.json();
        
        erro(response, data);

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Verifique o console.');
    }
}

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
                if (autor.nome || autor.idade || autor.nacionalidade) {
                    const option = document.createElement('option');
                    option.value = autor.nome;
                    option.textContent = autor.nome + ' - ' + autor.idade + ' - ' + autor.nacionalidade;  
                    selectAutor.appendChild(option);
                } else {
                    console.error('Autor sem nome:', autor);
                    
                }
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}



const botaocadastrarLivros = document.getElementById("cadastrar/cadastrarLivro");
botaocadastrarLivros.addEventListener("click", cadastrarLivros);

const botaocadastrarAutores = document.getElementById("cadastrar/cadastrarAutor");
botaocadastrarAutores.addEventListener("click", cadastrarAutores);

document.addEventListener('DOMContentLoaded', carregarAutores);