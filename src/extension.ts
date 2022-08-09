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
		<style>
		#stack-table {
			font-family: Arial, Helvetica, sans-serif;
			border-collapse: collapse;
			width: 100%;
		  }
		  
		  #stack-table tr{
			width: 150%;
		  }
		  
		  #stack-table td{
			border: 1px solid #fff;
			padding: 8px;
			width: 500px;
			background-color: #242f38;
			height: 80px;
			text-align: center;
			vertical-align: middle;
		  }
		  .tree-node {
			border: 1px solid #fff;
			height: 200px;
			width: 200px;
			background-color: #242f38;
			border-radius: 50%;
			display: inline-block;
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

		<table id="stack-table">
		</table>
		</div>


		<h2 align = "center">Stack Visualization (Tree View)</h2>
		
		<div id="trees-container">
		</div>

		
		<sf id="sf-id" data-frames='${sfs}' ></sf>
		
			<script>

			const framesObj = document.querySelector('#sf-id');
			var jsonFrames = JSON.parse(framesObj.dataset.frames);

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
							innerTreeStructure += '<p style="color:green"> ' + '( ' + x.name + ':' + x.value + ' ) </p>';
						   }
					   }
   
					   innerTreeStructure += '</div>';
   
					   fullTreeStructure += innerTreeStructure;
				   }
   
				   treesContainer.innerHTML = fullTreeStructure;
		
			 }

			 var table =  document.getElementById("stack-table");
			 var fullText = '';
			 for (let frame of jsonFrames) 
				{
					var innerTxt = '<tr><td><b>' + frame.name.split('.').pop() + '</b> <br>';

					if(frame.variables !== undefined && frame.variables !== null)
					{
						for(let x of frame.variables)
						{
							innerTxt += '<p style="color:green"> ' + '( ' + x.name + ':' + x.value + ' ) </p> <br>';
						}
					}

					innerTxt += '</td></tr>';

					fullText += innerTxt;
				}

				table.innerHTML = fullText;

			</script>
		</body>
		</html>`;

	
	}

  }


// this method is called when your extension is deactivated
export function deactivate() {}
