# Plataforma Web Full-stack - Sistema de Gerenciamento de Incidentes

Uma aplicação fullstack pronta para produção para gerenciamento de incidentes construída com tecnologias modernas e melhores práticas.

## Visão Geral

Este projeto implementa um sistema completo de relatório e gerenciamento de incidentes com autenticação de usuários, rastreamento de incidentes em tempo real e uma interface responsiva. A aplicação demonstra práticas abrangentes de desenvolvimento full-stack, incluindo desenvolvimento de API backend, design de banco de dados, arquitetura frontend e testes extensivos.

## Recursos

- Autenticação de usuários com tokens JWT (expiração de 7 dias)
- Criar, ler, atualizar e deletar incidentes
- Associação de usuários em tempo real com incidentes
- Design responsivo para dispositivos móveis e desktop
- Validação abrangente de entrada no cliente e servidor
- Interface modo escuro
- Gerenciamento de perfil de usuário
- 38 testes aprovados (19 backend, 19 frontend)

## Stack Tecnológico

### Backend
- Express.js: Framework API RESTful
- TypeScript: Verificação de tipo estático
- Prisma: ORM type-safe com SQLite
- JWT: Autenticação baseada em token seguro
- Bcrypt: Hashing de senha (10 rodadas de salt)
- Zod: Validação de tipo em tempo de execução
- Jest: Framework de teste unitário

### Frontend
- React 18: Biblioteca moderna de UI com hooks
- TypeScript: Segurança de tipo completa
- Vite: Ferramenta de build extremamente rápida
- Tailwind CSS: Framework CSS utility-first
- Shadcn/ui: Biblioteca de componentes de alta qualidade
- React Router: Roteamento client-side
- Vitest: Teste de componentes e hooks

## Pré-requisitos

Node.js v18.0.0 ou superior
npm v9.0.0 ou superior

Verifique a instalação:
```bash
node --version
npm --version
```

## Instalação e Configuração

### 1. Clonar Repositório

```bash
git clone https://github.com/yourusername/fullstack-web-platform.git
cd fullstack-web-platform
```

### 2. Configuração do Backend

```bash
cd backend

npm install

# Criar arquivo .env
cp .env.example .env

# Configurar banco de dados e executar migrações
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

Backend roda em http://localhost:3000

### 3. Configuração do Frontend

```bash
cd frontend

npm install

# Criar arquivo .env
VITE_API_URL=http://localhost:3000/api

