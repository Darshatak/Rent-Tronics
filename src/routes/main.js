const bodyParser = require("body-parser")
const { response, request } = require("express")
const express = require("express")
const { route } = require('express/lib/application')
const MongoClient = require('mongodb').MongoClient;

const Detail = require("../models/Detail")
const Contact = require("../models/Contact")
const Book = require("../models/book")
const ObjectId = require('mongodb').ObjectId;

const routes = express.Router()

const url = 'mongodb://localhost:27017';
const dbName = 'website';

routes.post('/Delivered', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error connecting to the database');
        } else {
            const db = client.db(dbName);
            const collection = db.collection('bookings');
            collection.updateOne({ _id: ObjectId(req.body.id) }, { $set: { Order_Delevered: "Delivered" } }, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error updating the document');
                } else {
                    res.redirect('/orders');
                }
                client.close();
            });
        }
    });
});
routes.post('/NDelivered', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error connecting to the database');
        } else {
            const db = client.db(dbName);
            const collection = db.collection('bookings');
            collection.updateOne({ _id: ObjectId(req.body.id) }, { $set: { Order_Delevered: "Not Delivered" } }, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error updating the document');
                } else {
                    res.redirect('/orders');
                }
                client.close();
            });
        }
    });
});



routes.post('/delete', (req, res) => {
    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error connecting to the database');
        } else {
            const db = client.db(dbName);
            const collection = db.collection('bookings');
            collection.deleteOne({ _id: ObjectId(req.body.id) }, (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error deleting data from the collection');
                } else {
                    res.redirect('/orders');
                }
                client.close();
            });
        }
    });
});


routes.get("/", async(req, res) => {
    const details = await Detail.findOne({ "_id": "6473518abb449e7011a0f55d" })
        // console.log(details)



    res.render("index", {
        details: details
    })
})



