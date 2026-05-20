const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-Documentation",

	DefaultRenderable: "NonlinearConfig-Documentation-Content",
	DefaultDestinationAddress: "#NonlinearConfig-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-docs {
			padding: 2em;
			max-width: 800px;
			margin: 0 auto;
		}
		.nonlinearconfig-docs-header {
			text-align: center;
			padding-bottom: 1.5em;
			border-bottom: 1px solid var(--theme-color-border-light, #eee);
			margin-bottom: 2em;
		}
		.nonlinearconfig-docs-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 2em;
			font-weight: 300;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-docs-header p {
			margin: 0;
			color: var(--theme-color-text-muted, #7f8c8d);
			font-size: 1.1em;
		}
		.nonlinearconfig-docs h2 {
			margin: 1.75em 0 0.5em 0;
			font-weight: 400;
			color: var(--theme-color-text-primary, #2c3e50);
			font-size: 1.3em;
			border-bottom: 1px solid var(--theme-color-border-light, #eee);
			padding-bottom: 0.35em;
		}
		.nonlinearconfig-docs h3 {
			margin: 1.25em 0 0.35em 0;
			font-weight: 600;
			color: var(--theme-color-text-primary, #34495e);
			font-size: 1.05em;
		}
		.nonlinearconfig-docs p {
			color: var(--theme-color-text-secondary, #555);
			line-height: 1.7;
		}
		.nonlinearconfig-docs code {
			background: var(--theme-color-background-secondary, #f4f4f5);
			padding: 0.15em 0.4em;
			border-radius: 3px;
			font-size: 0.9em;
			color: var(--theme-color-status-error, #e74c3c);
		}
		.nonlinearconfig-docs pre {
			background: var(--theme-color-background-panel, #2c3e50);
			color: var(--theme-color-text-on-brand, #ecf0f1);
			padding: 1.25em;
			border-radius: 6px;
			overflow-x: auto;
			line-height: 1.5;
			font-size: 0.9em;
		}
		.nonlinearconfig-docs pre code {
			background: none;
			padding: 0;
			color: var(--theme-color-text-on-brand, #ecf0f1);
		}
		.nonlinearconfig-docs ul {
			color: var(--theme-color-text-secondary, #555);
			line-height: 1.8;
			padding-left: 1.5em;
		}
		.nonlinearconfig-docs-toc {
			background: var(--theme-color-background-secondary, #f8f9fa);
			border: 1px solid var(--theme-color-border-default, #e9ecef);
			border-radius: 6px;
			padding: 1.25em 1.5em;
			margin-bottom: 2em;
		}
		.nonlinearconfig-docs-toc h3 {
			margin: 0 0 0.5em 0;
			font-size: 0.95em;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-docs-toc ul {
			margin: 0;
			padding-left: 1.25em;
			line-height: 1.8;
		}
		.nonlinearconfig-docs-toc a {
			color: var(--theme-color-brand-primary, #3498db);
			text-decoration: none;
		}
		.nonlinearconfig-docs-toc a:hover {
			text-decoration: underline;
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-Documentation-Template",
			Template: /*html*/`
<div class="nonlinearconfig-docs">
	<div class="nonlinearconfig-docs-header">
		<h1>Documentation</h1>
		<p>Learn how to use the Nonlinear Configuration Manager</p>
	</div>

	<div class="nonlinearconfig-docs-toc">
		<h3>Contents</h3>
		<ul>
			<li><a href="#getting-started">Getting Started</a></li>
			<li><a href="#architecture">Architecture</a></li>
			<li><a href="#configuration-graphs">Configuration Graphs</a></li>
			<li><a href="#api-reference">API Reference</a></li>
		</ul>
	</div>

	<h2 id="getting-started">Getting Started</h2>
	<p>The Nonlinear Configuration Manager is built as a Pict application. It follows the standard Pict application lifecycle and uses Pict-Router for hash-based navigation between views.</p>

	<h3>Installation</h3>
	<pre><code>npm install
npm run build</code></pre>
	<p>After building, open <code>dist/index.html</code> in your browser. The application loads Pict from a bundled script and bootstraps the NonlinearConfig application on DOM ready.</p>

	<h3>Project Structure</h3>
	<pre><code>source/
  Pict-Application-NonlinearConfig.js       # Main application class
  Pict-Application-...-Configuration.json   # App configuration
  providers/
    PictRouter-...-Configuration.json       # Router route definitions
  views/
    PictView-...-Layout.js                  # Layout shell view
    PictView-...-TopBar.js                  # Top navigation bar view
    PictView-...-BottomBar.js               # Footer bar view
    PictView-...-MainWorkspace.js           # Home workspace view
    PictView-...-Login.js                   # Login form view
    PictView-...-About.js                   # About page view
    PictView-...-Documentation.js           # Documentation view</code></pre>

	<h2 id="architecture">Architecture</h2>
	<p>The application uses a layered view architecture:</p>
	<ul>
		<li><strong>Layout View</strong> renders the three-zone shell (top bar, content area, bottom bar)</li>
		<li><strong>TopBar View</strong> provides persistent navigation and user state display</li>
		<li><strong>BottomBar View</strong> provides footer links and branding</li>
		<li><strong>Content Views</strong> (MainWorkspace, Login, About, Documentation) are swapped into the content area by the router</li>
	</ul>
	<p>Pict-Router is configured as a Pict Provider. Each route maps a hash path (e.g. <code>#/About</code>) to a template expression that calls <code>showView()</code> on the application, which renders the matching view into the content container.</p>

	<h2 id="configuration-graphs">Configuration Graphs</h2>
	<p>Configuration graphs model parameters as nodes in a directed acyclic graph. Each node has a value, a type, optional validation constraints, and zero or more dependency edges. When a node's value changes, all downstream dependents are automatically recomputed.</p>

	<h3>Defining a Parameter</h3>
	<pre><code>{
  "Hash": "MaxConnections",
  "Name": "Max Database Connections",
  "DataType": "Number",
  "Default": 25,
  "Constraints": { "min": 1, "max": 500 },
  "DependsOn": ["InstanceCount", "MemoryProfile"]
}</code></pre>

	<h3>Dependency Resolution</h3>
	<p>When a parameter is updated, the system performs a topological sort of the dependency graph and recomputes all affected downstream values. Circular dependencies are detected and reported as validation errors before any changes are applied.</p>

	<h2 id="api-reference">API Reference</h2>

	<h3>Application Methods</h3>
	<ul>
		<li><code>navigateTo(route)</code> &mdash; Navigate to a hash route</li>
		<li><code>showView(viewIdentifier)</code> &mdash; Render a view into the content container</li>
		<li><code>attemptLogin(username, password)</code> &mdash; Authenticate a user</li>
		<li><code>logout()</code> &mdash; End the current session</li>
	</ul>

	<h3>Router Routes</h3>
	<ul>
		<li><code>#/Home</code> &mdash; Main workspace dashboard</li>
		<li><code>#/Login</code> &mdash; Login form</li>
		<li><code>#/About</code> &mdash; About page</li>
		<li><code>#/Documentation</code> &mdash; This documentation page</li>
	</ul>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-Documentation-Content",
			TemplateHash: "NonlinearConfig-Documentation-Template",
			DestinationAddress: "#NonlinearConfig-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigDocumentationView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = NonlinearConfigDocumentationView;

module.exports.default_configuration = _ViewConfiguration;
