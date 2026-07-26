# Local Git Commands Guide

This guide helps you add workflows locally via git.

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/chbusinessservices/chbusinessservices.git
cd chbusinessservices

# Create workflows directory
mkdir -p .github/workflows

# Add all 7 workflow files (see below for content)
# Then:
git add .github/workflows/
git commit -m "ci: add GitHub Actions workflows"
git push origin master
```

---

## 📋 Complete Setup Steps

### 1. Clone Repository

```bash
# HTTPS (recommended)
git clone https://github.com/chbusinessservices/chbusinessservices.git
cd chbusinessservices
```

### 2. Create Workflows Directory

```bash
mkdir -p .github/workflows
```

### 3. Create Each Workflow File

Create `.github/workflows/security-audit.yml`:

```bash
cat > .github/workflows/security-audit.yml << 'EOF'
name: 🔒 Security Audit
on:
  push:
    branches: [master, main]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
EOF
```

Repeat for each workflow file with appropriate content.

### 4. Stage Changes

```bash
git add .github/workflows/
git status  # Verify files are staged
```

### 5. Commit

```bash
git commit -m "ci: add GitHub Actions workflows for security and automation"
```

### 6. Push to GitHub

```bash
git push origin master
```

---

## 🔧 Common Commands

| Command | Purpose |
|---------|----------|
| `git clone <url>` | Copy repo locally |
| `git add <file>` | Stage file |
| `git commit -m "msg"` | Create commit |
| `git push origin master` | Upload to GitHub |
| `git status` | Check changes |
| `git log --oneline -5` | View last 5 commits |

---

## 🐛 Troubleshooting

### "Not a git repository"
```bash
cd chbusinessservices  # Navigate to cloned repo
```

### "Permission denied"
```bash
# Use HTTPS instead of SSH
git clone https://github.com/chbusinessservices/chbusinessservices.git
```

### "Nothing to commit"
```bash
git add .github/workflows/
git status  # Verify files staged
```

### "Rejected (non-fast-forward)"
```bash
git pull origin master
git push origin master
```

---

## ✅ Verify Workflows Uploaded

1. Visit: https://github.com/chbusinessservices/chbusinessservices/actions
2. You should see all 7 workflows listed
3. Click each to verify content

---

**Last Updated:** 2026-07-26
