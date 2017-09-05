({
    doInit : function(component, event, helper) {
        if (component.get("v.startOnInit")){
            helper.nextPopover(component);
        }
    },

    go : function(component, event, helper) {
        helper.nextPopover(component);
    },

    add : function(component, event, helper) {
       var existing = component.get("v.popovers");
       var newP = event.getParam("arguments").newPopovers;

       component.set("v.popovers", existing.concat(newP));
    },

    next: function(component, event, helper) {
        helper.nextPopover(component);
    }
})
