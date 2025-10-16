import http from 'k6/http';
import { check, sleep } from 'k6';

// Teste de Smoke - Validação básica com carga mínima
export const options = {
  vus: 1,           // 1 usuário virtual
  duration: '1m',   // Por 1 minuto
  thresholds: {
    http_req_duration: ['p(99)<1000'], // 99% das requisições < 1s
    http_req_failed: ['rate<0.01'],     // < 1% de erros
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // Teste básico de cada endpoint
  
  // Health check
  let res = http.get(`${BASE_URL}/`);
  check(res, { 'health check OK': (r) => r.status === 200 });
  
  // GET tasks
  res = http.get(`${BASE_URL}/tasks`);
  check(res, { 'GET tasks OK': (r) => r.status === 200 });
  
  // POST task
  res = http.post(
    `${BASE_URL}/tasks`,
    JSON.stringify({ titulo: 'Smoke test', feito: false }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(res, { 'POST task OK': (r) => r.status === 200 || r.status === 201 });
  
  sleep(1);
}
