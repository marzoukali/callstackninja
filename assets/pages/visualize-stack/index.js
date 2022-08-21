/*window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    console.log(message);
});
*/

const framesObj = document.querySelector('#sf-id');
var jsonFrames = JSON.parse(framesObj.dataset.binds);

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
    fullText += "</div>";
    stack.innerHTML = fullText + stack.innerHTML;
    stack.scrollTop = stack.scrollHeight;
}

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
}*/