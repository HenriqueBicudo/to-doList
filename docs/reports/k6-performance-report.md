# Relatório de Testes de Performance - K6

**Projeto:** Task Manager API  
**Data:** 16/10/2025  
**Ferramenta:** K6 v1.3.0  
**Responsável:** Henrique Bicudo

---

## 1. Objetivo

Avaliar a performance, escalabilidade e resiliência da API de gerenciamento de tarefas sob diferentes níveis de carga.

---

## 2. Ambiente de Teste

### Configuração
- **API Base URL:** http://localhost:3000
- **Endpoints testados:** 
  - GET `/tasks` (listar tarefas)
  - POST `/tasks` (criar tarefa)
  - GET `/tasks/:id` (buscar tarefa específica)
  - PUT `/tasks/:id` (atualizar tarefa)
  - DELETE `/tasks/:id` (deletar tarefa)

### Infraestrutura
- **Sistema Operacional:** Windows 11
- **Processador:** [Seu processador]
- **Memória RAM:** [Sua RAM]
- **Node.js:** v[versão]

---

## 3. Tipos de Teste Executados

### 3.1 Smoke Test
**Objetivo:** Validação básica da API com carga mínima

**Configuração:**
- Usuários virtuais: 1
- Duração: 1 minuto
- Requisições/iteração: 3

**Resultados:**
```
Total de requisições: 180
Requisições/seg: 3.0
Taxa de falha: 0%
Tempo médio de resposta: XXXms
p(95): XXXms
p(99): XXXms
```

**Status:** ✅ Aprovado / ❌ Reprovado

**Observações:**
- [Adicione observações aqui]

---

### 3.2 Load Test
**Objetivo:** Testar comportamento sob carga média

**Configuração:**
- Ramp-up: 0 → 10 usuários (30s)
- Carga média: 50 usuários (1min)
- Carga alta: 100 usuários (1min)
- Ramp-down: 100 → 0 (30s)

**Resultados:**
```
Total de requisições: XXXX
Requisições/seg: XXX
Taxa de falha: X%
Tempo médio de resposta: XXXms
p(95): XXXms
p(99): XXXms
```

**Thresholds:**
- ✅ p(95) < 500ms
- ✅ p(99) < 1000ms
- ✅ Taxa de erro < 1%

**Status:** ✅ Aprovado / ❌ Reprovado

**Observações:**
- [Adicione observações aqui]

---

### 3.3 Stress Test
**Objetivo:** Encontrar o ponto de quebra do sistema

**Configuração:**
- Escala: 100 → 200 → 300 usuários
- Duração: 20 minutos
- Objetivo: Identificar limite do sistema

**Resultados:**
```
Usuários suportados: XXX
Ponto de quebra: XXX usuários
Taxa de erro em pico: XX%
```

**Status:** ✅ Aprovado / ❌ Reprovado

**Observações:**
- [Adicione observações aqui]

---

## 4. Métricas Detalhadas

### 4.1 Tempo de Resposta (Load Test)

| Métrica | GET /tasks | POST /tasks | PUT /tasks/:id | DELETE /tasks/:id |
|---------|-----------|-------------|----------------|-------------------|
| Média | XXXms | XXXms | XXXms | XXXms |
| Mínimo | XXXms | XXXms | XXXms | XXXms |
| Máximo | XXXms | XXXms | XXXms | XXXms |
| p(50) | XXXms | XXXms | XXXms | XXXms |
| p(95) | XXXms | XXXms | XXXms | XXXms |
| p(99) | XXXms | XXXms | XXXms | XXXms |

### 4.2 Throughput

| Endpoint | Requisições/seg | Total de requisições |
|----------|----------------|----------------------|
| GET /tasks | XXX | XXXX |
| POST /tasks | XXX | XXXX |
| PUT /tasks/:id | XXX | XXXX |
| DELETE /tasks/:id | XXX | XXXX |
| **TOTAL** | **XXX** | **XXXX** |

### 4.3 Taxa de Erro

| Teste | Taxa de Erro | Status |
|-------|--------------|--------|
| Smoke Test | 0% | ✅ |
| Load Test | X% | ✅/❌ |
| Stress Test | XX% | ✅/❌ |

---

## 5. Análise de Gargalos

### Identificados:
1. **[Nome do gargalo]**
   - **Descrição:** [Descreva o problema]
   - **Impacto:** [Alto/Médio/Baixo]
   - **Solução sugerida:** [Como resolver]

2. **[Outro gargalo]**
   - **Descrição:** [Descreva o problema]
   - **Impacto:** [Alto/Médio/Baixo]
   - **Solução sugerida:** [Como resolver]

---

## 6. Comparação com Benchmarks

| Métrica | Nosso Sistema | Benchmark Aceitável | Status |
|---------|---------------|---------------------|--------|
| p(95) tempo resposta | XXXms | < 500ms | ✅/❌ |
| p(99) tempo resposta | XXXms | < 1000ms | ✅/❌ |
| Taxa de erro | X% | < 1% | ✅/❌ |
| Throughput | XXX req/s | > 100 req/s | ✅/❌ |
| Usuários simultâneos | XXX | > 50 | ✅/❌ |

---

## 7. Recomendações

### ✅ Pontos Fortes
1. [Liste pontos positivos]
2. [Outro ponto positivo]

### ⚠️ Áreas de Melhoria
1. **[Área 1]**
   - Problema: [Descreva]
   - Solução: [Sugira correção]
   - Prioridade: Alta/Média/Baixa

2. **[Área 2]**
   - Problema: [Descreva]
   - Solução: [Sugira correção]
   - Prioridade: Alta/Média/Baixa

### 🚀 Otimizações Sugeridas
1. Implementar cache para GET /tasks
2. Adicionar connection pooling no banco
3. Implementar rate limiting
4. Adicionar índices no banco de dados
5. Considerar load balancer para > 200 usuários

---

## 8. Conclusão

[Escreva uma conclusão sobre a performance da API]

**Resumo:**
- Performance geral: ✅ Satisfatória / ⚠️ Aceitável / ❌ Insatisfatória
- Escalabilidade: ✅ Boa / ⚠️ Moderada / ❌ Limitada
- Resiliência: ✅ Alta / ⚠️ Média / ❌ Baixa

**Recomendação final:**
- [ ] Aplicação pronta para produção
- [ ] Necessita otimizações antes de produção
- [ ] Requer refatoração significativa

---

## 9. Anexos

### Comandos Executados
```bash
# Smoke Test
k6 run tests/performance/smoke-test.js

# Load Test
k6 run tests/performance/load-test.js

# Stress Test
k6 run tests/performance/stress-test.js
```

### Arquivos de Saída
- `tests/performance/summary.json` - Dados brutos do teste
- Screenshots dos resultados (se aplicável)

---

**Relatório gerado em:** 16/10/2025  
**Ferramenta:** K6 v1.3.0  
**Responsável:** Henrique Bicudo
