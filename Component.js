sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"SapUi5displaySmartformasPdf/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("SapUi5displaySmartformasPdf.Component", {

		metadata: {
			"version": "1.0.0",
			"rootView": {
				viewName: "SapUi5displaySmartformasPdf.view.View1",
				type: sap.ui.core.mvc.ViewType.XML
			},
			"dependencies": {
				"libs": ["sap.ui.core", "sap.m", "sap.ui.layout"]
			},
			"config": {
				"i18nBundle": "SapUi5displaySmartformasPdf.i18n.i18n",
				"icon": "",
				"favIcon": "",
				"phone": "",
				"phone@2": "",
				"tablet": "",
				"tablet@2": "",
				serviceConfig: {
					name: "ZPDF_SERVICE_SRV",
					serviceUrl: "/sap/opu/odata/sap/ZPDF_SERVICE_SRV/"
				}
			}
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * In this method, the resource and application models are set.
		 * @public
		 * @override
		 */
		init: function() {
			var mConfig = this.getMetadata().getConfig();

			// set the i18n model
			this.setModel(models.createResourceModel(mConfig.i18nBundle), "i18n");

			var sServiceUrl = mConfig.serviceConfig.serviceUrl;

			var oConfig = {
				metadataUrlParams: {},
				json: true,
				// loadMetadataAsync : true,
				defaultBindingMode: "OneWay",
				defaultCountMode: "None",
				useBatch: true
			};

			// Create and set domain model to the component
			var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUrl, oConfig);
			this.setModel(oModel);

			// Set device model
			var oDeviceModel = new sap.ui.model.json.JSONModel({
				isTouch: sap.ui.Device.support.touch,
				isNoTouch: !sap.ui.Device.support.touch,
				isPhone: sap.ui.Device.system.phone,
				isNoPhone: !sap.ui.Device.system.phone,
				listMode: sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
				listItemType: sap.ui.Device.system.phone ? "Active" : "Inactive"
			});
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		}
	});
});