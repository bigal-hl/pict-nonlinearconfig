const libPictView = require('pict-view');

const _ViewConfiguration =
{
	ViewIdentifier: "NonlinearConfig-BottomBar",

	DefaultRenderable: "NonlinearConfig-BottomBar-Content",
	DefaultDestinationAddress: "#NonlinearConfig-BottomBar-Container",

	AutoRender: false,

	CSS: /*css*/`
		.nonlinearconfig-bottombar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: var(--theme-color-background-panel, #2c3e50);
			color: var(--theme-color-text-on-brand, #7f8c8d);
			padding: 0.75em 1.5em;
			font-size: 0.8em;
			border-top: 1px solid var(--theme-color-border-default, #34495e);
		}
		.nonlinearconfig-bottombar a {
			color: var(--theme-color-text-on-brand, #95a5a6);
			text-decoration: none;
			margin-left: 1em;
			transition: color 0.15s;
		}
		.nonlinearconfig-bottombar a:hover {
			color: var(--theme-color-text-on-brand, #ecf0f1);
		}
		.nonlinearconfig-bottombar-links {
			display: flex;
			align-items: center;
			gap: 0.5em;
		}
	`,

	Templates:
	[
		{
			Hash: "NonlinearConfig-BottomBar-Template",
			Template: /*html*/`
<div class="nonlinearconfig-bottombar">
	<span>Pict Nonlinear Configuration Manager &copy; 2025</span>
	<div class="nonlinearconfig-bottombar-links">
		<a href="https://github.com/stevenvelozo/pict" target="_blank">Pict</a>
		<a href="https://github.com/stevenvelozo/fable" target="_blank">Fable</a>
		<a onclick="{~P~}.PictApplication.navigateTo('/About')">About</a>
	</div>
</div>
`
		}
	],

	Renderables:
	[
		{
			RenderableHash: "NonlinearConfig-BottomBar-Content",
			TemplateHash: "NonlinearConfig-BottomBar-Template",
			DestinationAddress: "#NonlinearConfig-BottomBar-Container",
			RenderMethod: "replace"
		}
	]
};

class NonlinearConfigBottomBarView extends libPictView
{
	constructor(pFable, pOptions, pServiceHash)
	{
		super(pFable, pOptions, pServiceHash);
	}
}

module.exports = NonlinearConfigBottomBarView;

module.exports.default_configuration = _ViewConfiguration;
