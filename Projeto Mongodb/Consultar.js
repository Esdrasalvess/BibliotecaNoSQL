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