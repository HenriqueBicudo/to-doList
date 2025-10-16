# K6 com Visualização Gráfica

## 🎨 Opções de Interface Gráfica

### Opção 1: K6 Cloud (Mais Fácil) ☁️

#### Passo 1: Criar conta
1. Acesse: https://app.k6.io/account/register
2. Cadastre-se (grátis até 50 testes/mês)
3. Pegue seu token em: https://app.k6.io/account/token

#### Passo 2: Fazer login via CLI
```bash
k6 login cloud --token YOUR_TOKEN
```

#### Passo 3: Executar teste com visualização
```bash
# O teste será executado localmente, mas resultados vão para cloud
k6 run --out cloud tests/performance/load-test.js
```

#### Passo 4: Ver resultados
- Dashboards em tempo real
- Gráficos interativos
- Comparação entre testes
- Relatórios profissionais

**Screenshots:** Salve prints do dashboard para o trabalho!

---

### Opção 2: HTML Report (Simples - Recomendado para trabalho acadêmico) 📄

Gera relatório HTML bonito após o teste:

#### Instalar extensão:
```bash
# Instale via npm
npm install -g k6-reporter
```

#### Executar com relatório:
```bash
# Gera JSON
k6 run --out json=results.json tests/performance/load-test.js

# Converte para HTML
k6-reporter results.json
```

Abre automaticamente um **HTML interativo** no navegador!

---

### Opção 3: Grafana + InfluxDB (Avançado) 📊

Para quem quer dashboard profissional local:

#### Docker Compose Setup:
```yaml
version: '3'
services:
  influxdb:
    image: influxdb:1.8
    ports:
      - "8086:8086"
    environment:
      - INFLUXDB_DB=k6
      - INFLUXDB_HTTP_AUTH_ENABLED=false

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    depends_on:
      - influxdb
    volumes:
      - ./grafana-dashboards:/etc/grafana/provisioning/dashboards
```

#### Executar teste:
```bash
docker-compose up -d
k6 run --out influxdb=http://localhost:8086/k6 tests/performance/load-test.js
```

#### Acessar Grafana:
```
http://localhost:3001
user: admin
pass: admin
```

---

### Opção 4: JSON + Web Dashboard (Intermediário) 🌐

Use a extensão **xk6-dashboard**:

#### Instalar:
```bash
# Windows - via Chocolatey
choco install xk6

# Buildar k6 com dashboard
xk6 build --with github.com/szkiba/xk6-dashboard@latest
```

#### Executar:
```bash
./k6 run --out dashboard tests/performance/load-test.js
```

Abre dashboard em: `http://localhost:5665`

---

## 🎯 Recomendação para o Trabalho Acadêmico:

### **Use K6 Cloud (Opção 1)** ⭐

**Motivos:**
1. ✅ **Grátis** até 50 testes/mês
2. ✅ **Sem instalação** adicional
3. ✅ **Dashboards profissionais** prontos
4. ✅ **Screenshots bonitos** para o relatório
5. ✅ **Fácil de usar**

**Passo a passo rápido:**
```bash
# 1. Cadastre-se
# https://app.k6.io/account/register

# 2. Execute teste
k6 run --out cloud tests/performance/load-test.js

# 3. Abra o link que aparecer no terminal
# Exemplo: https://app.k6.io/runs/123456

# 4. Capture screenshots dos gráficos
# 5. Adicione ao relatório
```

---

## 📸 Screenshots que você pode capturar:

Com K6 Cloud você terá acesso a:

1. **Performance Overview**
   - Gráfico de VUs ao longo do tempo
   - HTTP request duration
   - Request rate

2. **HTTP Metrics**
   - Status codes
   - Request duration percentiles
   - Throughput

3. **Checks & Thresholds**
   - Taxa de sucesso/falha
   - Thresholds passados/falhados

4. **Timeline**
   - Evolução temporal de todas métricas

5. **Comparisons**
   - Compare múltiplas execuções

---

## 🚀 Tutorial Completo K6 Cloud:

### 1. Criar conta
```
https://app.k6.io/account/register
```

### 2. Obter token
```
https://app.k6.io/account/token
```

### 3. Login
```bash
k6 login cloud
# Cole o token quando pedido
```

### 4. Executar teste
```bash
cd "C:\Users\henri\Documents\!Projetos\faculdade\Qualidade de software\2Bi-Trab1"

# Smoke test
k6 run --out cloud tests/performance/smoke-test.js

# Load test (RECOMENDADO)
k6 run --out cloud tests/performance/load-test.js
```

### 5. Ver resultados
- Link aparece no terminal
- Ou acesse: https://app.k6.io/runs
- Dashboard atualiza em tempo real!

### 6. Exportar/Compartilhar
- Botão "Share" no dashboard
- Gera link público
- Ou capture screenshots

---

## 📝 Para o Relatório:

### Adicione essas imagens do K6 Cloud:

```
docs/screenshots/k6/
├── 01-performance-overview.png
├── 02-http-metrics.png
├── 03-thresholds.png
├── 04-timeline.png
└── 05-checks-summary.png
```

### E atualize o relatório com:
- Link público do teste
- Screenshots dos dashboards
- Métricas extraídas
- Análise dos gráficos

---

## 🆚 Comparação Rápida:

| Solução | Facilidade | Visual | Custo | Recomendado |
|---------|-----------|--------|-------|-------------|
| **K6 Cloud** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Grátis* | ✅ **SIM** |
| HTML Report | ⭐⭐⭐⭐ | ⭐⭐⭐ | Grátis | ✅ |
| Grafana | ⭐⭐ | ⭐⭐⭐⭐⭐ | Grátis | ⚠️ Complexo |
| xk6-dashboard | ⭐⭐⭐ | ⭐⭐⭐⭐ | Grátis | ✅ |

*Grátis até 50 testes/mês

---

## 💡 Dica Final:

Para o trabalho, faça isso:

1. **Execute com K6 Cloud** (dashboards bonitos)
2. **Capture 5+ screenshots** diferentes
3. **Copie métricas** do dashboard
4. **Cole no relatório** markdown
5. **Adicione link público** do teste

Vai impressionar! 🎯
