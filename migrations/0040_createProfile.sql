-- +goose Up
-- +goose StatementBegin
create table
    if not exists profile (
        customer_id integer not null,
        profile_name varchar(32) not null,
        server_id integer default 0 not null,
        create_stamp integer default extract(epoch from now())::integer not null,
        last_login_stamp integer default extract(epoch from now())::integer not null,
        number_games integer default 1 not null,
        profile_id integer not null,
        is_online boolean default false not null,
        game_purchase_stamp integer default extract(epoch from now())::integer not null,
        game_serial_number varchar(32) not null,
        time_online integer not null,
        time_in_game integer not null,
        game_blob varchar(512) not null,
        personal_blob varchar(256) not null,
        picture_blob varchar(1) not null,
        dnd boolean default false not null,
        game_start_stamp integer default extract(epoch from now())::integer not null,
        current_key varchar(400) not null,
        profile_level smallint default 0 not null,
        shard_id integer not null,
        constraint profile_profile_pk primary key (profile_id)
    );

create unique index if not exists profile_id_idx on profile (profile_id);
-- +goose StatementEnd