// item preview

function updatePreview(itemID = null){
	var values, name, description, quality, minimumLevel, durability, uniqueSecondary, randomCount, damageType;
	if(itemID === null){
		values = getAllInputValues(false);
		var baseValues = getBaseItemInfo();
		
		name = baseValues.name;
		description = baseValues.description;
		quality = parseInt(baseValues.quality);
		minimumLevel = parseInt(baseValues.minimumLevel);
		durability = parseInt(baseValues.durability);
		uniqueSecondary = baseValues.uniqueSecondary;
		randomCount = parseInt(baseValues.randomCount);
		damageType = parseInt(baseValues.damageType);
	}
	else if(itemID !== null){
		var completeItem = findItem(itemID);
		if(completeItem === null)
			return;
		
		name = completeItem.name;
		description = completeItem.description;
		quality = completeItem.quality;
		minimumLevel = completeItem.minimumLevel;
		durability = completeItem.durability;
		uniqueSecondary = completeItem.UniqueSecondary;
		randomCount = completeItem.randomCount;
		damageType = completeItem.damageType;
		values = [];
		var y = 0;
		
		for(y = 0; y < baseValueNames.length; y++){
			if(completeItem.Statistics[baseValueNames[y]].valueMin === null)
				completeItem.Statistics[baseValueNames[y]].valueMin = NaN;
			if(completeItem.Statistics[baseValueNames[y]].valueMax === null)
				completeItem.Statistics[baseValueNames[y]].valueMax = NaN;
			values.push(completeItem.Statistics[baseValueNames[y]]);
		}
		y=0;
		for(y = 0; y < mainValueNames.length; y++){
			if(completeItem.Statistics[mainValueNames[y]]  === null  ||  completeItem.Statistics[mainValueNames[y]]  === undefined){
				values.push(new StatisticValue(NaN, NaN, 0,0));
				continue;
			}
			if(completeItem.Statistics[mainValueNames[y]].valueMin === null)
				completeItem.Statistics[mainValueNames[y]].valueMin = NaN;
			if(completeItem.Statistics[mainValueNames[y]].valueMax === null)
				completeItem.Statistics[mainValueNames[y]].valueMax = NaN;
			values.push(completeItem.Statistics[mainValueNames[y]]);
		}
		
	}
	
	
	
	
	$("#ItemPreviewName").text(name);
	$("#ItemPreviewDescription").text(description);
	$("#ItemPreviewUniqueSecondary").text(uniqueSecondary);
	
	var i = 0;
	var secondaryString = "";
	var secondaryRandomString = " <br/><br/> and " + randomCount + " of the following attributes:<br/><br/>";
	var mainStatString = "";
	for(i = 0; i<values.length; i++){
		console.log(i);
		if(i >= values.length - 4){
			if(!isNaN(values[i].valueMin) && !isNaN(values[i].valueMax) ){
				if(values[i].valueMin === 0 && values[i].valueMax === 0)
					continue;
				mainStatString += "<br/>" + values[i].valueMin + " - " + values[i].valueMax + " " + mainValueNames[i - (values.length - 4)];
				if(damageType !== null && damageType !== undefined && !isNaN(damageType) && mainValueNames[i - (values.length - 4)] === "WeaponDamage"){
					switch(damageType){ 
						 case 0: mainStatString+=" as FireDamage"; break;
						 case 1: mainStatString+=" as ColdDamage"; break;
						 case 2: mainStatString+=" as PoisonDamage"; break;
						 case 3: mainStatString+=" as PhysicalDamage"; break;
																										   
					}
				}
			}
			
			continue;
		}
		
		if(!isNaN(values[i].valueMin) && !isNaN(values[i].valueMax) && values[i].guaranteedOrRandom === 0){
			if(values[i].calculationType === 0){
				secondaryString += "<br/>" + values[i].valueMin + " - " + values[i].valueMax + " additional " + baseValueNames[i];
			}
			else{
				secondaryString += "<br/>" + values[i].valueMin + " - " + values[i].valueMax + " multiplied " + baseValueNames[i];
			}
		}
		else if(!isNaN(values[i].valueMin) && !isNaN(values[i].valueMax) && values[i].guaranteedOrRandom === 1){
			if(values[i].calculationType === 0){
				secondaryRandomString += "<br/>" + values[i].valueMin + " - " + values[i].valueMax + " additional " + baseValueNames[i];
			}
			else{
				secondaryRandomString += "<br/>" + values[i].valueMin + " - "  + values[i].valueMax + " multiplied " + baseValueNames[i];
			}
		}
	}
	
	$("#ItemPreviewSecondaryStats").html(secondaryString + secondaryRandomString);
	$("#ItemPreviewMainStat").html(mainStatString);
}