({
	checkHelper : function(component) {
		console.log("check is fired!");
		console.log(component.get("v.methodName"));
		let actionName = "c." + component.get("v.methodName");
		console.log(actionName);
		let action = component.get(actionName);
		console.log(action);
		action.setCallback(this, function(a){
			let state = a.getState();
			if (state === "SUCCESS") {
				console.log(a.getReturnValue());
				if (a.getReturnValue()){
					component.find("tvua").eventMethod("success", component.get("v.methodName"));
					$A.get("e.force:showToast")
					  .setParams({"message" : "You did it!  Let's move on to the next task", "type" : "success"}).fire();
					$A.enqueueAction(component.get("v.refreshAction"));
				}
			} else if (state === "ERROR") {
				console.log(a.getError());
				component.find("leh").passErrors(a.getError());
				component.find("tvua").eventMethod("verifyError", component.get("v.methodName"), a.getError().message);
			} else {
				console.log(a);
			}
		});
		$A.enqueueAction(action);
	},
})