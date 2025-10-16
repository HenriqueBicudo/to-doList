# Script para executar testes de performance com K6
# Certifique-se de que o backend está rodando antes de executar

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  K6 Performance Testing" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o servidor está rodando
Write-Host "Verificando se o servidor está rodando..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/" -Method GET -TimeoutSec 2 -ErrorAction Stop
    Write-Host "✓ Servidor está rodando!" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ ERRO: Servidor não está rodando!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Inicie o servidor primeiro:" -ForegroundColor Yellow
    Write-Host "  cd server" -ForegroundColor White
    Write-Host "  npm run start" -ForegroundColor White
    Write-Host ""
    exit 1
}

# Menu de opções
Write-Host "Escolha o tipo de teste:" -ForegroundColor Cyan
Write-Host "  1. Smoke Test (validação básica - 1 minuto)" -ForegroundColor White
Write-Host "  2. Load Test (teste de carga - 3 minutos)" -ForegroundColor White
Write-Host "  3. Stress Test (teste de estresse - 20 minutos)" -ForegroundColor White
Write-Host ""
Write-Host "Enviar resultados para K6 Cloud?" -ForegroundColor Cyan
Write-Host "  S. Sim (dashboards gráficos no navegador)" -ForegroundColor White
Write-Host "  N. Não (apenas terminal)" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Digite o número (1-3)"
$useCloud = Read-Host "Usar K6 Cloud? (S/N)"

$cloudOutput = ""
if ($useCloud -eq "S" -or $useCloud -eq "s") {
    $cloudOutput = "--out cloud"
    Write-Host ""
    Write-Host "💡 Dica: Acesse https://app.k6.io/runs para ver os dashboards!" -ForegroundColor Yellow
    Write-Host ""
}

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "Executando Smoke Test..." -ForegroundColor Green
        if ($cloudOutput) {
            & "C:\Program Files\k6\k6.exe" run $cloudOutput tests/performance/smoke-test.js
        } else {
            & "C:\Program Files\k6\k6.exe" run tests/performance/smoke-test.js
        }
    }
    "2" {
        Write-Host ""
        Write-Host "Executando Load Test..." -ForegroundColor Green
        if ($cloudOutput) {
            & "C:\Program Files\k6\k6.exe" run $cloudOutput tests/performance/load-test.js
        } else {
            & "C:\Program Files\k6\k6.exe" run tests/performance/load-test.js
        }
    }
    "3" {
        Write-Host ""
        Write-Host "Executando Stress Test..." -ForegroundColor Green
        if ($cloudOutput) {
            & "C:\Program Files\k6\k6.exe" run $cloudOutput tests/performance/stress-test.js
        } else {
            & "C:\Program Files\k6\k6.exe" run tests/performance/stress-test.js
        }
    }
    default {
        Write-Host "Opção inválida!" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Teste concluído!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
