Markdown

# API Connect - Tainá Osti

## Objetivo da API
API RESTful desenvolvida em Node.js e Express para gerenciamento de usuários. A aplicação permite o cadastro e a consulta de registros, validando dados obrigatórios e retornando os códigos de status HTTP adequados para cada operação.

---

##  Tecnologias Utilizadas
* **Node.js** - Ambiente de execução JavaScript
* **Express.js** - Framework web para rotas e requisições HTTP
* **Crypto (UUID)** - Geração de identificadores únicos para os usuários

---

##  Como Executar o Projeto Localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/tainaosti/api-connect-taina-osti.git](https://github.com/tainaosti/api-connect-taina-osti.git)

    Acesse a pasta do projeto:
    Bash

    cd api-connect-taina-osti

    Instale as dependências:
    Bash

    npm install

    Inicie o servidor:
    Bash

    node index.js

    O servidor estará rodando em http://localhost:3000.

 Endpoints da API
1. Listar todos os usuários

    Método: GET

    Rota: /users

    Resposta de Sucesso (200 OK):
    JSON

    {
      "success": true,
      "data": []
    }

2. Cadastrar novo usuário

    Método: POST

    Rota: /users

    Corpo da Requisição (JSON):
    JSON

    {
      "name": "Maria Silva",
      "email": "maria@email.com"
    }

    Resposta de Sucesso (201 Created):
    JSON

    {
      "success": true,
      "data": {
        "id": "uuid-gerado",
        "name": "Maria Silva",
        "email": "maria@email.com",
        "role": "user",
        "createdAt": "2026-09-01T20:00:00.000Z"
      }
    }

    Resposta de Erro de Validação (400 Bad Request):
    JSON

    {
      "success": false,
      "error": "O campo \"email\" é obrigatório e deve ser um texto válido."
    }

3. Buscar usuário por ID

    Método: GET

    Rota: /users/:id

    Resposta de Erro - ID não encontrado (404 Not Found):
    JSON

    {
      "success": false,
      "error": "Usuário não encontrado."
    }
