# 📝 Task Manager - To-Do List

Aplicação full-stack para gerenciamento de tarefas desenvolvida como trabalho de Qualidade de Software.

## 🚀 Tecnologias

### Backend
- Node.js + TypeScript
- Express.js
- JSON como banco de dados

### Frontend
- React + TypeScript
- Vite
- CSS

## 📦 Estrutura do Projeto

```
to-doList/
├── server/           # Backend API
│   ├── routes/       # Rotas da API
│   ├── dist/         # Build do TypeScript
│   ├── index.ts      # Servidor principal
│   └── tasks.json    # Banco de dados
├── web/              # Frontend React
│   ├── src/          # Código fonte
│   ├── public/       # Arquivos estáticos
│   └── dist/         # Build de produção
└── docs/             # Documentação e relatórios
    ├── reports/      # Relatórios de qualidade
    └── screenshots/  # Evidências de testes
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Backend

```bash
cd server
npm install
npm run start
```

Servidor rodará em: `http://localhost:3000`

### Frontend

```bash
cd web
npm install
npm run dev
```

Aplicação rodará em: `http://localhost:5173`

## 🧪 Testes de Qualidade

Este projeto implementa 6 ferramentas de qualidade de software:

### 1. 🌐 Testes Cross-Browser (BrowserStack)
- **Navegadores testados:** Chrome, Firefox, Safari, Edge, Mobile
- **Taxa de compatibilidade:** 97.6%
- **Relatório:** [docs/reports/browserstack-report.md](docs/reports/browserstack-report.md)

### 2. 📊 Análise de Código (SonarCloud)
- **Code Coverage:** Em progresso
- **Bugs:** 0
- **Code Smells:** Em análise
- **Security Hotspots:** 0

### 3. 🔒 Segurança (Snyk)
- **Vulnerabilidades:** Em análise
- **Dependências escaneadas:** Em progresso

### 4. ⚡ Performance (K6)
- **Throughput:** Em testes
- **p95:** Em medição
- **Taxa de erro:** Em análise

### 5. 🤖 CI/CD (GitHub Actions)
- **Pipeline:** Em configuração
- **Testes:** Automatizado
- **Build:** Validado automaticamente

### 6. 📋 Gestão de Testes (Qase)
- **Casos de teste:** Em documentação
- **Taxa de aprovação:** Em progresso

## 📋 API Endpoints

### Tasks

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Lista todas as tarefas |
| POST | `/tasks` | Cria nova tarefa |
| PUT | `/tasks/:id` | Atualiza tarefa |
| DELETE | `/tasks/:id` | Deleta tarefa |

### Exemplos

**Criar tarefa:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Nova tarefa","feito":false}'
```

**Listar tarefas:**
```bash
curl http://localhost:3000/tasks
```

## 🎯 Funcionalidades

- ✅ Criar tarefas
- ✅ Listar tarefas
- ✅ Editar tarefas
- ✅ Deletar tarefas
- ✅ Marcar como concluída
- ✅ Interface responsiva
- ✅ Compatibilidade cross-browser

## 📸 Screenshots

### Desktop
![Desktop](docs/screenshots/desktop.png)

### Mobile
![Mobile](docs/screenshots/mobile.png)

## 👥 Autor

**Henrique Bicudo**
- GitHub: [@HenriqueBicudo](https://github.com/HenriqueBicudo)

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos - Faculdade de Qualidade de Software.

## 🔗 Links Úteis

- [Documentação Completa](docs/)
- [Relatório de Testes BrowserStack](docs/reports/browserstack-report.md)
- [Casos de Teste](docs/test-cases.md)
