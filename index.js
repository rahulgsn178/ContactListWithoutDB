const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req, res, next) {
//     console.log("Middleware 1 called");
//     next();
// });
// // middleware 2
// app.use(function(req, res, next) {
//     console.log("Middleware 2 called");
//     next();
// });

var contactList = [];

app.get('/', function(req, res) {
    return res.render('home', {
        title: 'Contact List Express App',
        contact_list: contactList
    });

    
}); 

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "let's play with ejs"
    });
}); 

app.post('/create-contact', function(req, res) {
    // res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    
    // when using array for storing the data
    contactList.push(req.body);
    return res.redirect('back');

   
});
    

app.get('/delete-contact', function(req, res) {
    
   let phone = req.query.phone;
   console.log(phone);

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex, 1);
    }

    return res.redirect('back');

});


app.listen(port, function(err) {
    if(err) {
        console.log("Error:", err);
    }

    console.log("My express server is running on Port:", port);
    
});