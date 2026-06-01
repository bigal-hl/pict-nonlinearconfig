# Quickstart

This guide gets `pict-nonlinearconfig` building and running, then walks through the views so you know where to add your own configuration-workflow screens.

## Prerequisites

- Node.js 14+ and npm
- A browser (the application runs entirely client-side)

## Install and build

```bash
npm install
npm run build
```

`npm run build` runs `npx quack build && npx quack copy`. The build:

1. Browserifies `source/Pict-Application-NonlinearConfig.js` (the package `main`) into `dist/pict-nonlinearconfig.min.js`.
2. Copies the HTML shell from `html/`, the base stylesheet from `css/`, and the Pict browser bundle from `node_modules/pict/dist/` into `dist/`.

Open `dist/index.html` in a browser. You should see the workspace dashboard with the top bar and footer.

## How it bootstraps

The HTML shell (`html/index.html`) is the entry point. It loads Pict, declares the root container, loads the application bundle, and starts the app on document ready:

```html
<link href="css/nonlinearconfig.css" rel="stylesheet">
<style id="PICT-CSS"></style>

<script src="./js/pict.min.js"></script>
<script>
	Pict.safeOnDocumentReady(() => { Pict.safeLoadPictApplication(PictNonlinearconfig, 2); });
</script>

<div id="NonlinearConfig-Application-Container"></div>
<script src="./pict-nonlinearconfig.min.js"></script>
```

Two things to keep aligned if you fork this:

- **`PictNonlinearconfig`** is the standalone global, derived as the PascalCase form of the package name `pict-nonlinearconfig`. Rename the package and this changes.
- **`#NonlinearConfig-Application-Container`** is where the layout shell mounts. It is set as `MainViewportViewIdentifier`'s destination in the layout view configuration.
- **`<style id="PICT-CSS">`** is the target for the Pict CSS cascade. Each view registers its CSS, and the cascade injects it here.

## What happens on startup

1. The application constructor registers the router provider and all seven views.
2. `onAfterInitializeAsync` seeds application state at `pict.AppData.NonlinearConfig` and renders the layout shell.
3. The layout view's `onAfterRender` renders the top bar, bottom bar, and the default workspace content, injects the view CSS, then calls `PictRouter.resolve()` so the current hash URL is honored.
4. The router matches the hash (defaulting to no route, i.e. the already-rendered workspace) and renders the matching content view.

See [Architecture](architecture.md) for the full lifecycle and the role of each view.

## The views

The application is a three-zone shell with swappable content:

```
+------------------------------------------------------+
|  Top Bar  (brand, nav, login/logout)                 |
+------------------------------------------------------+
|                                                      |
|  Content area  (swapped by the router)               |
|    - Workspace  (#/Home)                             |
|    - Login      (#/Login)                            |
|    - About      (#/About)                            |
|    - Documentation (#/Documentation)                 |
|                                                      |
+------------------------------------------------------+
|  Bottom Bar  (footer links)                          |
+------------------------------------------------------+
```

| Route | View identifier | What it shows |
| --- | --- | --- |
| `#/Home` | `NonlinearConfig-MainWorkspace` | A dashboard of cards describing the configuration-workflow features the scaffold is meant to host |
| `#/Login` | `NonlinearConfig-Login` | A username/password form |
| `#/About` | `NonlinearConfig-About` | Project description and tech stack |
| `#/Documentation` | `NonlinearConfig-Documentation` | In-app documentation page |

## Navigating in code

The application exposes four methods. Reach them from a view's inline template handlers via `{~P~}.PictApplication.<method>(...)`, exactly as the top bar does:

```javascript
// Go to a route (drives the router, which renders the matching view)
this.pict.PictApplication.navigateTo('/About');

// Render a view into the content area by identifier (called by the router)
this.pict.PictApplication.showView('NonlinearConfig-MainWorkspace');

// Stub login - accepts any non-empty credentials, then navigates to /Home
this.pict.PictApplication.attemptLogin('user', 'password');

// Clear the session and navigate to /Login
this.pict.PictApplication.logout();
```

`showView` falls back to the workspace view and logs a warning if the requested identifier is not registered.

## Adding your own screen

To add a configuration-workflow screen, follow the pattern the existing content views use:

1. Create a view file under `source/views/`, e.g. `PictView-NonlinearConfig-Parameters.js`, extending `pict-view` and exporting `default_configuration`. Render into `#NonlinearConfig-Content-Container`.
2. Register it in the application constructor:

   ```javascript
   const libViewParameters = require('./views/PictView-NonlinearConfig-Parameters.js');
   // ...inside the constructor, alongside the other addView calls:
   this.pict.addView('NonlinearConfig-Parameters', libViewParameters.default_configuration, libViewParameters);
   ```

3. Add a route in `source/providers/PictRouter-NonlinearConfig-Configuration.json`:

   ```json
   {
   	"path": "/Parameters",
   	"template": "{~LV:Pict.PictApplication.showView(`NonlinearConfig-Parameters`)~}"
   }
   ```

4. Add a nav link in the top bar template:

   ```html
   <a onclick="{~P~}.PictApplication.navigateTo('/Parameters')">Parameters</a>
   ```

For data-entry screens - parameter editors, constraint forms, environment overrides - [pict-section-form](https://fable-retold.github.io/pict-section-form/) gives you declarative, schema-driven forms instead of hand-built `<input>` markup.

## Code style

When extending this module, follow the Retold conventions used throughout the source:

- Tabs for indentation, never spaces.
- Allman braces (opening brace on its own line).
- `pVariable` for parameters, `tmpVariable` for locals, `libName` for requires, `_Instance` / `_ViewConfiguration` for module-scoped singletons.
- No `addEventListener` and no `window.confirm/alert/prompt` - use inline template handlers and, where a dialog is needed, the host application's modal view.
