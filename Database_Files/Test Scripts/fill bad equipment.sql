drop table equipment;

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
 

insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Blue Wrench','Altendorf','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Red Wrench','Crescent','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Yellow Wrench','Fein','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Purple Wrench','Dynamic','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Green Wrench','Pittsburgh Tools','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Orange Wrench','Wrench','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Cyan Wrench','Wrench','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Pink Wrench','Wrench','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Grey Wrench','Wrench','A blue wrench','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Small Wrench','Wrench','A blue wrench','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND, EQUIPMENT_ENTRYUSER) values ('Large Wrench','Wrench','Central Machinery','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND, EQUIPMENT_ENTRYUSER) values ('Medium Wrench','Wrench','Pittsburgh Tools','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND, EQUIPMENT_ENTRYUSER) values ('Magic Wrench','Wrench',' Chicago Tools','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND, EQUIPMENT_ENTRYUSER) values ('Blue Screwdriver','Screwdriver','Toyota','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND, EQUIPMENT_ENTRYUSER) values ('Red Screwdriver','Screwdriver','Hitachi','John' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Yellow Screwdriver','Screwdriver','Veritas','A yellow Screwdriver' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Purple Screwdriver','Screwdriver','Central Machinery','A purple Screwdriver');
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Green Screwdriver','Screwdriver','Pittsburgh Tools','A green Screwdriver' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Orange Screwdriver','Screwdriver','Cen Tech','A orange Screwdriver' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION) values ('Cyan Screwdriver','Screwdriver',' Chicago Tools','A cyan Screwdriver');
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Pink Screwdriver','Screwdriver','Hitachi','A pink Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Grey Screwdriver','Screwdriver','Central Machinery','A grey Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Small Screwdriver','Screwdriver','Cen Tech','A small Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Large Screwdriver','Screwdriver','US General','A large Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Medium Screwdriver','Screwdriver','Central Machinery','A medium Screwdriver','Bob' );
insert into EQUIPMENT (EQUIPMENT_NAME,EQUIPMENT_TYPE,EQUIPMENT_BRAND,EQUIPMENT_DESCRIPTION, EQUIPMENT_ENTRYUSER) values ('Magical Screwdriver','Screwdriver','Toyota','A magical Screwdriver','Bob' );