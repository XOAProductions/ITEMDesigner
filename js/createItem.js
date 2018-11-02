//the current selected type
//always up to date
var currentType;

var editMode = false;

var ItemsLists = {BodyArmorList : [], BootsList: [], HelmetList: [], TriggerList: [], LoadingMechanismList: [], FiringMechanismList: [], EnergyContainerList: [], BarrelList: [], AmmoClipList: [], StockList: [], BarrelAttachmentList: [], ScopeList: [], CosmeticAttachmentList: [], BossAbilityItemList:[]};

var ItemsListsNames = ["BodyArmorList", "BootsList", "HelmetList", "TriggerList", "LoadingMechanismList", "FiringMechanismList", "EnergyContainerList", "BarrelList", "AmmoClipList", "StockList", "BarrelAttachmentList", "ScopeList", "CosmeticAttachmentList", "BossAbilityItemList"];

//called when create item is pressed
function createItem(){
	var values = getAllInputValues();
	if(values === null)
	{ //in case of error
		return;
	}
	
	if(editMode){
		editItem();
		return;
	}
	var baseValues = getBaseItemInfo();
	
	var name = baseValues.name;
	var description = baseValues.description;
	var quality = parseInt(baseValues.quality);
	var minimumLevel = parseInt(baseValues.minimumLevel);
	var durability = parseInt(baseValues.durability);
	var uniqueSecondary = baseValues.uniqueSecondary;
	var randomCount = parseInt(baseValues.randomCount);
	var damageType = parseInt(baseValues.damageType);
	var statistics = createStatisticsClasses(values);
	
	var item;
	
	var itemType = currentType; //making this easier and from 0
	switch(itemType)
	{
		case 0: item = new BodyArmor(name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.BodyArmorList.push(item);
			break;
		case 1: item = new Boots(name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.BootsList.push(item);
			break;
		case 2: item = new Helmet (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.HelmetList.push(item);
			break;
		case 3: item = new Trigger (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.TriggerList.push(item);
			break;
		case 4: item = new LoadingMechanism (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary, damageType);
				ItemsLists.LoadingMechanismList.push(item);
			break;
		case 5: item = new FiringMechanism (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.FiringMechanismList.push(item);
			break;
		case 6: item = new EnergyContainer (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.EnergyContainerList.push(item);
			break;
		case 7: item = new Barrel (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.BarrelList.push(item);
			break;
		case 8: item = new AmmoClip (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.AmmoClipList.push(item);
			break;
		case 9: item = new Stock (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.StockList.push(item);
			break;
		case 10: item = new BarrelAttachment (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.BarrelAttachmentList.push(item);
			break;
		case 11: item = new Scope (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.ScopeList.push(item);
			break;
		case 12: item = new CosmeticAttachment (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
				ItemsLists.CosmeticAttachmentList.push(item);
			break;
		case 13: item = new BossAbilityItem (name, description, quality, minimumLevel, durability, randomCount, statistics, uniqueSecondary);
			ItemsLists.BossAbilityItemList.push(item);
		break;
	}
	
	
	save();
	
}

function editItem(){
	//TODO: ADD CHECKS
	var id = getAllUrlParams(document.URL).itemid;
	var item = findItem(id);
	var values = getAllInputValues();
	var baseValues = getBaseItemInfo();
	var statistics = createStatisticsClasses(values);
	
	var name = baseValues.name;
	var description = baseValues.description;
	var quality = parseInt(baseValues.quality);
	var minimumLevel = parseInt(baseValues.minimumLevel);
	var durability = parseInt(baseValues.durability);
	var uniqueSecondary = baseValues.uniqueSecondary;
	var randomCount = parseInt(baseValues.randomCount);
	
	var damageType = parseInt(baseValues.damageType);
	
	item.name = name;
	item.description = description;
	item.quality = quality;
	item.minimumLevel = minimumLevel;
	item.durability = durability;
	item.UniqueSecondary = uniqueSecondary;
	item.randomCount = randomCount;
	if(damageType !== null && damageType !== undefined && !isNaN(damageType)){
		item.damageType = damageType;
	}
	item.Statistics = statistics;
	
	save();
	
}

function save(){
	
	
	var data = new FormData();
	data.append("data" , JSON.stringify(ItemsLists));
	var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
	xhr.open( 'post', 'saveItemData.php', true );
	xhr.send(data);
}

function loadData(){
	$.ajaxSetup({beforeSend: function(xhr){
  if (xhr.overrideMimeType)
  {
    xhr.overrideMimeType("application/json");
  }
}
});
	$.getJSON("http://xoaproductions.com/ItemDesigner/savedItemData/Items.json", function(jsonData){
		console.log(jsonData);
		ItemsLists = jsonData;
		if(currentSiteState === siteStateEnum.Browse){
			displayItems();
		}
		if(currentSiteState === siteStateEnum.Create){
			loadItemForEditingFromUrlParameter();
		}
		
	});
}

function createStatisticsClasses(valuesArray){
	var i = 0;
	var statisticsClass;
	
	if(currentType === 0 || currentType === 2 || currentType === 13){
		//armor
		statisticsClass = new ArmorStats(valuesArray[0],valuesArray[1],valuesArray[2],valuesArray[3],valuesArray[4],valuesArray[5],valuesArray[6],valuesArray[7],valuesArray[8],valuesArray[9],valuesArray[10],valuesArray[11],valuesArray[12],valuesArray[13],valuesArray[14],valuesArray[15],valuesArray[16],valuesArray[17],valuesArray[18], valuesArray[21]);
	}
	else if(currentType === 1)
	{
		//boots
		statisticsClass = new ShoeStats(valuesArray[0],valuesArray[1],valuesArray[2],valuesArray[3],valuesArray[4],valuesArray[5],valuesArray[6],valuesArray[7],valuesArray[8],valuesArray[9],valuesArray[10],valuesArray[11],valuesArray[12],valuesArray[13],valuesArray[14],valuesArray[15],valuesArray[16],valuesArray[17],valuesArray[18], valuesArray[21], valuesArray[22]);
	}
	
	else
	{
		//weaponpart
		statisticsClass = new WeaponPartStats(valuesArray[0],valuesArray[1],valuesArray[2],valuesArray[3],valuesArray[4],valuesArray[5],valuesArray[6],valuesArray[7],valuesArray[8],valuesArray[9],valuesArray[10],valuesArray[11],valuesArray[12],valuesArray[13],valuesArray[14],valuesArray[15],valuesArray[16],valuesArray[17],valuesArray[18],valuesArray[19], valuesArray[20] );
	}
	
	return statisticsClass;
}
//returns the base information for the item
function getBaseItemInfo(){
	var name = document.getElementById("itemName").value;
	var description = document.getElementById("description").value;
	var quality = document.getElementById("ItemQuality").selectedIndex;
	var minimumLevel = document.getElementById("minimumLevel").value;
	var durability = document.getElementById("durability").value;
	var uniqueSecondary = document.getElementById("uniqueSecondary").value;
	var randomCount = document.getElementById("randomCount").value;
	var damageType = document.getElementById("damageType").selectedIndex;
	return {name, description, quality, minimumLevel, durability, uniqueSecondary, randomCount, damageType};
}

function clearAllInputs(){
	document.getElementById("itemName").value = "";
	document.getElementById("description").value = "";
	document.getElementById("ItemQuality").selectedIndex = 0;
	document.getElementById("minimumLevel").value = NaN;
	document.getElementById("durability").value = NaN;
	document.getElementById("uniqueSecondary").value = "";
	document.getElementById("randomCount").value = NaN;
	document.getElementById("ItemType").value = 0;
	document.getElementById("damageType").selectedIndex = 0;
	
	for(i = 0; i< baseValueNames.length; i++){
		
		
		
		$("#" + baseValueNames[i]).val ( NaN);
		$("#" + baseValueNames[i] + "Max").val  (NaN);
		$("#" + baseValueNames[i] + "AddMult").prop (0);
		$("#" + baseValueNames[i] + "GuaRand").prop (0);
		
	}
	for(i = 0; i< mainValueNames.length; i++){
		
		
		
		$("#" + mainValueNames[i]).val ( NaN);
		$("#" + mainValueNames[i] + "Max").val  (NaN);
	
		
	}
}

function loadItemForEditingFromUrlParameter(){
	var itemID = getAllUrlParams(document.URL).itemid;
	console.log(itemID);
	if(itemID === null || itemID === undefined)
		return;
	else
		loadItemValuesForEditing(itemID.toString());
}

function loadItemValuesForEditing(id){
	
	var item = findItem(id);
	var stats = item.Statistics;
	editMode = true;
	$('#Warning').fadeIn();
	$('#Warning').html("<p style='margin-top: 5px;'>You are currently editing an item. Press here to abort!</p>");
	document.getElementById("ItemType").disabled = true;
	var i = 0;
	for(i = 0; i< baseValueNames.length; i++){
		
		
		if(baseValueNames[i] === null || baseValueNames[i] === undefined){
			continue;
		}
		if(stats[baseValueNames[i]] === null || stats[baseValueNames[i]] === undefined)
			continue;
		$("#" + baseValueNames[i]).val ( stats[baseValueNames[i]].valueMin);
		$("#" + baseValueNames[i] + "Max").val  (stats[baseValueNames[i]].valueMax);
		$("#" + baseValueNames[i] + "AddMult").prop ('selectedIndex', stats[baseValueNames[i]].calculationType );
		$("#" + baseValueNames[i] + "GuaRand").prop ('selectedIndex', stats[baseValueNames[i]].guaranteedOrRandom);
		
		
	}
	for(i = 0; i< mainValueNames.length; i++){
		
		
		if(mainValueNames[i] === null || mainValueNames[i] === undefined){
			continue;
		}
		if(stats[mainValueNames[i]] === null || stats[mainValueNames[i]] === undefined)
			continue;
		$("#" + mainValueNames[i]).val ( stats[mainValueNames[i]].valueMin);
		$("#" + mainValueNames[i] + "Max").val  (stats[mainValueNames[i]].valueMax);
	
		
	}
	
	document.getElementById("itemName").value = item.name;
	document.getElementById("description").value = item.description;
	document.getElementById("ItemQuality").selectedIndex = item.quality;
	document.getElementById("minimumLevel").value = item.minimumLevel;
	document.getElementById("durability").value = item.durability;
	document.getElementById("uniqueSecondary").value = item.UniqueSecondary;
	document.getElementById("randomCount").value = item.randomCount;
	document.getElementById("ItemType").value = item.itemType;
	if(item.damagetype !== null && item.damageType !== undefined && !isNaN(item.damageType))
		document.getElementById("damageType").selectedIndex = item.damageType;
	
	currentType = item.itemType;
	itemTypeChanged();
}

//returns an array of all the input fields' values
//returns null if an error has occured
function getAllInputValues(checkForErrors = true){
	var values = [];
	var errorArray = []; // one of two fields is null
	var i = 0;
	for(i = 0; i < baseValueNames.length; i++)
	{
		var valueMin = document.getElementById(baseValueNames[i]).value;
		var valueMax = document.getElementById(baseValueNames[i] + "Max").value;
		var calculationType = document.getElementById(baseValueNames[i] + "AddMult").selectedIndex;
		var guaranteedRandom = document.getElementById(baseValueNames[i] + "GuaRand").selectedIndex;
		
		if(valueMin === "" && valueMax !== "")
		{
			errorArray.push(baseValueNames[i] + ": minimum value is empty");
		}
		else if(valueMax === "" && valueMin !== "")
		{
			errorArray.push(baseValueNames[i] + ": maximum value is empty");
		}
		
		valueMin = parseFloat(valueMin);
		valueMax = parseFloat(valueMax);
		calculationType = parseInt(calculationType);
		guaranteedRandom = parseInt(guaranteedRandom);
		if(valueMax < valueMin)
		{
			errorArray.push (baseValueNames[i] + ": maximum value is lower than minimum");
		}
		var statistic = new StatisticValue(valueMin, valueMax, calculationType, guaranteedRandom);
		values.push(statistic); 
		
	}
	for(i = 0; i< mainValueNames.length; i++)
	{
		var valueMin = document.getElementById(mainValueNames[i]);
		var valueMax = document.getElementById(mainValueNames[i] + "Max");
		
		
		if(valueMin.hidden || valueMax.hidden){
			valueMin = 0;
			valueMax = 0;
		}
		else{
			valueMin = valueMin.value;
			valueMax = valueMax.value;
		}
			if(valueMin === "" && valueMax !== "")
			{
				errorArray.push(baseValueNames[i] + ": minimum value is empty");
			}
			else if(valueMax === "" && valueMin !== "")
			{
				errorArray.push(baseValueNames[i] + ": maximum value is empty");
			}
		
			valueMin = parseFloat(valueMin);
			valueMax = parseFloat(valueMax);
			calculationType = calculationEnum.Additive;
			guaranteedRandom = guaranteedRandomEnum.Guaranteed;
			
			if(valueMax < valueMin)
			{
				errorArray.push (baseValueNames[i] + ": maximum value is lower than minimum");
			}
			
			var statistic = new StatisticValue(valueMin, valueMax, calculationType, guaranteedRandom);
			values.push(statistic); 
		
	}
	
	if(errorArray.length > 0 && checkForErrors)
	{
		displayErrorLog(errorArray);
		return null;
	}
	else
	{
		return values;
	}
}

//logs an array of errors to a window.alert
function displayErrorLog(ErrorArray){
	var i = 0;
	var errorMsg = "The following errors have occured:\n"
	for(i = 0; i < ErrorArray.length; i++)
	{
		errorMsg += "\n " + ErrorArray[i];
	}
	errorMsg += "\n\nPlease fix these errors and retry."
	
	window.alert(errorMsg);
}

function deleteItem(id){
    
	var goAhead = window.confirm("Do you really want to delete item " + id + " ?");
	
	if(goAhead){
		
		var item = findItem(id);
		
		switch(item.itemType){
				case 0:  var index = findItemInArray(ItemsLists.BodyArmorList, id); ItemsLists.BodyArmorList.splice(index, 1); break;
				case 1:  var index = findItemInArray(ItemsLists.BootsList, id); ItemsLists.BootsList.splice(index, 1); break;
				case 2:  var index = findItemInArray(ItemsLists.HelmetList, id); ItemsLists.HelmetList.splice(index, 1); break;
				case 3:  var index = findItemInArray(ItemsLists.TriggerList, id); ItemsLists.TriggerList.splice(index, 1); break;
				case 4:  var index = findItemInArray(ItemsLists.LoadingMechanismList, id); ItemsLists.LoadingMechanismList.splice(index, 1); break;
				case 5:  var index = findItemInArray(ItemsLists.FiringMechanismList, id); ItemsLists.FiringMechanismList.splice(index, 1); break;
				case 6:  var index = findItemInArray(ItemsLists.EnergyContainerList, id); ItemsLists.EnergyContainerList.splice(index, 1); break;
				case 7:  var index = findItemInArray(ItemsLists.BarrelList, id); ItemsLists.BarrelList.splice(index, 1); break;
				case 8:  var index = findItemInArray(ItemsLists.AmmoClipList, id); ItemsLists.AmmoClipList.splice(index, 1); break;
				case 9:  var index = findItemInArray(ItemsLists.StockList, id); ItemsLists.StockList.splice(index, 1); break;
				case 10:  var index = findItemInArray(ItemsLists.BarrelAttachmentList, id); ItemsLists.BarrelAttachmentList.splice(index, 1); break;
				case 11:  var index = findItemInArray(ItemsLists.ScopeList, id); ItemsLists.ScopeList.splice(index, 1); break;
				case 12:  var index = findItemInArray(ItemsLists.CosmeticAttachmentList, id); ItemsLists.CosmeticAttachmentList.splice(index, 1); break;
				case 13: var index = findItemInArray(ItemsLists.BossAbilityItemList, id); ItemsLists.BossAbilityItemList.splice(index, 1); break;
		}
		
		save();
	}
}

//returns the selected type index and sets it as current type
function getItemType(){
	var itemType = document.getElementById("ItemType").selectedIndex;
	currentType = itemType;
	return itemType;
}

function resetFromEditMode(){
	editMode = false;
	editSetMode = false;
	$('#Warning').fadeOut();
	clearAllInputs();
	clearAllSetInputs();
}

//called on load of the body
function onLoad(){
	getItemType();
	hideUnwantedMainStatistics();
	clearAllInputs();
	clearAllSetInputs();
	
	loadData();
	loadSets();
	
}

//is called when the user changes the item type
function itemTypeChanged(){
	if(editMode){
		
		hideUnwantedMainStatistics();
		updatePreview();
		return;
	}
	getItemType();
	hideUnwantedMainStatistics();
}


//creates a mask which is used to toggle off some input fields
//based on the selected item type
function hideUnwantedMainStatistics(){
	var maskArmor = [true, true, false, true, true];
	var maskShoes = [true, true, false, false, true];
	var maskWeapon = [false, false, true, true, true];
	var maskLoadingMechanism = [false,false,true,true,false];
	if(currentType === 0 || currentType === 2 || currentType === 13)
	{
		setupMainStatsVisibility(maskArmor);
	}
	else if(currentType === 1)
	{
		setupMainStatsVisibility(maskShoes);
	}
	else if(currentType === 4){
		setupMainStatsVisibility(maskLoadingMechanism);
	}
	else
	{
		setupMainStatsVisibility(maskWeapon);
	}
		
}

function findItem(id){
	var objects = Object.values(ItemsLists);
	var i = 0;
	for(i = 0; i<objects.length; i++){
		var index = findItemInArray(objects[i], id);
		if(index >= 0)
			return objects[i][index];
	}
	return null;
}

 function findItemInArray(array, id){
	 return array.map(function(e) { return e.id; }).indexOf(id);
 }

//recieves the mask and toggles the respective fields visibility on/off
function setupMainStatsVisibility(mainstatVisibilityMask){
	var damage = document.getElementById("WeaponDamage");
	var damageMax = document.getElementById("WeaponDamageMax");
	var attackSpeed = document.getElementById("AttackSpeed");
	var attackSpeedMax = document.getElementById("AttackSpeedMax");
	var armor = document.getElementById("Armor");
	var armorMax = document.getElementById("ArmorMax");
	var movementSpeed = document.getElementById("MovementSpeed");
	var movementSpeedMax = document.getElementById("MovementSpeedMax");
	var damageType = document.getElementById("damageType");
	var damageTypeText = document.getElementById("damageTypeText");
	
	damage.hidden = mainstatVisibilityMask[0];
	damageMax.hidden = mainstatVisibilityMask[0];
	
	attackSpeed.hidden = mainstatVisibilityMask[1];
	attackSpeedMax.hidden = mainstatVisibilityMask[1];
	
	armor.hidden = mainstatVisibilityMask[2];
	armorMax.hidden = mainstatVisibilityMask[2];
	
	movementSpeed.hidden = mainstatVisibilityMask[3];
	movementSpeedMax.hidden = mainstatVisibilityMask[3];
	
	damageType.hidden = mainstatVisibilityMask[4];
	damageTypeText.hidden = mainstatVisibilityMask[4];
	
}