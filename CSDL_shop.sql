create database shop;
use  shop;
CREATE TABLE `user` (
    `cid` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(50) NOT NULL,
    `passWord` VARCHAR(50) NOT NULL,
    `roleId` SMALLINT NOT NULL DEFAULT 0,
    `lastLogin` DATETIME NULL DEFAULT NULL,
    `phone` CHAR(10) NOT NULL,
    `address` VARCHAR(255)CHARACTER SET UTF8MB4 NOT NULL,
    `firstName` VARCHAR(15)CHARACTER SET UTF8MB4 NOT NULL,
    `lastName` VARCHAR(15)CHARACTER SET UTF8MB4 NOT NULL,
    image text,
    createdAt DATETIME NOT NULL DEFAULT NULL
    updatedAt DATETIME NOT NULL DEFAULT NULL,
    CONSTRAINT PK_Person PRIMARY KEY (cid)
);

insert into user (userName,`passWord`,roleID,phone,address,firstName,lastName)
values ('kien2572001.ntk@gmail.com','123456',0,'1111232','Ha Noi','abc','xyz');


create table `store`(
	`sid` varchar(50) not null,
    `userName` varchar(50) not null,
	`passWord` varchar(50) not null,
    `address`  varchar(255)  CHARACTER SET utf8mb4 not null, 
    `phone` char(10) not null,
    `storeName` varchar(50) not null,
    content TEXT  CHARACTER SET utf8mb4 null default null,
    createdAt datetime not null,
    updatedAt datetime not null,
    constraint PK_store primary key (sid)
);

create table `product`(
	`pid` varchar(50) not null,
    `title` varchar(50) not null,
    `price` bigint not null default 0,
    `quantity` smallint not null default 0,
    `sid` varchar(50) not null,  
	createdAt datetime not null,
    updatedAt datetime not null,
    `discount` int not null default 0,
    content TEXT  CHARACTER SET utf8mb4 null default null,
	CONSTRAINT PK_product PRIMARY KEY(pid),
    CONSTRAINT FK_store FOREIGN KEY (sid) REFERENCES store(sid)
);




create table cart_item(
	`cid` int not null,
    `pid` varchar(50) not null,
    `price` bigint not null default 0, 
    `quantity` int not null default 0,
    -- `discount` int not null default 0,
    createdAt datetime not null,
    updatedAt datetime not null,
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
	`pid` varchar(50) not null,
    categoryId int not null,
    foreign key (category_id) references category(id),
    foreign key (pid) references product(pid)
);

create table product_review(
	pid varchar(50) not null,
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
	`status` SMALLINT NOT NULL DEFAULT 0,
	`total` FLOAT NOT NULL DEFAULT 0,   
	`createdAt` DATETIME NOT NULL,
    foreign key (cid) references `user`(cid),
    primary key (orderId)
);

create table `order_item` (
	`order_id` int not null,
    `pid` varchar(50) not null,
    `price` bigint not null default 0, 
    `quantity` int not null default 0,
    -- `discount` int not null default 0,
    createdAt datetime not null,
    updatedAt datetime not null,
    foreign key (orderId) references `order`(orderId),
    foreign key (pid) references product(pid),
    constraint PK_order_item primary key(orderId,pid)
);



