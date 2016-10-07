var tokenGen = require("../utils/tokengen.js");

function User(userID, ttl){
	this.userID = userID;
	this.ttl = ttl;
}

//Token will be the key of the map

var userList = {};

function addUserToMap(userID, ttl){
	var genToken = token();
	addToNewUserList(genToken, userID, ttl);
	return genToken;
}

function addToNewUserList(token, userID, ttl){
	if(!checkToken(token)){
		userList[token] = new User(userID, ttl);
	}
	return false
}

function removeUser(token){
	if(checkToken(token)){
		var userID = userList[token].userID;
		delete userList[token];
		return userID;
	}
	return false;
}


function checkToken(token){
	if(userList.hasOwnProperty(token)){
		return true;
	} else{
		return false;
	}
}

function checkTokenTTL(token){
	if(checkToken(token)){
		if(userList[token].ttl
	}

}

function checkUserAlive(token){
	if(checkToken(token) && checkTokenTTL(token)){
		return true;
	}
}

function getUserID(token){
	if(checkUserAlive){
		var currentUserID = userList[token].userID
		return currentUserID;
	}else{
		return false;	
	}
}

/** Checks and recycles storage space when new user is created.
  *
  *
  */

