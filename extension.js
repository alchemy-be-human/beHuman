const vscode = require('vscode');
const fetch = require('superagent');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = async (context) => {

	const oneMinute = (1000 * 60)

	const timeInterval = Number(vscode.workspace.getConfiguration("be-human").get("timeInterval"))

	const timeIncrement = (oneMinute * timeInterval);

	let startTime = Date.now();
	let intervalId = null;
	// const localTime = startTime.toLocaleTimeString();

	const response = await vscode.window.showInformationMessage('Welcome to beHuman! Would you like to be reminded to take breaks today?', 'Yes', 'No');
	
	if(response === 'Yes') {
		vscode.window.showInformationMessage('Have a great day!');

		intervalId = setInterval(async() => {
			const lapTime = Date.now();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			
			// CHANGE TO HEROKU
			const randomTip = await fetch.get('http://localhost:7890/api/v1/tips/random');

			// store as const and await. need to check if clicked
			const response = await vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes. Quick tip: ${randomTip.body.tip} Have time for a short break?`, 'Move your body', 'Not this time');

			if (response === 'Move your body') {
				const randomLink = await fetch.get('http://localhost:7890/api/v1/links/random')
				vscode.env.openExternal(vscode.Uri.parse(`${randomLink.body.url}`));
			}
		}, 5000)
		// timeIncrement

	} else if(response === 'No'){ 
		vscode.window.showInformationMessage('Let\'s try again tomorrow!');
	}

	let disposable = vscode.commands.registerCommand('be-human.helloWorld', function () {
		vscode.window.showInformationMessage('Welcome to beHuman!');
	});

    let resetTimer = vscode.commands.registerCommand('be-human.resetTime', function () {
		clearInterval(intervalId);

		intervalId = setInterval(() => {
			const lapTime = Date.now();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes.`, 'Disable');
		}, timeIncrement)

		 return resetTimer
    });

	context.subscriptions.push(disposable);
	context.subscriptions.push(resetTimer);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
