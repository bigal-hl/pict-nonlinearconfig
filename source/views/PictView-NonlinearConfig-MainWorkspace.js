const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-MainWorkspace",

	DefaultRenderable: "NonlinearConfig-MainWorkspace-Content",
	DefaultDestinationAddress: "#NonlinearConfig-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-workspace {
			padding: 2em;
			max-width: 1200px;
			margin: 0 auto;
		}
		.nonlinearconfig-workspace-header {
			margin: 0 0 1.5em 0;
			padding-bottom: 1em;
			border-bottom: 1px solid var(--theme-color-border-light, #eee);
		}
		.nonlinearconfig-workspace-header h1 {
			margin: 0 0 0.25em 0;
			font-size: 2em;
			font-weight: 300;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-workspace-header p {
			margin: 0;
			color: var(--theme-color-text-muted, #7f8c8d);
			font-size: 1.1em;
		}
		.nonlinearconfig-workspace-cards {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: 1.5em;
			margin-top: 1.5em;
		}
		.nonlinearconfig-card {
			background: var(--theme-color-background-panel, #fff);
			border: 1px solid var(--theme-color-border-default, #e0e0e0);
			border-radius: 6px;
			padding: 1.5em;
			transition: box-shadow 0.2s, border-color 0.2s;
		}
		.nonlinearconfig-card:hover {
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
			border-color: var(--theme-color-border-default, #bdc3c7);
		}
		.nonlinearconfig-card h3 {
			margin: 0 0 0.5em 0;
			font-size: 1.15em;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-card p {
			margin: 0;
			color: var(--theme-color-text-secondary, #666);
			font-size: 0.9em;
			line-height: 1.5;
		}
		.nonlinearconfig-card-icon {
			font-size: 1.75em;
			margin-bottom: 0.5em;
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-MainWorkspace-Template",
			Template: /*html*/`
<div class="nonlinearconfig-workspace">
	<div class="nonlinearconfig-workspace-header">
		<h1>Configuration Workspace</h1>
		<p>Manage your nonlinear configuration graphs, parameters, and dependency chains.</p>
	</div>
	<div class="nonlinearconfig-workspace-cards">
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128202;</div>
			<h3>Configuration Graphs</h3>
			<p>Create and manage directed acyclic graphs of configuration values with complex interdependencies and cascading defaults.</p>
		</div>
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128279;</div>
			<h3>Dependency Chains</h3>
			<p>Define dependency relationships between configuration parameters to ensure consistent and valid system state across environments.</p>
		</div>
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128268;</div>
			<h3>Parameter Sets</h3>
			<p>Organize parameters into logical groups with validation rules, type constraints, and environment-specific overrides.</p>
		</div>
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128736;</div>
			<h3>Environment Manager</h3>
			<p>Manage configuration profiles across development, staging, and production environments with inheritance and override support.</p>
		</div>
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128196;</div>
			<h3>Import / Export</h3>
			<p>Import configuration data from JSON, YAML, or external systems. Export resolved configurations for deployment or auditing.</p>
		</div>
		<div class="nonlinearconfig-card">
			<div class="nonlinearconfig-card-icon">&#128269;</div>
			<h3>Validation &amp; Audit</h3>
			<p>Validate configuration integrity with constraint checking and review the full audit trail of configuration changes over time.</p>
		</div>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-MainWorkspace-Content",
			TemplateHash: "NonlinearConfig-MainWorkspace-Template",
			DestinationAddress: "#NonlinearConfig-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigMainWorkspaceView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = NonlinearConfigMainWorkspaceView;

module.exports.default_configuration = _ViewConfiguration;
