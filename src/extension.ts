import * as vscode from 'vscode';



export function activate(context: vscode.ExtensionContext) {
	
	var sfsBody:any[] = [];


	let disposable = vscode.commands.registerCommand('callstackninja.visualizestack', () => {
		vscode.window.showInformationMessage('Hello World from callstackninja!');

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

				},
				onDidSendMessage: m => {
					

					if(m.type === "response" && m.command === "stackTrace")
					{
						sfsBody  = m.body.stackFrames;
					}

					if(m.type === "response" && m.command === "variables")
					{
						var variables:any[] =  m.body.variables;
						sfsBody[0]['variables']  = variables;
					}

					panel.webview.html = getWebviewContent(JSON.stringify(sfsBody));
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
			<h3>Hello From Stacktrace Ninja</h3>
			<h5>We provide easy way to visualize the call stack</h5>
			<p>Just add breakpoints in where you want to see the call stack visualization and enjoy</p>
		</body>
		</html>`;
	}else{
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
		<rect height="500" width="300" />
		</svg>
		
		<sf id="sf-id" data-frames='${sfs}' ></sf>
		
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
			frameSlot.setAttribute("width",300); 
			frameSlot.setAttribute("y",currentFrameHeight); 
			frameSlot.setAttribute("fill", frameColor);
			frameColor = frameColor === "red" ? "blue" : "red";
			frameHeight += 50;
			var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
					txt.setAttribute("y", currentFrameHeight+40);
					txt.setAttribute("x", 25);
					txt.setAttribute("height",50); 
					txt.setAttribute("width", 300);
					txt.style.fill = "white";
					txt.style.fontFamily = "Calibri";
					txt.style.fontSize = "15";
					txt.style.fontWeight = 300;
					var innerTxt = frame.name.split('.').pop();
					

				if(frame.variables !== undefined && frame.variables !== null)
				{
					for(let x of frame.variables)
					{
						innerTxt += ' ' + '[ ' + x.name + ':' + x.value + ' ]';
					}
				}

				txt.textContent  = innerTxt;
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
