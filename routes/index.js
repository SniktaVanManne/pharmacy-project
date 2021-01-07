const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const http = require('http');
const url = require('url');  
const { body, validationResult } = require('express-validator');
const Registration = mongoose.model('Registration'); 

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', (req, res) => {
  res.render('form', {title: "Registration Form"});
});

router.get('/registrations/', (req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: "Listing Registrations", registrations });
        })
        .catch(() => { res.send("Sorry! Something went wrong!"); 
    });
});

router.get('/schools', (req, res) =>{
    const schoolQuery = url.parse(req.url, true).query;
    console.log(schoolQuery); 
    let id = schoolQuery._id;
    console.log(id); 

    Registration.find({_id: schoolQuery._id})
        .then((schoolResult) => {
            const school = schoolResult[0];
            res.render('schools', { title: "School Details", schoolResult });
        })
        .catch(() => { res.send("Sorry! Something went wrong!"); 
    });
});

router.get('/search', (req, res) =>{
    const schoolQuery = url.parse(req.url, true).query;

    // If no filters selected
    if (schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.states == "state" && schoolQuery.length == "length" && schoolQuery.medSchool == "medSchool"){
        Registration.find()
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        }); 
    }

    // One Filter Selected
    // Only Medschool Selected
    else if (schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.length == "length" && schoolQuery.states == "state"){
        Registration.find({medSchool: schoolQuery.medSchool})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        }); 
    }
    // If only State Selected
    else if (schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.length == "length" && schoolQuery.medSchool == "medSchool"){
        Registration.find({state: schoolQuery.states})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        }); 
    }
    // If only Pub/Private Selected
    else if(schoolQuery.states == "state" && schoolQuery.length == "length" && schoolQuery.medSchool == "medSchool"){
        Registration.find({private: schoolQuery.pubPrivate})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        }); 
    }
    // If only Length Selected 
    else if(schoolQuery.states == "state" && schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.medSchool == "medSchool"){
        Registration.find({length: schoolQuery.length})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        }); 
    }

    // Two Filters Selected
    // State and PubPrivate Selected
    else if(schoolQuery.length == "length" && schoolQuery.medSchool == "medSchool"){
        Registration.find({state: schoolQuery.states, private: schoolQuery.pubPrivate})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // State and Length Selected
    else if( schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.medSchool == "medSchool"){
        Registration.find({state: schoolQuery.states, length: schoolQuery.length})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // PubPrivate and Length Selected
    else if( schoolQuery.states == "state" && schoolQuery.medSchool == "medSchool"){
        Registration.find({private: schoolQuery.pubPrivate, length: schoolQuery.length})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // MedSchool and State
    else if( schoolQuery.pubPrivate == "pubPrivate" && schoolQuery.length == "length"){
        Registration.find({state: schoolQuery.states, medSchool: schoolQuery.medSchool})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // MedSchool and Private
    else if( schoolQuery.states == "state" && schoolQuery.length == "length"){
        Registration.find({pubPrivate: schoolQuery.pubPrivate, medSchool: schoolQuery.medSchool})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // MedSchool and Length
    else if( schoolQuery.states == "state" && schoolQuery.pubPrivate == "pubPrivate"){
        Registration.find({length: schoolQuery.length, medSchool: schoolQuery.medSchool})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    
    // 3 Filters Selected
    // State, PubPrivate, and Length Selected (Med excluded)
    else if( schoolQuery.medSchool == "medSchool"){
        Registration.find({state: schoolQuery.states, length: schoolQuery.length, pubPrivate: schoolQuery.pubPrivate})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // State, PubPrivate, and Med Selected (Length Excluded)
    else if( schoolQuery.length == "length"){
        Registration.find({state: schoolQuery.states, medSchool: schoolQuery.medSchool, pubPrivate: schoolQuery.pubPrivate})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // State, Length, and Med Selected (PubPrivated Excluded)
    else if( schoolQuery.pubPrivate == "pubPrivate"){
        Registration.find({state: schoolQuery.states, length: schoolQuery.length, medSchool: schoolQuery.medSchool})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    // Length, PubPrivate, and Med Selected (State Excluded)
    else if( schoolQuery.states == "state"){
        Registration.find({medSchool: schoolQuery.medSchool, length: schoolQuery.length, pubPrivate: schoolQuery.pubPrivate})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
    
    // If ALL Selected
    else{
        Registration.find({state: schoolQuery.states, private: schoolQuery.pubPrivate, length: schoolQuery.length})
            .then((registrations) => {
                res.render('index', { title: "Listing Registrations", registrations });
            })
            .catch(() => { res.send("Sorry! Something went wrong!"); 
        });
    }
   
});

router.post('/',
    [
        body('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),
        body('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email'),
    ], 
    (req, res) => {
        const errors = validationResult(req); 
        console.log(req.body); 

        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => { res.send("Thank you for your registration"); })
                .catch(() => { res.send("Sorry, something went wrong!"); });
        }else{
            res.render('form', {
                title: 'Registration Form',
                errors: errors.array(),
                data: req.body,
            });
        }
    });

module.exports = router;