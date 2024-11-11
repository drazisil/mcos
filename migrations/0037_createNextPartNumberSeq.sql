-- +goose Up
-- +goose StatementBegin
CREATE SEQUENCE if not exists part_partid_seq START
WITH
    1 INCREMENT BY 1 NO MINVALUE MAXVALUE 4294967295 CACHE 1 OWNED BY part.part_id;
-- +goose StatementEnd