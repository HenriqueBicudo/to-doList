# 🚀 GitLab CI/CD - Pipeline de Automação

## 📋 Visão Geral

Este documento descreve a configuração do pipeline de CI/CD no GitLab para automatizar build, testes e validações do projeto To-Do List.

## 🔄 Estrutura do Pipeline

O pipeline está dividido em **5 estágios**:

```
┌─────────────┐
│   Install   │  → Instala dependências
└──────┬──────┘
       │
┌──────▼──────┐
│     Lint    │  → Valida código (ESLint + TypeScript)
└──────┬──────┘
       │
┌──────▼──────┐
│    Build    │  → Compila backend e frontend
└──────┬──────┘
       │
┌──────▼──────┐
│     Test    │  → Executa testes unitários
└──────┬──────┘
       │
┌──────▼──────┐
│ Performance │  → Testes de carga com K6
└─────────────┘
```

## 📦 Estágios Detalhados

### 1️⃣ Install (Instalação)

**Jobs:**
- `install:backend` - Instala dependências do servidor
- `install:frontend` - Instala dependências do web

**Características:**
- Usa `npm ci` para instalação determinística
- Cache de `node_modules` para acelerar builds
- Artefatos disponíveis por 1 hora

### 2️⃣ Lint (Análise de Código)

**Jobs:**
- `lint:backend` - Valida TypeScript do servidor
- `lint:frontend` - Executa ESLint no React

**Características:**
- Verifica erros de tipagem
- Valida padrões de código
- Falha o pipeline se houver erros

### 3️⃣ Build (Compilação)

**Jobs:**
- `build:backend` - Compila TypeScript → JavaScript
- `build:frontend` - Build de produção do React/Vite

**Características:**
- Gera artefatos de build
- Disponível por 1 semana
- Necessário para deploy

### 4️⃣ Test (Testes)

**Jobs:**
- `test:backend` - Testes unitários do servidor
- `test:frontend` - Testes do frontend

**Características:**
- Coleta cobertura de código
- Permite falha (allow_failure: true)
- Integração futura com testes unitários

### 5️⃣ Performance (Testes de Performance)

**Jobs:**
- `performance:k6` - Testes de carga com K6

**Características:**
- Inicia servidor temporário
- Executa smoke test
- Gera relatórios em JSON

## 🔧 Como Configurar no GitLab

### Passo 1: Fazer Push do Arquivo

```bash
git add .gitlab-ci.yml
git commit -m "feat: Adiciona pipeline de CI/CD com GitLab"
git push origin main
```

### Passo 2: Verificar no GitLab

1. Acesse: `https://gitlab.com/HenriqueBicudo/to-doList`
2. Navegue até: **CI/CD → Pipelines**
3. Você verá o pipeline em execução automaticamente

### Passo 3: Configurar Variáveis (Opcional)

Se precisar de variáveis de ambiente:

1. Vá em: **Settings → CI/CD → Variables**
2. Adicione variáveis necessárias:
   - `API_URL`
   - `DATABASE_URL`
   - Tokens de autenticação

### Passo 4: Configurar Runners (Se necessário)

O GitLab fornece runners compartilhados gratuitamente, mas você pode configurar runners próprios:

1. **Settings → CI/CD → Runners**
2. Siga as instruções para registrar um runner

## 📊 Artefatos Gerados

O pipeline gera os seguintes artefatos:

| Artefato | Descrição | Validade |
|----------|-----------|----------|
| `server/dist/` | Build do backend | 1 semana |
| `web/dist/` | Build do frontend | 1 semana |
| `tests/performance/*.json` | Relatórios K6 | 30 dias |

## 🎯 Triggers do Pipeline

O pipeline é executado automaticamente quando:

- ✅ Push para branch `main`
- ✅ Criação de Merge Request
- ✅ Criação de Tags
- ✅ Manualmente via interface

## 📈 Visualização de Status

### Badge de Status

Adicione ao README.md:

```markdown
[![Pipeline Status](https://gitlab.com/HenriqueBicudo/to-doList/badges/main/pipeline.svg)](https://gitlab.com/HenriqueBicudo/to-doList/-/pipelines)
```

### Coverage Badge

```markdown
[![Coverage](https://gitlab.com/HenriqueBicudo/to-doList/badges/main/coverage.svg)](https://gitlab.com/HenriqueBicudo/to-doList/-/pipelines)
```

## 🔍 Monitoramento e Logs

### Ver Logs de um Job

1. Acesse: **CI/CD → Pipelines**
2. Clique no pipeline desejado
3. Clique no job específico
4. Visualize os logs em tempo real

### Baixar Artefatos

1. Na página do pipeline
2. Clique em **Download** ao lado do job
3. Escolha os artefatos desejados

## ⚠️ Troubleshooting

### Pipeline Falha no Stage Install

**Problema:** Erro ao instalar dependências

**Solução:**
```yaml
# Limpe o cache
cache:
  key: ${CI_COMMIT_REF_SLUG}-v2  # Incremente a versão
```

### Pipeline Muito Lento

**Problema:** Pipeline demora muito

**Solução:**
- Verifique se o cache está funcionando
- Use `npm ci` ao invés de `npm install`
- Considere usar Docker layer caching

### Testes de Performance Falhando

**Problema:** K6 não consegue conectar ao servidor

**Solução:**
```yaml
before_script:
  - nohup npm start &
  - sleep 10  # Aumente o tempo de espera
  - curl http://localhost:3000/health  # Teste de health check
```

## 🚀 Melhorias Futuras

- [ ] Adicionar testes unitários reais
- [ ] Integrar com SonarCloud
- [ ] Adicionar stage de segurança (Snyk)
- [ ] Configurar deploy automático
- [ ] Adicionar testes E2E (Cypress/Playwright)
- [ ] Integração com Slack/Discord para notificações

## 📚 Recursos Adicionais

- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [GitLab CI/CD Examples](https://docs.gitlab.com/ee/ci/examples/)
- [Node.js GitLab CI](https://docs.gitlab.com/ee/ci/examples/nodejs.html)

## 🎓 Para o Trabalho Acadêmico

Este pipeline demonstra:

1. ✅ **Automação Completa** - Build e testes automatizados
2. ✅ **Qualidade de Código** - Lint e validação de tipos
3. ✅ **Testes de Performance** - Integração com K6
4. ✅ **Artefatos** - Builds prontos para deploy
5. ✅ **Monitoramento** - Logs e relatórios detalhados

## 📝 Checklist de Validação

Após configurar, verifique:

- [ ] Pipeline executou com sucesso
- [ ] Todos os jobs passaram (exceto allow_failure)
- [ ] Artefatos foram gerados
- [ ] Badges estão funcionando
- [ ] Testes de performance executaram
- [ ] Documentação está atualizada no README

---

**Autor:** Henrique Bicudo  
**Data:** 16 de outubro de 2025  
**Disciplina:** Qualidade de Software
