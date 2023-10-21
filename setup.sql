drop schema ccca cascade;
create schema ccca;

create table ccca.passengers (
	id uuid primary key,
	name text,
	email text,
	document text
);

create table ccca.drivers (
	id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);

create table ccca.rides (
  id uuid primary key,
  passenger_id uuid,
  driver_id uuid,
  transaction_id uuid,
  from_lat numeric,
  from_long numeric,
  to_lat numeric,
  to_long numeric,
  status text,
  request_date timestamp,
  accept_date timestamp,
  start_date timestamp,
  end_date timestamp,
  price numeric
);

create table ccca.transactions (
  id uuid primary key,
  name text,
  email text,
  amount numeric
);