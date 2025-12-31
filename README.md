# 📌 API de Gerenciamento de Tickets – Node.js

Este projeto consiste no desenvolvimento de uma **API REST** para gerenciamento de chamados (tickets), criada em **Node.js** com **Express**, seguindo boas práticas de engenharia de software e regras de negócio bem definidas.

A aplicação permite **criar**, **listar**, **atualizar o status e deletar tickets**, utilizando persistência em memória e arquitetura organizada por camadas.

## 🧠 Contexto de Negócio

O sistema simula uma ferramenta interna de gestão de chamados, onde usuários podem registrar problemas ou solicitações, acompanhar o andamento e finalizar tickets conforme o fluxo definido.

## 🎯 Objetivo
Construir uma API REST simples e profissional que:

- Gerencie tickets de suporte
- Respeite regras claras de transição de status
- Utilize padrões adequados de código e tratamento de erros
- Não dependa de banco de dados (persistência em memória)

## 🛠️ Tecnologias Utilizadas

- **Node.js** (v18 ou superior)
- **Express**
- **UUID** (geração de identificadores únicos)
- **JavaScript (ES6+)**

## 📁 Estrutura do Projeto (Sugerida)

```css
src/
├── controllers/
│   └── ticketController.js
├── services/
│   └── ticketService.js
├── repositories/
│   └── ticketRepository.js
├── middlewares/
│   └── errorHandler.js
├── routes/
│   └── ticketRoutes.js
├── utils/
│   └── constants.js
├── app.js
└── server.js
```

A separação em camadas ajuda a manter o código organizado, testável e fácil de evoluir.

## 📦 Modelo de Ticket

```json
{
  "id": "uuid",
  "titulo": "string",
  "descricao": "string",
  "status": "ABERTO | EM_ANALISE | FECHADO",
  "prioridade": "BAIXA | MEDIA | ALTA",
  "criadoEm": "ISODate",
  "atualizadoEm": "ISODate"
}
```

## 🔗 Endpoints da API

### ➕ Criar Ticket

**POST** `/ticket`

**Regras:**

- `titulo` e `descricao` são obrigatórios
- `status` inicia como `ABERTO`
- `id` é gerado automaticamente (UUID)

**Exemplo de body:**

```json
{
  "titulo": "Erro no sistema",
  "descricao": "Não consigo acessar a página inicial",
  "prioridade": "ALTA"
}
```

### 📄 Listar Tickets

**GET** `/tickets`

**Funcionalidades:**

- Filtro por status
- Ordenação por data de criação

**Exemplo de query params:**

```bash
/tickets?status=ABERTO
```

### 🔄 Atualizar Status do Ticket

**PUT** /tickets/:id/status

**Regras obrigatórias:**

- Fluxo permitido: `ABERTO → EM_ANALISE → FECHADO`
- Não é permitido pular etapas
- Tickets `FECHADOS` não podem ser alterados

**Exemplo de body:**

```json
{
  "status": "EM_ANALISE"
}
```

### 🗑️ Deletar Ticket

**DELETE** `/tickets/:id`

- Remove o ticket da memória
- Retorna status HTTP apropriado

## ⚠️ Tratamento de Erros

A API utiliza:

- Códigos HTTP adequados (`400`, `404`, `409`, `500`, etc.)
- Mensagens claras e consistentes
- Middleware centralizado de erro (opcional, mas recomendado)

## ▶️ Como Executar o Projeto

**Pré-requisitos**

- Node.js v18+
- npm ou yarn

**Passos**

```bash
# Instalar dependências
npm install

# Executar o servidor
npm run dev
```

O servidor será iniciado em:

```arduino
http://localhost:3000
```
