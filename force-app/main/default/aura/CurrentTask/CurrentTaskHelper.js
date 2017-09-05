({
	loadPopovers : function(component) {
		var action = component.get("c.getWalkthroughsByActivity");
		console.log("current activity is " + component.get("v.trialFields.Current_Step__c"));
		action.setParams({
			activityId : component.get("v.trialFields.Current_Step__c")
		});
		action.setCallback(this, function(a){
			var state = a.getState();
			if (state === "SUCCESS") {
				console.log(a.getReturnValue());
				if (a.getReturnValue().length>0){  //if there's any popovers that aren't completed
					var pom = component.find("pom")
					pom.addPopovers(a.getReturnValue());
					pom.startPopovers();
				}
			} else if (state === "ERROR") {
				console.log(a.getError());
			}
		});
		$A.enqueueAction(action);
	}
})