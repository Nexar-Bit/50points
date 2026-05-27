# Deployment artifacts

This folder holds non-source deployment files.

## `legacy-static-export/`

Previously committed GitHub Pages HTML export (pages, `_next` assets, tournament routes). It is **not** used by `npm run dev` or `npm run start`.

The live app is built from `src/` via Next.js. To produce a fresh static export (optional, API routes will not run):

```bash
npm run build:static
```

Output is written to `out/`.
