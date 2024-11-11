-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS vehicle (
		vehicle_id INTEGER NOT NULL,
		skin_id INTEGER NOT NULL,
		flags INTEGER NOT NULL,
		class SMALLINT NOT NULL,
		info_setting SMALLINT NOT NULL,
		damage_info bytea,
		damage_cached INTEGER DEFAULT 0,
		CONSTRAINT sys_pk_12214 PRIMARY KEY (vehicle_id),
		CONSTRAINT vehicle_partvehicle FOREIGN KEY (vehicle_id) REFERENCES part (part_id) ON DELETE CASCADE,
		CONSTRAINT vehicle_ptskinvehicle FOREIGN KEY (skin_id) REFERENCES pt_skin (skin_id)
	);

CREATE UNIQUE INDEX if not exists sys_idx_sys_pk_12214_12215 ON vehicle (vehicle_id);

CREATE INDEX if not exists sys_idx_vehicle_partvehicle_12844 ON vehicle (vehicle_id);

CREATE INDEX if not exists sys_idx_vehicle_ptskinvehicle_12856 ON vehicle (skin_id);
-- +goose StatementEnd