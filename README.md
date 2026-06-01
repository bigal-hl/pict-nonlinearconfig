# pict-nonlinearconfig

A Pict application scaffold for building multi-step, branching configuration workflows. It ships a runnable browser application - a layout shell with a top bar, footer, login screen, a workspace dashboard, an about page, and an in-app documentation page - wired together with [pict-application](https://fable-retold.github.io/pict-application/) lifecycle management and [pict-router](https://fable-retold.github.io/pict-router/) hash routing.

The application is themed around managing configuration that has nonlinear interdependencies: parameters whose values cascade through a graph of dependents rather than living as flat key-value pairs. The shipped views establish the navigation, theming, and structure for that workflow. The dependency-graph engine itself is a model the scaffold is built to host, not a feature implemented in this package today - see [Status](#status).

## Installation

```bash
npm install pict-nonlinearconfig
```

## What is in the box

`pict-nonlinearconfig` is a single `pict-application` subclass plus seven views and a router configuration:

| Piece | File |
| --- | --- |
| Application class | `source/Pict-Application-NonlinearConfig.js` |
| Application configuration | `source/Pict-Application-NonlinearConfig-Configuration.json` |
| Router routes | `source/providers/PictRouter-NonlinearConfig-Configuration.json` |
| Layout shell view | `source/views/PictView-NonlinearConfig-Layout.js` |
| Top bar view | `source/views/PictView-NonlinearConfig-TopBar.js` |
| Bottom bar view | `source/views/PictView-NonlinearConfig-BottomBar.js` |
| Main workspace view | `source/views/PictView-NonlinearConfig-MainWorkspace.js` |
| Login view | `source/views/PictView-NonlinearConfig-Login.js` |
| About view | `source/views/PictView-NonlinearConfig-About.js` |
| Documentation view | `source/views/PictView-NonlinearConfig-Documentation.js` |

The application's `main` entry is `source/Pict-Application-NonlinearConfig.js`, which exports the application class and its `default_configuration`.

## Running it

The package builds to a browser bundle with Quackage:

```bash
npm install
npm run build
```

`npm run build` runs `npx quack build && npx quack copy`. The build produces `dist/pict-nonlinearconfig.min.js` and copies the HTML shell (`html/index.html`), the base stylesheet (`css/nonlinearconfig.css`), and the Pict browser bundle (`node_modules/pict/dist/*`) into `dist/`. Open `dist/index.html` in a browser to run the application.

The HTML shell bootstraps the application on document ready:

```html
<script src="./js/pict.min.js"></script>
<div id="NonlinearConfig-Application-Container"></div>
<script src="./pict-nonlinearconfig.min.js"></script>
<script>
	Pict.safeOnDocumentReady(() => { Pict.safeLoadPictApplication(PictNonlinearconfig, 2); });
</script>
```

The standalone global is `PictNonlinearconfig` (PascalCase of the package name) and the root container element is `#NonlinearConfig-Application-Container`.

## Routes

The router maps four hash paths, each to a view rendered into the content area:

| Route | View | Purpose |
| --- | --- | --- |
| `#/Home` | `NonlinearConfig-MainWorkspace` | Workspace dashboard |
| `#/Login` | `NonlinearConfig-Login` | Login form |
| `#/About` | `NonlinearConfig-About` | About page |
| `#/Documentation` | `NonlinearConfig-Documentation` | In-app documentation |

## Status

This package is a **working application scaffold**, not a finished configuration engine. The workspace, about, and documentation views describe a configuration-graph model (parameters as nodes in a directed acyclic graph, topological dependency resolution, environment overrides) as the intended domain, but that engine is **not implemented in this package** - those views render static descriptive content. Likewise, `attemptLogin()` is a stub that accepts any non-empty username and password; there is no real authentication.

Use this module as a starting point: a correctly-wired Pict application with routing, a layout shell, and login/session plumbing in place, ready to have real configuration-workflow views and providers added.

## Documentation

Full documentation lives in [`docs/`](docs/README.md):

- [Quickstart](docs/quickstart.md) - build, run, and find your way around the views
- [Architecture](docs/architecture.md) - the layout shell, routing, view lifecycle, and the branching configuration model the scaffold is designed to host

## Related Modules

- [pict](https://fable-retold.github.io/pict/) - the MVC framework this application is built on
- [pict-application](https://fable-retold.github.io/pict-application/) - the application lifecycle base class extended here
- [pict-view](https://fable-retold.github.io/pict-view/) - the view base class every screen extends
- [pict-router](https://fable-retold.github.io/pict-router/) - the hash router driving navigation
- [pict-provider](https://fable-retold.github.io/pict-provider/) - the provider base class (the router is registered as a provider)
- [pict-section-form](https://fable-retold.github.io/pict-section-form/) - declarative, schema-driven forms; a natural fit for building the parameter-entry screens this scaffold is meant to host

## License

MIT
