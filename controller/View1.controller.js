sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("SapUi5displaySmartformasPdf.controller.View1", {

		onInit: function() {

			debugger;

			var oMatrix = sap.ui.commons.layout.MatrixLayout({
				id: "matrix4",
				layoutFixed: true,
				width: "1000px",
				columns: 5,
				widths: ['150px', '250px', '200px', '200px', '200px']
			});

			var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
				colSpan: 5
			});
			var oTV = new sap.ui.commons.TextView({
				id: 'TV-Head',
				text: 'Invoice Details for Customer',
				design: sap.ui.commons.TextViewDesign.H1
			});
			oCell.addContent(oTV);
			oMatrix.createRow(oCell);
			var oLabel = new sap.ui.commons.Label({
				id: 'L-Name',
				text: 'Customer Number'
			});
			var oTF = new sap.ui.commons.TextField({
				id: 'TF-Name',
				tooltip: 'Customer Number',
				width: '200px'
			});
			oLabel.setLabelFor(oTF);
			oMatrix.createRow(oLabel, oTF);
			//Create a panel and html instances
			var oPanel = new sap.ui.commons.Panel();
			var html = new sap.ui.core.HTML();

			var oButton = new sap.ui.commons.Button({
				id: 'B-Create',
				text: 'Display PDF',
				width: '10em',
				press: function() {

					debugger;

					var sRead = "/PdfSet(customer='" + oTF.getValue() + "')";

					var oParams = {};

					oParams.success = function(oData, oResponse) {
						debugger;
						sap.ui.core.BusyIndicator.hide();
						var pdfURL = oData.url;

						html.setContent("<iframe src=" + pdfURL + " width='700' height='700'></iframe>");
						oPanel.addContent(html);

					}.bind(this);
					oParams.error = function(oError) {
						debugger;
						sap.ui.core.BusyIndicator.hide();

					}.bind(this);

					oParams.async = true;

					sap.ui.core.BusyIndicator.show(0);
					this.getView().getModel().read(sRead, oParams);

				}.bind(this)

			});

			oMatrix.createRow(oButton);

			this.getView().byId("pageId").addContent(oMatrix);
			this.getView().byId("pageId").addContent(oPanel);

		}

	});
});