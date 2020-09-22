var groupModel = require('../models/groupModel.js');

/**
 * groupController.js
 *
 * @description :: Server-side logic for managing groups.
 */
module.exports = {

    /**
     * groupController.list()
     */
    list: function (req, res) {
        groupModel.find(function (err, groups) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting group.',
                    error: err
                });
            }
            return res.json(groups);
        });
    },

    /**
     * groupController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        groupModel.findOne({_id: id}, function (err, group) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting group.',
                    error: err
                });
            }
            if (!group) {
                return res.status(404).json({
                    message: 'No such group'
                });
            }
            return res.json(group);
        });
    },

    /**
     * groupController.create()
     */
    create: function (req, res) {
        var group = new groupModel({
			title : req.body.title,
			schedule : req.body.schedule

        });

        group.save(function (err, group) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating group',
                    error: err
                });
            }
            return res.status(201).json(group);
        });
    },

    /**
     * groupController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        groupModel.findOne({_id: id}, function (err, group) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting group',
                    error: err
                });
            }
            if (!group) {
                return res.status(404).json({
                    message: 'No such group'
                });
            }

            group.title = req.body.title ? req.body.title : group.title;
			group.schedule = req.body.schedule ? req.body.schedule : group.schedule;
			
            group.save(function (err, group) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating group.',
                        error: err
                    });
                }

                return res.json(group);
            });
        });
    },

    /**
     * groupController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        groupModel.findByIdAndRemove(id, function (err, group) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the group.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
