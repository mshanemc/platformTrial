({
	doInit : function(component) {
		//some initial type checking!
		if (component.get("v.valueType") === 'string'){
			component.set("v.realValue", component.get("v.value"));
		} else if (component.get("v.valueType") === "integer"){
			component.set("v.realValue", parseInt(component.get("v.value")));
		} else if (component.get("v.valueType") === "boolean"){
			if (component.get("v.value")==='true'){
				component.set("v.realValue", true);
			} else if (component.get("v.value")==='false'){
				component.set("v.realValue", false);
			} else {
				console.log("invalid value for boolean type: " + component.get("v.value"));
				return;
			}
		} else {
			console.log("invalid valueType: " + component.get("v.valueType"));
			return;
		}

		let fields = [];
		fields.push(component.get("v.field"));
		//fields.push(...component.get("v.parentFields"));
		console.log(fields);
		component.find("frd").set("v.fields", fields); //make the frd component load these fields
		component.find("frd").set("v.recordId", component.get("v.recordId"));
		component.find("frd").reloadRecord();

	},

	setValue : function(component) {
		let f = component.get("v.targetFields");

		f[component.get("v.field")] = component.get("v.realValue");
		component.set("v.targetFields", f);
		console.log(component.get("v.realValue"));
		console.log(component.get("v.targetFields"));

		component.find("frd").saveRecord(
			$A.getCallback(function(saveResult){
				console.log(saveResult);
				if (saveResult.state === "SUCCESS"){
					if (component.get("v.onSuccess")){
						let action = component.get("v.onSuccess");
						$A.enqueueAction(action);
					}
					component.find("frd").reloadRecord();
				} else if (saveResult.state === "INCOMPLETE") {
					console.log("User is offline, device doesn't support drafts.");
				} else if (saveResult.state === "ERROR"){
					component.find("leh").passErrors(saveResult.error);
				}
			})
		);
	}
})