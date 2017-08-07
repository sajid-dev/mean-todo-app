var express = require('express');
var router = express.Router();
var mongodb = require('mongojs');
var db = mongodb('mongodb://sajid:sajid@ds147882.mlab.com:47882/sandobx', ['todos']);


//Read all
router.get('/todos', function (req, res, next) {
    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(todos);
        }

    })
})

//Read one
router.get('/todo/:id', function (req, res, next) {
    {
        db.todos.findOne({
            _id: mongodb.ObjectId(req.params.id)
        }, function (err, todos) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(todos);
            }
        })
    }
})

//Create
router.post('/todo', function (req, res, next) {
    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    }
    else {
        db.todos.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        })
    }
})


//Update
router.put('/todo/:id', function (req, res, next) {
    var todo = req.body;
    var updObj = {};

    if (todo.isCompleted) {
        updObj.isCompleted = todo.isCompleted;
    }
    if (todo.text) {
        updObj.text = todo.text;
    }

    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    }

    else {
        db.todos.update({
            _id: mongodb.ObjectId(res.params.id)
        }, {}, function (err, result) {

            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        })

    }
})

//Delete
router.delete('/todo/:id', function (req, res, next) {
    var todo = res.body;

    db.todos.remove({
        _id: mongodb.ObjectId(res.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(result);
        }
    })
})

module.exports = router;