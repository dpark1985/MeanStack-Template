var express = require('express');
var router = express.Router();


/************************************************************************
*																		*
*							Basic Helper	 							*
*																		*
*	This server utilized the module "Everyauth"							*
*	Everyauth provides few helpers that can be easily used by routers.	*
*	
*																		*
*************************************************************************
*	req.loggedIn														*
*		Description: "return whether user is logged in or not"			*
*		return: "[True/False]"											*
*************************************************************************
*	req.usr.Login					 									*
*		Description: "return the user's login ID"						*																*   
*		return: "user's id"												* 
************************************************************************/


/* GET index */
router.get('/', function(req, res, next) {
	if(req.loggedIn){
		res.render('index', { userID: req.user.login });		
	} else {
		res.render('index' );		
	}
});

module.exports = router;



