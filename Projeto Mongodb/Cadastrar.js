async function cadastrarLivros() {
    const titulo_livro = document.getElementById('cadastrar/titulo_livro').value;
    const selectAutor1 = document.getElementById('cadastrar/select_autores1').value;
    const selectAutor2 = document.getElementById('cadastrar/select_autores2').value;
    const selectAutor3 = document.getElementById('cadastrar/select_autores3').value;
    const idLivro = document.getElementById('cadastrar/id_livro').value;
    
    const autores_disponiveis = [];
    if (selectAutor1) autores_disponiveis.push(selectAutor1);
    if (selectAutor2) autores_disponiveis.push(selectAutor2);
    if (selectAutor3) autores_disponiveis.push(selectAutor3);

    if(autores_disponiveis.length == 0){
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
    };

if(idLivro !== ""){
    dado = {
        _id: idLivro,
        titulo: titulo_livro,
        autores: autores_disponiveis,
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
       if (response.ok) {
            alert("Livro cadastrado com sucesso!");
        } else {
            const errorMessage = await response.text();
            alert(`Erro ao cadastrar livro: ${errorMessage}`);
        }
      
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

        if (response.ok) {
            alert("Autor cadastrado com sucesso!");
        } else {
            const mensagem = await response.text(); 
            alert(`Erro ao cadastrar autor: ${mensagem}`);
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

function atualizarOpcoes(selectAtual, ...outrosSelects) {
    const selecionados = [
        selectAtual.value,
        ...Array.from(outrosSelects).map(select => select.value)
    ];

    // Remove opções de autores já selecionados
    outrosSelects.forEach(select => {
        Array.from(select.options).forEach(option => {
            if (selecionados.includes(option.value)) {
                option.style.display = 'none';  // Torna a opção invisível
            } else {
                option.style.display = '';  // Exibe a opção novamente
            }
        });
    });
}

const botaocadastrarLivros = document.getElementById("cadastrar/cadastrarLivro");
botaocadastrarLivros.addEventListener("click", cadastrarLivros);

const botaocadastrarAutores = document.getElementById("cadastrar/cadastrarAutor");
botaocadastrarAutores.addEventListener("click", cadastrarAutores);

document.addEventListener('DOMContentLoaded', carregarAutores);
