main(); 
function main(){ 
	var doc = app.activeDocument;

	var history = doc.historyStates.length - 1;
	
	doc.changeMode(ChangeMode.RGB);

	var Name = doc.name.replace(/\.[^\.]+$/, ''); 
	var Ext = decodeURI(doc.name).replace(/^.*\./,''); 
	if(Ext.toLowerCase() != 'psd') return; 
	
	SaveAllSizes(doc, Name);

	doc.activeHistoryState = doc.historyStates[history];
	app.purge (PurgeTarget.HISTORYCACHES);
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