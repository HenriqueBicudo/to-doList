import http from 'k6/http';
import { check, sleep } from 'k6';

// Teste de Stress - Encontrar o limite do sistema
export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Subir para 100 usuários
    { duration: '5m', target: 100 },   // Manter 100 usuários
    { duration: '2m', target: 200 },   // Subir para 200 usuários
    { duration: '5m', target: 200 },   // Manter 200 usuários
    { duration: '2m', target: 300 },   // Subir para 300 usuários
    { duration: '5m', target: 300 },   // Manter 300 usuários
    { duration: '2m', target: 0 },     // Descer para 0
  ],
  thresholds: {
    http_req_duration: ['p(99)<3000'], // Mais tolerante no stress test
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  const responses = http.batch([
    ['GET', `${BASE_URL}/tasks`],
    ['GET', `${BASE_URL}/`],
  ]);
  
  check(responses[0], {
    'batch request 1 OK': (r) => r.status === 200,
  });
  
  sleep(1);
}
