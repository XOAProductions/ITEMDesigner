// Site Manager

var currentSiteState = 0;

var siteStateEnum = {"Create":0,
					 "Browse":1,
					 "Calculate":2,
					 "Download":3,
					 "CreateSet": 4};

function configureViewport(exitEditMode=true){
	
	var mode = getAllUrlParams(document.URL).mode;
	
	if(mode === null || mode === "create")
		currentSiteState = siteStateEnum.Create;
	else if(mode === "browse")
		currentSiteState = siteStateEnum.Browse;
	else if(mode === "calculate")
		currentSiteState = siteStateEnum.Calculate;
	else if(mode === "download")
		currentSiteState = siteStateEnum.Download;
	else if(mode === "createset")
		currentSiteState = siteStateEnum.CreateSet
	
	console.log(currentSiteState);
	console.log(mode);
	animateIndicator();
	stateTransition(exitEditMode);
}
function animateIndicator(){
	if(currentSiteState === siteStateEnum.Create){
		$(".navigationIndicator").animate({
			marginLeft: "1048px",
			width: "92px"
		});
	}
	else if(currentSiteState === siteStateEnum.CreateSet){
		$(".navigationIndicator").animate({
			marginLeft: "1180px",
			width: "85px"
		});
	}
	else if(currentSiteState === siteStateEnum.Browse){
		$(".navigationIndicator").animate({
			marginLeft: "1308px",
			width: "140px"
		});
	}
	else if(currentSiteState === siteStateEnum.Calculate){
		$(".navigationIndicator").animate({
			marginLeft: "1490px",
			width: "130px"
		});
	}
	else if(currentSiteState === siteStateEnum.Download){
		$(".navigationIndicator").animate({
			marginLeft: "1660px",
			width: "80px"
		});
	}
}

function stateTransition(exitEditMode=true){
	
	if(currentSiteState === siteStateEnum.Create){
		///createDiv.fadeIn();
		$("#ItemCreator").fadeIn();
		$("#ItemBrowser").fadeOut();
		$("#Downloads").fadeOut();
		$("#ItemPreview").fadeIn();
		$("#ItemSetCreator").fadeOut();
		if(exitEditMode)
			resetFromEditMode();
	}
	else if(currentSiteState === siteStateEnum.Browse){
		//createDiv.fadeOut();
		$("#ItemCreator").fadeOut();
		$("#ItemBrowser").fadeIn();
		$("#Downloads").fadeOut();
		$("#ItemPreview").fadeIn();
		$("#ItemSetCreator").fadeOut();
		displayItems();
		resetFromEditMode();
		
	}
	else if(currentSiteState === siteStateEnum.Calculate){
		//createDiv.fadeOut();
		$("#ItemCreator").fadeOut();
		$("#ItemBrowser").fadeOut();
		$("#Downloads").fadeOut();
		$("#ItemPreview").fadeIn();
		$("#ItemSetCreator").fadeOut();
		resetFromEditMode();
	}
	else if(currentSiteState === siteStateEnum.Download){
		$("#ItemCreator").fadeOut();
		$("#ItemBrowser").fadeOut();
		$("#Downloads").fadeIn();
		$("#ItemPreview").fadeOut();
		$("#ItemSetCreator").fadeOut();
		resetFromEditMode();
	}
	else if(currentSiteState === siteStateEnum.CreateSet){
		$("#ItemCreator").fadeOut();
		$("#ItemBrowser").fadeOut();
		$("#Downloads").fadeOut();
		$("#ItemPreview").fadeOut();
		$("#ItemSetCreator").fadeIn();
		loadAllSetItems();
		resetFromEditMode();
	}
}

function addUrlParameter(parameter){
	//window.location = window.location.href.split('?')[0]  + parameter;
	history.pushState(null, '', parameter);
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}


