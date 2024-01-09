sap.ui.define([],
    function () {
        "use strict";

        return {
            getFloorText: function(sFloor) {
                if (sFloor == 1) {
                    return "1º - Primeiro";
                } else if (sFloor == 2) {
                    return "2º - Segundo";
                } else if (sFloor == 3) {
                    return "3º - Terceiro";
                } else if (sFloor == 4) {
                    return "4º - Quarto";
                } else if (sFloor == 5) {
                    return "5º - Quinto";
                } else if (sFloor == 5) {
                    return "6º - Sexto";
                } else if (sFloor == 5) {
                    return "7º - Sétimo";
                }
            }
        }
    }
)