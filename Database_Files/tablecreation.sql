/*
TO RUN
psql -U postgres -d pecdb -a -f my_script.sq
*/
CREATE TABLE EQUIPMENT(
  EQUIPMENT_UNIQUE_ID serial primary key not null,
  EQUIPMENT_NAME varchar not null,
  EQUIPMENT_TYPE varchar,
  EQUIPMENT_BRAND varchar,
  EQUIPMENT_DESCRIPTION varchar,
  EQUIPMENT_IMAGEURL varchar default 'http://www.drodd.com/images15/red-x4.png',
  EQUIPMENT_ISACTIVE boolean default true,
  EQUIPMENT_ISCHECKEDOUT boolean default false,
  EQUIPMENT_CHECKEDOUTUSER varchar default 'Not Availible',
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
  USERS_EMAIL varchar not null,
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
