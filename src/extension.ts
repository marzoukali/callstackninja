import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let stackFrames: any[] = [];

  let disposable = vscode.commands.registerCommand(
    "callstackninja.visualizestack",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "CallStackNinja",
        "Call Stack Ninja",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,

          //Control which resources can be loaded from the user's machine
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "assets")),
          ],
        }
      );

      let introPage = loadPage(
        `${context.extensionPath}/assets/pages/intro/index.html`,
        "",
        ""
      );
      let stackVisualizationPage = loadPage(
        `${context.extensionPath}/assets/pages/visualize-stack/index.html`,
        panel.webview
          .asWebviewUri(
            vscode.Uri.file(
              path.join(
                context.extensionPath,
                "assets/pages/visualize-stack/index.js"
              )
            )
          )
          .toString(),
        panel.webview
          .asWebviewUri(
            vscode.Uri.file(
              path.join(
                context.extensionPath,
                "assets/pages/visualize-stack/index.css"
              )
            )
          )
          .toString()
      );

      panel.webview.html = introPage;

      //Debugger Event Listener
      vscode.debug.registerDebugAdapterTrackerFactory("*", {
        createDebugAdapterTracker(session: vscode.DebugSession) {
          return {
            onWillReceiveMessage: (m) => {},
            onDidSendMessage: (m) => {
              if (m.type === "response") {
                if (m.command === "stackTrace") {
                  stackFrames = m.body.stackFrames;
                }

                if (m.command === "variables") {
                  let variables: any[] = m.body.variables;
                  stackFrames[0]["variables"] = variables;
                }

                panel.webview.html = bindPage(
                  stackVisualizationPage,
                  JSON.stringify(stackFrames)
                );
              }
            },
          };
        },
      });
    }
  );

  context.subscriptions.push(disposable);
}

function loadPage(
  htmlPagePath: string,
  jsPagePath: string,
  cssPagePath: string
) {
  let fullPage = fs.readFileSync(htmlPagePath).toString();

  if (cssPagePath !== null || cssPagePath !== undefined || cssPagePath !== "") {
    fullPage = fullPage.replace("{{styleSrc}}", cssPagePath);
  }

  if (jsPagePath !== null || jsPagePath !== undefined || jsPagePath !== "") {
    fullPage = fullPage.replace("{{jsSrc}}", jsPagePath);
  }

  return fullPage;
}

function bindPage(pageContent: string, bindValue: string) {
  console.log(pageContent);
  console.log(bindValue);

  pageContent = pageContent.replace(
    /data-binds='(.*)'/,
    `data-binds='${bindValue}'`
  );

  console.log(pageContent);

  return pageContent;
}

export function deactivate() {}
