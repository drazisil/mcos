-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS 
	stock_vehicle_attributes (
		branded_part_id INTEGER NOT NULL,
		car_class INTEGER,
		ai_restriction_class INTEGER,
		mode_restriction INTEGER,
		sponsor INTEGER,
		vin_branded_part_id INTEGER,
		track_id INTEGER DEFAULT 0,
		vin_crc INTEGER DEFAULT 0 NOT NULL,
		retail_price INTEGER DEFAULT 1000,
		CONSTRAINT sys_pk_12168 PRIMARY KEY (branded_part_id),
		CONSTRAINT stock_vehicle_attributes_brandedpart_stockvehicleattributes FOREIGN KEY (branded_part_id) REFERENCES branded_part (branded_part_id) ON DELETE CASCADE,
		CONSTRAINT stock_vehicle_attributes_brandedpart_stockvehicleattributes1 FOREIGN KEY (vin_branded_part_id) REFERENCES branded_part (branded_part_id),
		CONSTRAINT stock_vehicle_attributes_sva_carclass_stockvehicleattributes FOREIGN KEY (car_class) REFERENCES sva_car_class (sva_car_class),
		CONSTRAINT stock_vehicle_attributes_sva_moderestriction_stockvehicleattributes FOREIGN KEY (mode_restriction) REFERENCES sva_mode_restriction (sva_mode_restriction) ON DELETE CASCADE ON UPDATE CASCADE
	);

CREATE INDEX IF NOT EXISTS stock_vehicle_attributes_coptrackid ON stock_vehicle_attributes (track_id);

CREATE INDEX IF NOT EXISTS sys_idx_stock_vehicle_attributes_brandedpart_stockvehicleattribs1_12795 ON stock_vehicle_attributes (vin_branded_part_id);

CREATE INDEX IF NOT EXISTS sys_idx_stock_vehicle_attributes_brandedpart_stockvehicleattribs_12786 ON stock_vehicle_attributes (branded_part_id);

CREATE UNIQUE INDEX IF NOT EXISTS sys_idx_stock_vehicle_attributes_parentbrandedpartid_12162 ON stock_vehicle_attributes (branded_part_id);

CREATE INDEX IF NOT EXISTS sys_idx_stock_vehicle_attributes_sva_carclass_stockvehicleattributes_12804 ON stock_vehicle_attributes (car_class);

CREATE INDEX IF NOT EXISTS sys_idx_stock_vehicle_attributes_sva_moderestriction_stockvehicleattributes_12813 ON stock_vehicle_attributes (mode_restriction);

CREATE UNIQUE INDEX IF NOT EXISTS sys_idx_sys_pk_12168_12169 ON stock_vehicle_attributes (branded_part_id);
-- +goose StatementEnd