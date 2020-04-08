
const express = require('express');
    var router = express.Router();
    const mongoose = require('mongoose');
    const Course = mongoose.model('Course');
    var mongodb     = require('mongodb');


    router.get('/', (req, res) => {
        res.render("course/addOrEdit", {
            viewTitle: "Insert course"
        });
    });
    
    router.post('/', (req, res) => {
        if (req.body._id == '')
            insertRecord(req, res);
            else
            updateRecord(req, res);
    });
    
    
    function insertRecord(req, res) {
        var course = new Course();
        course.CourseTitle = req.body.CourseTitle;
        course.CourseCode = req.body.CourseCode;
        course.Credits = req.body.Credits;
        course.CourseContents = req.body.CourseContents;
        course.TextBooks = req.body.TextBooks;
        course.ReferenceBooks = req.body.ReferenceBooks;
        course.SubjectTeacher = req.body.SubjectTeacher;
        course.OptedStudents = req.body.OptedStudents;
        course.PassedStudents = req.body.PassedStudents;
        course.save((err, doc) => {
            if (!err)
                res.redirect('course/list');
            
                else
                    console.log('Error during record insertion : ' + err);
            }
          );
        }   
    
    function updateRecord(req, res) {
        Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('course/list'); }
            
                else
                    console.log('Error during record update : ' + err);
            }
        );
        }   
    
    
    router.get('/list', (req, res) => {
        Course.find((err, docs) => {
            if (!err) {
                res.render("course/list", {
                    list: docs
                });
            }
            else {
                console.log('Error in retrieving course list :' + err);
            }
        });
    });
    
    
    
    
    router.get('/:id', (req, res) => {
        Course.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("course/addOrEdit", {
                    viewTitle: "Update Course",
                    course: doc
                });
            }
        });
    });
    
    router.get('/delete/:id', (req, res) => {
        Course.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('/course/list');
            }




 else { console.log('Error in course delete :' + err); }
        });
    });
    
    
    

    module.exports = router;

