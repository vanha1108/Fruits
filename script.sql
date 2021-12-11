CREATE DATABASE IF NOT EXISTS fruit_store ;

USE fruit_store;

CREATE TABLE account (
	id bigint primary key auto_increment,
    username nvarchar(50) not null,
    password nvarchar(50) not null,
    role varchar(50) not null,
    is_active boolean not null,
    created_time date,
    modified_time date
);

CREATE TABLE employee (
	id bigint primary key auto_increment,
    id_account bigint not null,
    first_name nvarchar(50),
    last_name nvarchar(50),
    sex boolean,
    dob date,
    phone_number varchar(12),
    address nvarchar(100),
    email varchar(50),
    role VARCHAR(50)
);

CREATE TABLE supplier (
	id bigint primary key auto_increment,
    name nvarchar(50),
    phone_number varchar(10),
    address nvarchar(100)
);

CREATE TABLE category (
	id bigint primary key auto_increment,
    name nvarchar(50)
);

CREATE TABLE product (
	id bigint primary key auto_increment,
    id_supplier bigint not null,
    id_category bigint not null,
    code nvarchar(50) not null,
    name nvarchar(50),
    image longtext,
    short_description nvarchar(150),
    long_description nvarchar(255),
    purchase_price double not null,
    price double not null
);

CREATE TABLE customer (
	id bigint primary key auto_increment,
    id_account bigint not null,
    first_name nvarchar(50),
    last_name nvarchar(50),
    sex boolean,
    dob date,
    phone_number varchar(12),
    address nvarchar(100),
    email varchar(50),
    role VARCHAR(50)
);

CREATE TABLE promotion (
	id bigint primary key auto_increment,
    code nvarchar(50) not null,
    name nvarchar(100),
    description nvarchar(255),
    start_date date not null,
    end_date date not null
);

CREATE TABLE purchase_invoice (
	id bigint primary key auto_increment,
    id_account bigint not null,
    code nvarchar(50) not null,
    created_time date,
    total_price double
);

CREATE TABLE purchase_invoice_details (
	id bigint primary key auto_increment,
    id_purchase bigint not null,
    id_product bigint not null,
    amount int not null,
    price double
);

CREATE TABLE sell_invoice (
	id bigint primary key auto_increment,
    id_account bigint not null,
    id_customer bigint not null,
    code nvarchar(50) not null,
    created_time date,
    status int,
    total_price double,
		receive_address text,
		receive_name text
);

CREATE TABLE sell_invoice_details (
	id bigint primary key auto_increment,
    id_sell bigint not null,
    id_product bigint not null,
    amount int not null,
    price double
);

ALTER TABLE employee ADD CONSTRAINT fk_employee_account FOREIGN KEY (id_account) REFERENCES account(id);

ALTER TABLE product ADD CONSTRAINT fk_product_supplier FOREIGN KEY (id_supplier) REFERENCES supplier(id);

ALTER TABLE product ADD CONSTRAINT fk_product_category FOREIGN KEY (id_category) REFERENCES category(id);

ALTER TABLE purchase_invoice ADD CONSTRAINT fk_purchase_invoice_account FOREIGN KEY (id_account) REFERENCES account(id);

ALTER TABLE purchase_invoice_details ADD CONSTRAINT fk_purchase_invoice_details_purchase_invoice FOREIGN KEY (id_purchase) REFERENCES purchase_invoice(id);

ALTER TABLE purchase_invoice_details ADD CONSTRAINT fk_purchase_invoice_details_product FOREIGN KEY (id_product) REFERENCES product(id);

ALTER TABLE sell_invoice ADD CONSTRAINT fk_sell_invoice_account FOREIGN KEY (id_account) REFERENCES account(id);

ALTER TABLE sell_invoice ADD CONSTRAINT fk_sell_invoice_customer FOREIGN KEY (id_customer) REFERENCES customer(id);

ALTER TABLE sell_invoice_details ADD CONSTRAINT fk_sell_invoice_details_sell_invoice FOREIGN KEY (id_sell) REFERENCES sell_invoice(id);

ALTER TABLE sell_invoice_details ADD CONSTRAINT fk_sell_invoice_details_product FOREIGN KEY (id_product) REFERENCES product(id);


ALTER TABLE sell_invoice MODIFY COLUMN receive_name VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
ALTER TABLE sell_invoice MODIFY COLUMN receive_address VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL;
