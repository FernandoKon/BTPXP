sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "com/lab2dev/btpexperience/model/formatter",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.InfoSector", {
            formatter: formatter,

            onInit: function () {
                const oModel = new JSONModel();
                oModel.loadData("/model/setores.json");

                this.getView().setModel(oModel, "sector")

            },

            onOpenDialog: function () {
                if (!this.dialog) {
                    this.dialog = sap.ui.xmlfragment(
                        "com.lab2dev.btpexperience.view.fragments.EditData",
                        this
                    );
                    this.getView().addDependent(this.dialog);
                }

                this.dialog.open();
            },

            onOpenAddRoomDialog: function () {
                if (!this.sDialog) {
                    this.sDialog = sap.ui.xmlfragment(
                        this.getView().getId(),
                        "com.lab2dev.btpexperience.view.fragments.AddRoom",
                        this
                    );
                    this.getView().addDependent(this.sDialog);
                }

                this.sDialog.open();
            },

            onCloseDialog: function () {
                if (this.dialog && this.dialog.isOpen()) {
                    this.dialog.close();
                }

                if (this.sDialog && this.sDialog.isOpen()) {
                    this.sDialog.close();
                }
            },

            editData: function () {
                const inputRoom = sap.ui.getCore().byId("inputRoom").getValue();
                const inputFloor = sap.ui.getCore().byId("inputFloor").getValue();
                const inputDescription = sap.ui.getCore().byId("inputDescription").getValue();

                if (!inputRoom || !inputFloor || !inputDescription) {
                    return MessageToast.show("Preencha todos os campos obrigatórios!")
                };
                if (isNaN(inputRoom)) {
                    return MessageToast.show("A quantidade de salas precisa ser um número!")
                };
                if (isNaN(inputFloor)) {
                    return MessageToast.show("O andar precisa ser um número!")
                };

                const oModel = this.getView().getModel("sector");

                oModel.setProperty("/QRooms", inputRoom);
                oModel.setProperty("/Floor", inputFloor);
                oModel.setProperty("/Description", inputDescription);

                oModel.refresh();

                this.dialog.close();
            },

            addRoom: function () {
                const inputNewNameSector = sap.ui.getCore().byId("inputNewNameSector").getValue();
                const inputNewNameRoom = sap.ui.getCore().byId("inputNewNameRoom").getValue();
                const inputNameRoomCapitalized = inputNewNameRoom.charAt(0).toUpperCase() + inputNewNameRoom.slice(1);
                const inputNewCapacity = sap.ui.getCore().byId("inputNewCapacity").getValue();
                const inputNewDescription = sap.ui.getCore().byId("inputNewDescription").getValue();
                const inputNewCuriosity = sap.ui.getCore().byId("inputNewCuriosity").getValue();

                if (!inputNewNameSector || !inputNewNameRoom || !inputNewCapacity || !inputNewDescription || !inputNewCuriosity) {
                    return MessageToast.show("Preencha todos os campos obrigatórios!")
                };
                if (isNaN(inputNewCapacity)) {
                    return MessageToast.show("A capacidade da sala precisa ser um número!")
                };

                //const oFileUploader = sap.ui.getCore().byId("fileUploader");

                //oFileUploader.checkFileReadable().then(function() {
                //    oFileUploader.upload();
                //}, function(error) {
                //   MessageToast.show("O arquivo não pode ser lido.");
                //}).then(function() {
                //    oFileUploader.clear();
                //});

                const oModel = this.getView().getModel("sector");

                const aRooms = oModel.getProperty("/Rooms") || [];

                const newRoom = {
                    SectorName: inputNewNameSector,
                    NameRoom: inputNameRoomCapitalized,
                    Capacity: inputNewCapacity,
                    // Description: inputDescription,
                    // Curiosity: inputCuriosity,
                    // Background: oFileUploader
                };

                aRooms.push(newRoom);

                oModel.setProperty("/Rooms", aRooms);

                oModel.refresh();

                this.sDialog.close()
            },

        });
    });