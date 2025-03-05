-- +goose Up
-- +goose StatementBegin
create table
    if not exists brand (
        brand_id INTEGER NOT NULL,
        brand VARCHAR(100) NULL,
        pic_name VARCHAR(50) NULL,
        is_stock SMALLINT default 0,
        CONSTRAINT SYS_PK_11763 PRIMARY KEY (brand_id)
    );

CREATE UNIQUE INDEX if not exists SYS_IDX_SYS_PK_11795_11796 ON brand (brand_id);
-- +goose StatementEnd