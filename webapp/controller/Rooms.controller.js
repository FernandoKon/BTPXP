sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast',
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Item",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, Filter, FilterOperator, Item) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.Rooms", {
            onInit: function () {

                function getData() {
                    const request = new XMLHttpRequest();
                    request.open("GET", "/model/rooms.json", false);
                    request.send();

                    if (request.status === 200) {
                        return JSON.parse(request.responseText);
                    } else {
                        console.error("Falha ao carregar dados: " + request.status);
                        return [];
                    }
                }

                const oModel = new JSONModel();
                oModel.loadData("/model/rooms.json");

                this.getView().setModel(oModel, "rooms");

                const aRooms = getData();

                const sector = aRooms.map((item) => item.SectorName);

                const uniqueSectors = [...new Set(sector)];

                const oSectorsModel = new JSONModel(uniqueSectors);
                this.getView().setModel(oSectorsModel, "sectors");

                const oMultiComboBox = this.byId("idMultiComboBox");

                oMultiComboBox.bindItems({
                    path: "sectors>/",
                    template: new Item({
                        key: "{sectors>}",
                        text: "{sectors>}",
                    }),
                });

                const capacity = aRooms.map((item) => item.Capacity);

                const uniqueCapacity = [...new Set(capacity)];

                const oCapacityModel = new JSONModel(uniqueCapacity);
                this.getView().setModel(oCapacityModel, "capacity");

                const oComboBox = this.byId("idComboBox");

                oComboBox.bindItems({
                    path: "capacity>/",
                    template: new Item({
                        key: "{capacity>}",
                        text: "{capacity>}",
                    }),
                });
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

                const oModel = this.getView().getModel("rooms");

                const aRooms = oModel.getProperty("/") || [];

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

                this.onCloseDialog();
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
                this.sDialog.close();
            },

            onSearch: function () {
                const searchField = this.byId("idInputPesquisar");
                const sQuery = searchField.getValue();

                const oMultiComboBox = this.byId("idMultiComboBox");
                const aSelected = oMultiComboBox.getSelectedKeys();

                const oComboBox = this.byId("idComboBox");
                const oSelectedItem = oComboBox.getSelectedItem();
                const oSelectedKey = oSelectedItem ? oSelectedItem.getKey() : null;

                const aFilters = [];

                if (sQuery && sQuery.length > 0) {
                    const filter = new Filter("NameRoom", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                if (aSelected.length > 0) {
                    const filter = new Filter({
                        filters: aSelected.map(function (sSector) {
                            return new Filter("SectorName", FilterOperator.EQ, sSector);
                        }),
                    });
                    aFilters.push(filter);
                }

                if (oSelectedKey) {
                    const filter = new Filter("Capacity", FilterOperator.EQ, oSelectedKey);
                    aFilters.push(filter);
                }

                

                const oGridList = this.byId("gridListRooms");
                const oBinding = oGridList.getBinding("items");
                oBinding.filter(aFilters);
            },

            onClearFiltersPress: function () {
                const oInputPesquisar = this.byId("idInputPesquisar");
                oInputPesquisar.setValue("");

                const oMultiComboBox = this.byId("idMultiComboBox");
                oMultiComboBox.setSelectedKeys([]);

                const oComboBox = this.byId("idComboBox");
                oComboBox.setSelectedItem(null);

                const oGridList = this.byId("gridListRooms");
                const oBinding = oGridList.getBinding("items");
                oBinding.filter([]);
            },

            navToRoomDetail: function (oEvent) {
                console.log("Chamou: " + oSelectedItem.getTitle());
            },
        });
    });