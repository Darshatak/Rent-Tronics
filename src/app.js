const express = require("express")
const hbs = require("hbs")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const routes = require("./routes/main")
const detail = require("./models/Detail")
const port = 5556;


//get static things for website
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/static', express.static("public"))
app.use('', routes)


//(template engine)
app.set('view engine', 'hbs')
app.set("views", "views")
hbs.registerPartials("views/partials")


mongoose.set('strictQuery', false);


const main = async() => {
    await mongoose.connect("mongodb://localhost:27017/website");
    // const ProductSchema = new mongoose.Schema({
    //     Name: String
    // });
    // const ProductModel = mongoose.model('darsh4', ProductSchema);
    // let data = new ProductModel({ name: "Darsh4" });
    // let result = await data.save();
    // console.log(result)
    // detail.create({
    //     "brandName": "Rent E-Tronics",
    //     "nav1": "Home",
    //     "nav2": "Services",
    //     "nav3": "Contact US",
    //     "HeaderDiscription": "Renting electronics refers to the practice of borrowing electronic devices, such as laptops, Gaming Consoles and Desktops, for a specific period of time, typically for a fee. This can be done through a variety of rental companies or through educational institutions for students. Renting electronics can be a cost-effective solution for those who need a device temporarily, such as for a short-term project or for travel. It can also be a good option for those who are not able to purchase a device outright, or for those who are unsure about their future needs. Additionally, renting electronics can be a good way to try out a device before committing to a purchase, or to have access to the latest technology without having to constantly upgrade.",
    //     "HeaderImg": "/static/images/rent.png",
    //     "HeaderImg2": "/static/images/client-logos.png",
    //     "l1Name": "Desktop",
    //     "l1Dissc": "A desktop computer is a personal computer designed to be used on a desk or table, typically at a fixed location. It typically comes in a tower case or an all-in-one design, which incorporates the monitor and other components into the same unit.",
    //     "url1": "/desktop",
    //     "l2Name": "Laptops",
    //     "l2Dissc": "A laptop, also known as a notebook, is a portable computer that can easily be transported and used in a variety of locations. It typically includes a thin LCD or LED computer screen mounted on the inside of the upper lid of the clamshell form factor.",
    //     "url2": "/laptop",
    //     "l3Name": "Gaming Consoles",
    //     "l3Dissc": "A video game console functions like a PC and is built with the same essential components, including a central processing unit (CPU), graphics processing unit (GPU) and random access memory (RAM). To offset costs, most video game console manufacturers use older CPU versions.",
    //     "url3": "/games",
    //     "Address": "MUMBAI,MAHARASHTRA",
    //     "Email": "vyasdarshatak15866@gmail.com",
    //     "Mobile": " 9876543210"
    // })
}
main()




app.listen(process.env.PORT | 5556, () => {
    console.log('Server running at http://localhost:5556')
});