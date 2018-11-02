// ItemBrowser

function displayItems(){
	
	//flush table first
	$("#itemBrowserTable").find("tr:gt(0)").remove();
	
	var selectedItemType = document.getElementById("ItemTypeBrowse").selectedIndex;
	var itemList;
	switch(selectedItemType){
		case 0: 	itemList = ItemsLists.BodyArmorList; break;
		case 1: 	itemList = ItemsLists.BootsList; break;
		case 2: 	itemList = ItemsLists.HelmetList; break;
		case 3:		itemList = ItemsLists.TriggerList; break;
		case 4:		itemList = ItemsLists.LoadingMechanismList; break;
		case 5:		itemList = ItemsLists.FiringMechanismList; break;
		case 6:		itemList = ItemsLists.EnergyContainerList; break;
		case 7:		itemList = ItemsLists.BarrelList; break;
		case 8:		itemList = ItemsLists.AmmoClipList; break;
		case 9:		itemList = ItemsLists.StockList; break;
		case 10: 	itemList = ItemsLists.BarrelAttachmentList; break;
		case 11: 	itemList = ItemsLists.ScopeList; break;
		case 12: 	itemList = ItemsLists.CosmeticAttachmentList; break;
		case 13: 	itemList = ItemsLists.BossAbilityItemList; break;
			
	}
	
	var tableContents = "";
	var i = 0;
	for(i = 0; i < itemList.length; i++){
			tableContents += "<tr>";
			tableContents += "<td>" + itemList[i].name + "</td>";
			tableContents += "<td>" + itemList[i].quality + "</td>";
			tableContents += "<td>" + itemList[i].id + "</td>";
			tableContents += "<td> <button type = 'button' id='" + itemList[i].id + "_View'> View Stats </ button> </td>";
			tableContents += "<td> <button type = 'button' id='" + itemList[i].id + "_Edit'> Edit </ button></td>";
			tableContents += "<td> <button type = 'button' id='" + itemList[i].id + "_Delete'> Delete </ button></td>";
			tableContents += "</tr>";
			
	}
	
	$('#itemBrowserTable > tbody:last-child').append(tableContents);
	
	for(i = 0; i < itemList.length; i++){
		var buttonView = document.getElementById(itemList[i].id + "_View").setAttribute("onClick", "updatePreview('" +itemList[i].id+ "')");
		var buttonEdit = document.getElementById(itemList[i].id + "_Edit").setAttribute("onClick", "loadItemValuesForEditing('" +itemList[i].id+ "'); addUrlParameter('?mode=create&itemID=" +itemList[i].id+ "'); configureViewport(false);") ;
		var buttonView = document.getElementById(itemList[i].id + "_Delete").setAttribute("onClick", "deleteItem('" +itemList[i].id+ "')");
		
	}
}

function displaySets(){
	$("#setBrowserTable").find("tr:gt(0)").remove(); //flush table first
	
	var tableContents = "";
	var i = 0;
	for(i = 0; i < SetList.length; i++){
			tableContents += "<tr>";
			tableContents += "<td>" + SetList[i].name + "</td>";
			tableContents += "<td>" + SetList[i].id + "</td>";
			tableContents += "<td> <button type = 'button' id='" + SetList[i].id + "_SetEdit'> Edit </ button></td>";
			tableContents += "<td> <button type = 'button' id='" + SetList[i].id + "_SetDelete'> Delete </ button></td>";
			tableContents += "</tr>";
			
	}
	
	$('#setBrowserTable > tbody:last-child').append(tableContents);
	
	for(i = 0; i < SetList.length; i++){
		var buttonEdit = document.getElementById(SetList[i].id + "_SetEdit").setAttribute("onClick", "loadSetForEditing('" +SetList[i].id+ "'); addUrlParameter('?mode=createSet&setID=" +SetList[i].id+ "'); configureViewport(false);") ;
		var buttonView = document.getElementById(SetList[i].id + "_SetDelete").setAttribute("onClick", "deleteSet('" +SetList[i].id+ "')");
		
	}
}