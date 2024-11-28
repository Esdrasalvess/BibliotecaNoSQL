/*async function deletarLivros() {
    const titulo = document.getElementById('titulo').value;
    const selectAutor = document.getElementById('select_autores').value;
    
    const dado = {
        titulo: titulo,
        autor: selectAutor
    };

    try {

        const response = await fetch('/cadastrarLivros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });

        if (response.ok) {
            console.log('Cadastro realizado com sucesso!');
        } else {
            alert('Erro ao cadastrar livro.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Verifique o console.');
    }
}

async function deletarAutores() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const nacionalidade = document.getElementById('nacionalidade').value;
    
    const dado = {
        nome: nome,
        idade: idade,
        nacionalidade: nacionalidade
    };

    try {
        const response = await fetch('/cadastrarAutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
        } else {
            alert('Erro ao cadastrar livro.');
        }
    } catch (error) {
       console.log('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Verifique o console.');
    }
}

async function carregarAutoreseLivros() {
    try {
        const response = await fetch('/selectAutores');  

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

        const autores = await response.json();  



        const selectAutor = document.getElementById('select_autores');

        if (!selectAutor) {
            throw new Error('Elemento de seleção não encontrado');
        }

        selectAutor.innerHTML = '<option value="" selected disabled>Selecione o autor</option>';  


        if (Array.isArray(autores) && autores.length > 0) {
            autores.forEach(autor => {
                if (autor._id && autor.nome) {
                    const option = document.createElement('option');
                    option.value = autor.nome;
                    option.textContent = autor.nome;  
                    selectAutor.appendChild(option);
                } else {
                    console.error('Autor sem _id ou nome:', autor);
                }
            });
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}


window.onload = carregarAutores;

const botaodeletarLivros = document.getElementById("cadastrarLivro");
botaodeletarLivros.addEventListener("click", deletarLivros);

const botaodeletarAutores = document.getElementById("cadastrarAutor");
botaodeletarAutores.addEventListener("click", deletarAutores);

document.addEventListener('DOMContentLoaded', carregarAutores);
*/