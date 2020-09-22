var invoiceModel = require('../models/invoiceModel.js');

/**
 * invoiceController.js
 *
 * @description :: Server-side logic for managing invoices.
 */
module.exports = {

    /**
     * invoiceController.list()
     */
    list: function (req, res) {
        invoiceModel.find(function (err, invoices) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            return res.json(invoices);
        });
    },

    /**
     * invoiceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({_id: id}, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice.',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }
            return res.json(invoice);
        });
    },

    /**
     * invoiceController.create()
     */
    create: function (req, res) {
        var invoice = new invoiceModel({
			month : req.body.month,
			year : req.body.year,
			fee : req.body.fee,
			date : req.body.date

        });

        invoice.save(function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating invoice',
                    error: err
                });
            }
            return res.status(201).json(invoice);
        });
    },

    /**
     * invoiceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        invoiceModel.findOne({_id: id}, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting invoice',
                    error: err
                });
            }
            if (!invoice) {
                return res.status(404).json({
                    message: 'No such invoice'
                });
            }

            invoice.month = req.body.month ? req.body.month : invoice.month;
			invoice.year = req.body.year ? req.body.year : invoice.year;
			invoice.fee = req.body.fee ? req.body.fee : invoice.fee;
			invoice.date = req.body.date ? req.body.date : invoice.date;
			
            invoice.save(function (err, invoice) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating invoice.',
                        error: err
                    });
                }

                return res.json(invoice);
            });
        });
    },

    /**
     * invoiceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        invoiceModel.findByIdAndRemove(id, function (err, invoice) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the invoice.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
