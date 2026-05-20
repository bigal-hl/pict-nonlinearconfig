const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-Login",

	DefaultRenderable: "NonlinearConfig-Login-Content",
	DefaultDestinationAddress: "#NonlinearConfig-Content-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-login-wrapper {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: calc(100vh - 112px);
			background: var(--theme-color-background-secondary, #f5f7fa);
		}
		.nonlinearconfig-login-card {
			background: var(--theme-color-background-panel, #fff);
			border: 1px solid var(--theme-color-border-default, #e0e0e0);
			border-radius: 8px;
			padding: 2.5em;
			width: 100%;
			max-width: 400px;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
		}
		.nonlinearconfig-login-card h2 {
			margin: 0 0 0.25em 0;
			font-size: 1.5em;
			font-weight: 600;
			color: var(--theme-color-text-primary, #2c3e50);
			text-align: center;
		}
		.nonlinearconfig-login-card p {
			margin: 0 0 1.5em 0;
			color: var(--theme-color-text-muted, #7f8c8d);
			font-size: 0.9em;
			text-align: center;
		}
		.nonlinearconfig-login-field {
			margin-bottom: 1em;
		}
		.nonlinearconfig-login-field label {
			display: block;
			margin-bottom: 0.35em;
			font-size: 0.85em;
			font-weight: 600;
			color: var(--theme-color-text-primary, #2c3e50);
		}
		.nonlinearconfig-login-field input {
			display: block;
			width: 100%;
			padding: 0.6em 0.75em;
			font-size: 1em;
			border: 1px solid var(--theme-color-border-default, #ddd);
			border-radius: 4px;
			box-sizing: border-box;
			transition: border-color 0.15s;
		}
		.nonlinearconfig-login-field input:focus {
			outline: none;
			border-color: var(--theme-color-brand-primary, #3498db);
			box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.15);
		}
		.nonlinearconfig-login-button {
			display: block;
			width: 100%;
			padding: 0.7em;
			margin-top: 1.25em;
			font-size: 1em;
			font-weight: 600;
			/* text-on-brand falls to a fixed light hex — never to background-panel,
			   which inverts contrast in dark themes (dark text on dark button). */
			color: var(--theme-color-text-on-brand, #fff);
			background-color: var(--theme-color-brand-primary, #2c3e50);
			border: none;
			border-radius: 4px;
			cursor: pointer;
			transition: background-color 0.15s;
		}
		.nonlinearconfig-login-button:hover {
			background-color: var(--theme-color-brand-primary-hover, #34495e);
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-Login-Template",
			Template: /*html*/`
<div class="nonlinearconfig-login-wrapper">
	<div class="nonlinearconfig-login-card">
		<h2>Sign In</h2>
		<p>Access the Nonlinear Configuration Manager</p>
		<div class="nonlinearconfig-login-field">
			<label for="nonlinearconfig-login-username">Username</label>
			<input type="text" id="nonlinearconfig-login-username" placeholder="Enter your username" />
		</div>
		<div class="nonlinearconfig-login-field">
			<label for="nonlinearconfig-login-password">Password</label>
			<input type="password" id="nonlinearconfig-login-password" placeholder="Enter your password" />
		</div>
		<button class="nonlinearconfig-login-button"
			onclick="{~P~}.PictApplication.attemptLogin(document.getElementById('nonlinearconfig-login-username').value, document.getElementById('nonlinearconfig-login-password').value)">
			Sign In
		</button>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-Login-Content",
			TemplateHash: "NonlinearConfig-Login-Template",
			DestinationAddress: "#NonlinearConfig-Content-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigLoginView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = NonlinearConfigLoginView;

module.exports.default_configuration = _ViewConfiguration;
