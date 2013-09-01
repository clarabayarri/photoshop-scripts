// Save each layer in a document as a graphic for an android app, starting from an iOS retina resolution.

main(); 
function main(){ 
	var doc = app.activeDocument;

	var history = doc.activeHistoryState;
	
	doc.changeMode(ChangeMode.RGB);

	//var Name = doc.name.replace(/\.[^\.]+$/, ''); 
	var Ext = decodeURI(doc.name).replace(/^.*\./,''); 
	if(Ext.toLowerCase() != 'psd') return; 
	
	createFolders(doc);

	HideAllLayers(doc);

	var history2 = doc.activeHistoryState;

	for(var i = 0 ; i < doc.layers.length;i++){
		doc.layers[i].visible = true;
		var Name = doc.layers[i].name.replace('-','_').replace('-','_').replace('-','_');
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

function createFolders (doc) {
	//var Path = doc.path;
	var Path = "/Users/clara/Desktop/ps/android";
	var folder1 = Folder(Path + "/drawable-xhdpi/");
	if(!folder1.exists) folder1.create();

	var folder2 = Folder(Path + "/drawable-hdpi/");
	if(!folder2.exists) folder2.create();

	var folder3 = Folder(Path + "/drawable-mdpi/");
	if(!folder3.exists) folder3.create();

	var folder4 = Folder(Path + "/drawable-ldpi/");
	if(!folder4.exists) folder4.create();
}

function SaveAllSizes(doc, Name) {
	//var Path = doc.path; 
	var Path = "/Users/clara/Desktop/ps/android";
	var width = doc.width;
	width.convert("px");
	var width1 = width / 2.0;
	doc.resizeImage(UnitValue(width1,"px"),null,null,ResampleMethod.BICUBIC);
	var saveFile = File(Path + "/drawable-xhdpi/" + Name +".png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);

	var width2 = width1 * 0.9375;
	doc.resizeImage(UnitValue(width2,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/drawable-hdpi/" + Name +".png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);

	var width3 = width2 / 2.0;
	doc.resizeImage(UnitValue(width3,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/drawable-mdpi/" + Name +".png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);

	var width4 = width3 / 2.0;
	doc.resizeImage(UnitValue(width4,"px"),null,null,ResampleMethod.BICUBIC);
	saveFile = File(Path + "/drawable-ldpi/" + Name +".png"); 
	if(saveFile.exists) saveFile.remove(); 
	SavePNG(saveFile);
}

function SavePNG(saveFile){ 
    pngSaveOptions = new PNGSaveOptions(); 
	activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
} 