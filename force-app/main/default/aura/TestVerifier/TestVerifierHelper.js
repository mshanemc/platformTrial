({
	checkHelper : function(component) {
		console.log("check is fired!");
		let actionName = "c." + component.get("v.pathFieldsE.testMethod__c");
		console.log(actionName);
		let action = component.get(actionName);
		console.log(action);
		action.setCallback(this, function(a){
			let state = a.getState();
			if (state === "SUCCESS") {
				console.log(a.getReturnValue());
				if (a.getReturnValue()){
					//mark current path complete
					component.set("v.pathFieldsE.Completed__c", true);
					component.find("pathE").saveRecord(
						$A.getCallback(function(saveResult){
							//console.log(saveResult);
							if (saveResult.state === "SUCCESS"){
								// update the trial with the path step that came back!
								component.set("v.trialFieldsE.Current_Step__c", a.getReturnValue());
								component.find("trialE").saveRecord(
									$A.getCallback(function(saveResult){
										//console.log(saveResult);
										if (saveResult.state === "SUCCESS"){
											component.find("trialE").reloadRecord();
										} else if (saveResult.state === "INCOMPLETE") {
											console.log('User is offline, device doesn\'t support drafts.');
										} else if (saveResult.state === "ERROR"){
											component.find("leh").passErrors(saveResult.error);
										}
									})
								);

								// and update the path
								component.set("v.pathId", a.getReturnValue());
								component.find("pathE").reloadRecord();
							} else if (saveResult.state === "INCOMPLETE") {
								console.log('User is offline, device doesn\'t support drafts.');
							} else if (saveResult.state === "ERROR"){
								component.find("leh").passErrors(saveResult.error);
							}
						})
					);
					//update the step with what came back!
					component.find("tvua").eventMethod("success", component.get("v.methodName"));
					$A.get("e.force:showToast")
						.setParams({"message" : "You did it!  Let's move on to the next task", "type" : "success"}).fire();
					//finally, pop the utility open
					component.find("utilitybar").openUtility();


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