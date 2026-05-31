# Pict Nonlinear Configuration Manager

> A Pict application scaffold for multi-step, branching configuration workflows.

`pict-nonlinearconfig` is a runnable browser application built on the Pict MVC framework. It provides a navigable shell — top bar, footer, login screen, workspace dashboard, about page, and an in-app documentation page — wired together with [pict-application](https://fable-retold.github.io/pict-application/) lifecycle management and [pict-router](https://fable-retold.github.io/pict-router/) hash routing.

The application is themed around managing configuration that has *nonlinear* interdependencies: parameters whose values cascade through a graph of dependents rather than living as flat key-value pairs. The shipped views establish the navigation, theming, and structure for that workflow.

## What this package is

This module is an **application scaffold**, not a finished configuration engine:

- The routing, layout shell, top/bottom bars, and login/session plumbing are real and working.
- The configuration-graph model (parameters as graph nodes, topological dependency resolution, environment overrides) is described in the workspace, about, and documentation views as the *intended domain*, but is **not implemented** in this package. Those views render static descriptive content.
- `attemptLogin()` is a stub that accepts any non-empty credentials; there is no real authentication.

Treat it as a correctly-wired starting point for building real configuration-workflow views and providers.

## Documentation

- [Quickstart](quickstart.md) — install, build, run, and orient yourself in the views
- [Architecture](architecture.md) — the layout shell, routing, view lifecycle, and the branching configuration model the scaffold is designed to host

## Installation

```bash
npm install pict-nonlinearconfig
```

## Building

```bash
npm install
npm run build
```

This runs `npx quack build && npx quack copy`, producing `dist/pict-nonlinearconfig.min.js` and copying the HTML shell, base stylesheet, and Pict bundle into `dist/`. Open `dist/index.html` to run the application.

## Related Modules

- [pict](https://fable-retold.github.io/pict/) — the MVC framework this application is built on
- [pict-application](https://fable-retold.github.io/pict-application/) — the application lifecycle base class extended here
- [pict-view](https://fable-retold.github.io/pict-view/) — the view base class every screen extends
- [pict-router](https://fable-retold.github.io/pict-router/) — the hash router driving navigation
- [pict-section-form](https://fable-retold.github.io/pict-section-form/) — declarative, schema-driven forms for building parameter-entry screens

## License

MIT
