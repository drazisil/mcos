-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS part (
		part_id INTEGER NOT NULL,
		parent_part_id INTEGER,
		branded_part_id INTEGER NOT NULL,
		percent_damage SMALLINT NOT NULL,
		item_wear INTEGER NOT NULL,
		attachment_point_id INTEGER,
		owner_id INTEGER,
		part_name VARCHAR(100),
		repair_cost INTEGER DEFAULT 0,
		scrap_value INTEGER DEFAULT 0,
		CONSTRAINT sys_pk_11976 PRIMARY KEY (part_id),
		CONSTRAINT part_brandedpartpart FOREIGN KEY (branded_part_id) REFERENCES branded_part (branded_part_id),
		CONSTRAINT part_r25 FOREIGN KEY (parent_part_id) REFERENCES part (part_id),
		CONSTRAINT part_r9 FOREIGN KEY (attachment_point_id) REFERENCES attachment_point (attachment_point_id)
	);

CREATE INDEX if not exists sys_idx_part_brandedpartpart_12431 ON part (branded_part_id);

CREATE INDEX if not exists sys_idx_part_r25_15192 ON part (parent_part_id);

CREATE INDEX if not exists sys_idx_part_r9_12442 ON part (attachment_point_id);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11976_11977 ON part (part_id);
-- +goose StatementEnd