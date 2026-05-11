$ErrorActionPreference = "Stop"

$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$envPath = Join-Path $backendPath ".env"
$port = "3001"

function Import-BackendEnv {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Missing backend/.env. Copy .env.example and fill Supabase credentials."
    }

    Get-Content -LiteralPath $Path | ForEach-Object {
        if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
        $parts = $_ -split '=', 2
        if ($parts.Count -eq 2) {
            [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), 'Process')
        }
    }

    if ($env:PORT) { $script:port = $env:PORT }
}

function New-SmokeLeadPayload {
    param(
        [string]$RunId,
        [int]$Index
    )

    return @{
        lead_code = "SMK$RunId$($Index.ToString('00'))"
        nombre = "Smoke Test Lead $Index"
        email = "smoke.test.$RunId.$Index@example.com"
        whatsapp = "34600000$($Index.ToString('000'))"
        idioma_preferido = "Espanol"
        esta_en_espana = "Si"
        situacion_actual = "Aun no lo tengo claro"
        origen_ingresos = "Espana"
        duda_principal = "Alta de autonomo"
        explicacion_caso = "Lead de laboratorio creado por smoke test Fase 2A."
        urgencia = "Solo estoy explorando"
        consentimiento_original = "Consentimiento de prueba para laboratorio."
        consentimiento_valido = $true
        email_valido = $true
        whatsapp_valido = $true
        canal_entrada = "SmokeTest"
    }
}

Import-BackendEnv -Path $envPath

"=== SMOKE TESTS FASE 2A ==="
"Backend path: $backendPath"
"Port: $port"

$nodeJob = Start-Job -ScriptBlock {
    param($Path)
    Set-Location -LiteralPath $Path
    node src/index.js
} -ArgumentList $backendPath

try {
    Start-Sleep -Seconds 4

    ""
    "--- Test 1: Health ---"
    $healthMs = Measure-Command {
        $health = Invoke-RestMethod -Uri "http://localhost:$port/api/health" -TimeoutSec 5
    }
    if ($health.status -ne "ok") {
        throw "Health returned unexpected status: $($health.status)"
    }
    "Status: PASS"
    "Response time ms: $([math]::Round($healthMs.TotalMilliseconds, 0))"
    "Service: $($health.service)"
    "Phase: $($health.phase)"

    ""
    "--- Test 2: Get Leads ---"
    $leadsMs = Measure-Command {
        $leads = Invoke-RestMethod -Uri "http://localhost:$port/api/leads" -TimeoutSec 10
    }
    if (-not $leads.success) {
        throw "Leads endpoint returned success=false"
    }

    if ($leads.count -lt 7) {
        "Current leads: $($leads.count). Creating lab-only smoke leads until count reaches 7."
        $runId = Get-Date -Format "MMddHHmmss"
        for ($i = ($leads.count + 1); $i -le 7; $i++) {
            $payload = New-SmokeLeadPayload -RunId $runId -Index $i
            try {
                Invoke-RestMethod `
                    -Uri "http://localhost:$port/api/intake/test" `
                    -Method Post `
                    -ContentType "application/json" `
                    -Body ($payload | ConvertTo-Json -Compress) `
                    -TimeoutSec 10 | Out-Null
            }
            catch {
                throw "Could not create lab smoke lead. Check Supabase RLS/policies for table leads. $($_.Exception.Message)"
            }
        }

        $leadsMs = Measure-Command {
            $leads = Invoke-RestMethod -Uri "http://localhost:$port/api/leads" -TimeoutSec 10
        }
    }

    if ($leads.count -lt 7) {
        throw "Expected 7+ test leads, got $($leads.count)"
    }
    "Status: PASS"
    "Response time ms: $([math]::Round($leadsMs.TotalMilliseconds, 0))"
    "Total leads: $($leads.count)"
    "First lead code: $($leads.data[0].lead_code)"
}
finally {
    Stop-Job $nodeJob -ErrorAction SilentlyContinue
    Remove-Job $nodeJob -ErrorAction SilentlyContinue
}

""
"=== TESTS COMPLETED ==="
