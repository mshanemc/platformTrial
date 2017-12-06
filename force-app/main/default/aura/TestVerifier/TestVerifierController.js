({
	doInit : function(component, event, helper) {
		console.log("test verifier is in init");
		// check to see if component was loaded and goal path is already the current path
		let path = window.location.href;
		if (path.includes(component.get("v.pathFieldsE.Close_URL__c"))) {
			console.log("matches: " + path + ' , ' + component.get("v.pathFieldsE.Close_URL__c"));
			helper.checkHelper(component);
		} else {
			console.log("doesn't match: " + path + ',' + component.get("v.pathFieldsE.Close_URL__c"));
		}
	},

	pathChange: function (component, event, helper) {
		if (event.getParams().changeType !== 'LOADED'){
			return;
		}
		component.find("utilitybar").openUtility();
		console.log("test verifier is running because path loaded, or changed but was null");
		console.log(event.getParams().changeType);
		// check to see if component was loaded and goal path is already the current path
		let path = window.location.href;
		if (path.includes(component.get("v.pathFieldsE.Close_URL__c"))) {
			console.log("matches: " + path + ' , ' + component.get("v.pathFieldsE.Close_URL__c"));
			helper.checkHelper(component);
		} else {
			console.log("doesn't match: " + path + ',' + component.get("v.pathFieldsE.Close_URL__c"));
		}
	},
	//manual check from pushing the button
	check : function(component, event, helper) {
		helper.checkHelper(component);
	},


	//listen for all future navigation to compare to goal path
	locationChange : function(component, event, helper) {
		console.log(event.getParam("token"));
		console.log(event.getParam("querystring"));
		//	sendPage : function(component, pageName, pageTitle) {
		if (event.getParam("token").includes(component.get("v.pathFieldsE.Close_URL__c"))){
			console.log("matches: " + event.getParam("token") + ',' + component.get("v.pathFieldsE.Close_URL__c"));
			helper.checkHelper(component);
		} else {
			console.log("doesn't match: " + event.getParam("token") + ',' + component.get("v.pathFieldsE.Close_URL__c"));
		}
	},
})