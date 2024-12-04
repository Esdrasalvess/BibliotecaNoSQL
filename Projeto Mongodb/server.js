    const express = require('express');
    const path = require('path');
    const mongoose = require('mongoose');
const { type } = require('os');

    let mongo = mongoose.connect('mongodb://localhost:27017')
    const PORT = 3000;
    const DatabaseBiblioteca = 'Biblioteca';

async function iniciarServidor(){
        const server = express();
        server.use(express.json());
        server.use(express.static(path.join(__dirname)));
        
        iniciarRotas(server);
        conectarBancodeDados();
        try{
            server.get('/', (req, res) => {
                res.sendFile(path.join(__dirname, 'index.html'));
            });
            server.get('/', (req, res) => {
                res.sendFile(path.join(__dirname, 'cadastro_autor.html'));
            });
            server.get('/cadastro_livro', (req, res) => {
                res.sendFile(path.join(__dirname, 'cadastro_livro.html'));
            });
            server.get('/consulta', (req, res) => {
                res.sendFile(path.join(__dirname, 'consulta.html'));
            });

            server.listen(PORT, ()=>
                {
                console.log('Servidor rodando em localhost:' + PORT);
            })
        }catch(error){
            console.error('Erro ao iniciar o servidor:' + error);
    }}


    async function serverPost(server, aba, função, collection, database) {
        server.post('/' + aba + '/' + função, async (req, res) => {
            const dado = req.body;
    
            try {
                // Tenta cadastrar o item no banco de dados
                await cadastrar(database, collection, dado);
    
                // Responde com sucesso
                return res.status(200).json({ message: `Cadastro de ${collection} foi um sucesso!` });
            } catch (error) {
                // Verifica erro de duplicidade de ID
                if (error.code === 11000) {
                    return res.status(400).json({ message: `Erro: O ${collection} com o ID já existe.` });
                }
    
                // Para outros erros, responde com status 500
                console.error('Erro no servidor:', error);
                return res.status(500).json({ message: `Erro ao cadastrar ${collection}.` });
            }
        });
    }
    

async function serverGet(server, aba, função, collection, dados_visíveis, database){
    server.get('/' + aba + '/' + função, async (req, res) => {
        try {
            switch(collection){
                case 'Autores':
                    const { Autores } = await common(database);
                    const buscaAutor = await Autores.find({}, dados_visíveis); 
                    res.json(buscaAutor); 
                    break;
                case 'Livros': 
                    const { Livros } = await common(database);
                    const buscaLivro = await Livros.find({}, dados_visíveis);
                    res.json(buscaLivro);  
                    break;
                default:
                    break;
            } 
        } catch (error) {
            console.error('Erro ao obter' + collection + ':', error);
            res.status(500).send('Erro ao obter' + collection);
        }
    });
    
}




async function serverDelete(){

    }

async function serverCadastrar(server){
    let selectAutores = {nome: 1, idade: 1, nacionalidade: 1};
    serverPost(server, 'cadastrar', 'cadastrarLivros', 'Livros', DatabaseBiblioteca);
    serverPost(server, 'cadastrar', 'cadastrarAutores', 'Autores', DatabaseBiblioteca);
    serverGet(server, 'common', 'selectAutores', 'Autores', selectAutores, DatabaseBiblioteca);

}

async function serverConsultar(server){
  

}

async function serverAtualizar(server){
    serverGet(server, 'atualizar', 'atualizarLivros', );
}

async function serverDeletar(server){

}



async function iniciarRotas(server){

    try{

        serverCadastrar(server);

        serverConsultar(server);

        serverAtualizar(server);

        serverDeletar(server);
/*
        server.post('/atualizar/atualizarAutores', async(req, res) => {
            const dado = req.body;
            try{
                await atualizar('Biblioteca', 'Autores', dado);
                    res.status(200).send('Autor cadastrado com sucesso!');
                } catch (error) {
                    res.status(500).send('Erro ao cadastrar o autor');
                }
        })

        server.post('/atualizar/atualizarLivros', async(req, res) => {
            const dado = req.body;
            try{
                await atualizar('Biblioteca', 'Livros', dado);
                    res.status(200).send('Autor cadastrado com sucesso!');
                } catch (error) {
                    res.status(500).send('Erro ao cadastrar o autor');
                }
        })

        serverGet(server, 'atualizar', 'selectAutores', 'Autores', 'nome');
        serverGet(server, 'cadastrar', 'selectLivros', 'Livros', 'titulo');

        server.get('/atualizar/selectAutores', async (req, res) => {
            try {
               const { Autores } = await common('Biblioteca');
               const autores = await Autores.find({}, 'nome');  
           res.json(autores);  
           } catch (error) {
               console.error('Erro ao obter autores:', error);
               res.status(500).send('Erro ao obter autores');
           }
        });

        server.get('/atualizar/selectAutores', async (req, res) => {
            try {
               const { Livros } = await common('Biblioteca');
               const livros = await Livros.find({}, 'nome');  
           res.json(livros);  
           } catch (error) {
               console.error('Erro ao obter livros:', error);
               res.status(500).send('Erro ao obter livros');
           }
        });
*/
        

        server.get('/', (requisição, resposta) => {
            resposta.send('Página funcionando!');
        }
        )

        console.log('Páginas funcionando com sucesso!')

    }catch(error){
    console.error("Erro ao iniciar a página: " + error);
    throw error;
    }}

