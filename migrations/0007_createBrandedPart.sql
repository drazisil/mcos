-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS branded_part (
		branded_part_id INTEGER NOT NULL,
		part_type_id INTEGER NOT NULL,
		model_id INTEGER NOT NULL,
		mfg_date TIMESTAMP NOT NULL,
		qty_avail INTEGER NOT NULL,
		retail_price INTEGER NOT NULL,
		max_item_wear SMALLINT,
		engine_block_family_id INTEGER DEFAULT 0 NOT NULL,
		CONSTRAINT sys_pk_11801 PRIMARY KEY (branded_part_id),
		CONSTRAINT brandedpart_modelbrandedpart FOREIGN KEY (model_id) REFERENCES model (model_id),
		CONSTRAINT brandedpart_parttypebrandedpart1 FOREIGN KEY (part_type_id) REFERENCES part_type (part_type_id)
	);

CREATE INDEX if not exists brandedpart_engineblockfamilyid ON branded_part (engine_block_family_id);

CREATE INDEX if not exists sys_idx_brandedpart_modelbrandedpart_12255 ON branded_part (model_id);

CREATE INDEX if not exists sys_idx_brandedpart_parttypebrandedpart1_12269 ON branded_part (part_type_id);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_11801_11802 ON branded_part (branded_part_id);
-- +goose StatementEnd