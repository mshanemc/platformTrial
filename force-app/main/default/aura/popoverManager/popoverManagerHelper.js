({
    nextPopover : function(component) {
        this.markComplete(component);

        //set the next popover
        component.set("v.activePopover", component.get("v.activePopover") + 1 );

        var popovers = component.get("v.popovers");
        var current = popovers[component.get("v.activePopover")];

        component.find("frdE").set("v.recordId", current.Id);
        component.find("frdE").reloadRecord();

        $A.createComponent(
            "c:walkthroughNode",
            {
                "header" : current.Header__c || null,
                "bodyText" : current.BodyText__c,
                "stepNumber" : component.get("v.activePopover")+1,
                "stepCount" : popovers.length,
                "nextButtonText" : current.Next_Button_Label__c,
                "showNext" : current.Show_Next_Button__c,
                "closeMessage" : current.Close_Message__c,
                "nextAction" : current.Next_Button_Action_Override__c || component.get("c.next")
            },
            function(node, status){
                if (status === "SUCCESS"){
                    component.find('overlayLib').showCustomPopover({
                        body: node,
                        referenceSelector: current.Selector__c,
                        cssClass: current.CSS__c
                    });
                }
            }
        )
    },

    markComplete : function(component) {
        //update the last popover
        if (component.get("v.activePopover")>=0){
            component.set("v.targetFields.Completed__c", true);
            component.find("frdE").saveRecord(
                $A.getCallback(function(saveResult){
                    //console.log(saveResult);
                    if (saveResult.state === "SUCCESS"){

                    } else if (saveResult.state === "INCOMPLETE") {
                        console.log("User is offline, device doesn't support drafts.");
                    } else if (saveResult.state === "ERROR"){
                        component.find("leh").passErrors(saveResult.error);
                    }
                })
            );
        }
    },
})
