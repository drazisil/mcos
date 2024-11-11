-- +goose Up
-- +goose StatementBegin
create table if not exists key (
    profile_id integer not null,
    session_key varchar(100) not null,
    constraint key_profile_id_fk foreign key (profile_id) references profile (profile_id)
);
-- +goose StatementEnd
