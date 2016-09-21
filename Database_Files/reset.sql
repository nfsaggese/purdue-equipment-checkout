
drop table equipment;
drop table users;
drop table log;

CREATE TABLE EQUIPMENT(
  EQUIPMENT_UNIQUE_ID serial primary key not null,
  EQUIPMENT_NAME varchar not null,
  EQUIPMENT_TYPE varchar,
  EQUIPMENT_BRAND varchar,
  EQUIPMENT_DESCRIPTION varchar,
  EQUIPMENT_IMAGEURL varchar default 'http://www.drodd.com/images15/red-x4.png',
  EQUIPMENT_ISACTIVE boolean default true,
  EQUIPMENT_ISCHECKEDOUT boolean default false,
  EQUIPMENT_ENTRYUSER varchar,
  EQUIPMENT_DATEADDED timestamp default current_timestamp
 );
 
 CREATE TABLE USERS(
  USERS_UNIQUE_ID serial primary key not null,
  USERS_FIRSTNAME varchar not null,
  USERS_LASTNAME varchar not null,
  USERS_ISADMIN boolean not null,
  USERS_DESCRIPTION varchar,
  USERS_SCORE int default 100,
   
  USERS_USERNAME varchar not null,
  USERS_PASSWORD varchar not null,
  USERS_PHONE bigint,
  USERS_EMAIL varchar,
  USERS_SECRETQUESTION varchar,
  USERS_SECRETANSWER varchar,
   
  USERS_ENTRYUSER varchar,
  USERS_DATEADDED timestamp default current_timestamp
 );
 
 CREATE TABLE LOG(
   LOG_ENTRYID serial primary key not null,
   LOG_ENTRYDATE timestamp default current_timestamp,
   LOG_USERID int not null,
   LOG_EQUIPMENTID int not null,
   LOG_ISCHECKINGOUT boolean not null,
   LOG_EQUIPMENTCONDITION int
 );

insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Blue Wrench','Wrench','Altendorf','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Red Wrench','Wrench','Crescent','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Yellow Wrench','Wrench','Fein','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Purple Wrench','Wrench','Dynamic','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Green Wrench','Wrench','Pittsburgh Tools','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Orange Wrench','Wrench','US General','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Cyan Wrench','Wrench','Mafell','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Pink Wrench','Wrench',' Chicago Tools','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Grey Wrench','Wrench','Veritas','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Small Wrench','Wrench','Cen Tech','A blue wrench','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Large Wrench','Wrench','Central Machinery','A blue wrench','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Medium Wrench','Wrench','Pittsburgh Tools','A blue wrench','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Magic Wrench','Wrench',' Chicago Tools','A blue wrench','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Blue Screwdriver','Screwdriver','Toyota','A blue Screwdriver','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Red Screwdriver','Screwdriver','Hitachi','A red Screwdriver','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Yellow Screwdriver','Screwdriver','Veritas','A yellow Screwdriver','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Purple Screwdriver','Screwdriver','Central Machinery','A purple Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Green Screwdriver','Screwdriver','Pittsburgh Tools','A green Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Orange Screwdriver','Screwdriver','Cen Tech','A orange Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Cyan Screwdriver','Screwdriver',' Chicago Tools','A cyan Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Pink Screwdriver','Screwdriver','Hitachi','A pink Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Grey Screwdriver','Screwdriver','Central Machinery','A grey Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Small Screwdriver','Screwdriver','Cen Tech','A small Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Large Screwdriver','Screwdriver','US General','A large Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Medium Screwdriver','Screwdriver','Central Machinery','A medium Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Magical Screwdriver','Screwdriver','Toyota','A magical Screwdriver','Bob' );

insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Sophia','Smith', true, 'Admin 1', 'jessica1', 'hunter2', 9608827386,'jessica1@pecdb.com', 'What is your maiden name?', 'ctgrr', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Emma','Johnson', true, 'Admin 2', 'emma1', 'hunter2', 6195782157,'emma1@pecdb.com', 'What is your maiden name?', 'lvckp', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Olivia','Williams', false, 'User 1', 'olivia1', 'hunter2', 9768779490,'olivia1@pecdb.com', 'What is your maiden name?', 'bossf', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Ava','Jones', false, 'User 2', 'ava1', 'hunter2', 4895226384,'ava1@pecdb.com', 'What is your maiden name?', 'panxa', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Isabella','Brown', false, 'User 3', 'isabella1', 'hunter2', 4367627357,'isabella1@pecdb.com', 'What is your maiden name?', 'oonhs', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Mia','Davis', false, 'User 4', 'mia1', 'hunter2', 8561469847,'mia1@pecdb.com', 'What is your maiden name?', 'tvyos', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Zoe','Miller', false, 'User 5', 'zoe1', 'hunter2', 2722244470,'zoe1@pecdb.com', 'What is your maiden name?', 'panvg', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Lily','Wilson', false, 'User 6', 'lily1', 'hunter2', 1049966009,'lily1@pecdb.com', 'What is your maiden name?', 'ljsik', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Emily','Moore', false, 'User 7', 'emily1', 'hunter2', 7377146732,'emily1@pecdb.com', 'What is your maiden name?', 'eohdi', 'default');
insert into USERS (USERS_FIRSTNAME, USERS_LASTNAME, USERS_ISADMIN, USERS_DESCRIPTION, USERS_USERNAME, USERS_PASSWORD, USERS_PHONE, USERS_EMAIL, USERS_SECRETQUESTION, USERS_SECRETANSWER, USERS_ENTRYUSER) values ('Madelyn','Taylor', false, 'User 8', 'madelyn1', 'hunter2', 1353240231,'madelyn1@pecdb.com', 'What is your maiden name?', 'ccciy', 'default');

insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (1, 1, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (1, 1, false, 9);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (2, 1, true, 9);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (1, 3, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (1, 4, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (5, 9, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (4, 8, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (3, 11, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (4, 8, false, 9);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (2, 1, false, 8);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (2, 7, true, 10);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (7, 1, true, 8);
insert into log (LOG_USERID, LOG_EQUIPMENTID, LOG_ISCHECKINGOUT, LOG_EQUIPMENTCONDITION) values (5, 9, false, 10);