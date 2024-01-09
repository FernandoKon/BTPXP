sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
            onInit: function () {
                
            },

            onNavTo: function() {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);

                oRouter.navTo("InfoSector");
            }
        });
    });
