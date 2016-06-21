/*
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
*/

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.jade'); // load the index.jade file

        //console.log(req.isAuthenticated());

        if (req.isAuthenticated())
            res.redirect('/dashboard');
    });

    app.get('/preview', function(req, res) {
        res.render('preview.jade'); // load the preview.jade file

        if (req.isAuthenticated())
            res.redirect('/dashboard');
    });

    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard.jade', { user : req.user  }); // load the preview.jade file
    });

    app.get('/signUp', function(req, res) {


        res.render('signUp.jade', { message: req.flash('signupMessage')} ); // load the signUp.jade file

        console.log(req.flash('signupMessage'));

    });

    app.post('/signUp', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signUp', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signIn', function(req, res) {
        res.render('signIn.jade', { message: req.flash('loginMessage')} ); // load the signIn.jade file
    });

    app.post('/signIn', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signIn', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email','user_location','user_birthday','user_photos'] }));

    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect : '/dashboard',
        failureRedirect : '/signUp'
    }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/signUp');
}