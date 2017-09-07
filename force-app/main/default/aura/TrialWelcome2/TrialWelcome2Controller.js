({
	updateRecord : function(component) {
		console.log("child component update succeeded");

		component.find("trialRecE").saveRecord(
			$A.getCallback(function(saveResult){
				//console.log(saveResult);
				if (saveResult.state === "SUCCESS"){
					//happy logic here
					component.find("trialRecE").reloadRecord();
				} else if (saveResult.state === "INCOMPLETE") {
					console.log("User is offline, device doesn't support drafts.");
				} else if (saveResult.state === "ERROR"){
					component.find("leh").passErrors(saveResult.error);
				}
			})
		);
	},

	select : function(component, event) {
		console.log(event);
		var field = event.getSource().get("v.value");
		console.log(field);
		//flip from selected to not
		component.set("v.trialFieldsE."+field, !component.get("v.trialFieldsE."+field));
	},

	//after you've done your orientation story
	storySet : function(component) {
		component.set("v.trialFieldsE.Video_Watched__c", true);
		//close the modal that we're in

		component.find("trialRecE").saveRecord(
			$A.getCallback(function(saveResult){
				//console.log(saveResult);
				if (saveResult.state === "SUCCESS"){
					//happy logic here
					component.find("trialRecE").reloadRecord();
					component.find("overlayLibModal").notifyClose();
				} else if (saveResult.state === "INCOMPLETE") {
					console.log("User is offline, device doesn't support drafts.");
				} else if (saveResult.state === "ERROR"){
					component.find("leh").passErrors(saveResult.error);
				}
			})
		);

	},

	doInit : function(component) {

		var action = component.get("c.getTrialActivityId");
		action.setStorable();
		action.setCallback(this, function(a){
			var state = a.getState();
			if (state === "SUCCESS") {
				console.log(a);
				component.set("v.recordId", a.getReturnValue());

				var rec = component.find("trialRec");
				rec.set("v.recordId", a.getReturnValue());
				rec.reloadRecord();

				var recE = component.find("trialRecE");
				recE.set("v.recordId", a.getReturnValue());
				recE.reloadRecord();

			} else if (state === "ERROR") {
				console.log(a.getError());
			}
		});
		$A.enqueueAction(action);


	},







})