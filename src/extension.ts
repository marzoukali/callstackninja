import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {
	

	console.log('Congratulations, your extension "callstackninja" is now active!');


	let disposable = vscode.commands.registerCommand('callstackninja.visualizestack', () => {
		vscode.window.showInformationMessage('Hello World from callstackninja!');
		//vscode.commands.executeCommand('editor.action.addCommentLine');

		const panel = vscode.window.createWebviewPanel(
			'CallStackNinja',
			'Call Stack Ninja', 
			vscode.ViewColumn.One, 
			{
				enableScripts: true
			  }
		  );
		  panel.webview.html = getWebviewContent();

		vscode.debug.registerDebugAdapterTrackerFactory('*', {
			createDebugAdapterTracker(session: vscode.DebugSession) {
			  return {
				onWillReceiveMessage: m => {
					// console.log(`> ${JSON.stringify(m, undefined, 2)}`);
				},
				onDidSendMessage: m => {
					
					var eventStr = JSON.stringify(m, undefined, 2);

					//console.log(`< ${eventStr}`);

					if(m.type === "response" && m.command === "stackTrace")
					{
						panel.webview.html = getWebviewContent(eventStr);
						console.log(`< ${eventStr}`);
					}
				}
			  };
			}
		  });

	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(sfs?: any) {

	if(!sfs)
	{
		return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Call Stack Ninja</title>
  </head>
  <body>
      <h1>No Stack Trace To Draw</h1>
  </body>
  </html>`;
	}else{
		var json = JSON.parse(sfs);
		var stackFrames = json.body.stackFrames;

		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Call Stack Ninja</title>
			</head>
		<body>
			<h6>${stackFrames}</h6>
			<canvas id="stackFramesContainer" width="300" height="500" style="border:1px solid #d3d3d3;">Your browser does not support the HTML5 canvas tag.</canvas>
		</body>
		<script>
		var c = document.getElementById("stackFramesContainer");
		var ctx = c.getContext("2d");
		ctx.beginPath();
		ctx.rect(10, 190, 65, 300);
		ctx.stroke();
		for (let frame of stackFrames) {
			<h3>frame</h3>
		}  
        </script>
		</html>`;
	}

  }


// this method is called when your extension is deactivated
export function deactivate() {}
