/**
 * Created by Admin on 1/2/2017.
 */
var express=require('express');
var routes=function(Book){
    var bookRouter=express.Router();
    bookRouter.route('/books')
        .post(function(req,res){
            var book=new Book(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get(function(req,res){
            var query=req.query;
            Book.find(query,function(err,books){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(books);
                }
            });
        });
    bookRouter.route('/:bookid')
            .get(function(req,res){
                Book.findById(req.params.bookid,function(book,err){
                if(err){
                    res.status(500).send(err);
                }
                else{
                    res.json(book)
                }
            });
            })
            .put(function(req,res){
                Book.findById(req.params.bookid,function(err,book){
                    if(err){
                        res.status(500).send(err);
                    }
                    else {
                        book.title = req.body.title;
                        book.author = req.body.author;
                        book.genre = req.body.genre;
                        book.read = req.body.read;
                        book.save();
                        res.json(book);
                    }
                });
            });
    return bookRouter;
}

module.exports=routes;