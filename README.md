# Sistema de Gerenciamento de Biblioteca


### Integrantes:
- Esdrás Alves dos Santos  
- Maria Leticia Almeida Gonçalves  
- Matheus Souza Ramos  
- Rafael Almeida Santos  

**Orientador:** Prof. M. Sc. Marcelo Barbosa  

---

## Descrição do Projeto
Este projeto foi desenvolvido para a disciplina de Banco de Dados e tem como objetivo implementar um sistema de gerenciamento de biblioteca. O sistema é composto por três camadas principais: **Frontend**, **Backend** e **API**, cada uma desempenhando funções essenciais para a funcionalidade geral da aplicação.

---

## Sumário
1. [Introdução](#introdução)  
2. [Frontend](#frontend)  
3. [Backend](#backend)  
    - [Arquitetura e Framework](#arquitetura-e-framework)  
    - [Camadas da Aplicação](#camadas-da-aplicação)  
        - [Camada de Serviços](#camada-de-serviços)  
        - [Camada de Repositórios](#camada-de-repositórios)  
4. [API](#api)  
5. [Conclusão](#conclusão)  

---

## Introdução
O sistema foi desenvolvido para gerenciar bibliotecas de forma eficiente, oferecendo ao usuário uma interface intuitiva e funcional. Foi projetado com três camadas principais:
- **Frontend**: Responsável pela interface visual e interação do usuário.
- **Backend**: Lida com o processamento de dados e lógica de negócios.
- **API**: Faz a comunicação entre o frontend e o backend.

---

## Frontend
O frontend foi implementado em HTML, CSS e JavaScript, criando uma interface Web.  
**Principais funcionalidades:**
- Divisão clara de abas para cadastros e consultas.
- Estrutura simplificada para facilitar o uso e reduzir a complexidade.
- Campos de formulário e botões para envio de dados.

---

## Backend
O backend utiliza **Java Spring Boot** como framework principal para garantir robustez e eficiência.  

### Arquitetura e Framework
A arquitetura do projeto segue o modelo **MVC (Model-View-Controller)**, separando responsabilidades e facilitando a escalabilidade.  

#### Camada de Serviços
- Implementação das regras de negócio.  
- Métodos principais: `listarTodos()`, `buscarPorId()`, `salvar`, `atualizar`, `deletar`.  

#### Camada de Repositórios
- Gerenciamento das operações de persistência de dados.  
- Uso de **Spring Data JPA** para abstração e eliminação de SQL manual.  
- Vantagens:
  - Desacoplamento da lógica de persistência.
  - Facilidade de manutenção e extensão.
  - Otimização de desempenho e consultas complexas.

---

## API
A API conecta o frontend e o backend, implementando operações de **CRUD** para as principais entidades do sistema:
- Usuário
- Funcionário
- Empréstimo
- Livro  

Os endpoints foram projetados para receber requisições do frontend, processá-las no backend e retornar os dados necessários.

---

## Conclusão
O projeto foi estruturado de forma eficiente, integrando frontend, backend e API para criar um sistema funcional e seguro. Cada camada desempenhou um papel crucial:
- **Frontend**: Garantiu a interação simplificada com o usuário.  
- **Backend**: Processou as informações e acessou o banco de dados.  
- **API**: Facilitou a comunicação entre as camadas.  

Essa abordagem modular destacou a importância da organização em sistemas complexos, proporcionando uma experiência amigável e segura ao usuário.
