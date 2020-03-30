const express = require('express');
const constants = require('../utilities/constants')
const router = express.Router();

//import routers from different controllers
const rewardRoute = require('./rewardController');

//add controllers to the main router
router.use(rewardRoute);

//add default error handling routes
//if api path not found
router.all('*', (req,res)=>{
    res.status(constants.STAT_NOT_FOUND);
    res.json({error:{message:constants.NOT_FOUND}});
});

//Catch all errors
router.use((err, req, res, next) => {
    //Check error type
    if(err.type){
        res.status(err.type);
    } else {
        //Default Internal server error 500
        res.status(constants.STAT_SYS_ERROR)
        err.message = constants.SYSTEM_ERROR;
    }
    res.json({error:{message:err.message}});
});

module.exports = router;


