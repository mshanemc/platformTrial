({
    next : function(component, event, helper) {
        var action = component.get("v.nextAction");
        $A.enqueueAction(action);
    },

    handleEvent : function(component, event, helper){
        console.log("received event in walkthrough");
        console.log(event);
        if (event.getParam("channel")==="trialMessages"){
            console.log("channel match");
            if (event.getParam("message")){
                console.log("has message :");
                console.log(event.getParam("message"));
                console.log("does it match closeMessage--" + component.get("v.closeMessage"));
                if (event.getParam("message")===component.get("v.closeMessage")){
                    var action = component.get("v.nextAction");
                    $A.enqueueAction(action);

                    console.log("trying to do a close action");
                    //this needs to close itself
                    component.find("overlayLib").notifyClose();
                }
            }
        }
    }
})
