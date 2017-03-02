/**
 * Created by Admin on 1/2/2017.
 */
var express=require('express');
var app=express();
var mongoose=require('mongoose'),bodyparser=require('body-parser');
var db=mongoose.connect('mongodb://admin:admin@ds153667.mlab.com:53667/mytasklist_new');
var  Book=require('./models/bookmodel');
var Routes=require('./Routes/BookRoutes')(Book);
var port= process.env.PORT||3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/api/books',Routes);
app.use('/api/author',Routes);
app.get('/',function(req,res){
    res.send('welcome');

});

app.listen(port,function(){
    console.log('Running on ' + port);
});