# Contributing

This repository is optimized for a time-boxed workshop.

## Participant rules

- claim exactly one Mobius child issue
- branch from `integration/workshop`
- use `feat/<mobius-id>-<short-name>`
- edit only files allowed by the issue
- generate a `.patch` relative to the recorded base commit
- upload the patch to the claimed Mobius issue
- do not push or open a participant PR
- never commit credentials or real production data

Run before generating the patch:

```bash
npm run lint
npm test
```

The READY comment must include the base commit SHA, changed files, test results,
risks, and the patch attachment link. If the task requires a shared-file or
dependency change, add a `BLOCKED` comment to Mobius and wait for host approval.
