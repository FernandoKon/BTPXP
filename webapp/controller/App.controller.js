sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("com.lab2dev.btpexperience.controller.App", {
        onInit: function() {
        },

        onTabSelect: function (oEvent) {
          const sKey = oEvent.getParameter("item").getKey();
  
          const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  
          oRouter.navTo(sKey);
        },
        
      });
    }
  );
  