routes.get("/orders", async(req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'website';

            MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Error connecting to the database');
                        } else {
                            const db = client.db(dbName);
                            const collection = db.collection('bookings');
                            collection.find({}).toArray((error, result) => {
                                        if (error) {
                                            console.log(error);
                                            res.status(500).send('Error fetching data from the collection');
                                        } else {
                                            res.send(`
                    <!doctype html>
                    <html lang="en">

                    <head>
                        <style>
                            #submit:hover {
                      background-color: blueviolet;
                    }
                    td {
                        padding-top: 5px;
                        padding-bottom: 10px;
                        padding-left: 15px;
                        padding-right: 20px;
                      }
                        </style>
                        <title>Desktop</title>
                        <!-- Required meta tags -->
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

                        <!-- Font -->
                        <link rel="dns-prefetch" href="//fonts.googleapis.com">
                        <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500" rel="stylesheet">

                        <!-- Bootstrap CSS -->
                        <link rel="stylesheet" href="/static/css/bootstrap.min.css">
                        <!-- Themify Icons -->
                        <link rel="stylesheet" href="/static/css/themify-icons.css">
                        <!-- Owl carousel -->
                        <link rel="stylesheet" href="/static/css/owl.carousel.min.css">
                        <!-- Main css -->
                        <link href="/static/css/style.css" rel="stylesheet">
                    </head>

                    <body data-spy="scroll" data-target="#navbar" data-offset="30">

                        <!-- Nav Menu -->

                            <div class="nav-menu fixed-top">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-12">
                                        <nav class="navbar navbar-dark navbar-expand-lg">
                                            <h3><a style="color:bisque;" class="nav-link">Rent_Electronics</a> </h3>
                                            <div class="collapse navbar-collapse" id="navbar">
                                                <ul class="navbar-nav ml-auto">
                                                    <li class="nav-item"> <a href="/" class="btn btn-outline-light my-3 my-sm-0 ml-lg-3">Home <span class="sr-only">(current)</span></a> </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <header class="bg-gradient" id="home">

                            <h3 style="color: white;">Orders List</h3>
                            <div class="d-flex justify-content-center row">
                                <div class="row p-5 bg-white border rounded mt-5">

                                                <table border="1"style="text-align: center;color:black;">
                                                  <tr>
                                                    <th>Email</th>
                                                    <th>Product Order</th>
                                                    <th>From Date</th>
                                                    <th>To date</th>
                                                    <th>Status</th>
                                                    <th colspan="3">Functions</th>
                                                    
                                                  </tr>
                                                  ${result.map(document => `
                                                    <tr >
                                                      <td>${document.email}</td>
                                                      <td >${document.Unit}</td>
                                                      <td>${document.Fdate}</td>
                                                      <td>${document.Tdate}</td>
                                                      <td>${document.Order_Delevered}</td>
                                                      <td>
                                                      <form method="post" action="/Delivered" >
                                                      <input type="hidden" name="id" value="${document._id}">
                                                      <input type="submit" value="Delivered">
                                                    </form>
                                                    </td>
                                                    <td>
                                                    <form method="post" action="/NDelivered">
                                                    <input type="hidden" name="id" value="${document._id}">
                                                    <input type="submit" value="Not Delivered">
                                                  </form>
                                                  </td>
                                                  <td>
                                                  <form method="post" action="/delete">
                                                  <input type="hidden" name="id" value="${document._id}">
                                                  <input type="submit" value="Delete">
                                                </form>
                                                </td>
                                                    </tr>
                                                  `).join('')}
                                                </table>
</div>
                                </div>
                        </div>


                            <br>
                            <br>
                            <br>
                        </header>


                        <div class="light-bg py-5 ">
                            <div class="container ">
                                <div class="row ">
                                    <div class="col-lg-6 text-center text-lg-left ">
                                        <p class="mb-2 "> <span><img src="/static/images/address.png" style="height: 35px;"></span>Mumbai</p>
                                        <div class=" d-block d-sm-inline-block ">
                                            <p class="mb-2 ">
                                                <span><img src="/static/images/mail.png" style="height: 25px;"></span> <a class="mr-4 " href="mailto:vyasdarshatak15866@gmail.com ">vyas.darshatak15866@gmail.com</a>
                                            </p>
                                        </div>
                                        <div class="d-block d-sm-inline-block ">
                                            <p class="mb-0 ">
                                                <span><img src="/static/images/phone.png" style="height: 25px;"></span> <a href="tel:51836362800 ">9241115686</a>
                                            </p>
                                        </div>

                                    </div>
                                    <div class="col-lg-6 ">
                                        <div class="social-icons ">
                                            <a href="https://www.facebook.com/darshatakvyas" target="_blank"><span ><img src="/static/images/insta.png" style="height: 25px;"></span></a>
                                            <a href="https://twitter.com/darshatakvyas" target="_blank"><span ><img src="/static/images/twitter.png" style="height: 35px;"></span></a>
                                            <a href="https://www.instagram.com/darshatak_vyas/?hl=en" target="_blank"><span><img src="/static/images/Facebook.png" style="height: 25px;"></span></a>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        <!-- // end .section -->
                        <footer class="my-5 text-center ">
                            <p class="mb-2 "><small>COPYRIGHT © 2021. ALL RIGHTS RESERVED BY <a href="/login/LAR/T&C.html ">Darshatak</a></small></p>
                        </footer>


                        <!-- jQuery and Bootstrap -->
                        <script src="/static/js/jquery-3.2.1.min.js"></script>
                        <script src="/static/js/bootstrap.bundle.min.js"></script>
                        <!-- Plugins JS -->
                        <script src="/static/js/owl.carousel.min.js"></script>
                        <!-- Custom JS -->
                        <script src="/static/js/script.js"></script>


                    </body>

                    </html>
                      `);
                }
                client.close();
            });
        }
    });
});

module.exports = routes;




routes.get("/desktop", async(req, res) => {
    const details = await Detail.findOne({ "_id": "6473518abb449e7011a0f55d" })
    res.render("desktop", {
        details: details
    })
})

routes.get("/laptop", async(req, res) => {
    const details = await Detail.findOne({ "_id": "6473518abb449e7011a0f55d" })
    res.render("laptop", {
        details: details
    })
})

routes.get("/games", async(req, res) => {
    const details = await Detail.findOne({ "_id": "6473518abb449e7011a0f55d" })
    res.render("games", {
        details: details
    })
})


routes.post("/process-book-form", async(request, response) => {
    console.log("Form is Submitted")
    console.log(request.body)

    //Save Data
    try {
        const data = await Book.create(request.body)
        console.log(data)
        response.redirect("/orders")

    } catch (e) {
        console.log(e)
        response.redirect("/orders")
    }
})




routes.post("/process-contact-form", async(request, response) => {
    console.log("Form is Submitted")
    console.log(request.body)

    //Save Data
    try {
        const data = await Contact.create(request.body)
        console.log(data)
        response.redirect("/")

    } catch (e) {
        console.log(e)
        response.redirect("/")
    }
})

module.exports = routes