({
	stepChange: function (component, event, helper) {
		console.log("stepChanged");
		console.log(component.get("v.trialFields"));
		component.find("stepRec").reloadRecord();
		console.log(component.get("v.stepFields"));

		if (component.get("v.trialFields.Video_Watched__c")){
			helper.loadPopovers(component);

			//fire an event to let everyone know that it's open?
			var msg = $A.get("e.ltng:sendMessage");
			console.log("message:"); console.log(msg);
			msg.setParams({"message" : "CurrentTaskOpened", "channel" : "trialMessages"});
			msg.fire();
		}
	},

	fullReload: function (component, event, helper) {
		console.log("fullReload");
		component.find("trialRec").reloadRecord();
		component.find("stepRec").reloadRecord();
	},

	vid: function (component, event, helper) {
		console.log(event.getSource().get("v.value"));
		var nav = $A.get("e.force:navigateToComponent");
		nav.setParams({
			componentDef: "c:youtubeVideoComponent",
			componentAttributes: {
				videoId: component.get("v.stepFields." + event.getSource().get("v.value"))
			}
		});
		nav.fire();
	},

	doInit: function (component, event, helper) {

		var action = component.get("c.getTrialActivityId");
		action.setStorable();
		action.setCallback(this, function (a) {
			var state = a.getState();
			if (state === "SUCCESS") {
				console.log(a.getReturnValue());
				var rec = component.find("trialRec");
				rec.set("v.recordId", a.getReturnValue());
				rec.reloadRecord();

				// var rec2 = component.find("stepRec");
				// rec2.set("v.recordId", a.getReturnValue());
				// rec2.reloadRecord();

			} else if (state === "ERROR") {
				console.log(a.getError());
			}
		});
		$A.enqueueAction(action);



	},

})