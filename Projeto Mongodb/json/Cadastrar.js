const mensagemSucesso = document.getElementById('mensagemSucesso');

async function cadastrarAutores(event) {
    event.preventDefault();  // Impede o envio do formulário e o recarregamento da página

    const idAutor = document.getElementById('cadastrar/id_autor').value;
    const nome_autor = document.getElementById('cadastrar/nome_autor').value;
    const idade_autor = document.getElementById('cadastrar/idade_autor').value;
    const nacionalidade_autor = document.getElementById('cadastrar/nacionalidade_autor').value;
   
    let dado;

    dado = {
        nome: nome_autor,
        idade: idade_autor,
        nacionalidade: nacionalidade_autor
    };

    if (idAutor !== "") {
        dado = {
            _id: idAutor,
            nome: nome_autor,
            idade: idade_autor,
            nacionalidade: nacionalidade_autor
        };
    }

    try {
        const response = await fetch('/cadastros.html/cadastrar/cadastrarAutores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  
            },
            body: JSON.stringify(dado)  
        });

        if (response.ok) {
            console.log("Autor cadastrado com sucesso!");
            mensagemSucesso.style.display = "inline";
            mensagemSucesso.innerText = "✔️Autor cadastrado com sucesso!";  // Exibe mensagem de sucesso
        } else {
            const mensagem = await response.text(); 
            alert(`Erro ao cadastrar autor: ${mensagem}`);
        }

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
        }, 3000);
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error); 
        alert(`Erro ao cadastrar autor: ${error.message || 'Erro desconhecido'}`); 
    }
}

async function cadastrarLivros(event) {
    event.preventDefault();  // Impede o envio do formulário e o recarregamento da página

    const titulo_livro = document.getElementById('cadastrar/titulo_livro').value;
    const selectAutor1 = document.getElementById('cadastrar/select_autores1').value;
    const selectAutor2 = document.getElementById('cadastrar/select_autores2').value;
    const selectAutor3 = document.getElementById('cadastrar/select_autores3').value;
    const idLivro = document.getElementById('cadastrar/id_livro').value;
    const anoPublicacaoLivro = document.getElementById('cadastrar/ano_publicacao_livro').value;
    
    const autores_disponiveis = [];
    if (selectAutor1) autores_disponiveis.push(selectAutor1);
    if (selectAutor2) autores_disponiveis.push(selectAutor2);
    if (selectAutor3) autores_disponiveis.push(selectAutor3);

    if(autores_disponiveis.length == 0  || (selectAutor1 == '' && selectAutor2 == '' && selectAutor3 == '')){
        alert("É necessário ao menos um autor!");
        return;
    }
    const autoresUnicos = new Set(autores_disponiveis);
    if (autoresUnicos.size !== autores_disponiveis.length) {
        alert("Autor duplicado! Por favor, selecione autores diferentes.");
        return;
    }

    dado = {
        titulo: titulo_livro,
        autores: autores_disponiveis,
        ano_publicacao: anoPublicacaoLivro,
    };

    if(idLivro !== ""){
        dado = {
            _id: idLivro,
            titulo: titulo_livro,
            autores: autores_disponiveis,
            ano_publicacao: anoPublicacaoLivro,
        };
    }

    try {
        const response = await fetch('/cadastros.html/cadastrar/cadastrarLivros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dado)
        });

        if (response.ok) {
            console.log("Livro cadastrado com sucesso!");
            mensagemSucesso.style.display = "inline";
            mensagemSucesso.innerText = "✔️Livro cadastrado com sucesso!";  // Exibe mensagem de sucesso
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar livro: ${errorMessage}`);
        }

        // Esconde a mensagem após 3 segundos
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
        }, 3000);

    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro: id já existente');
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

        if (autores.length > 0) {
            const selects = [
                document.getElementById("cadastrar/select_autores1"),
                document.getElementById("cadastrar/select_autores2"),
                document.getElementById("cadastrar/select_autores3")
            ];
            
            // Adiciona a opção "Nenhum autor" para todos os selects
            selects.forEach(select => {
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "Nenhum autor";
                select.appendChild(option);
            });
            
            autores.forEach(autor => { 
                if (autor.nome || autor.idade || autor.nacionalidade) {
                    const option = document.createElement('option');
                    option.value = autor._id;
                    option.textContent = autor.nome + ' - ' + autor.idade + ' - ' + autor.nacionalidade;  
                    selectAutor1.appendChild(option.cloneNode(true));
                    selectAutor2.appendChild(option.cloneNode(true));
                    selectAutor3.appendChild(option.cloneNode(true));
                }
            });
            selectAutor1.addEventListener('change', () => atualizarOpcoes(selectAutor1, selectAutor2, selectAutor3));
            selectAutor2.addEventListener('change', () => atualizarOpcoes(selectAutor1, selectAutor2, selectAutor3));
            selectAutor3.addEventListener('change', () => atualizarOpcoes(selectAutor1, selectAutor2, selectAutor3));
        } else {
            console.log('Nenhum autor encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar autores:', error);  
    }
}

function atualizarOpcoes(...selects) {
    const selecionados = selects.map(select => select.value);

    selects.forEach(select => {
        Array.from(select.options).forEach(option => {
            if (option.value !== "" && selecionados.includes(option.value)) {
                option.style.display = 'none';  
            } else {
                option.style.display = '';  
            }
        });
    });
}

document.getElementById('cadastrar/cadastrarLivro').addEventListener('click', function(event) {
    cadastrarLivros(event);  // Passa o evento para a função
});

document.getElementById('cadastrar/cadastrarAutor').addEventListener('click', function(event) {
    cadastrarAutores(event);  // Passa o evento para a função
});

document.addEventListener('DOMContentLoaded', carregarAutores);
