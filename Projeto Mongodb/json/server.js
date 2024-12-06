    const express = require('express');
    const path = require('path');
    const mongoose = require('mongoose');

    let mongo = mongoose.connect('mongodb://localhost:27017')
    const PORT = 3000;
    const DatabaseBiblioteca = 'Biblioteca';

async function iniciarServidor(){
        const server = express();

        server.use(express.json());
        server.use('/html', express.static(path.join(__dirname, '../html')));
        server.use('/css', express.static(path.join(__dirname, '../css')));
        server.use('/imgs', express.static(path.join(__dirname, '../imgs')));
        server.use('/', express.static((__dirname)));
        
        await iniciarRotas(server);
        await conectarBancodeDados();
        try{
         
            server.get('/', (req, res) => {
                res.sendFile(path.join(__dirname, '../html', 'index2.html')); 
            });

            server.get('/index2.html', (req, res) => {
                res.sendFile(path.join(__dirname, '../html', 'index2.html')); 
            });
            
            server.get('/cadastros.html', (req, res) => {
                res.sendFile(path.join(__dirname, '../html', 'cadastros.html'));
            });
            
            server.get('/consultas.html', (req, res) => {
                res.sendFile(path.join(__dirname, '../html', 'consultas.html'));
            });
            

            server.listen(PORT, ()=>
                {
                console.log('Servidor rodando em localhost:' + PORT);
            })
        }catch(error){
            console.error('Erro ao iniciar o servidor:' + error);
}}


async function serverPost(server,janela, aba, função, collection, database) {
        server.post('/' + janela + '/' + aba + '/' + função, async (req, res) => {
            const dado = req.body;
    
            try {
                await cadastrar(database, collection, dado);
                return res.status(200).json({ message: `Cadastro de ${collection} foi um sucesso!` });
            } catch (error) {
                const status = error.status || 500;
                const message = error.message || 'Erro interno do servidor.';
                return res.status(status).json({ message });
            }
        });
}
    
async function serverGet(server, aba, funcao, collection, dados_visíveis, database) {
    server.get('/' + aba + '/' + funcao, async (req, res) => {
        try {
            const filtros = req.query;  
            let query = {};  

            for (let campo in filtros) {
                query[campo] = new RegExp(filtros[campo], 'i'); // Filtro com regex (case-insensitive)
            }

            switch (collection) {
                case 'Autores':
                    const { Autores } = await common(database);
                    const buscaAutor = await Autores.find(query, dados_visíveis); 
                    res.json(buscaAutor); 
                    break;

                case 'Livros': 
                    const { Livros } = await common(database);
                    const buscaLivro = await Livros.find(query, dados_visíveis);
                    res.json(buscaLivro);  
                    break;

                default:
                    break;
            } 
        } catch (error) {
            console.error('Erro ao obter ' + collection + ':', error);
            res.status(500).send('Erro ao obter ' + collection);
        }
    });
}


async function serverDelete(server, aba, janela, função, collection, database ){
 server.delete('/' + janela + '/' + aba + '/' + função, async (req, res) => {
        const { id } = req.params;  
            try {
                await deletar(database, collection, {_id: id});
                return res.status(200).json({ message: ` ${collection} deletado com sucesso!` });
            } catch (error) {
                const status = error.status || 500;
                const message = error.message || 'Erro interno do servidor.';
                return res.status(status).json({ message });
            }
        });
    }

async function serverCadastrar(server){
    let selectAutores = {nome: 1, idade: 1, nacionalidade: 1};
    serverPost(server, 'cadastros.html', 'cadastrar', 'cadastrarLivros', 'Livros', DatabaseBiblioteca);
    serverPost(server, 'cadastros.html', 'cadastrar', 'cadastrarAutores', 'Autores', DatabaseBiblioteca);
    serverGet(server, 'common', 'selectAutores', 'Autores', selectAutores, DatabaseBiblioteca);

}

async function serverConsultar(server){
    let selectLivros = {_id: 1, titulo: 1, autores: 1, ano_publicação: 1};
    //serverGet(server, 'common', 'selectAutores', 'Autores', selectAutores, DatabaseBiblioteca);
    serverGet(server, 'common', 'selectLivros', 'Livros', selectLivros, DatabaseBiblioteca);
    serverDelete(server, 'consultas.html', 'deletar', 'deletarAutores', 'Autores', DatabaseBiblioteca)
    serverDelete(server, 'consultas.html', 'deletar', 'deletarLivros', 'Livros', DatabaseBiblioteca)
}




async function iniciarRotas(server){

    try{

        serverCadastrar(server);

        serverConsultar(server);

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

  


//MUDEI AQUI 
async function cadastrar(database, collection, dado) {
        try {
            const { Livros, Autores } = await common(database);
            const { LivrosId, AutoresId } = await commonId(database);
    
            let resultado;
    
            switch (collection) {
                case 'Livros':
                    if (dado.autores && Array.isArray(dado.autores)) {
                        const autoresCompletos = await Promise.all(
                            dado.autores.map(async (idAutor) => {
                                const autor = await Autores.findById(idAutor); // Busca o autor pelo ID
                                return autor ? autor.nome : null; // Retorna o nome ou null se não encontrado
                            })
                        );
                
                        dado.autores = autoresCompletos.filter(nome => nome !== null);
                    }
                
                    const novoLivro = new Livros(dado);
                    await novoLivro.save();
                    console.log('Livro cadastrado com sucesso:', novoLivro);
                    break;
                
            
    
                case 'Autores':
                    resultado = dado._id
                        ? await dadosAutores(AutoresId, dado)
                        : await dadosAutores(Autores, dado);
                    console.log('Autor adicionado:', resultado);
                    break;
    
                default:
                    throw new Error('Coleção não reconhecida');
            }
    
            console.log('Collection ' + collection + ' Atualizado!');
        } catch (error) {
            if (error.code === 11000) {
                console.error(`Erro: O ID '${error.keyValue._id}' já existe na coleção '${collection}'.`);
                throw { status: 400, message: `Erro: O ID '${error.keyValue._id}' já existe na coleção '${collection}'.` };
            } else {
                console.error('Erro ao cadastrar:', error.message || error);
                throw { status: 500, message: `Erro ao cadastrar ${collection}.` };
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
                    console.log('Livro deletado:', resultado);
                    break;

                case 'Autores':
                    resultado = await Autores.deleteOne(criterio);
                    console.log('Autor deletado:', resultado);
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
