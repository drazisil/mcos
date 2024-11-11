-- +goose Up
-- +goose StatementBegin
create table if not exists login (
    customer_id integer not null unique,
    login_name varchar(32) not null,
    password varchar(32) not null,
    login_level smallint default 0 not null,
    constraint login_login_pk primary key (login_name)
);

create unique index if not exists login_name_idx on login (login_name);
-- +goose StatementEnd