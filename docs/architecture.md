# Architecture

`pict-nonlinearconfig` is a [pict-application](https://fable-retold.github.io/pict-application/) subclass that assembles a navigable single-page application out of [pict-view](https://fable-retold.github.io/pict-view/) views and a [pict-router](https://fable-retold.github.io/pict-router/) provider. This page describes how those pieces fit together, and the branching configuration model the scaffold is built to host.

## The two layers

It helps to keep two things separate:

1. **The application shell** - real, working code in this package: a layout, navigation, routing, and login/session plumbing.
2. **The configuration-workflow domain** - the *idea* the shell is themed around (parameters with nonlinear interdependencies). The workspace, about, and documentation views describe this domain, but the engine that resolves it is **not implemented here**. The [Branching configuration model](#branching-configuration-model) section below documents the model conceptually so the scaffold's intent is clear; treat it as a design target, not an API reference.

## Application shell

### Composition

The application class (`source/Pict-Application-NonlinearConfig.js`) registers everything it needs in its constructor:

- The router provider, configured from `source/providers/PictRouter-NonlinearConfig-Configuration.json`.
- Seven views: the layout shell, the top bar, the bottom bar, and four content views (workspace, login, about, documentation).

```javascript
class NonlinearConfigApplication extends libPictApplication
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);

		this.pict.addProvider('PictRouter', require('./providers/PictRouter-NonlinearConfig-Configuration.json'), libPictRouter);

		this.pict.addView('NonlinearConfig-Layout', libViewLayout.default_configuration, libViewLayout);
		this.pict.addView('NonlinearConfig-TopBar', libViewTopBar.default_configuration, libViewTopBar);
		this.pict.addView('NonlinearConfig-BottomBar', libViewBottomBar.default_configuration, libViewBottomBar);
		this.pict.addView('NonlinearConfig-MainWorkspace', libViewMainWorkspace.default_configuration, libViewMainWorkspace);
		this.pict.addView('NonlinearConfig-Login', libViewLogin.default_configuration, libViewLogin);
		this.pict.addView('NonlinearConfig-About', libViewAbout.default_configuration, libViewAbout);
		this.pict.addView('NonlinearConfig-Documentation', libViewDocumentation.default_configuration, libViewDocumentation);
	}
}
```

### Application configuration

`source/Pict-Application-NonlinearConfig-Configuration.json` sets the application up so the layout view is the main viewport and nothing auto-renders until the application drives it explicitly:

```json
{
	"Name": "Pict Nonlinear Configuration Manager",
	"Hash": "NonlinearConfig",
	"MainViewportViewIdentifier": "NonlinearConfig-Layout",
	"AutoSolveAfterInitialize": true,
	"AutoRenderMainViewportViewAfterInitialize": false,
	"AutoRenderViewsAfterInitialize": false
}
```

The two `AutoRender...: false` flags matter: the application takes manual control of render order in `onAfterInitializeAsync` so the layout shell exists in the DOM before any child view tries to render into it.

### The three-zone layout shell

The layout view (`NonlinearConfig-Layout`) owns the page structure. It renders three empty containers into the root element, then renders the child views into them:

```
#NonlinearConfig-Application-Container        (root, flex column, min-height 100vh)
├── #NonlinearConfig-TopBar-Container         (flex-shrink: 0)
├── #NonlinearConfig-Content-Container        (flex: 1  - the swappable region)
└── #NonlinearConfig-BottomBar-Container      (flex-shrink: 0)
```

The layout's `onAfterRender` is where the composition happens, and where the router is first resolved:

```javascript
onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
{
	this.pict.views['NonlinearConfig-TopBar'].render();
	this.pict.views['NonlinearConfig-BottomBar'].render();
	this.pict.views['NonlinearConfig-MainWorkspace'].render();

	this.pict.CSSMap.injectCSS();

	if (this.pict.providers.PictRouter)
	{
		this.pict.providers.PictRouter.resolve();
	}

	return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
}
```

The top bar and bottom bar are **persistent** - they render once into their containers and stay. Only the content region is swapped.

### Content views

The four content views - workspace, login, about, documentation - each render into `#NonlinearConfig-Content-Container` with `RenderMethod: "replace"`, so showing one replaces whatever was there. Each is a standard `pict-view`: CSS, templates, and renderables defined in a `_ViewConfiguration` object, with a thin class that mostly just extends `pict-view`.

The top bar is the one content-aware view with logic: its `onAfterRender` reads `AppData.NonlinearConfig.User.LoggedIn` and renders either a logged-in template (display name + logout) or a logged-out template (login link) into its user area.

## Routing

The router is registered as a Pict provider and configured declaratively. Each route maps a hash path to a template expression that calls back into the application:

```json
{
	"ProviderIdentifier": "Pict-Router",
	"AutoInitialize": true,
	"AutoInitializeOrdinal": 0,
	"Routes":
	[
		{ "path": "/Home",          "template": "{~LV:Pict.PictApplication.showView(`NonlinearConfig-MainWorkspace`)~}" },
		{ "path": "/Login",         "template": "{~LV:Pict.PictApplication.showView(`NonlinearConfig-Login`)~}" },
		{ "path": "/About",         "template": "{~LV:Pict.PictApplication.showView(`NonlinearConfig-About`)~}" },
		{ "path": "/Documentation", "template": "{~LV:Pict.PictApplication.showView(`NonlinearConfig-Documentation`)~}" }
	]
}
```

The `{~LV:...~}` template expression evaluates a live JavaScript call when the route matches. Here every route calls `PictApplication.showView('<view identifier>')`, which renders the named view into the content container and records the current route in `AppData.NonlinearConfig.CurrentRoute`. If the identifier is unknown, `showView` logs a warning and falls back to the workspace.

Navigation flows in one direction:

```
user clicks a nav link
  -> {~P~}.PictApplication.navigateTo('/About')
    -> PictRouter.navigate('/About')      (updates the hash, matches the route)
      -> route template runs {~LV:...showView('NonlinearConfig-About')~}
        -> the About view renders into #NonlinearConfig-Content-Container
```

Because the router owns the hash, deep links (opening `dist/index.html#/About` directly) work: the layout's `onAfterRender` calls `PictRouter.resolve()` after the shell is in place, and the router renders the view matching whatever hash is present.

## Startup sequence

Putting it together, here is the order of operations from page load to a rendered screen:

1. The HTML shell loads Pict and the application bundle, then calls `Pict.safeLoadPictApplication(PictNonlinearconfig, 2)` on document ready.
2. The application constructor registers the router provider and all seven views.
3. `onAfterInitializeAsync` seeds `pict.AppData.NonlinearConfig` (user state + current route) and renders the layout shell.
4. The layout's `onAfterRender` renders the top bar, bottom bar, and default workspace content, injects all view CSS into `<style id="PICT-CSS">`, then resolves the router.
5. The router renders the content view matching the current hash (the workspace is already shown as the default).

## Application state

All shell state lives at a single AppData address, seeded once during initialization:

```javascript
this.pict.AppData.NonlinearConfig =
{
	User:
	{
		LoggedIn: false,
		UserName: '',
		DisplayName: ''
	},
	CurrentRoute: 'home'
};
```

Views read and write this address rather than holding their own instance state - for example the top bar reads `AppData.NonlinearConfig.User.LoggedIn` to choose which user-area template to render. This keeps the session observable and serializable, per Pict conventions.

### Login

`attemptLogin(pUserName, pPassword)` is a **stub**. It accepts any non-empty username and password, sets the user as logged in, re-renders the top bar, and navigates to `/Home`. There is a `// TODO: Implement real authentication` marker in the source. `logout()` clears the user state, re-renders the top bar, and navigates to `/Login`. Wiring this to a real auth provider is left to the consumer.

## Branching configuration model

> The model in this section is the **design target** the scaffold is themed around. It is described in the workspace, about, and in-app documentation views, but the resolution engine is **not implemented in this package**. Use this as the conceptual map for what you would build on top of the shell - not as a record of existing APIs.

The motivating problem: in a distributed system, configuration parameters often depend on each other. A database connection-pool size depends on the number of application instances, which depends on the expected traffic profile. Flat key-value stores treat these as independent, which lets them drift out of sync.

The intended model treats configuration as a **directed acyclic graph (DAG)** rather than a flat map:

- **Parameters are nodes.** Each node has a value, a data type, optional validation constraints, and zero or more dependency edges. The in-app documentation illustrates a parameter shape like:

  ```json
  {
  	"Hash": "MaxConnections",
  	"Name": "Max Database Connections",
  	"DataType": "Number",
  	"Default": 25,
  	"Constraints": { "min": 1, "max": 500 },
  	"DependsOn": ["InstanceCount", "MemoryProfile"]
  }
  ```

- **Dependencies are edges.** A node's `DependsOn` list points at the nodes whose values feed into it.
- **Resolution is a topological walk.** When a parameter changes, the affected downstream nodes are recomputed in dependency order. The "nonlinear" and "branching" framing comes from this: one change ripples through a graph of dependents and can branch into many recomputed values, rather than updating a single key.
- **Cycles are errors.** Circular dependencies are meant to be detected and reported before any change is applied.
- **Environments layer over the graph.** Configuration profiles (development, staging, production) are intended to inherit from a base and override specific nodes.

The shipped workspace dashboard names the surfaces this model would need - Configuration Graphs, Dependency Chains, Parameter Sets, Environment Manager, Import / Export, and Validation & Audit - as cards. Today those cards are descriptive; building them out is the purpose of the scaffold.

### Where the Retold ecosystem fits

When you implement the model, the rest of the Pict ecosystem supplies the building blocks:

- [pict-section-form](https://fable-retold.github.io/pict-section-form/) for the parameter-entry and constraint-editing screens (declarative, schema-driven forms beat hand-built inputs).
- [pict-provider](https://fable-retold.github.io/pict-provider/) for a provider that holds the parameter graph in `AppData` and exposes resolution methods the views call.
- [pict-view](https://fable-retold.github.io/pict-view/) iteration (`{~TS:...~}`) for rendering parameter lists, dependency chains, and audit trails from data rather than hand-rolled HTML.

## File map

| File | Role |
| --- | --- |
| `source/Pict-Application-NonlinearConfig.js` | Application class; registers provider + views; `navigateTo` / `showView` / `attemptLogin` / `logout` |
| `source/Pict-Application-NonlinearConfig-Configuration.json` | Application configuration (main viewport, auto-render flags) |
| `source/providers/PictRouter-NonlinearConfig-Configuration.json` | Router route table |
| `source/views/PictView-NonlinearConfig-Layout.js` | Three-zone shell; composes child views; resolves the router |
| `source/views/PictView-NonlinearConfig-TopBar.js` | Persistent top bar; nav + login/logout state |
| `source/views/PictView-NonlinearConfig-BottomBar.js` | Persistent footer |
| `source/views/PictView-NonlinearConfig-MainWorkspace.js` | Workspace dashboard (feature cards) |
| `source/views/PictView-NonlinearConfig-Login.js` | Login form |
| `source/views/PictView-NonlinearConfig-About.js` | About page |
| `source/views/PictView-NonlinearConfig-Documentation.js` | In-app documentation page |
| `html/index.html` | Browser shell; bootstraps `PictNonlinearconfig` |
| `css/nonlinearconfig.css` | Base stylesheet (reset, typography, scrollbars) |
