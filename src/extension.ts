import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
export function activate(context: vscode.ExtensionContext) {
	var stackFrameArray:any[] = [];

	let disposable = vscode.commands.registerCommand('callstackninja.visualizestack', () => {
		vscode.window.showInformationMessage('Hello World from callstackninja!');

		const panel = vscode.window.createWebviewPanel(
			'CallStackNinja',
			'Call Stack Ninja', 
			vscode.ViewColumn.Two, 
			{
				enableScripts: true,

				//Control which resources can be loaded from the user's machine
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'media'))]
			}
		  );

		var extensionPath = context.extensionPath;
		panel.webview.html = getWebviewContent(extensionPath, null);

		//const pathToCSS = vscode.Uri.file(path.join(context.extensionPath, 'media/visual.css'));
		//console.log(String(panel.webview.asWebviewUri(pathToCSS)));
		
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
					panel.webview.html = getWebviewContent(extensionPath, JSON.stringify(stackFrameArray));
				}
			  };
			}
		  });

	});

	context.subscriptions.push(disposable);
}


function getWebviewContent(extensionPath:string, sfs?: any) {
	if(!sfs)
	{
		return fs.readFileSync(extensionPath + "/media/index.html").toString();
	}
	else{
		//very inefficient 
		//changing what is between "" for the  data-frames inside html somehow will be faster
		var visualizeHtmlString = fs.readFileSync(extensionPath + "/media/visual.html").toString();
		visualizeHtmlString = visualizeHtmlString.replace("{sfs}",sfs.toString());
		return visualizeHtmlString;
	}
  }


// this method is called when your extension is deactivated
export function deactivate() {}