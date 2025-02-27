-- +goose Up
-- +goose StatementBegin
CREATE TABLE
    if not exists warehouse (
        branded_part_id int NOT NULL,
        skin_id int NOT NULL,
        player_id int NOT NULL,
        qty_avail int NULL,
        CONSTRAINT sys_pk_12148 PRIMARY KEY (branded_part_id, skin_id, player_id)
    );

CREATE INDEX if not exists sys_idx_warehouse_brandedpartwarehouse_12775 ON warehouse (branded_part_id);

CREATE index if not exists sys_idx_warehouse_playerwarehouse_12776 ON warehouse (player_id);

CREATE INDEX if not exists sys_idx_warehouse_skinwarehouse_12777 ON warehouse (skin_id);
-- +goose StatementEnd