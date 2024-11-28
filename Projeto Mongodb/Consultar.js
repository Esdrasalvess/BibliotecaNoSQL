async function consultarLivros() {
    
    const titulo = document.getElementById('consulta/titulo').value;
    const selectAutor = document.getElementById('consulta/select_autores').value;
    
    const dado = {
        titulo: titulo,
        autor: selectAutor
    };

    try {

        const response = await fetch('/consulta/cadastrarLivros', {
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

async function consultarAutores() {
    const nome = document.getElementById('consulta/nome').value;
    const idade = document.getElementById('consulta/idade').value;
    const nacionalidade = document.getElementById('consulta/nacionalidade').value;
    
    const dado = {
        nome: nome,
        idade: idade,
        nacionalidade: nacionalidade
    };

    try {
        const response = await fetch('/consulta/cadastrarAutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });

    } catch (error) {
       console.log('Erro ao consultar:', error);
        alert('Erro ao consultar. Verifique o console.');
    }
}

async function carregarAutores() {
    try {
        const response = await fetch('/consulta/selectAutores');  

        if (!response.ok) {
            throw new Error('Falha ao carregar autores, status: ' + response.status);
        }

        const autores = await response.json();  



        const selectAutor = document.getElementById('consulta/select_autores');

        if (!selectAutor) {
            throw new Error('Elemento de seleção não encontrado');
        }

        selectAutor.innerHTML = '<option value= "" selected disabled>Selecione o autor</option>';  


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

const botaoconsultarLivros = document.getElementById("cadastro/consultarLivro");
botaoconsultarLivros.addEventListener("click", consultarLivros);

const botaoconsultarAutores = document.getElementById("cadastro/consultarAutor");
botaoconsultarAutores.addEventListener("click", consultarAutores);

document.addEventListener('DOMContentLoaded', carregarAutores);