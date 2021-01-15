const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = async (context) => {

	const oneMinute = (1000 * 60)
	const timeIncrement = (oneMinute * 15);

	const startTime = new Date();
	const localTime = startTime.toLocaleTimeString();

	const response = await vscode.window.showInformationMessage('Welcome to beHuman! Would you like to be reminded to take breaks today?', 'Yes', 'No');
	
	if(response === 'Yes') {
		vscode.window.showInformationMessage('Have a great day!');
		
		setInterval(() => {
			const lapTime = new Date();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			

			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes.`, 'Disable');

		}, timeIncrement)

	} else if(response === 'No'){ 
		vscode.window.showInformationMessage('Let\'s try again tomorrow!');
	}

	console.log('Congratulations, your extension "be-human" is now active!');

	let disposable = vscode.commands.registerCommand('be-human.helloWorld', function () {

		vscode.window.showInformationMessage('Welcome to beHuman!');
	});

	let trackTime = vscode.commands.registerCommand('be-human.trackTime', function () {

		setInterval(() => {
			const lapTime = new Date();

			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			

			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes. (This pops up every three seconds...Enjoy!)`);
		}, 3000)
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