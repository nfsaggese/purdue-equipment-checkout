var express = require('express');
var router = express.Router();
var global = require('../global.js');
var userAuth = require('./userAuth.js');


router.get('/createUser', function(req, res, next) {
    //
    var usersFName  = req.query.USERS_FIRSTNAME;
    var usersLName = req.query.USERS_LASTNAME;
    var usersIsAdmin = req.query.USERS_ISADMIN;
    var usersUserName = req.query.USERS_USERNAME;
    var usersPassword = req.query.USERS_PASSWORD;
    var usersEmail = req.query.USERS_EMAIL;

    var checkEmail = `select * from users where USERS_EMAIL = '${usersEmail}';`;
    var checkDup = 'select * from users where USERS_EMAIL = ' + "'" + usersEmail + "'" + ' and USERS_PASSWORD = ' +
        "'" + usersPassword + "'" + ';';

    global.postPool.connect(function(err, client, done){
        if(err){
            return console.error("Erroy fetching client from pool", err);
        }
        client.query(checkEmail, function(err, result){
            if(result.rowCount == 0){
                global.postPool.connect(function(err, client, done){
                    if(err){
                        return console.error("Erroy fetching client from pool", err);
                    }
                    client.query(checkEmail, function(err, result){
                        if(result.rowCount == 0){
                            global.postPool.connect(function(err, client, done) {
                                if(err) {
                                    return console.error('error fetching client from pool', err);
                                }
                                var queryURL = `insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN,
        USERS_USERNAME, USERS_PASSWORD, USERS_EMAIL) values
        ('${usersFName}','${usersLName}','${usersIsAdmin}','${usersUserName}', '${usersPassword}',
         '${usersEmail}');`; 
                                    client.query(queryURL , function(err, result) {
                                        //call `done()` to release the client back to the pool
                                        res.send(JSON.stringify(result, null, 2));
                                        done();
                                        if(err) {
                                            return console.error('error running query', err);
                                        }
                                        //output: 1
                                    });
                            });

                        }else {
                            res.send('invalid cookie'); 
                        }
                        done();
                    });
                });
            }else{
                res.send('invalid cookie');
            }
            done();
        });
    });

    /*
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var queryURL = `insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN,
        USERS_USERNAME, USERS_PASSWORD, USERS_EMAIL) values
        ('${usersFName}','${usersLName}','${usersIsAdmin}','${usersUserName}', '${usersPassword}',
         '${usersEmail}');`; 
            client.query(queryURL , function(err, result) {
    //call `done()` to release the client back to the pool
                res.send(JSON.stringify(result, null, 2));
                done();
                if(err) {
                    return console.error('error running query', err);
                }
    //output: 1
            });
    });
    */
});

router.get('/getUserInfo', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        console.log(req.cookies.token);
        var id = userAuth.getUserID(req.cookies.token);
        client.query("SELECT * FROM users where users_unique_id='" + id + "';", function(err, result) {
            //call `done()` to release the client back to the pool
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query', err);
            }
            //output: 1
        });
    });
});

