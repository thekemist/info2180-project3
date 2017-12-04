CREATE DATABASE cheapomail;


USE cheapomail;


CREATE TABLE user (


	user_id int auto_increment not null,

	first_name varchar(50) not null,

	last_name varchar(50) not null,

	username varchar(50) not null,

	password_digest varchar(64),

	primary key(user_id)


);


CREATE TABLE message(

	id int auto_increment not null,

	recipients_id int not null,

	user_id int not null,

	subject varchar(50) not not default '',

	body text not null default '',

	sentdate timestamp not null,

	primary key(id)


);



CREATE TABLE message_read(

	read_id int auto_increment not null,

	message_id char(30) not null default '',

	user_id char(30) not null default '',

	current_date timestamp not null,

	primary key(read_id)

);

INSERT INTO user(firstname,lastname,username,password) VALUES ('david','reid','admin','password');