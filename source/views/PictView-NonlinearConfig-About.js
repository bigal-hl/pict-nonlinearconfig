const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-About",

	DefaultRenderable: "NonlinearConfig-About-Content",
	DefaultDestinationAddress: "#NonlinearConfig-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-about {
			padding: 2em;
			max-width: 800px;
			margin: 0 auto;
		}
		.nonlinearconfig-about-header {
			text-align: center;
			padding-bottom: 1.5em;
			border-bottom: 1px solid var(--theme-color-border-light, #eee);
			margin-bottom: 2em;
		}
		.nonlinearconfig-about-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 2em;
			font-weight: 300;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-about-header p {
			margin: 0;
			color: var(--theme-color-text-muted, #7f8c8d);
			font-size: 1.1em;
		}
		.nonlinearconfig-about h2 {
			margin: 1.5em 0 0.5em 0;
			font-weight: 400;
			color: var(--theme-color-text-primary, #2c3e50);
			font-size: 1.3em;
		}
		.nonlinearconfig-about p {
			color: var(--theme-color-text-secondary, #555);
			line-height: 1.7;
		}
		.nonlinearconfig-about-tech {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
			gap: 1em;
			margin-top: 1em;
		}
		.nonlinearconfig-about-tech-item {
			background: var(--theme-color-background-secondary, #f8f9fa);
			border: 1px solid var(--theme-color-border-default, #e9ecef);
			border-radius: 4px;
			padding: 1em;
			text-align: center;
		}
		.nonlinearconfig-about-tech-item strong {
			display: block;
			margin-bottom: 0.25em;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-about-tech-item span {
			font-size: 0.85em;
			color: var(--theme-color-text-secondary, #666);
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-About-Template",
			Template: /*html*/`
<div class="nonlinearconfig-about">
	<div class="nonlinearconfig-about-header">
		<h1>About Nonlinear Config Manager</h1>
		<p>A tool for managing complex configuration interdependencies</p>
	</div>

	<h2>What It Does</h2>
	<p>The Nonlinear Configuration Manager provides a visual and programmable interface for managing configuration parameters that have complex, nonlinear interdependencies. Unlike flat key-value configuration stores, this tool understands that changing one configuration parameter may cascade through a graph of dependencies, affecting computed values, validation constraints, and downstream systems.</p>

	<h2>Why It Exists</h2>
	<p>Modern distributed systems often have configuration parameters that depend on each other in subtle ways. A database connection pool size might depend on the number of application instances, which itself depends on the expected traffic profile. Traditional configuration management tools treat these as independent values, leading to inconsistent configurations and hard-to-diagnose failures.</p>

	<h2>Built With</h2>
	<div class="nonlinearconfig-about-tech">
		<div class="nonlinearconfig-about-tech-item">
			<strong>Pict</strong>
			<span>Application Framework</span>
		</div>
		<div class="nonlinearconfig-about-tech-item">
			<strong>Pict-View</strong>
			<span>View Lifecycle</span>
		</div>
		<div class="nonlinearconfig-about-tech-item">
			<strong>Pict-Router</strong>
			<span>Hash Routing</span>
		</div>
		<div class="nonlinearconfig-about-tech-item">
			<strong>Fable</strong>
			<span>Service Architecture</span>
		</div>
	</div>

	<h2>License</h2>
	<p>This project is released under the MIT License. It is part of the Retold ecosystem of tools for building complex data-driven applications.</p>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-About-Content",
			TemplateHash: "NonlinearConfig-About-Template",
			DestinationAddress: "#NonlinearConfig-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigAboutView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = NonlinearConfigAboutView;

module.exports.default_configuration = _ViewConfiguration;
