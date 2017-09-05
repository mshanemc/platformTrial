({
    setPopovers : function(component) {
        var action = component.get("c.getWalkthroughsByGrouping");
        action.setParams({
            manualGrouping : "intro"
        });
        action.setCallback(this, function(a){
            var state = a.getState();
            if (state === "SUCCESS") {
                console.log(a);
                component.set("v.popovers", a.getReturnValue());
            } else if (state === "ERROR") {
                console.log(a.getError());
            }
        });
        $A.enqueueAction(action);
    }
})
