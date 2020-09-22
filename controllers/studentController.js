var studentModel = require('../models/studentModel.js');

/**
 * studentController.js
 *
 * @description :: Server-side logic for managing students.
 */
module.exports = {

    /**
     * studentController.list()
     */
    list: function (req, res) {
        studentModel.find(function (err, students) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            return res.json(students);
        });
    },

    /**
     * studentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }
            return res.json(student);
        });
    },

    /**
     * studentController.create()
     */
    create: function (req, res) {
        var student = new studentModel({
			name : req.body.name,
			idNumber : req.body.idNumber,
			dateOfBirth : req.body.dateOfBirth,
			group : req.body.group,
			objectId : req.body.objectId,
			invoices : req.body.invoices

        });

        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }
            return res.status(201).json(student);
        });
    },

    /**
     * studentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        studentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student',
                    error: err
                });
            }
            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }

            student.name = req.body.name ? req.body.name : student.name;
			student.idNumber = req.body.idNumber ? req.body.idNumber : student.idNumber;
			student.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : student.dateOfBirth;
			student.group = req.body.group ? req.body.group : student.group;
			student.objectId = req.body.objectId ? req.body.objectId : student.objectId;
			student.invoices = req.body.invoices ? req.body.invoices : student.invoices;
			
            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating student.',
                        error: err
                    });
                }

                return res.json(student);
            });
        });
    },

    /**
     * studentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        studentModel.findByIdAndRemove(id, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the student.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
