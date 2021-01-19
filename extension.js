const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = async (context) => {

	const oneMinute = (1000 * 60)
		//Allows user to adjust the time interval of break prompts:
			//grabs the value from the setting.json 
					//test in debugger to verify that Number(...) work to convert the time interval in the settings.json from a string to a integer 
	const timeInterval = Number(vscode.workspace.getConfiguration("be-human").get("timeInterval"))
			// changed 15 to "timeInterval"
	const timeIncrement = (oneMinute * timeInterval);
	let startTime = Date.now();
	let intervalId = null;
	// const localTime = startTime.toLocaleTimeString();

	const response = await vscode.window.showInformationMessage('Welcome to beHuman! Would you like to be reminded to take breaks today?', 'Yes', 'No');
	
	if(response === 'Yes') {
		vscode.window.showInformationMessage('Have a great day!');
		intervalId = setInterval(() => {
			const lapTime = Date.now();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes.`, 'Disable');
		}, timeIncrement)
	} else if(response === 'No'){ 
		vscode.window.showInformationMessage('Let\'s try again tomorrow!');
	}
	let disposable = vscode.commands.registerCommand('be-human.helloWorld', function () {
		vscode.window.showInformationMessage('Welcome to beHuman!');
	});

//USED FOR TESTING ONLY????
	// let trackTime = vscode.commands.registerCommand('be-human.trackTime', function () {

	// setInterval(() => {
	// 		const lapTime = new Date();
	// 		const incrementOfTime = Math.round((lapTime - startTime) / 60000);

	// 		vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes. (This pops up every three seconds...Enjoy!)`);
	// 	}, 3000)
	// })

	    // THIS IS WHERE STOP WATCH USER COMMAND FUNCTIONS BEGIN

    let resetTimer = vscode.commands.registerCommand('be-human.resetTime', function () {
		clearInterval(intervalId);

		intervalId = setInterval(() => {
			const lapTime = Date.now();
			const incrementOfTime = Math.round((lapTime - startTime) / 60000);
			vscode.window.showInformationMessage(`You have been working for ${incrementOfTime} minutes.`, 'Disable');

		}, timeIncrement)

		 return resetTimer
    });

	// let stopTimer = vscode.commands.registerCommand('be-human.startTime', function () {
	// 	startTime = new Date();
		
	// 	return stopTimer
	// });

	//  let startTimer = vscode.commands.registerCommand('be-human.startTime', function () {
	// 		startTime = new Date();

	// 		return startTimer
	// 	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(resetTimer);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
