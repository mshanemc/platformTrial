/* globals _ */
({
	doInit : function(component, event, helper) {
		//	public static list<Path_Activity__c> getAllWithStatus(){
		console.log("all task init");
		let action = component.get("c.getAllWithStatus");
		action.setCallback(this, function(a){
			let state = a.getState();
			if (state === "SUCCESS") {
				console.log(a.getReturnValue());
				//let paths = _.orderBy(_.groupBy(a.getReturnValue(), 'Path_Name__c'), ["Path_Sequence__c"], ["asc"]);
				let paths = _.chain(a.getReturnValue()).orderBy(["Path_Sequence__c"], ["asc"]).groupBy('Path_Name__c').value();
				console.log(paths);
				let finalPaths = [];
				_.forEach(paths, function(value, key){
					finalPaths.push({
						"pathName" : key,
						"steps" : value
					});
				});
				console.log(finalPaths);
				component.set("v.paths", finalPaths);
			} else if (state === "ERROR") {
				console.log(a.getError());
			}
		});
		$A.enqueueAction(action);
	},

	change : function(component, event, helper) {
		console.log("changed button!");
		//console.log(event.getSource().get("v.value"));
		component.set("v.trialFields.Current_Step__c", event.getSource().get("v.value"));

		component.find("trialRec").saveRecord(
			$A.getCallback(function(saveResult){
				//console.log(saveResult);
				if (saveResult.state === "SUCCESS"){
					//happy logic here
					console.log("success!");
					component.find("trialRec").reloadRecord();
				} else if (saveResult.state === "INCOMPLETE") {
					console.log("User is offline, device doesn't support drafts.");
				} else if (saveResult.state === "ERROR"){
					component.find("leh").passErrors(saveResult.error);
				}
			})
		);
		//$A.get('e.force:refreshView').fire();
	},

})