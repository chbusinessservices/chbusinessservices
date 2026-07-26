# Branch Protection Rules Configuration Guide

## 🔒 Master Branch Protection Setup

This guide explains how to configure GitHub branch protection to prevent unauthorized changes to your proprietary code.

---

## Step-by-Step Configuration

### 1. Navigate to Branch Protection Settings

- Go to: **Settings > Branches > Branch protection rules**
- Click **"Add rule"**
- Enter branch name pattern: `master` (or `main` if using that)

---

### 2. Configure Pull Request Requirements

✅ **Enable these options:**

- **Require a pull request before merging**
  - Require approvals: `1`
  - Dismiss stale pull request approvals when new commits are pushed: ✅
  - Require review from Code Owners: ✅
  - Require approval of the most recent reviewable push: ✅

**Why:** Ensures all code is reviewed before reaching production

---

### 3. Configure Status Checks

✅ **Enable these options:**

- **Require status checks to pass before merging**
- **Require branches to be up to date before merging**: ✅
- **Require conversations to be resolved before merging**: ✅

**Why:** Prevents broken or outdated code from being merged

---

### 4. Configure Push Restrictions

✅ **Enable these options:**

- **Restrict who can push to matching branches**
  - Select: "Restrict to admins" or specify approved users only
  - Include administrators: ✅

**Why:** Prevents accidental direct commits; all changes must go through PRs

---

### 5. Advanced Protection

✅ **Recommended options:**

- **Allow force pushes**: ❌ Disabled
- **Allow deletions**: ❌ Disabled
- **Require signed commits**: ✅ (Optional but recommended)
- **Require linear history**: ✅ (Cleaner git history)
- **Automatically delete head branches**: ✅ (Cleanup)

**Why:** Prevents accidental branch deletion and force push overwrites

---

## Summary Table

| Setting | Value | Purpose |
|---------|-------|----------|
| **Require PRs** | Yes, 1 approval | Code review enforcement |
| **Dismiss stale approvals** | Yes | Ensures review of latest changes |
| **Require Code Owners review** | Yes | IP protection - owners approve critical changes |
| **Status checks** | Required to pass | Code quality gates |
| **Up to date branches** | Required | Prevent merge conflicts |
| **Resolve conversations** | Required | Address all feedback |
| **Restrict pushes** | Admins only | No direct commits |
| **Force pushes** | Disabled | Prevent history rewrites |
| **Deletions** | Disabled | Prevent branch removal |

---

## CODEOWNERS Configuration

The `.github/CODEOWNERS` file specifies who must review PRs for critical areas:

```
# Proprietary core - MUST be reviewed by @chbusinessservices
/src/lib/agent/ @chbusinessservices
/src/server/api/ @chbusinessservices

# Security & licensing
LICENSE @chbusinessservices
SECURITY.md @chbusinessservices
```

**Effect:** Any PR touching these files requires approval from @chbusinessservices

---

## Enforcement Examples

### ✅ This will be ALLOWED:
1. Developer creates branch from `master`
2. Makes changes in feature branch
3. Creates PR with description
4. @chbusinessservices reviews and approves
5. Status checks pass
6. PR is merged to `master`

### ❌ This will be BLOCKED:
1. Developer tries to push directly to `master` → ❌ Rejected
2. Developer merges PR without approval → ❌ Rejected
3. Developer tries to force push → ❌ Rejected
4. Developer tries to delete `master` branch → ❌ Rejected

---

## Testing Branch Protection

Once configured, test with:

```bash
# This should fail (direct push to master)
git push origin feature-branch:master

# This should succeed (PR workflow)
git push origin feature-branch
# Then create PR on GitHub
```

---

## Troubleshooting

### "I can't push directly to master"
✅ **This is correct!** Use the PR workflow instead.

### "My PR is blocked by status checks"
✅ Fix the failing tests locally, then push again.

### "I need to merge urgently"
⚠️ **Even admins cannot bypass** with `Include administrators` enabled. Use caution when enabling emergency overrides.

---

## Best Practices

1. **Never disable protections** — They exist for a reason
2. **Keep CODEOWNERS updated** — Ensure the right people review critical code
3. **Use descriptive PR titles** — Makes audit trails easier to follow
4. **Link to issues** — Reference the related GitHub issue in your PR
5. **Require signed commits** — Add extra verification for sensitive repos

---

## References

- GitHub Docs: [Protecting branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- GitHub Docs: [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners)
- GitHub Docs: [Branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

**Protected since:** 2026-07-26