async function conectarBancodeDados(){
        
    mongo.then(()=>console.log('Conexão com o banco de dados estabelecida!'))
        .catch(error => console.error('Erro ao conectar com o banco de dados: ' + error)
        );
    }



async function dadosLivros(Livros, dado) {
        const livro = new Livros(dado);
        return livro.save();
    }

async function dadosAutores(Autores, dado) {
        const autor = new Autores(dado);
        return autor.save();
    }

async function common(database) {
        const conexaodb = mongoose.connection.useDb(database);

        const schemas = {
            Livros: new mongoose.Schema({
            }, { versionKey: false, strict: false }),

            Autores: new mongoose.Schema({
            }, { versionKey: false, strict: false })
        };

        const Livros = conexaodb.model('Livros', schemas.Livros);
        const Autores = conexaodb.model('Autores', schemas.Autores);

        return { Livros, Autores };
    }

    async function commonId(database) {
        const conexaodb = mongoose.connection.useDb(database);

        const schemas = {
            Livros: new mongoose.Schema({
                _id:{type: String}
            }, { versionKey: false, strict: false }),

            Autores: new mongoose.Schema({
                _id:{type: String}
            }, { versionKey: false, strict: false })
        };

        const LivrosId = conexaodb.model('Livros', schemas.Livros);
        const AutoresId = conexaodb.model('Autores', schemas.Autores);

        return { LivrosId, AutoresId };
    }

  



async function cadastrar(database, collection, dado) {
        try {
            const { Livros, Autores } = await common(database);
            const { LivrosId, AutoresId } = await commonId(database);
    
            let resultado;
          
            switch (collection) {
                case 'Livros':

                  
                    if(dado._id){
                        resultado = await dadosLivros(LivrosId, dado);
                    }else{
                        resultado = await dadosLivros(Livros, dado);
                    }
                   

                    console.log('Livro adicionado:', resultado);
                    break;
                    
                case 'Autores':

                    if(dado._id){
                        resultado = await dadosAutores(AutoresId,  dado);
                    }else{
                        resultado = await dadosAutores(Autores, dado);
                    }
                    
                    console.log('Autor adicionado:', resultado);
                    break;
                
                default:
                    throw Error('Coleção não reconhecida');
                    break;
            }

            console.log('Collection ' + collection + ' Atualizado!');
            
        } catch (error) {

            if (error.code === 11000) {
                console.error(`Erro: O ID '${error.keyValue._id}' já existe na coleção '${collection}'.`);
            } else {
                console.error('Erro ao cadastrar:', error.message || error);
            }
    }
}



async function deletar(database, collection, criterio){
        const { Livros, Autores } = await common(database);
        try {
            let resultado;
            switch(collection) {
                case 'Livros':
                    resultado = await Livros.deleteOne(criterio);
                    console.log('Livro adicionado:', resultado);
                    break;

                case 'Autores':
                    resultado = await Autores.deleteOne(criterio);
                    console.log('Autor adicionado:', resultado);
                    break;

                default:
                    console.log('Coleção não reconhecida!');
                    break;
            }

            if (resultado.deletedCount > 0) {
                console.log('Documento deletado com sucesso!');
            } else {
                console.log('Nenhum documento encontrado para deletar.');
            }

            console.log('Collection ' + collection + ' Atualizado!');
        } catch (error) {
            console.error('Erro ao deletar ' + collection + ':', error);
        }
    }

async function atualizar(database, collection, criterio){
        const { Livros, Autores } = await common(database);
        
        try {
            let resultado;
            switch(collection) {
                case 'Livros':
                    resultado = await Livros.updateOne(criterio);
                    console.log('Livro adicionado:', resultado);
                    break;

                case 'Autores':
                    resultado = await Autores.updateOne(criterio);
                    console.log('Autor adicionado:', resultado);
                    break;

                default:
                    console.log('Coleção não reconhecida!');
                    break;
            }

            if (resultado.deletedCount > 0) {
                console.log('Documento deletado com sucesso!');
            } else {
                console.log('Nenhum documento encontrado para deletar.');
            }

            console.log('Collection ' + collection + ' Atualizado!');
        } catch (error) {
            console.error('Erro ao deletar ' + collection + ':', error);
        }
    }

    iniciarServidor();
