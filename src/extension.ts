import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {
	

	console.log('Congratulations, your extension "callstackninja" is now active!');


	let disposable = vscode.commands.registerCommand('callstackninja.visualizestack', () => {
		vscode.window.showInformationMessage('Hello World from callstackninja!');
		//vscode.commands.executeCommand('editor.action.addCommentLine');

		const panel = vscode.window.createWebviewPanel(
			'CallStackNinja',
			'Call Stack Ninja', 
			vscode.ViewColumn.Two, 
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

					console.log(`${eventStr}`);

					if(m.type === "response" && m.command === "stackTrace")
					{
						panel.webview.html = getWebviewContent(eventStr);
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
		return  `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
			<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
			<h1 id="lines-of-code-counter">0</h1>
		
			<script>
				const counter = document.getElementById('lines-of-code-counter');
		
				let count = 0;
				setInterval(() => {
					counter.textContent = count++;
				}, 100);
			</script>
		</body>
		</html>`;
	}else{
		var json = JSON.parse(sfs);
		var stackFrames = JSON.stringify(json.body.stackFrames);

		return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
		</head>
		<body>
		<h2 align = "center">Stack Visualization</h2>
		<svg  id = "stackFramesSvg" height = "500" xmlns = "http://www.w3.org/2000/svg">
		<rect height="500" width="200" />
		</svg>
		
		<sf id="sf-id" data-frames='${stackFrames}' ></sf>
		
			<script>

			var svg = document.getElementById("stackFramesSvg"); 

			var maxHeight = 500;
			var frameHeight =50;
			var frameColor = "red";

			const framesObj = document.querySelector('#sf-id');

			console.log(framesObj.dataset.frames);

			var jsonFrames = JSON.parse(framesObj.dataset.frames).reverse();

			 for (let frame of jsonFrames) {
			 
			 var currentFrameHeight = maxHeight - frameHeight;
			 
			 var frameSlot = document.createElementNS("http://www.w3.org/2000/svg", "rect"); 
			frameSlot.setAttribute("height",50); 
			frameSlot.setAttribute("width",200); 
			frameSlot.setAttribute("y",currentFrameHeight); 
			frameSlot.setAttribute("fill", frameColor);
			frameColor = frameColor === "red" ? "blue" : "red";
			frameHeight += 50;
				var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
					txt.setAttribute("y", currentFrameHeight+40);
					txt.setAttribute("x", 25);
					txt.setAttribute("height",50); 
					txt.setAttribute("width", 150);
					txt.style.fill = "white";
					txt.style.fontFamily = "Calibri";
					txt.style.fontSize = "15";
					txt.style.fontWeight = 300;
					txt.textContent  = frame.name.split('.').pop();
					var group = document.createElementNS("http://www.w3.org/2000/svg", "g");
					group.appendChild(frameSlot);
					group.append(txt);
					svg.appendChild(group);
			 }
		
			</script>
		</body>
		</html>`;

	
	}

  }


// this method is called when your extension is deactivated
export function deactivate() {}
