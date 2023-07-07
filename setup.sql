drop table passengers;
drop table drivers;

create table passengers (
	id uuid primary key,
	name text,
	email text,
	document text
);

create table drivers (
	id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);