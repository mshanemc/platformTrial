({
	check : function(component, event, helper) {
		helper.checkHelper(component);
	},

	locationChange : function(component, event, helper) {
		console.log(event.getParam("token"));
		console.log(event.getParam("querystring"));
		//	sendPage : function(component, pageName, pageTitle) {
		if (event.getParam("token").includes(component.get("v.closeURL"))){
			console.log("matches: " + event.getParam("token") + ',' + component.get("v.closeURL"));
			helper.checkHelper(component);
		} else {
			console.log("doesn't match: " + event.getParam("token") + ',' + component.get("v.closeURL"));
		}
	},
})