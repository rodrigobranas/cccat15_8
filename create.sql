drop schema cccat15 cascade;

create schema cccat15;

create table cccat15.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	cpf text not null,
	car_plate text null,
	is_passenger boolean not null default false,
	is_driver boolean not null default false
);

create table cccat15.ride (
	ride_id uuid primary key,
	passenger_id uuid,
	driver_id uuid,
	fare numeric,
	distance numeric,
	status text,
	from_lat numeric,
	from_long numeric,
	to_lat numeric,
	to_long numeric,
	last_lat numeric,
	last_long numeric,
	date timestamp
);

create table cccat15.position (
	position_id uuid primary key,
	ride_id uuid,
	lat numeric,
	long numeric,
	date timestamp
);

create table cccat15.ride_projection (
	ride_id uuid,
	status text,
	date timestamp,
	fare numeric,
	distance numeric,
	passenger_name text,
	passenger_email text,
	driver_name text,
	driver_email text
);
