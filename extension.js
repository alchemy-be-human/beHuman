const vscode = require('vscode');
const fetch = require('superagent');
const convertTime = require('./utils/convert-time');
const URL = 'http://be-human-demo.herokuapp.com';

/**
 * @param {vscode.ExtensionContext} context
 */

const activate = async (context) => {

	const oneMinute = (1000 * 60)
	const timeInterval = Number(vscode.workspace.getConfiguration("be-human").get("timeInterval"))
	const userTimeInterval = (oneMinute * timeInterval);

	let startTime = Date.now();
	let intervalId = null;

	async function intervalIdFunction(){
		intervalId = await setInterval(async() => {
			const lapTime = Date.now();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			const convertedTime = convertTime(incrementOfTime);
			
			const randomTip = await fetch.get(`${URL}/api/v1/tips/random`);

			const userChoice = await vscode.window.showInformationMessage(`You have been working for ${convertedTime}. Quick tip: ${randomTip.body.tip} Have time for a short break?`, 'Move your body', 'Not this time');

			if (userChoice === 'Move your body') {
				const randomLink = await fetch.get(`${URL}/api/v1/links/random`)
				vscode.env.openExternal(vscode.Uri.parse(`${randomLink.body.url}`));
			}
		}, userTimeInterval)
	}

	const response = await vscode.window.showInformationMessage('Welcome to beHuman! Would you like to be reminded to take breaks today?', 'Yes', 'No');
	
	if(response === 'Yes') {
		vscode.window.showInformationMessage('Have a great day!');
		intervalId = intervalIdFunction();
	} else if(response === 'No'){ 
		vscode.window.showInformationMessage('Let\'s try again tomorrow!');
	}

    let resetTimer = vscode.commands.registerCommand('be-human.resetTime', function () {
		clearInterval(intervalId);
		startTime = Date.now();

		vscode.window.showInformationMessage('You have reset your time.');
		intervalId = intervalIdFunction();
    });

	context.subscriptions.push(resetTimer);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
