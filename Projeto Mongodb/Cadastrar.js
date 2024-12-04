async function cadastrarLivros() {
    const titulo_livro = document.getElementById('cadastrar/titulo_livro').value;
    const selectAutor = document.getElementById('cadastrar/select_autores').value;
    const idLivro = document.getElementById('cadastrar/id_livro').value;
    
    dado = {
        titulo: titulo_livro,
        autor: selectAutor,
    };

if(idLivro !== ""){
    dado = {
        _id: idLivro,
        titulo: titulo_livro,
        autor: selectAutor,
    };
}

    try {
        const response = await fetch('/cadastrar/cadastrarLivros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dado)
        });
        alert("Livro cadastrado com sucesso!");
      
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro: id já existente');
    }
}

async function cadastrarAutores() {
    const nome_autor = document.getElementById('cadastrar/nome_autor').value;
    const idade_autor = document.getElementById('cadastrar/idade_autor').value;
    const nacionalidade_autor = document.getElementById('cadastrar/nacionalidade_autor').value;
    const idAutor = document.getElementById('cadastrar/id_autor').value;
    let dado;

        dado = {
            nome: nome_autor,
            idade: idade_autor,
            nacionalidade: nacionalidade_autor
        };
    if(idAutor !== ""){
        dado = {
            _id: idAutor,
            nome: nome_autor,
            idade: idade_autor,
            nacionalidade: nacionalidade_autor
        };
    }
    
    
    try {
        const response = await fetch('/cadastrar/cadastrarAutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });

        const mensagem = await response.text(); 
        if(response.ok){
            alert("Autor cadastrado com sucesso!");
        }else{
            alert(mensagem);
        }
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        console.log(mensagem);
        alert(`Erro:  id já existente`);
    }
}

async function carregarAutores() {
    const selectAutor1 = document.getElementById('cadastrar/select_autores1');
    const selectAutor2 = document.getElementById('cadastrar/select_autores2');
    const selectAutor3 = document.getElementById('cadastrar/select_autores3');

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
                    selectAutor1.appendChild(option);
                    selectAutor2.appendChild(option);
                    selectAutor3.appendChild(option);
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