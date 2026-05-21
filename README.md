# Fullstack Web Platform - Gerenciamento de Incidentes

Uma aplicação fullstack para gerenciamento de incidentes construída com **Express**, **Prisma**, **SQLite** e **React**.

## 🎯 Funcionalidades

- ✅ Criar incidentes
- ✅ Listar incidentes
- ✅ Atualizar incidentes
- ✅ Deletar incidentes com confirmação
- ✅ Validação de formulários
- ✅ Interface escura (dark mode)
- ✅ Responsiva

## 🛠️ Tecnologias

### Backend
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados
- **TypeScript** - Tipagem estática
- **CORS** - Compartilhamento de recursos entre origens
- **Zod** - Validação de dados

### Frontend
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **Shadcn/ui** - Componentes UI de alta qualidade
- **Zod** - Validação de esquemas
- **Vite** - Build tool

## 📋 Pré-requisitos

- Node.js (v18+)
- npm ou yarn

## 🚀 Como Executar

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd fullstack-web-platform
```

### 2. Backend

```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente (criar arquivo .env)
echo "DATABASE_URL=file:./dev.db" > .env

# Executar migrações do Prisma (se necessário)
npx prisma db push

# Iniciar o servidor em desenvolvimento
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### 3. Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Criar arquivo .env.local
echo "VITE_API_URL=http://localhost:3000/api" > .env.local

# Iniciar em desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
fullstack-web-platform/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Entrada da aplicação
│   │   ├── server.ts             # Configuração do Express
│   │   ├── controllers/          # Controladores
│   │   ├── services/             # Lógica de negócio
│   │   ├── routes/               # Rotas da API
│   │   ├── types/                # Tipos TypeScript
│   │   ├── lib/
│   │   │   └── prisma.ts         # Instância do Prisma
│   │   ├── logger/               # Sistema de logging
│   │   └── middlewares/          # Middlewares
│   ├── prisma/
│   │   └── schema.prisma         # Schema do banco de dados
│   ├── generated/                # Cliente Prisma gerado
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx              # Entrada
│   │   ├── App.tsx               # Componente raiz
│   │   ├── components/           # Componentes React
│   │   ├── pages/                # Páginas
│   │   ├── hooks/                # Custom hooks
│   │   ├── services/             # Cliente HTTP
│   │   ├── schemas/              # Validações Zod
│   │   ├── types/                # Tipos TypeScript
│   │   └── lib/                  # Utilitários
│   ├── index.html
│   └── package.json
│
└── README.md
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

#### **GET /incidents**
Retorna todos os incidentes.

**Response (200):**
```json
[
  {
    "id": "uuid-123",
    "title": "Servidor Down",
    "description": "O servidor não está respondendo",
    "status": "open",
    "createdAt": "2026-05-21T15:51:47.723Z"
  }
]
```

---

#### **GET /incidents/:id**
Retorna um incidente específico.

**Response (200):**
```json
{
  "id": "uuid-123",
  "title": "Servidor Down",
  "description": "O servidor não está respondendo",
  "status": "open",
  "createdAt": "2026-05-21T15:51:47.723Z"
}
```

**Response (404):**
```json
{
  "error": "Incident not found"
}
```

---

#### **POST /incidents**
Cria um novo incidente.

**Request Body:**
```json
{
  "title": "Novo Incidente",
  "description": "Descrição detalhada",
  "status": "open"
}
```

**Response (201):**
```json
{
  "id": "uuid-123",
  "title": "Novo Incidente",
  "description": "Descrição detalhada",
  "status": "open",
  "createdAt": "2026-05-21T15:51:47.723Z"
}
```

---

#### **PUT /incidents/:id**
Atualiza um incidente.

**Request Body:**
```json
{
  "title": "Incidente Atualizado",
  "status": "in-progress"
}
```

**Response (200):**
```json
{
  "id": "uuid-123",
  "title": "Incidente Atualizado",
  "description": "Descrição detalhada",
  "status": "in-progress",
  "createdAt": "2026-05-21T15:51:47.723Z"
}
```

---

#### **DELETE /incidents/:id**
Deleta um incidente.

**Response (204):** Sem conteúdo

---

## 🧪 Testes (Em Desenvolvimento)

Para executar os testes:

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 🏗️ Decisões Arquiteturais

### Backend
- **Express**: Framework minimalista e flexível para APIs REST
- **Prisma**: ORM type-safe que simplifica operações de banco
- **SQLite**: Banco de dados leve, ideal para desenvolvimento
- **CORS**: Habilitado para comunicação frontend-backend

### Frontend
- **React + TypeScript**: Componentes type-safe e reutilizáveis
- **Tailwind CSS**: Utility-first para estilos consistentes
- **Shadcn/ui**: Componentes pré-construídos e acessíveis
- **Zod**: Validação em tempo de execução e type inference

## 📝 Trade-offs

| Decisão | Benefício | Trade-off |
|---------|-----------|-----------|
| SQLite | Sem setup de banco externo | Limitado para produção com alto volume |
| Prisma | Type-safe queries | Curva de aprendizado |
| Tailwind | Development rápido | CSS bundle maior |
| Shadcn/ui | UI consistente | Dependência de bibliotecas externas |

## 🚀 Possíveis Melhorias Futuras

- [ ] Autenticação e autorização (JWT)
- [ ] Paginação de incidentes
- [ ] Filtros e busca avançada
- [ ] Histórico de alterações
- [ ] Upload de anexos
- [ ] Notificações em tempo real (WebSockets)
- [ ] Testes automatizados completos
- [ ] Deploy em produção (Vercel/Railway)
- [ ] Monitoramento e logging avançado
- [ ] API GraphQL como alternativa

## 🐛 Desafios Encontrados

1. **Configuração de CORS**: Resolvido importando e usando middleware `cors`
2. **Tipagem de Params do Express**: Resolvido com `as { id: string }`
3. **Sincronização Frontend-Backend**: Hooks custom para estado compartilhado

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.