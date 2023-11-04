const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a single record by id
recordRoutes.route("/record/:address").get(async function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { address: req.params.address };
    console.log(req.params.address);
    const response = await db_connect 
        .collection("records")
        .find(myquery).toArray();
        console.log(response)
        if (response){
            res.status(200).send(JSON.stringify({data: response}))
        }

        
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(async function (req, response) {
    let db_connect = dbo.getDb();
    console.log(req.body)
    let contact = req.body.data;
    
   await db_connect.collection("records").insertOne(contact, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = recordRoutes;