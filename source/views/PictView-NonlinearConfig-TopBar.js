const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-TopBar",

	DefaultRenderable: "NonlinearConfig-TopBar-Content",
	DefaultDestinationAddress: "#NonlinearConfig-TopBar-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-topbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: var(--theme-color-background-panel, #2c3e50);
			color: var(--theme-color-text-on-brand, #ecf0f1);
			padding: 0 1.5em;
			height: 56px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
			position: sticky;
			top: 0;
			z-index: 100;
		}
		.nonlinearconfig-topbar-brand {
			font-size: 1.25em;
			font-weight: 600;
			letter-spacing: 0.02em;
			color: var(--theme-color-text-on-brand, #ecf0f1);
			text-decoration: none;
			cursor: pointer;
		}
		.nonlinearconfig-topbar-brand:hover {
			/* text-on-brand falls to a fixed light hex — never to background-panel,
			   which inverts contrast in dark themes (dark text on dark topbar). */
			color: var(--theme-color-text-on-brand, #fff);
		}
		.nonlinearconfig-topbar-nav {
			display: flex;
			align-items: center;
			gap: 0.25em;
		}
		.nonlinearconfig-topbar-nav a {
			color: var(--theme-color-text-on-brand, #bdc3c7);
			text-decoration: none;
			padding: 0.5em 0.75em;
			border-radius: 4px;
			font-size: 0.9em;
			transition: background-color 0.15s, color 0.15s;
			cursor: pointer;
		}
		.nonlinearconfig-topbar-nav a:hover {
			background-color: var(--theme-color-background-hover, #34495e);
			/* text-on-brand falls to a fixed light hex — never to background-panel,
			   which inverts contrast in dark themes (dark text on dark hover). */
			color: var(--theme-color-text-on-brand, #fff);
		}
		.nonlinearconfig-topbar-user {
			display: flex;
			align-items: center;
			gap: 0.75em;
			font-size: 0.9em;
		}
		.nonlinearconfig-topbar-user span {
			color: var(--theme-color-text-on-brand, #95a5a6);
		}
		.nonlinearconfig-topbar-user a {
			color: var(--theme-color-status-error, #e74c3c);
			text-decoration: none;
			cursor: pointer;
			padding: 0.4em 0.6em;
			border-radius: 4px;
			transition: background-color 0.15s;
		}
		.nonlinearconfig-topbar-user a:hover {
			background-color: var(--theme-color-background-hover, #34495e);
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-TopBar-Template",
			Template: /*html*/`
<div class="nonlinearconfig-topbar">
	<a class="nonlinearconfig-topbar-brand" onclick="{~P~}.PictApplication.navigateTo('/Home')">Nonlinear Config Manager</a>
	<div class="nonlinearconfig-topbar-nav">
		<a onclick="{~P~}.PictApplication.navigateTo('/Home')">Home</a>
		<a onclick="{~P~}.PictApplication.navigateTo('/About')">About</a>
		<a onclick="{~P~}.PictApplication.navigateTo('/Documentation')">Documentation</a>
	</div>
	<div class="nonlinearconfig-topbar-user" id="NonlinearConfig-TopBar-UserArea"></div>
</div>
`
		},
		{
			Hash: "NonlinearConfig-TopBar-LoggedIn-Template",
			Template: /*html*/`<span>{~D:AppData.NonlinearConfig.User.DisplayName~}</span><a onclick="{~P~}.PictApplication.logout()">Logout</a>`
		},
		{
			Hash: "NonlinearConfig-TopBar-LoggedOut-Template",
			Template: /*html*/`<a onclick="{~P~}.PictApplication.navigateTo('/Login')">Login</a>`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-TopBar-Content",
			TemplateHash: "NonlinearConfig-TopBar-Template",
			DestinationAddress: "#NonlinearConfig-TopBar-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigTopBarView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}

	onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent)
	{
		// Conditionally render the user area based on login state
		let tmpUserData = this.pict.AppData.NonlinearConfig && this.pict.AppData.NonlinearConfig.User;
		let tmpTemplateHash = (tmpUserData && tmpUserData.LoggedIn) ? 'NonlinearConfig-TopBar-LoggedIn-Template' : 'NonlinearConfig-TopBar-LoggedOut-Template';

		let tmpUserAreaContent = this.pict.parseTemplateByHash(tmpTemplateHash, {}, null, this.pict);
		this.pict.ContentAssignment.assignContent('#NonlinearConfig-TopBar-UserArea', tmpUserAreaContent);

		return super.onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent);
	}
}

module.exports = NonlinearConfigTopBarView;

module.exports.default_configuration = _ViewConfiguration;
