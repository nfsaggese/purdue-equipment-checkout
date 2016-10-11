var tokenGen = require("../utils/tokengen.js");

function User(userID, timeExpire){
	this.userID = userID;
	this.timeExpire = timeExpire;
}

var userList = {};

//Token will be the key of the map

module.exports = {

	addUserToMap: function(userID, ttl){
		var genToken = tokenGen.token();
		var currentTime = Date.now();
		currentTime += ttl;
		var timeExpire = new Date(currentTime);
		this.addToNewUserList(genToken, userID, timeExpire);
		return genToken;
	},

	addToNewUserList : function(token, userID, timeExpire){
		if(!this.checkToken(token)){
			userList[token] = new User(userID, timeExpire);
		}
		return false
	},

	removeUser : function (token){
		if(this.checkToken(token)){
			var userID = userList[token].userID;
			delete userList[token];
			return userID;
		}
		return false;
	},


	checkToken : function(token){
		if(userList.hasOwnProperty(token)){
			return true;
		}
		return false;
	},

	checkTokenTTL: function(token){
		if(this.checkToken(token)){
			var currentTime = Date.now();
			if(Date.compare(currentTime, userList[token].timeExpire)){
				this.removeUser(token);
				return false;
			}
			return true;
		}

	},

	checkUserAlive: function(token){
		if(this.checkToken(token) && this.checkTokenTTL(token)){
			return true;
		}
		return false;
	},

	getUserID: function(token){
		if(this.checkUserAlive(token)){
			var currentUserID = userList[token].userID
				return currentUserID;
		}
		return false;	
	},

	/** Checks and recycles storage space when new user is created.
	 *
	 *
	 */

};
