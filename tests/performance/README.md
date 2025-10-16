# 📊 Testes de Performance com K6

## 🎯 Objetivo

Avaliar a performance, escalabilidade e resiliência da API Task Manager usando K6.

## 📦 Pré-requisitos

- K6 instalado ([Download](https://k6.io/docs/get-started/installation/))
- Backend rodando em `http://localhost:3000`
- Node.js 18+

## 🚀 Como Executar

### Opção 1: Script PowerShell (Recomendado)

```powershell
# Execute o script interativo
.\run-k6-tests.ps1
```

### Opção 2: Comandos Diretos

```bash
# 1. Smoke Test (validação básica - 1 minuto)
k6 run tests/performance/smoke-test.js

# 2. Load Test (teste de carga - 3 minutos)
k6 run tests/performance/load-test.js

# 3. Stress Test (teste de estresse - 20 minutos)
k6 run tests/performance/stress-test.js
```

## 📋 Tipos de Teste

### 1. Smoke Test (`smoke-test.js`)
- **Duração:** 1 minuto
- **Usuários:** 1 VU (Virtual User)
- **Objetivo:** Validação básica, detectar erros críticos
- **Quando usar:** Sempre antes dos outros testes

### 2. Load Test (`load-test.js`)
- **Duração:** 3 minutos
- **Usuários:** 10 → 50 → 100
- **Objetivo:** Testar performance sob carga normal/média
- **Cenários:**
  - Listar tarefas
  - Criar tarefa
  - Buscar tarefa específica
  - Atualizar tarefa
  - Deletar tarefa

### 3. Stress Test (`stress-test.js`)
- **Duração:** 20 minutos
- **Usuários:** 100 → 200 → 300
- **Objetivo:** Encontrar o ponto de quebra do sistema
- **Quando usar:** Para identificar limites de capacidade

## 📊 Métricas Monitoradas

| Métrica | Descrição | Threshold |
|---------|-----------|-----------|
| `http_req_duration` | Tempo de resposta | p(95) < 500ms, p(99) < 1s |
| `http_req_failed` | Taxa de erro | < 1% |
| `http_reqs` | Throughput (req/s) | - |
| `iteration_duration` | Tempo por iteração | - |
| `vus` | Usuários virtuais ativos | - |

## 📈 Interpretando Resultados

### ✅ Teste Passou
```
✓ p(95)<500ms
✓ rate<0.01
checks_succeeded: 100%
```

### ❌ Teste Falhou
```
✗ p(95)<500ms  p(95)=850ms
✗ rate<0.01    rate=5.2%
checks_succeeded: 82%
```

## 🐛 Troubleshooting

### Erro: "Cannot connect to host"
```bash
# Verifique se o backend está rodando
curl http://localhost:3000/

# Inicie o backend
cd server
npm run start
```

### Erro: "k6 command not found"
```bash
# Windows - Reinstale via winget
winget install k6

# Ou use caminho completo
& "C:\Program Files\k6\k6.exe" run tests/performance/load-test.js
```

### Alta taxa de erro
- Verifique logs do backend
- Reduza número de VUs
- Aumente duração das fases (stages)

## 📝 Gerando Relatório

Os testes geram automaticamente:

```bash
tests/performance/summary.json  # Dados brutos
```

Para análise visual, use:
```bash
k6 run --out json=results.json tests/performance/load-test.js
```

## 🎓 Próximos Passos

1. Execute os 3 tipos de teste
2. Documente resultados em `docs/reports/k6-performance-report.md`
3. Capture screenshots dos resultados
4. Analise gargalos identificados
5. Implemente otimizações sugeridas

## 📚 Recursos

- [Documentação K6](https://k6.io/docs/)
- [Tipos de Testes](https://k6.io/docs/test-types/introduction/)
- [Métricas](https://k6.io/docs/using-k6/metrics/)
- [Thresholds](https://k6.io/docs/using-k6/thresholds/)

## 🔗 Links Úteis

- [Relatório Completo](../../docs/reports/k6-performance-report.md)
- [API Documentation](../../README.md)
