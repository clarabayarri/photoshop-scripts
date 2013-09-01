// Save each layer in the document as a graphic for an iOS app, extracting the 4 sized needed with their appropriate names

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
		SaveAllSizes(doc, Name);

		doc.activeHistoryState = history2;
		doc.layers[i].visible = false;
	}
	doc.layers[doc.layers.length-1].visible = true;

	doc.activeHistoryState = history;
	app.purge (PurgeTarget.HISTORYCACHES);
	
} 

function HideAllLayers(doc) {
	for(var i = 0 ; i < doc.layers.length;i++){
    	doc.layers[i].visible = false;
	}
}

function SaveAllSizes(doc, Name) {
	var Path = doc.path; 

	var saveFile = File(Path + "/" + Name +"@2x.png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile); 

	var width = doc.width;
	width.convert("px");
	var width1 = width / 2.0;
	doc.resizeImage(UnitValue(width1,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/" + Name +".png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);

	var width2 = width1 * 0.9375;
	doc.resizeImage(UnitValue(width2,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/" + Name +"@2x~iphone.png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);

	var width3 = width2 / 2.0;
	doc.resizeImage(UnitValue(width3,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/" + Name +"~iphone.png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);
}

function SavePNG(saveFile){ 
    pngSaveOptions = new PNGSaveOptions(); 
	activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
} 