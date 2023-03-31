# Documentation

Minimal setup for edtr-io that enabled the frontend to consume the code and run it.

Typecheck the repo with `npm run check`.

After pushing to `main`, an action will build the repo and commit it to `dist`.

To consume this repo, add this to your `package.json`:

```
"test-edtr-io": "serlo/test-edtr-io-refactoring#dist"
```