/* GET home page. */
router.get('/getDevices', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        client.query('SELECT * FROM users;', function(err, result) {
            //call `done()` to release the client back to the pool
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query', err);
            }
            //output: 1
        });
    });
});
router.post('/getCheckedOutItems', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var userID = userAuth.getUserID(req.cookies.token);
        var query = `select e.EQUIPMENT_UNIQUE_ID, e.equipment_name,e.equipment_ischeckedout,max(l.log_entryid) from
        log l inner join users u on l.LOG_USERID = u.USERS_UNIQUE_ID inner join equipment e on
        e.equipment_unique_id = l.LOG_EQUIPMENTID where e.equipment_ischeckedout = true and
        l.LOG_USERID = ${userID} group by
        e.equipment_name,e.equipment_ischeckedout,  e.EQUIPMENT_UNIQUE_ID;`;

        /*var query = `select e.equipment_name, e.equipment_unique_id from log l inner join users u on l.LOG_USERID = u.USERS_UNIQUE_ID
          inner join equipment e on e.equipment_unique_id = l.LOG_EQUIPMENTID where
          e.equipment_ischeckedout = true and l.LOG_USERID = ${userID};`;
          */
        console.log('update log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});

/* Update log with:
 * LOG_USERID
 * LOG_EQUIPMENTID
 * LOG_ISCHECKINGOUT
 * LOG_EQUIPMENTCONDITION
 */

/* /updateLog
 *
 *
 */
router.post('/updateLog', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var userId = req.query.LOG_USERID;
        var equipmentId = req.query.LOG_EQUIPMENTID;
        var isCheckingOut = req.query.LOG_ISCHECKINGOUT;
        var equipmentCond = req.query.LOG_EQUIPMENTCONDITION;
        var query = 'insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) '
            + 'values (' + userId  + ',' + equipmentId + ',' + isCheckingOut + ',' + equipmentCond +');';

        console.log('userId: ' + userId + '\nequipmentId: ' + equipmentId + '\nisCheckingOut: ' +
            isCheckingOut + '\nequipmentCond: ' + equipmentCond);
        console.log('update log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});

router.get('/validCookie', function(req, res, next) {
    if(!userAuth.checkUserAlive(req.cookies.token)){
        res.send('false');
        done();

        return;
    }
    res.send('true');
    done();
});
router.get('/logoutUser', function(req, res, next) {
    if(!userAuth.checkUserAlive(req.cookies.token)){
        res.send('cookie expired');
        done();

        return;
    }
    res.clearCookie('token');
    res.send('success');
    done();
});

router.get('/updateUser', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var fName = req.query.USERS_FIRSTNAME;
        var lName = req.query.USERS_LASTNAME;
        var email = req.query.USERS_EMAIL;
        var password = req.query.USERS_PASSWORD;
        var phone = req.query.USERS_PHONE;
        var userID = userAuth.getUserID(req.cookies.token);

        var query = `UPDATE users SET (USERS_FIRSTNAME, USERS_LASTNAME, USERS_EMAIL, USERS_PASSWORD, USERS_PHONE) = ('${fName}', '${lName}', '${email}', '${password}','${phone}') WHERE users_unique_id = ${userID};`;

        console.log('get log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});

/* /getLog
 * GETS the log based on the device ID
 *
 */
router.get('/getDeviceLog', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var deviceID = req.query.deviceID;
        var query = `Select * from log where LOG_EQUIPMENTID = ${deviceID} order by LOG_ENTRYID;`;

        console.log('get log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});

router.get('/isAdmin', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if((!userAuth.checkUserAlive(req.cookies.token)) ||
            (userAuth.checkUserAdmin(req.cookies.token) == false)) {
                res.send('invalid cookie');
                done();
                return;
        }
        var userID = userAuth.getUserID(req.cookies.token);
        var query = `select users_firstname, users_email from users where USERS_ISADMIN = 't'
        and USERS_UNIQUE_ID = ${userID};`;

        console.log('get log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});
router.get('/getUserAdminLog', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if((!userAuth.checkUserAlive(req.cookies.token)) ||
            (userAuth.checkUserAdmin(req.cookies.token) == false)) {
                res.send('invalid cookie');
                done();
                return;
        }
        var userID = req.query.USERID;
        var query = `Select * from log where LOG_USERID = ${userID} order by LOG_ENTRYID;`;

        console.log('get log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});
router.get('/getUserLog', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var userID = userAuth.getUserID(req.cookies.token);
        var query = `Select * from log inner join equipment on
        EQUIPMENT_UNIQUE_ID = LOG_EQUIPMENTID  where LOG_USERID = ${userID} order by LOG_ENTRYID;`;

        console.log('get log query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: updateLog', err);
            }
        });
    });
});
/*
 * Attempts to retrieve user information given the correct
 * user email and password. Returns no rows if incorrect.
 * ex:
 * ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/loginUser?USERS_EMAIL=jessica1@pecdb.com&USERS_PASSWORD=hunter2
 * GET
 */
router.get('/loginUser', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var email = req.query.USERS_EMAIL;
        var password = req.query.USERS_PASSWORD;

        var query = 'select * from users where USERS_EMAIL = ' + "'" + email + "'" + ' and USERS_PASSWORD = ' +
            "'" + password + "'" + ';';

        console.log(' user login query: ' + query);

        client.query(query, function(err, result) {
            if (result.rows.length == 0) {
                res.status(401);
                res.send('Invalid email or password');
                done();

                return;
            }
            var ttl = 3600 * 1000;
            var userToken = userAuth.addUserToMap(result.rows[0].users_unique_id, ttl, result.rows[0].users_isadmin);

            res.cookie('token', userToken, { maxAge: ttl}).send(JSON.stringify(result, null, 2));
            res.end();
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});

router.get('/checkOutItem', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var equipmentID = req.query.EQUIPMENT_ID;
        var userID = userAuth.getUserID(req.cookies.token);

        var query = `UPDATE equipment SET EQUIPMENT_ISCHECKEDOUT = true WHERE
        equipment_unique_id = ${equipmentID}; insert into log (LOG_USERID,
        LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (${userID}, ${equipmentID}, true,
            10);`;
        console.log(' user login query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});
//Logs in as admin
router.get('/loginAdmin', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        var email = req.query.USERS_EMAIL;
        var password = req.query.USERS_PASSWORD;

        var query = `Select USERS_UNIQUE_ID from USERS where USERS_EMAIL = '${email}' AND USERS_PASSWORD = '${password}' AND USERS_ISADMIN = true`;
        console.log(' user login query: ' + query);

        client.query(query, function(err, result) {
            var ttl = 30000
            var userToken = userAuth.addUserToMap(result.rows[0].users_unique_id, ttl, result.rows[0].users_isadmin);
            res.cookie('token', userToken, { maxAge: 30000}).send(JSON.stringify(result, null, 2));
            res.end();
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});
/*
 * Returns equipment information given the equipment ID
 * ex:
 * ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/getSingleItem?EQUIPMENT_UNIQUE_ID=1
 * GET
 */
    router.get('/getSingleItem', function(req, res, next) {
        global.postPool.connect(function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            if(!userAuth.checkUserAlive(req.cookies.token)){
                res.send('invalid cookie');
                done();
                return;
            }
            var itemID = req.query.EQUIPMENT_UNIQUE_ID;
            var query = 'select * from equipment where EQUIPMENT_UNIQUE_ID = ' + itemID + ';';

            console.log('single item query: ' + query);

            client.query(query, function(err, result) {
                res.send(JSON.stringify(result, null, 2));
                done();
                if(err) {
                    return console.error('error running query: get single item', err);
                }
            });
        });
    });

/*
 * Retires the item based on item id
 * ex:
 * ec2-52-42-46-135.us-west-2.compute.amazonaws.com:8080/retireItem?EQUIPMENT_UNIQUE_ID=1
 * POST
 */
    router.post('/retireItem', function(req, res, next) {
        global.postPool.connect(function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            if(!userAuth.checkUserAlive(req.cookies.token)){
                res.send('invalid cookie');
                done();
                return;
            }
            var itemID = req.query.EQUIPMENT_UNIQUE_ID;

            var query = 'UPDATE equipment SET EQUIPMENT_ISACTIVE = false WHERE equipment_unique_id = ' + itemID + ';';

            console.log('retire item query: ' + query);

            client.query(query, function(err, result) {
                res.send(JSON.stringify(result, null, 2));
                done();
                if(err) {
                    return console.error('error running query: retire item', err);
                }
            });
        });
    });

    router.get('/getStatistics', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/postNewDevice', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/postUpdateCheckout', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/postUpdateDeviceUser', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.get('/getAllDevices', function(req, res, next) {
//console.log(req.cookies.token);
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        global.postPool.connect(function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            client.query('select equipment_unique_id, equipment_name, EQUIPMENT_ISCHECKEDOUT from equipment where EQUIPMENT_ISACTIVE = true;', function(err, result) {
//call `done()` to release the client back to the pool
                console.log('Cookies: ', req.cookies);
                res.send(JSON.stringify(result, null, 2));
                done();
                if(err) {
                    return console.error('error running query', err);
                }
//output: 1
            });
        });
    });

    router.get('/createNewItem', function(req, res, next) {
//insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Blue Wrench','Wrench','Altendorf','A blue wrench');
        var equipmentName  = req.query.EQUIPMENT_NAME;
        var equipmentType = req.query.EQUIPMENT_TYPE;
        var equipmentBrand = req.query.EQUIPMENT_BRAND
        var equipmentDesc = req.query.EQUIPMENT_DESCRIPTION;

        global.postPool.connect(function(err, client, done) {
            if(err) {
                return console.error('error fetching client from pool', err);
            }
            if((!userAuth.checkUserAlive(req.cookies.token)) ||
                (userAuth.checkUserAdmin(req.cookies.token) == false)) {
                    res.send('invalid cookie');
                    done();
                    return;
            }
            var queryURL = `insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('${equipmentName}','${equipmentType}','${equipmentBrand}','${equipmentDesc}');`;
            console.log(queryURL);
            client.query(queryURL , function(err, result) {
//call `done()` to release the client back to the pool
                res.send(JSON.stringify(result, null, 2));
                done();
                if(err) {
                    return console.error('error running query', err);
                }
//output: 1
            });
        });
    });
/*
 * Check in an item using itemID and userToken
 */
/*router.get('/checkInItem', function(req, res, next) {
//insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Blue Wrench','Wrench','Altendorf','A blue wrench');
if(!userAuth.checkUserAlive(req.cookies.token)){
done();
}
var equipmentName  = req.query.EQUIPMENT_NAME;
var equipmentType = req.query.EQUIPMENT_TYPE;
var equipmentBrand = req.query.EQUIPMENT_BRAND
var equipmentDesc = req.query.EQUIPMENT_DESCRIPTION;

global.postPool.connect(function(err, client, done) {
if(err) {
return console.error('error fetching client from pool', err);
}
var queryURL = `insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('${equipmentName}','${equipmentType}','${equipmentBrand}','${equipmentDesc}');`;
console.log(queryURL);
client.query(queryURL , function(err, result) {
//call `done()` to release the client back to the pool
res.send(JSON.stringify(result, null, 2));
done();
if(err) {
return console.error('error running query', err);
}
//output: 1
});
});
});*/
router.get('/checkInItem', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var equipmentID = req.query.EQUIPMENT_ID;
        var userID = userAuth.getUserID(req.cookies.token);
        var condition = req.query.LOG_EQUIPMENTCONDITION;

        var query = `UPDATE equipment SET EQUIPMENT_ISCHECKEDOUT = false WHERE
        equipment_unique_id = ${equipmentID}; insert into log (LOG_USERID, LOG_EQUIPMENTID,
            LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (${userID}, ${equipmentID}, false,
                ${condition});`;
        console.log(' user login query: ' + query);

        client.query(query, function(err, result) {
            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});
/*router.get('/checkInItem', function(req, res, next) {
  global.postPool.connect(function(err, client, done) {
  if(err) {
  return console.error('error fetching client from pool', err);
  }
  if(!userAuth.checkUserAlive(req.cookies.token)){
  res.send('invalid cookie');
  done();
  return;
  }
  var equipmentID = req.query.EQUIPMENT_ID;
  var userID = userAuth.getUserID(req.cookies.token);

  var query = `UPDATE equipment SET EQUIPMENT_ISCHECKEDOUT = false WHERE
  equipment_unique_id = ${equipmentID}; insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT,LOG_EQUIPMENTCONDITION) values (${userID}, ${equipmentID}, false);`;
  console.log(' user login query: ' + query);

  client.query(query, function(err, result) {
  res.send(JSON.stringify(result, null, 2));
  done();
  if(err) {
  return console.error('error running query: verifyUser', err);
  }
  });
  });
  });
  */
//Get all inventory
router.get('/allInventory', function(req, res, next){
    global.postPool.connect(function(err, client, done) {
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var queryURL = `Select * from EQUIPMENT`;

        client.query(queryURL, function(err, result) {
            res.send(JSON.stringify(result, null,2));
            done();
            if(err){
                return console.err('error running query', err);
            }
        });
    });
});

//Get all avaliable Inventory //TODO this isnt' spelled right
router.get('/getAvailableInventory', function(req, res, next){
    global.postPool.connect(function(err, client, done) {
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var queryURL = `Select * from EQUIPMENT where EQUIPMENT_ISCHECKEDOUT = false and EQUIPMENT_ISACTIVE = true`;

        client.query(queryURL, function(err, result) {
            res.send(JSON.stringify(result, null,2));
            done();
            if(err){
                return console.err('error running query', err);
            }
        });
    });
});

//Get all users
router.get('/getAllUsers', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }

        var query = `Select USERS_UNIQUE_ID, USERS_EMAIL,  USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION from USERS ORDER BY USERS_UNIQUE_ID`;

        client.query(query, function(err, result) {

            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});

//checkinItem
router.get('/getEquipmentInfo', function(req, res, next) {
    global.postPool.connect(function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        if(!userAuth.checkUserAlive(req.cookies.token)){
            res.send('invalid cookie');
            done();
            return;
        }
        var equipmentID  = req.query.EQUIPMENT_ID;
        var query = `UPDATE equipment SET EQUIPMENT_ISCHECKEDOUT = false WHERE equipment_unique_id = ${equipmentID}`;

        client.query(query, function(err, result) {

            res.send(JSON.stringify(result, null, 2));
            done();
            if(err) {
                return console.error('error running query: verifyUser', err);
            }
        });
    });
});

module.exports = router;
