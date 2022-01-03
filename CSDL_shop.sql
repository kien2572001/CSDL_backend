create database shop;
use  shop;

CREATE TABLE `user` (
    `cid` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(50) NOT NULL,
    `passWord` VARCHAR(255) NOT NULL,
    `roleId` SMALLINT NOT NULL DEFAULT 0,
    `lastLogin` DATETIME NULL DEFAULT NULL,
    `phone` CHAR(10) NOT NULL,
    `address` VARCHAR(255)CHARACTER SET UTF8MB4 NOT NULL,
    `firstName` VARCHAR(15)CHARACTER SET UTF8MB4 NOT NULL,
    `lastName` VARCHAR(15)CHARACTER SET UTF8MB4 NOT NULL,
    image text,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT PK_Person PRIMARY KEY (cid)
);

insert into `user` (userName,`passWord`,roleID,phone,address,firstName,lastName,createdAt,updatedAt)
values ('kien2572001.ntk@gmail.com','123456',0,'1111232','Ha Noi','abc','xyz',NOW(),NOW());



create table `store`(
	`sid` int not null auto_increment,
    `userName` varchar(50) not null,
	`passWord` varchar(255) not null,
    `address`  varchar(255)  CHARACTER SET utf8mb4 not null, 
    `phone` char(10) not null,
    `storeName` varchar(50) not null,
    content TEXT  CHARACTER SET utf8mb4 null default null,
    createdAt datetime not null,
    updatedAt datetime not null,
    constraint PK_store primary key (sid)
);



create table `product`(
	`pid` int  not null auto_increment,
    `title` varchar(50) not null,
    `price`	float not null default 0,
    `quantity` int not null default 0,
    `sid` int not null,
	createdAt datetime not null,
    updatedAt datetime not null,
    `discount` int not null default 0,
    img TEXT not null,
    content TEXT  CHARACTER SET utf8mb4 null default null,
    unit varchar(20) not null,
	CONSTRAINT PK_product PRIMARY KEY(pid),
    CONSTRAINT FK_store FOREIGN KEY (sid) REFERENCES store(sid)
);

insert into `product` (title,price,quantity,sid,createdAt,updatedAt,discount,image,content,unit)
values ('Apples',2,18,1,NOW(),NOW(),20,'https://pickbazar-react-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F572%2Fapple-1.png&w=640&q=75','An apple is a sweet, edible fruit produced by an apple tree (Malus domestica). Apple trees are ... The skin of ripe apples is generally red, yellow, green, pink, or russetted, though many bi- or tri-colored cultivars may be found.','1lb
An a');

-- ID -> int


create table cart_item(
	`cid` int not null,
    `pid` int not null,
    `quantity` int not null default 0,
    foreign key (cid) references `user`(cid),
    foreign key (pid) references product(pid),
    constraint PK_cart_item primary key(cid,pid)
);

create table category(
	id int not null auto_increment,
    title varchar(75) not null,
    primary key(id)
);


create table product_category(
	`pid` int not null,
    categoryId int not null,
    foreign key (categoryId) references category(id),
    foreign key (pid) references product(pid)
);

create table product_review(
	pid int not null,
    cid int not null,
    rating smallint not null,
    publishedAt datetime not null,
    content TEXT  CHARACTER SET utf8mb4 null default null,
    primary key (pid,cid),
    foreign key (cid) references `user`(cid),
    foreign key (pid) references product(pid)
);

create table `order`(
	`orderId` int not null auto_increment,
    `cid` int not null,
	`total` FLOAT NOT NULL DEFAULT 0,   
	`createdAt` DATETIME NOT NULL,
    foreign key (cid) references `user`(cid),
    primary key (orderId)
);

create table `order_item` (
	`orderId` int not null,
    `pid` int not null,
    `price` bigint not null default 0, 
    `quantity` int not null default 0,
	`discount` int not null default 0,
    foreign key (orderId) references `order`(orderId),
    foreign key (pid) references product(pid),
    constraint PK_order_item primary key(orderId,pid)
);

-- Them cua hang ban tap hoa 
insert into `store` (userName,`passWord`,address,phone,storeName,content,createdAt,updatedAt)
values ('shop@gmail.com','$2b$10$8WscL.rgGMXYUapqR3wDze02ntw3z2HyWK7B/VduEpCdoxEgDKkYm','address','01223213','Grocery','Shop ban hoa qua',now(),now());

-- Them phan loai category
insert into `category` (title)
values ('Fruits & Vegetables'),('Fruits'),('Vegetables'),
('Meat & Fish'),('Meat'),('Fish'),
('Snacks'),('Nuts & Biscuits'),('Chocolates'),('Crisps'),('Noodles & Pasta'),('Sauce'),('Soup'),
('Pet Care'),('Cat Food'),('Dog Food'),('Accessories'),
('Home & Cleaning'),('Air Fresher'),('Cleaning Products'),('Kitchen Accessories'),('Laundry'),
('Dairy'),('Milk'),('Butter'),('Egg'),('Yogurt'),
('Cooking'),('Oil'),('Rice'),('Salt & Sugar'),('Spices'),
('Breakfast'),('Bread'),('Cereal'),('Jam'),
('Beverage'),('Coffe'),('Energy drinks'),('Juice'),('Fizzy Drinks'),('Tea'),
('Health & Beautiful'),('Bath'),('Cream'),('Deodorant'),('Face Care'),('Oral Care'),('Shaving Needs');
 
-- Them san pham


