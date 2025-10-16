# 🎯 Comandos e Scripts Úteis - GitLab CI

## 📤 Fazer Push e Ativar Pipeline

```bash
# Adicionar arquivo de configuração
git add .gitlab-ci.yml

# Commit
git commit -m "feat: Adiciona pipeline de CI/CD com GitLab"

# Push para o GitLab
git push origin main
```

## 🔄 Testar Pipeline Localmente

### Usando GitLab Runner Local

1. **Instalar GitLab Runner:**

```bash
# Windows (PowerShell como Administrador)
# Baixar o runner
Invoke-WebRequest -Uri "https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-windows-amd64.exe" -OutFile "C:\GitLab-Runner\gitlab-runner.exe"

# Instalar e registrar
cd C:\GitLab-Runner
.\gitlab-runner.exe install
.\gitlab-runner.exe start
```

2. **Validar o arquivo .gitlab-ci.yml:**

```bash
# Validação de sintaxe (requer curl)
curl --header "Content-Type: application/json" --data @<(cat .gitlab-ci.yml | jq -sR '{content: .}') "https://gitlab.com/api/v4/ci/lint?include_merged_yaml=true"
```

## 🐳 Testar com Docker (Alternativa)

Se você tiver Docker instalado:

```bash
# Rodar um job específico localmente
docker run --rm -v ${PWD}:/builds/project node:18 /bin/bash -c "
  cd /builds/project/server
  npm ci
  npm run build
"
```

## 📊 Monitoramento do Pipeline

### Ver status dos pipelines

```bash
# Listar últimos 10 pipelines
curl --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/pipelines?per_page=10"

# Ver status de um pipeline específico
curl --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/pipelines/<pipeline-id>"
```

### Baixar artefatos via CLI

```bash
# Baixar artefatos do último pipeline bem-sucedido
curl --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/jobs/artifacts/main/download?job=build:backend" -o backend-artifacts.zip
```

## 🔧 Comandos de Manutenção

### Limpar cache do pipeline

```bash
# Via API
curl --request DELETE --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/cache"
```

### Reexecutar pipeline falhado

```bash
# Via API
curl --request POST --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/pipelines/<pipeline-id>/retry"
```

## 🧪 Testar Jobs Individualmente

### Testar job de install:backend

```powershell
cd server
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm ci --prefer-offline
```

### Testar job de lint:backend

```powershell
cd server
npx tsc --noEmit
```

### Testar job de build:backend

```powershell
cd server
npm run build
Get-ChildItem dist
```

### Testar job de lint:frontend

```powershell
cd web
npm run lint
```

### Testar job de build:frontend

```powershell
cd web
npm run build
Get-ChildItem dist
```

### Testar job de performance

```powershell
# Iniciar servidor em background
cd server
Start-Process powershell -ArgumentList "-Command", "npm start"

# Aguardar servidor iniciar
Start-Sleep -Seconds 5

# Executar testes K6
cd ..\tests\performance
k6 run smoke-test.js

# Parar servidor depois
Stop-Process -Name "node" -Force
```

## 📋 Criar Token Pessoal

Para usar a API do GitLab:

1. Acesse: https://gitlab.com/-/profile/personal_access_tokens
2. Nome: "CI/CD Automation"
3. Scopes: `api`, `read_api`, `read_repository`
4. Clique em "Create personal access token"
5. Copie o token gerado

## 🎨 Badges para o README

### Badge de Pipeline

```markdown
[![Pipeline Status](https://gitlab.com/HenriqueBicudo/to-doList/badges/main/pipeline.svg)](https://gitlab.com/HenriqueBicudo/to-doList/-/pipelines)
```

### Badge de Coverage

```markdown
[![Coverage](https://gitlab.com/HenriqueBicudo/to-doList/badges/main/coverage.svg)](https://gitlab.com/HenriqueBicudo/to-doList/-/graphs/main/charts)
```

### Badge Personalizado

```markdown
[![GitLab](https://img.shields.io/badge/GitLab-CI%2FCD-orange?logo=gitlab)](https://gitlab.com/HenriqueBicudo/to-doList)
```

## 🔍 Debug de Pipelines

### Ver variáveis disponíveis

Adicione temporariamente ao job:

```yaml
debug:
  stage: test
  script:
    - env | sort
    - echo "Branch: $CI_COMMIT_REF_NAME"
    - echo "Pipeline ID: $CI_PIPELINE_ID"
    - echo "Job ID: $CI_JOB_ID"
```

### Ativar modo debug

```yaml
variables:
  CI_DEBUG_TRACE: "true"
```

## 📦 Backup do Pipeline

```bash
# Fazer backup da configuração
git archive --format=zip --output=gitlab-ci-backup.zip HEAD .gitlab-ci.yml

# Ou copiar manualmente
Copy-Item .gitlab-ci.yml -Destination .gitlab-ci.yml.backup
```

## 🚀 Deploy Manual (Quando Configurado)

```bash
# Acesse a interface do GitLab
# CI/CD → Pipelines → [Seu Pipeline] → [Play button] no job de deploy
```

Ou via API:

```bash
curl --request POST --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/jobs/<job-id>/play"
```

## ⏱️ Agendar Pipelines

Para executar pipelines periodicamente:

1. Acesse: **CI/CD → Schedules**
2. Clique em "New schedule"
3. Configure:
   - Description: "Testes noturnos"
   - Interval: "0 2 * * *" (todo dia às 2h)
   - Target branch: main
4. Salve

## 📈 Análise de Performance do Pipeline

```bash
# Ver duração dos jobs
curl --header "PRIVATE-TOKEN: <seu-token>" "https://gitlab.com/api/v4/projects/75384359/pipelines/<pipeline-id>/jobs" | jq '.[] | {name: .name, duration: .duration}'
```

## 🎯 Checklist Antes do Push

- [ ] Validou sintaxe do `.gitlab-ci.yml`
- [ ] Testou jobs localmente
- [ ] Verificou variáveis necessárias
- [ ] Documentou alterações
- [ ] Commitou com mensagem descritiva

---

**Dica:** Use o editor do GitLab para validar o arquivo:
- Acesse: Repository → `.gitlab-ci.yml` → Edit → CI/CD Lint

**Importante:** Substitua `<seu-token>` pelo seu token pessoal do GitLab e `<pipeline-id>` / `<job-id>` pelos valores reais.
