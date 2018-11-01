// Create Item Set

var SetList = [];

var itemSelection = [];

var editSetMode = false;
var editSetID;

function loadAllSetItems(){
	 $("#SetItemsList").find("tr:gt(0)").remove();
	var tableContents = "";
	var buttonIDs = [];
	var i = 0;
	for(i = 0; i<ItemsListsNames.length; i++){
		
		var k = 0;
		for(k = 0; k < ItemsLists[ItemsListsNames[i]].length; k++){
			var item = ItemsLists[ItemsListsNames[i]][k];
			if(itemSelection.includes(item))
				continue;
			if(item.quality !== 3) //is not a set item
				continue;
			
			tableContents += "<tr>";
			tableContents += "<td>" + item.name + "</td>";
			tableContents += "<td>" + item.id + "</td>";
			tableContents += "<td> <button type = 'button' id='" + item.id + "_AddToSet'> Add to Set </ button></td>";
			tableContents += "</tr>";
			
			buttonIDs.push(item.id + "_AddToSet");
		
		}
		
	}
	$('#SetItemsList > tbody:last-child').append(tableContents);
	
	for(i = 0; i<buttonIDs.length; i++){
		var buttonAdd = document.getElementById(buttonIDs[i]).setAttribute("onClick", "addItemToSelection('" + buttonIDs[i].split("_AddToSet")[0] + "');");
	}
}

function addItemToSelection(id){
	var item = findItem(id);
	itemSelection.push(item);
	loadAllSetItems();
	displayItemSelection();
}

function removeItemFromSelection(id){
	var i = 0;
	var index = -1;
	for(i = 0; i<itemSelection.length; i++){
		if(itemSelection[i].id == id){
			index = i;
			break;
		}
	}
	
	itemSelection.splice(index, 1);
	displayItemSelection();
	loadAllSetItems();
}

function displayItemSelection(){
	 $("#ContainedItemsList").find("tr:gt(0)").remove();
	var containedItemsString = "";
	var buttonIDs = [];
	var i = 0;
	for(i = 0; i<itemSelection.length; i++){
		var item = itemSelection[i];
		
		containedItemsString += "<tr>";
		containedItemsString += "<td>" + item.name + "</td>";
		containedItemsString += "<td>" + item.id + "</td>";
		containedItemsString += "<td> <button type = 'button' id='" + item.id + "_RemoveFromSet'> Remove from Set </ button></td>";
		containedItemsString += "</tr>";
		
		buttonIDs.push(item.id + "_RemoveFromSet");
	}
	$('#ContainedItemsList > tbody:last-child').append(containedItemsString);
	
	for(i = 0; i<buttonIDs.length; i++){
		var buttonRemove = document.getElementById(buttonIDs[i]).setAttribute("onClick", "removeItemFromSelection('" + buttonIDs[i].split("_RemoveFromSet")[0] + "');");
	}
}

function createItemSet(){
	
	
		
	
	var description = document.getElementById("setDescription").value;
	var name = document.getElementById("setName").value;
	var setBoniList = [document.getElementById("setBonus1").value,
					  document.getElementById("setBonus2").value,
					  document.getElementById("setBonus3").value,
					  document.getElementById("setBonus4").value,
					  document.getElementById("setBonus5").value];
	var set;
	
	if(editSetMode){
		set = findSet(editSetID);
		var index = indexOfSet(editSetID);
		if(index !== -1)
			SetList.splice(index, 1);
		
		set.description = description;
		set.name = name;
		set.setBoniList = setBoniList;
		set.itemIDList = [];
		var y = 0;
		for(y=0; y<itemSelection.length; y++){
			set.itemIDList.push(itemSelection[y].id);
		}
	}
	else{
		set = new ItemSet(description, name, setBoniList);
		var i = 0;
		for(i = 0; i< itemSelection.length; i++){
			set.addItemID(itemSelection[i].id);
		}
		
	}
	
	
	SetList.push(set);
	
	saveSetList();
}

function indexOfSet(id){
	var i = 0;
	for(i = 0; i<SetList.length; i++){
		if(SetList[i].id === id){
			return i;
		}
	}
	return -1;
}

function saveSetList(){
	var data = new FormData();
	data.append("data" , JSON.stringify(SetList));
	var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	xhr.open( 'post', 'saveSetData.php', true );
	xhr.send(data);
}

function findSet(id){
	var i = 0;
	for(i = 0; i<SetList.length; i++){
		if(SetList[i].id === id)
			return SetList[i];
	}
	return null;
	
}

function deleteSet(id){
	var index = indexOfSet(id);
	
	if(index !== -1){
		SetList.splice(index, 1);
		saveSetList();
	}
}

function loadSetForEditing(id){
	var set = findSet(id);
	if(set === null)
		return;
	
	editSetMode = true;
	$('#Warning').fadeIn();
	editSetID = id;
	
	document.getElementById("setDescription").value = set.description;
	document.getElementById("setName").value = set.name;
	
	document.getElementById("setBonus1").value = set.setBoniList[0];
	document.getElementById("setBonus2").value = set.setBoniList[1];
	document.getElementById("setBonus3").value = set.setBoniList[2];
	document.getElementById("setBonus4").value = set.setBoniList[3];
	document.getElementById("setBonus5").value = set.setBoniList[4];
	
	var i = 0;
	for(i = 0; i<set.itemIDList.length; i++){
		addItemToSelection(set.itemIDList[i]);
	}
	
					  
}

function loadSets(){
		$.ajaxSetup({beforeSend: function(xhr){
  if (xhr.overrideMimeType)
  {
    xhr.overrideMimeType("application/json");
  }
}
});
	$.getJSON("http://xoaproductions.com/ItemDesigner/savedItemData/Sets.json", function(jsonData){
		console.log(jsonData);
		SetList = jsonData;
		//if(currentSiteState === siteStateEnum.Browse){
		//	displayItems();
		//}
		//if(currentSiteState === siteStateEnum.Create){
		//	loadItemForEditingFromUrlParameter();
		//}
		
	});
}