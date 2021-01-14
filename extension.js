
const { start } = require('repl');
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const hour = (1000 * 60 * 60);

	const startTime = new Date();
	const localTime = startTime.toLocaleTimeString();
	

	console.log('Congratulations, your extension "be-human" is now active!');

	let disposable = vscode.commands.registerCommand('be-human.helloWorld', function () {

		vscode.window.showInformationMessage('Hello World from be-human!');
	});

	let trackTime = vscode.commands.registerCommand('be-human.trackTime', function () {

		setInterval(() => {
			const lapTime = new Date();

			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			

			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes.`);
		}, hour)
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(trackTime);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
