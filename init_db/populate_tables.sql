INSERT INTO users
VALUES(1,'Syed','szaidi@gmail.com','2345436789'),
(2,'Omkar','Omkar6579@gmai.com','6792341790'),
(3,'Tinsy','Tinsy@gmail.com','7453217890'),
(4,'Sanabela','Sanabela@gmail.com','3215678190'),
(5,'Christy','Christy123@gmail.com','1458920278'),
(6,'Jerry','Jerry@gmail.com','1458920702')
;

INSERT INTO addresses
VALUES(1,'704 Coit Rd','625 Princeton road',null),
(2,'708 Coit Rd','639 Princeton road','3165 Parkwood Blvd'),
(3,'307 lilly CT',null,null),
(4,'678 Vineyard drive','225 MapleShade ln',null),
(5,'732 springmist ct','735 synergy blvd','667 lebanon rd'),
(6,'712 springmist ct','715 synergy blvd','627 lebanon rd')
;

INSERT INTO Admin 
VALUES(1,'s_zaidi','abc123','First'),
(2,'om_kjan','def345','Second')
;

INSERT INTO Sellers
VALUES(3,'tin_sy','syab1234','235 Frankford rd'),
(4,'Sana_bella123','Nyu1234','316 MapleShade ln')
;

INSERT INTO Bank
VALUES(1,'Bank of America','bankofamerica@gmail.com','1234567890','San Fracisco Head Office Missipi Road'),
(2,'Chase','CHASE@gmail.com','0976123467','Texas Head Office 2000 Downtown Road'),
(3,'Wells Fargo','wellsfargo@gmail.com','6565789034','Newyork Head Office 4235 Picadally Road'),
(4,'Capital One Bank','capitalone@gmail.com','4345678901','Austin Head Office 115 George Bush Road'),
(5,'Revolut Bank','revolut@gmail.com','5346578902','Dallas Head Office 2000 Princeton Road')
;

INSERT INTO Customer
VALUES(5,'chris_123','abcd@1234',1,6375094),
(6,'jerry_123','abcd@4509',2,46709213);

INSERT INTO Transactions
VALUES(1,1,6375094,'Approved','2023-03-01 09:30:00',100),
(2,1,6375094,'Pending','2023-03-07 10:50:20',250),
(3,2,46709213,'Rejected','2023-03-08 10:49:20',350),
(4,2,46709213,'Approved','2023-03-17 10:50:20',700)
;

INSERT INTO Product 
VALUES(1,'Fruit','Groceries','An item that is eatable such as Apple and Water Melon'),
(2,'Chair','Furniture','An item on which people sit'),
(3,'Table','Furniture','An item on which people eat or do office work');

INSERT INTO Product_Stock
VALUES(1,3,4,450),
(2,4,200,25),
(3,4,350,15)
;

INSERT INTO Orders
VALUES(1,5,'2023-02-12 14:30:00','Completed',1,1),
(2,5,'2023-02-27 11:45:11','In Progress',1,2),
(3,6,'2023-03-02 17:30:00','Cancelled',2,3),
(4,6,'2023-03-06 17:30:00','Confirmed',2,4)
;

INSERT INTO Order_Summary
VALUES(1,1,3,2),
(2,1,3,5),
(3,2,4,1),
(4,3,4,2)
;
