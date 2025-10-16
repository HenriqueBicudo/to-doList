import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Métricas customizadas
const errorRate = new Rate('errors');
const taskCreationTime = new Trend('task_creation_time');

// Configuração do teste
export const options = {
  stages: [
    { duration: '30s', target: 10 },   // Ramp-up: 0 → 10 usuários em 30s
    { duration: '1m', target: 50 },    // Carga média: 50 usuários por 1min
    { duration: '1m', target: 100 },   // Carga alta: 100 usuários por 1min
    { duration: '30s', target: 0 },    // Ramp-down: 100 → 0 em 30s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'], // 95% < 500ms, 99% < 1s
    http_req_failed: ['rate<0.01'],                  // Taxa de erro < 1%
    errors: ['rate<0.1'],                            // Taxa de erro custom < 10%
    task_creation_time: ['p(95)<300'],               // Criação de task < 300ms
  },
};

const BASE_URL = 'http://localhost:3000';

// Função principal de teste
export default function () {
  // Cenário 1: Listar todas as tarefas (operação mais comum)
  let response = http.get(`${BASE_URL}/tasks`);
  
  check(response, {
    'GET /tasks - status 200': (r) => r.status === 200,
    'GET /tasks - response é array': (r) => {
      try {
        return Array.isArray(JSON.parse(r.body));
      } catch {
        return false;
      }
    },
    'GET /tasks - tempo < 500ms': (r) => r.timings.duration < 500,
  }) || errorRate.add(1);

  sleep(1);

  // Cenário 2: Criar nova tarefa
  const newTask = {
    titulo: `Tarefa K6 ${Date.now()}`,
    feito: false
  };

  const createStart = Date.now();
  response = http.post(
    `${BASE_URL}/tasks`,
    JSON.stringify(newTask),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  
  const createDuration = Date.now() - createStart;
  taskCreationTime.add(createDuration);

  const taskId = check(response, {
    'POST /tasks - status 201 ou 200': (r) => r.status === 201 || r.status === 200,
    'POST /tasks - retorna ID': (r) => {
      try {
        const data = JSON.parse(r.body);
        return data.id !== undefined;
      } catch {
        return false;
      }
    },
  }) ? JSON.parse(response.body).id : null;

  if (!taskId) {
    errorRate.add(1);
  }

  sleep(1);

  // Cenário 3: Buscar tarefa específica
  if (taskId) {
    response = http.get(`${BASE_URL}/tasks/${taskId}`);
    
    check(response, {
      'GET /tasks/:id - status 200': (r) => r.status === 200,
      'GET /tasks/:id - retorna tarefa': (r) => {
        try {
          const data = JSON.parse(r.body);
          return data.id === taskId;
        } catch {
          return false;
        }
      },
    }) || errorRate.add(1);
  }

  sleep(1);

  // Cenário 4: Atualizar tarefa (marcar como concluída)
  if (taskId) {
    response = http.put(
      `${BASE_URL}/tasks/${taskId}`,
      JSON.stringify({ feito: true }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    check(response, {
      'PUT /tasks/:id - status 200': (r) => r.status === 200,
      'PUT /tasks/:id - tarefa atualizada': (r) => {
        try {
          const data = JSON.parse(r.body);
          return data.feito === true;
        } catch {
          return false;
        }
      },
    }) || errorRate.add(1);
  }

  sleep(1);

  // Cenário 5: Deletar tarefa
  if (taskId) {
    response = http.del(`${BASE_URL}/tasks/${taskId}`);
    
    check(response, {
      'DELETE /tasks/:id - status 200 ou 204': (r) => r.status === 200 || r.status === 204,
    }) || errorRate.add(1);
  }

  sleep(2);
}

// Relatório de resumo
export function handleSummary(data) {
  return {
    'tests/performance/summary.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: '  ', enableColors: true }),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '';
  const enableColors = options.enableColors || false;
  
  let summary = '\n';
  summary += `${indent}=====================================================\n`;
  summary += `${indent}      RELATÓRIO DE PERFORMANCE - K6\n`;
  summary += `${indent}=====================================================\n\n`;
  
  // Métricas HTTP
  summary += `${indent}📊 Métricas de Requisições HTTP:\n`;
  summary += `${indent}  Total de requisições: ${data.metrics.http_reqs.values.count}\n`;
  summary += `${indent}  Requisições/seg: ${data.metrics.http_reqs.values.rate.toFixed(2)}\n`;
  summary += `${indent}  Falhas: ${data.metrics.http_req_failed.values.rate * 100}%\n\n`;
  
  // Tempo de resposta
  summary += `${indent}⏱️  Tempo de Resposta:\n`;
  summary += `${indent}  Média: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms\n`;
  summary += `${indent}  Mínimo: ${data.metrics.http_req_duration.values.min.toFixed(2)}ms\n`;
  summary += `${indent}  Máximo: ${data.metrics.http_req_duration.values.max.toFixed(2)}ms\n`;
  summary += `${indent}  p(95): ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms\n`;
  summary += `${indent}  p(99): ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms\n\n`;
  
  // Usuários virtuais
  summary += `${indent}👥 Usuários Virtuais:\n`;
  summary += `${indent}  Máximo: ${data.metrics.vus_max.values.max}\n\n`;
  
  summary += `${indent}=====================================================\n`;
  
  return summary;
}
