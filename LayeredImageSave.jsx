// Save each layer in a document as a png file, keeping the layer name as file name

main(); 
function main(){ 
	var doc = app.activeDocument;

	var history = doc.activeHistoryState;
	
	doc.changeMode(ChangeMode.RGB);

	//var Name = doc.name.replace(/\.[^\.]+$/, ''); 
	var Ext = decodeURI(doc.name).replace(/^.*\./,''); 
	if(Ext.toLowerCase() != 'psd') return; 
	
	HideAllLayers(doc);

	var history2 = doc.activeHistoryState;

	for(var i = 0 ; i < doc.layers.length;i++){
		doc.layers[i].visible = true;
		var Name = doc.layers[i].name;
		var Path = doc.path; 

		var saveFile = File(Path + "/" + Name +".png"); 
		if(saveFile.exists) saveFile.remove(); 
		SavePNG(saveFile);

		doc.activeHistoryState = history2;
		doc.layers[i].visible = false;
	}

	doc.activeHistoryState = history;
	app.purge (PurgeTarget.HISTORYCACHES);
	
} 

function HideAllLayers(doc) {
	for(var i = 0 ; i < doc.layers.length;i++){
    	doc.layers[i].visible = false;
	}
}

function SavePNG(saveFile){ 
    pngSaveOptions = new PNGSaveOptions(); 
	activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
} 