# Iniciar servidor de desenvolvimento
npm run dev
```

Frontend roda em http://localhost:5173

## Variáveis de Ambiente

### Backend (.env)

```bash
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
PORT=3000
```

### Frontend (.env)

```bash
VITE_API_URL="http://localhost:3000/api"
```

## Executar Testes

### Testes do Backend

```bash
cd backend
npm test                 # Executar todos os testes
npm run test:watch      # Modo watch
npm run test:coverage   # Relatório de cobertura
```

Cobertura de testes: 19 testes aprovados
- Validação de serviço de autenticação (hashing de senha, JWT, validação de email)
- Validação de serviço de incidente (estrutura de dados, gerenciamento de status)

### Testes do Frontend

```bash
cd frontend
npm test -- --run       # Executar uma vez
npm test                # Modo watch
npm test:ui             # Modo UI
```

Cobertura de testes: 19 testes aprovados
- Contexto de autenticação e gerenciamento de token
- Hook de incidentes e busca de dados
- Renderização de componentes e interações

## Estrutura do Projeto

```
fullstack-web-platform/
├── backend/
│   ├── src/
│   │   ├── server.ts              Aplicação principal
│   │   ├── controllers/           Manipuladores de rota
│   │   ├── services/              Lógica de negócio
│   │   ├── routes/                Definições de rota da API
│   │   ├── middlewares/           Middleware Express
│   │   ├── lib/                   Utilitários e configuração
│   │   ├── logger/                Sistema de logging
│   │   ├── types/                 Definições TypeScript
│   │   └── __tests__/             Arquivos de teste (19 testes)
│   ├── prisma/
│   │   ├── schema.prisma          Schema do banco de dados
│   │   └── migrations/            Migrações do banco de dados
│   ├── jest.config.js             Configuração de testes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx               Ponto de entrada
│   │   ├── App.tsx                Componente raiz
│   │   ├── pages/                 Componentes de página
│   │   ├── components/            Componentes reutilizáveis
│   │   ├── context/               Provedores de contexto React
│   │   ├── hooks/                 Hooks React customizados
│   │   ├── services/              Cliente de API
│   │   ├── types/                 Definições TypeScript
│   │   └── __tests__/             Arquivos de teste (19 testes)
│   ├── vitest.config.ts           Configuração de testes
│   └── package.json
│
├── API.md                         Documentação completa da API
├── TECHNICAL_NOTES.md             Arquitetura e decisões de design
└── README.md                      Este arquivo
```

## Documentação da API

Para documentação completa de endpoints com exemplos, veja [API.md](./API.md)

Referência rápida:
- POST /api/auth/register: Registro de usuário
- POST /api/auth/login: Autenticação
- GET /api/users/profile: Perfil do usuário
- GET /api/incidents: Listar incidentes
- POST /api/incidents: Criar incidente
- PUT /api/incidents/:id: Atualizar incidente
- DELETE /api/incidents/:id: Deletar incidente

## Schema do Banco de Dados

### Tabela de Usuário
- id: Chave primária UUID
- email: Email único
- name: Nome completo
- password: Hash bcrypt
- createdAt: Timestamp
- updatedAt: Timestamp

### Tabela de Incidente
- id: Chave primária UUID
- title: Título do incidente
- description: Descrição detalhada
- status: open | in-progress | closed
- userId: Chave estrangeira para Usuário
- createdAt: Timestamp
- updatedAt: Timestamp
- user: Dados de usuário relacionado (incluído em consultas)

## Autenticação

Autenticação baseada em JWT com expiração de token de 7 dias:

1. Usuário se registra ou faz login
2. Servidor retorna token JWT
3. Cliente armazena token em localStorage
4. Token enviado no cabeçalho Authorization para rotas protegidas
5. Servidor valida token em cada requisição

Medidas de segurança:
- Senhas hash com bcrypt (10 rodadas)
- Nenhuma senha retornada nas respostas da API
- Tokens JWT expiram após 7 dias
- Comprimento mínimo de senha: 6 caracteres

## Validação

Validação abrangente implementada em ambas as camadas:

Frontend:
- Validação de formulário em tempo real com Zod
- Mensagens de erro amigáveis ao usuário
- Validação de tipo e comprimento de entrada

Backend:
- Validação de schema Zod
- Validação de lógica de negócio
- Validação de restrição de banco de dados

## Tratamento de Erros

Respostas de erro consistentes com:
- Mensagens de erro descritivas
- Códigos de status HTTP apropriados
- Logging de erro para debugging
- Mensagens amigáveis ao usuário no frontend

## Resolução de Problemas

### Porta Já em Uso
```bash
PORT=3001 npm run dev    # Backend
VITE_PORT=5174 npm run dev  # Frontend
```

### Problemas de Banco de Dados
```bash
cd backend
npx prisma migrate reset    # Resetar banco de dados
npx prisma db push          # Fazer push de schema
```

### Dependências Não Instalando
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Problemas de Conexão com Backend
- Verifique se backend está rodando em http://localhost:3000
- Verifique VITE_API_URL no arquivo .env do frontend
- Confirme se CORS está ativado
- Verifique configurações de firewall

## Considerações de Performance

- Lazy loading em rotas
- Memoização de componentes
- Consultas de banco de dados otimizadas com relações
- CSS bundling otimizado por Tailwind
- Builds de produção minificados

## Considerações de Segurança

Recomendações para produção:
- Ativar HTTPS/SSL
- Implementar limite de taxa
- Adicionar logging e monitoramento de requisição
- Usar configurações específicas de ambiente
- Implementar criptografia de requisição/resposta
- Configurar backups automatizados
- Ativar throttling de requisição da API

## Fluxo de Desenvolvimento

1. Criar branch de feature
2. Fazer alterações com testes
3. Executar suites de testes para verificar
4. Fazer commit com mensagens descritivas
5. Fazer push para repositório

## Licença

MIT License

## Suporte

Para problemas ou dúvidas, crie uma issue no repositório.