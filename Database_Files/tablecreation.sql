/*
TO RUN
psql -U postgres -d pecdb -a -f my_script.sql

*/

CREATE TABLE EQUIPMENT(
  EQUIPMENT_UNIQUE_ID serial primary key not null,
  
  EQUIPMENT_NAME varchar,
  EQUIPMENT_TYPE varchar,
  EQUIPMENT_BRAND varchar,
  EQUIPMENT_DESCRIPTION varchar,
  EQUIPMENT_IMAGEURL varchar default 'http://www.drodd.com/images15/red-x4.png',
  
  EQUIPMENT_ENTRYUSER varchar,
  EQUIPMENT_DATEADDED timestamp default current_timestamp
 );
 
 CREATE TABLE USERS(
  USERS_UNIQUE_ID serial primary key not null,
  USERS_FIRSTNAME varchar,
  USERS_LASTNAME varchar,
  USERS_ISADMIN boolean,
  USERS_DESCRIPTION varchar,
  USERS_ENTRYUSER varchar,
  USERS_DATEADDED timestamp default current_timestamp
 );
 
 CREATE TABLE LOG(
   LOG_ENTRYID serial primary key not null,
   LOG_ENTRYDATE timestamp default current_timestamp,
   LOG_USERID int,
   LOG_CHECKINGOUT boolean,
   LOG_EQUIPMENTID int,
   LOG_EQUIPMENTCONDITION int
 );