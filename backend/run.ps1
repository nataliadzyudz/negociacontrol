$ErrorActionPreference = "Stop"

$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$envPath = Join-Path $backendPath ".env"

if (-not (Test-Path -LiteralPath $envPath)) {
    throw "Missing backend/.env. Copy .env.example and fill Supabase credentials."
}

Get-Content -LiteralPath $envPath | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    $parts = $_ -split '=', 2
    if ($parts.Count -eq 2) {
        [Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), 'Process')
    }
}

Set-Location -LiteralPath $backendPath
node src/index.js
