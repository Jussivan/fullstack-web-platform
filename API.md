# Documentação da API

## URL Base
```
http://localhost:3000/api
```

## Autenticação

Todos os endpoints protegidos exigem um token Bearer no cabeçalho Authorization:

```
Authorization: Bearer <token>
```

O token é obtido através dos endpoints de login ou registro e é válido por 7 dias.

---

## Endpoints de Autenticação

### POST /auth/register

Criar uma nova conta de usuário.

**Requisição:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Resposta (201 Created):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Códigos de Status:**
- 201: Usuário criado com sucesso
- 400: Entrada inválida ou usuário já existe
- 500: Erro interno do servidor

---

### POST /auth/login

Autenticar e receber um token de autenticação.

**Requisição:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Resposta (200 OK):**
```json
{
  "user": {
    "id": "uuid-string",
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Códigos de Status:**
- 200: Autenticação bem-sucedida
- 400: Credenciais inválidas
- 500: Erro interno do servidor

---

## Endpoints de Usuário

### GET /users/profile

Obter as informações de perfil do usuário autenticado.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Resposta (200 OK):**
```json
{
  "id": "uuid-string",
  "email": "john@example.com",
  "name": "John Doe",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z"
}
```

**Códigos de Status:**
- 200: Perfil recuperado com sucesso
- 401: Não autorizado (token inválido ou ausente)
- 404: Usuário não encontrado
- 500: Erro interno do servidor

---

## Endpoints de Incidentes

### GET /incidents

Recuperar todos os incidentes com informações do usuário.

**Cabeçalhos:**
```
Authorization: Não obrigatória
```

**Resposta (200 OK):**
```json
[
  {
    "id": "uuid-string",
    "title": "Falha na Conexão com Banco de Dados",
    "description": "Não foi possível conectar ao banco de dados de produção",
    "status": "open",
    "userId": "uuid-string",
    "createdAt": "2026-05-22T10:00:00.000Z",
    "updatedAt": "2026-05-22T10:00:00.000Z",
    "user": {
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

**Códigos de Status:**
- 200: Incidentes recuperados com sucesso
- 500: Erro interno do servidor

---

### GET /incidents/:id

Recuperar um incidente específico por ID.

**Parâmetros:**
- id (string, obrigatório): O UUID do incidente

**Resposta (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Falha na Conexão com Banco de Dados",
  "description": "Não foi possível conectar ao banco de dados de produção",
  "status": "open",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Códigos de Status:**
- 200: Incidente recuperado com sucesso
- 404: Incidente não encontrado
- 500: Erro interno do servidor

---

### POST /incidents

Criar um novo incidente. Requer autenticação.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Requisição:**
```json
{
  "title": "Falha na Conexão com Banco de Dados",
  "description": "Não foi possível conectar ao banco de dados de produção",
  "status": "open"
}
```

**Resposta (201 Created):**
```json
{
  "id": "uuid-string",
  "title": "Falha na Conexão com Banco de Dados",
  "description": "Não foi possível conectar ao banco de dados de produção",
  "status": "open",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:00:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Códigos de Status:**
- 201: Incidente criado com sucesso
- 400: Entrada inválida
- 401: Não autorizado
- 500: Erro interno do servidor

---

### PUT /incidents/:id

Atualizar um incidente existente. Requer autenticação.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Parâmetros:**
- id (string, obrigatório): O UUID do incidente

**Requisição:**
```json
{
  "title": "Falha na Conexão com Banco de Dados - RESOLVIDO",
  "description": "Problema foi resolvido reiniciando o serviço de banco de dados",
  "status": "closed"
}
```

**Resposta (200 OK):**
```json
{
  "id": "uuid-string",
  "title": "Falha na Conexão com Banco de Dados - RESOLVIDO",
  "description": "Problema foi resolvido reiniciando o serviço de banco de dados",
  "status": "closed",
  "userId": "uuid-string",
  "createdAt": "2026-05-22T10:00:00.000Z",
  "updatedAt": "2026-05-22T10:50:00.000Z",
  "user": {
    "id": "uuid-string",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Códigos de Status:**
- 200: Incidente atualizado com sucesso
- 400: Entrada inválida
- 401: Não autorizado
- 404: Incidente não encontrado
- 500: Erro interno do servidor

---

### DELETE /incidents/:id

Deletar um incidente. Requer autenticação.

**Cabeçalhos:**
```
Authorization: Bearer <token>
```

**Parâmetros:**
- id (string, obrigatório): O UUID do incidente

**Resposta (204 No Content):**
```
(corpo vazio)
```

**Códigos de Status:**
- 204: Incidente deletado com sucesso
- 401: Não autorizado
- 404: Incidente não encontrado
- 500: Erro interno do servidor

---

## Valores de Status

Os seguintes valores de status são válidos para incidentes:

- open: O incidente foi reportado e está aberto para investigação
- in-progress: O incidente está sendo tratado
- closed: O incidente foi resolvido

---

## Respostas de Erro

Todas as respostas de erro seguem este formato:

```json
{
  "error": "Mensagem de erro descrevendo o que correu mal"
}
```

Cenários de erro comuns:

- 400 Bad Request: Dados inválidos ou campos obrigatórios ausentes
- 401 Unauthorized: Token de autenticação ausente ou inválido
- 404 Not Found: Recurso não existe
- 500 Internal Server Error: Erro inesperado do servidor

---

## Limite de Taxa

Atualmente, não há limite de taxa implementado. Isto é recomendado para implantação em produção.

---

## Paginação

Atualmente, a API retorna todos os resultados sem paginação. Para grandes conjuntos de dados, considere implementar paginação em versões futuras.
