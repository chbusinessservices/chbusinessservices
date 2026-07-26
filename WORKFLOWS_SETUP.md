# GitHub Actions Workflows - Complete Setup Guide

This guide provides all 7 workflow files ready for copy-paste into your GitHub repository.

---

## 📋 Quick Start

1. Go to: https://github.com/chbusinessservices/chbusinessservices/actions/new
2. Click **"set up a workflow yourself"**
3. Copy the workflow content below
4. Paste into the editor
5. Commit the file

**Repeat for each of the 7 workflows below.**

---

## 1️⃣ Security Audit Workflow

**File name:** `security-audit.yml`
**Location:** `.github/workflows/security-audit.yml`

Copy the entire YAML content below:

```yaml
name: 🔒 Security Audit

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]
  schedule:
    - cron: '0 2 * * 0'

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
      - run: |
          echo "🔍 Scanning for hardcoded secrets..."
          if grep -r "STRIPE_SECRET_KEY\|GROQ_API_KEY\|DATABASE_URL" \
            --include="*.js" --include="*.ts" --include="*.json" \
            --exclude-dir=node_modules . 2>/dev/null; then
            echo "❌ FAILED: Secrets detected!"
            exit 1
          fi
          echo "✅ PASSED: No hardcoded secrets"
```

---

## 2️⃣ Code Quality Workflow

**File name:** `code-quality.yml`
**Location:** `.github/workflows/code-quality.yml`

```yaml
name: 🧪 Code Quality

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - uses: oven-sh/setup-bun@v1
      - run: bun install --frozen-lockfile
      - run: |
          if [ -f tsconfig.json ]; then
            npx tsc --noEmit
          fi
      - run: |
          if grep -q '"build"' package.json; then
            bun run build
          fi
```

---

## 3️⃣ Dependency Check

**File name:** `dependency-check.yml`
**Location:** `.github/workflows/dependency-check.yml`

```yaml
name: 📦 Dependency Check

on:
  push:
    branches: [master, main]
    paths: ['package.json']
  schedule:
    - cron: '0 0 * * 1'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm audit --audit-level=high || true
```

---

## 4️⃣ IP Protection Check

**File name:** `ip-protection-check.yml`
**Location:** `.github/workflows/ip-protection-check.yml`

```yaml
name: 🔐 IP Protection Check

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: |
          FILES=("LICENSE" "SECURITY.md" "CONTRIBUTING.md" "LICENSING.md" ".github/CODEOWNERS" ".gitignore")
          for f in "${FILES[@]}"; do
            if [ ! -f "$f" ]; then
              echo "❌ Missing: $f"
              exit 1
            fi
          done
          echo "✅ All IP protection files present"
```

---

## 5️⃣ Release Workflow

**File name:** `release.yml`
**Location:** `.github/workflows/release.yml`

```yaml
name: 🚀 Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install --frozen-lockfile
      - run: |
          if grep -q '"build"' package.json; then
            bun run build
          fi
```

---

## 6️⃣ Stale Issues

**File name:** `stale-issues.yml`
**Location:** `.github/workflows/stale-issues.yml`

```yaml
name: 🧹 Stale Issues & PRs

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v8
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          days-before-issue-stale: 60
          days-before-issue-close: 7
          days-before-pr-stale: 30
          days-before-pr-close: 3
```

---

## 7️⃣ Repository Metrics

**File name:** `metrics.yml`
**Location:** `.github/workflows/metrics.yml`

```yaml
name: 📊 Repository Metrics

on:
  push:
    branches: [master, main]
  schedule:
    - cron: '0 1 * * 0'

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: |
          echo "📊 Repository Statistics"
          echo "Commits: $(git rev-list --all --count)"
          echo "Contributors: $(git shortlog -sn | wc -l)"
```

---

## 🎯 Setup Steps

1. Go to https://github.com/chbusinessservices/chbusinessservices/actions
2. Click **New workflow** → **set up a workflow yourself**
3. Replace `main.yml` with workflow name (e.g., `security-audit.yml`)
4. Copy-paste the YAML content above
5. Click **Commit** → **Commit directly to master**
6. Repeat for all 7 workflows

---

**Setup Time:** ~5 minutes for all workflows
**Last Updated:** 2026-07-26