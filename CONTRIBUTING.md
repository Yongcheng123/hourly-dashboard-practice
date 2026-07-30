# Contributing

This repository is optimized for a time-boxed workshop.

## Participant rules

- claim exactly one Mobius child issue
- branch from `integration/workshop`
- use `feat/<mobius-id>-<short-name>`
- edit only files allowed by the issue
- target the PR to `integration/workshop`
- do not merge your own PR
- never commit credentials or real production data

Run before pushing:

```bash
npm run lint
npm test
```

If the task requires a shared-file or dependency change, add a `BLOCKED`
comment to Mobius and wait for host approval.
