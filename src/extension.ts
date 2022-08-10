import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	var stackFrameArray:any[] = [];

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
					if(m.type === "response")
					{
						if(m.command === "stackTrace"){
							stackFrameArray  = m.body.stackFrames;
							//console.log(JSON.stringify(m));
						}

						if(m.command === "variables")
						{
							var variables:any[] =  m.body.variables;
							stackFrameArray[0]['variables']  = variables;
							//console.log(JSON.stringify(m));
						}
					}
					panel.webview.html = getWebviewContent(JSON.stringify(stackFrameArray));
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
			<title>Call Stack Ninja</title>
		</head>
		<body>
			<h3>Hello From Call Stack Ninja!</h3>
			<h5>We make call stack easy to visualize</h5>
			<p>You only need to add breakpoints to see the call stack visualization</p>
		</body>
		</html>`;
	}else{
		return `<!DOCTYPE html>
		<html lang="en">
		<head>
		<style>
		
		html, body{
			padding:0;
			margin: 0;
			box-sizing: border-box;
			font-family: monospace;
		  }
		#container{
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			background-color: #333;
			width: 50%;
			height: 90vh;
			margin: 2.5% auto;
		  }
		
		.block-attrib{
		  width: 100%;
		  text-align: center;
		  border-bottom: 1px dashed black;
		  font-size: 1.2em;
		  color: #004AB5;
		}
		
		#stack{
		  border-top: 10px solid #2F4858;
		  border-right: 10px solid #2F4858;
		  border-left: 10px solid #2F4858;
		  transform:scaleY(-1);
		  overflow-x: auto; 
		  overflow-y: none;
		  height: 400px;
		  width: 70%;
		  margin: auto;
		}

		.title{
			color: rgb(231, 100, 52);
			border-bottom: 1px solid red;
			font-size: 1.5em;
			text-align: center;
			padding: 2%;
		}

		.block{
		  background-color: #00C896;
		  width: 90%;
		  min-height: 15%;
		  margin: 1% auto;
		  display: flex;
		  justify-content: center;
		  flex-direction: column;
		  align-items: center;	
		  transform: scaleY(-1);
		}
		  .center{
			text-align: center;
		  }
		  ::-webkit-scrollbar{
			width: 6px;
		  }
		  
		  ::-webkit-scrollbar-thumb{
			border-radius: 10px;
			background-color: #eee;
			height: 5px;
		  }
		  
		  ::-webkit-scrollbar-thumb:window-inactive{
			background: rgba(100,100,100,0.4);
		  }
		  
		  .block-attrib:hover{
			background-color: #06ebb2;
			cursor: pointer;
		  }

		  .tree-node {
			border: 1px solid #fff;
			height: 200px;
			width: 200px;
			background-color: #242f38;
			border-radius: 50%;
			margin-bottom: 200px;
			text-align: center;
			vertical-align: middle;
		  }
		</style>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Stack Frame Visualization</title>
		</head>
		<body>
		
		<h2 align = "center">Stack Visualization (Stack View)</h2>
		<div id="stack-container">
			<div id="stack"></div>
		</div>

	
		<h2 align = "center">Stack Visualization (Tree View)</h2>
		<div id="trees-container">
		</div>

		<sf id="sf-id" data-frames='${sfs}' ></sf>
		
		<script>
			const framesObj = document.querySelector('#sf-id');
			var jsonFrames = JSON.parse(framesObj.dataset.frames);
			
			var stack =  document.getElementById("stack");
			for (let frame of jsonFrames) 
			{
				var fullText = '<div class="block">';
				var innerTxt = '<h1 class="title">' + frame.name.split('.').pop() + '</h1>';
				
				if(frame.variables !== undefined && frame.variables !== null)
				{
					for(let x of frame.variables)
					{
						innerTxt += '<h2 class="block-attrib"> ' + x.name + ':' + x.value + '</h2>';
					}
				}
				fullText += innerTxt;
				fullText += "</div>"
				stack.innerHTML = fullText + stack.innerHTML;
				stack.scrollTop = stack.scrollHeight;
			}
			console.log(fullText);
			
			/*
			var treesContainer = document.getElementById("trees-container"); 
			for (let frame of jsonFrames) {
				var fullTreeStructure = '';
				for (let frame of jsonFrames) 
				{
					var innerTreeStructure = '<div class="tree-node"><b>' + frame.name.split('.').pop() + '</b> <br>';

					if(frame.variables !== undefined && frame.variables !== null)
					{
						for(let x of frame.variables)
						{
							innerTreeStructure += '<p style="color:green"> ' + '( ' + x.name + ':' + x.value + ' )+ '</p>';
						}
					}

					innerTreeStructure += '</div>';

					fullTreeStructure += innerTreeStructure;
				}

				treesContainer.innerHTML = fullTreeStructure;
		
			}
			*/
		</script>
		</body>
		</html>`;

	
	}

  }


// this method is called when your extension is deactivated
export function deactivate() {}