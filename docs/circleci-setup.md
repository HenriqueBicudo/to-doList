# CircleCI - Integração Contínua

## 📋 Visão Geral
Pipeline de CI/CD configurado no CircleCI para automação de testes, análise de código e deploy.

## 🔗 Links
- **Dashboard CircleCI**: https://app.circleci.com/pipelines/github/HenriqueBicudo/to-doList
- **Repositório GitHub**: https://github.com/HenriqueBicudo/to-doList

## 🏗️ Estrutura do Pipeline

### Jobs Configurados

#### 1. **test-backend**
- **Imagem**: `cimg/node:20.9.0`
- **Ações**:
  - Checkout do código
  - Instalação de dependências (com cache)
  - Build do backend TypeScript
  - Execução de testes (quando implementados)
- **Artifacts**: `server/dist/`

#### 2. **test-frontend**
- **Imagem**: `cimg/node:20.9.0`
- **Ações**:
  - Checkout do código
  - Instalação de dependências (com cache)
  - Lint do código (ESLint)
  - Build do frontend React
  - Execução de testes (quando implementados)
- **Artifacts**: `web/dist/`

#### 3. **sonarcloud-analysis**
- **Orb**: `sonarsource/sonarcloud@2.0.0`
- **Ações**:
  - Análise estática de código
  - Verificação de code smells
  - Cálculo de cobertura de testes
  - Detecção de bugs e vulnerabilidades
- **Condição**: Apenas na branch `main`

#### 4. **security-scan**
- **Imagem**: `cimg/node:20.9.0`
- **Ações**:
  - `npm audit` no backend e frontend
  - Verificação de vulnerabilidades em dependências
  - Placeholder para integração Snyk
- **Condição**: Após testes passarem

#### 5. **deploy**
- **Imagem**: `cimg/node:20.9.0`
- **Ações**:
  - Verificação dos builds gerados
  - Deploy simulado (placeholder)
- **Condição**: Após todos os jobs passarem + branch `main`

## 🔄 Workflow

```
┌─────────────────┐     ┌──────────────────┐
│  test-backend   │     │  test-frontend   │
└────────┬────────┘     └────────┬─────────┘
         │                       │
         └───────┬───────────────┘
                 │
         ┌───────▼────────┐
         │ security-scan  │
         └───────┬────────┘
                 │
         ┌───────▼────────┐
         │     deploy     │
         └────────────────┘

(sonarcloud-analysis roda em paralelo)
```

## ⚙️ Configuração

### Variáveis de Ambiente (CircleCI Project Settings)

Configure as seguintes variáveis no CircleCI:

1. **SONAR_TOKEN**
   - Valor: Token gerado no SonarCloud
   - Obter em: https://sonarcloud.io/account/security

### Arquivo de Configuração

- **Localização**: `.circleci/config.yml`
- **Versão**: CircleCI 2.1
- **Orbs Utilizados**:
  - `circleci/node@5.1.0`
  - `sonarsource/sonarcloud@2.0.0`

### SonarCloud Properties

- **Arquivo**: `sonar-project.properties` (raiz do projeto)
- **ProjectKey**: `HenriqueBicudo_to-doList`
- **Organization**: `henriquebicudo`

## 🚀 Gatilhos do Pipeline

O pipeline é executado automaticamente quando:
- ✅ Push para qualquer branch
- ✅ Pull Request criado/atualizado
- ✅ Merge para `main`

**Jobs exclusivos da `main`**:
- SonarCloud Analysis
- Deploy

## 📊 Métricas do Pipeline

### Performance Esperada
- **test-backend**: ~1-2 minutos
- **test-frontend**: ~1-2 minutos
- **sonarcloud-analysis**: ~30-60 segundos
- **security-scan**: ~1 minuto
- **deploy**: ~30 segundos

**Tempo Total Estimado**: 3-5 minutos

## 🎯 Critérios de Sucesso

Para o pipeline passar, todos os jobs devem:
- ✅ Build sem erros
- ✅ Lint sem warnings críticos
- ✅ Testes passando (quando implementados)
- ✅ Sem vulnerabilidades críticas (npm audit)
- ✅ SonarCloud Quality Gate aprovado

## 🔧 Comandos Úteis

### Validar configuração localmente
```bash
# Instalar CircleCI CLI
# Windows: choco install circleci-cli

# Validar config.yml
circleci config validate
```

### Executar job localmente
```bash
circleci local execute --job test-backend
```

## 📝 Próximos Passos

1. ✅ Criar arquivo `.circleci/config.yml`
2. ✅ Configurar `sonar-project.properties`
3. ⏳ Adicionar `SONAR_TOKEN` nas variáveis de ambiente do CircleCI
4. ⏳ Fazer commit e push para testar pipeline
5. ⏳ Verificar execução no dashboard
6. ⏳ Capturar screenshots para documentação

## 🐛 Troubleshooting

### Pipeline falha no SonarCloud
- Verificar se `SONAR_TOKEN` está configurado
- Validar `sonar-project.properties` (projectKey e organization)

### Cache não está funcionando
- Limpar cache nas configurações do projeto
- Verificar chave de cache em `config.yml`

### Build lento
- Verificar se cache está habilitado
- Considerar usar Docker Layer Caching (plano pago)

## 📚 Recursos

- [Documentação CircleCI](https://circleci.com/docs/)
- [SonarCloud Orb](https://circleci.com/developer/orbs/orb/sonarsource/sonarcloud)
- [Node Orb](https://circleci.com/developer/orbs/orb/circleci/node)
