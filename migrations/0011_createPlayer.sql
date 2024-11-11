-- +goose Up
-- +goose StatementBegin
CREATE TABLE
	IF NOT EXISTS player (
		player_id INTEGER NOT NULL,
		customer_id INTEGER NOT NULL,
		player_type_id INTEGER NOT NULL,
		sanctioned_score INTEGER,
		challenge_score INTEGER,
		last_logged_in TIMESTAMP,
		times_logged_in SMALLINT,
		bank_balance INTEGER NOT NULL,
		num_cars_owned SMALLINT NOT NULL,
		is_logged_in SMALLINT,
		driver_style SMALLINT NOT NULL,
		lp_code INTEGER NOT NULL,
		lp_text VARCHAR(9),
		car_num1 VARCHAR(2) NOT NULL,
		car_num2 VARCHAR(2) NOT NULL,
		car_num3 VARCHAR(2) NOT NULL,
		car_num4 VARCHAR(2) NOT NULL,
		car_num5 VARCHAR(2) NOT NULL,
		car_num6 VARCHAR(2) NOT NULL,
		dl_number VARCHAR(20),
		persona VARCHAR(30) NOT NULL,
		"address" VARCHAR(128),
		residence VARCHAR(20),
		vehicle_id INTEGER,
		current_race_id INTEGER,
		offline_driver_skill INTEGER,
		offline_grudge INTEGER,
		offline_reputation INTEGER,
		total_time_played INTEGER,
		car_info_setting INTEGER,
		stock_classic_class SMALLINT,
		stock_muscle_class SMALLINT,
		modified_classic_class SMALLINT,
		modified_muscle_class SMALLINT,
		outlaw_class SMALLINT,
		drag_class SMALLINT,
		challenge_rung INTEGER,
		offline_ai_car_class SMALLINT DEFAULT 0,
		offline_ai_skin_id INTEGER DEFAULT 0,
		offline_ai_car_bpt_id INTEGER DEFAULT 0,
		offline_ai_state SMALLINT DEFAULT 0,
		body_type INTEGER DEFAULT 0,
		skin_color INTEGER DEFAULT 0,
		hair_color INTEGER DEFAULT 0,
		shirt_color INTEGER DEFAULT 0,
		pants_color INTEGER DEFAULT 0,
		offline_driver_style INTEGER,
		offline_driver_attitude INTEGER,
		evaded_fuzz INTEGER DEFAULT 0,
		pinks_won INTEGER DEFAULT 0,
		num_unread_mail INTEGER DEFAULT 0,
		total_races_run INTEGER DEFAULT 0,
		total_races_won INTEGER DEFAULT 0,
		total_races_completed INTEGER DEFAULT 0,
		total_winnings INTEGER DEFAULT 0,
		insurance_risk_points INTEGER DEFAULT 0,
		insurance_rating INTEGER DEFAULT 0,
		challenge_races_run INTEGER DEFAULT 0,
		challenge_races_won INTEGER DEFAULT 0,
		challenge_races_completed INTEGER DEFAULT 0,
		cars_lost INTEGER DEFAULT 0,
		cars_won INTEGER DEFAULT 0,
		CONSTRAINT sys_pk_12021 PRIMARY KEY ("player_id"),
		CONSTRAINT player_driverclassplayer1 FOREIGN KEY (stock_muscle_class) REFERENCES driver_class (driver_class_id),
		CONSTRAINT player_driverclassplayer2 FOREIGN KEY (modified_classic_class) REFERENCES driver_class (driver_class_id),
		CONSTRAINT player_driverclassplayer3 FOREIGN KEY (modified_muscle_class) REFERENCES driver_class (driver_class_id),
		CONSTRAINT player_driverclassplayer4 FOREIGN KEY (outlaw_class) REFERENCES driver_class (driver_class_id),
		CONSTRAINT player_driverclassplayer5 FOREIGN KEY (drag_class) REFERENCES driver_class (driver_class_id),
		CONSTRAINT player_r44 FOREIGN KEY (player_type_id) REFERENCES player_type (player_type_id)
	);

CREATE INDEX IF NOT EXISTS player_numunreadmail ON player (num_unread_mail);

CREATE INDEX IF NOT EXISTS player_offlinechallengecarbptid ON player (offline_ai_car_bpt_id);

CREATE INDEX IF NOT EXISTS sys_idx_player_driverclassplayer1_12502 ON player (stock_muscle_class);

CREATE INDEX IF NOT EXISTS sys_idx_player_driverclassplayer2_12523 ON player (modified_classic_class);

CREATE INDEX IF NOT EXISTS sys_idx_player_driverclassplayer3_12544 ON player (modified_muscle_class);

CREATE INDEX IF NOT EXISTS sys_idx_player_driverclassplayer4_12565 ON player (outlaw_class);

CREATE INDEX IF NOT EXISTS sys_idx_player_driverclassplayer5_12586 ON player (drag_class);

CREATE INDEX IF NOT EXISTS sys_idx_player_r44_12607 ON player (player_type_id);

CREATE UNIQUE INDEX IF NOT EXISTS sys_idx_sys_pk_12021_12022 ON player (player_id);
-- +goose StatementEnd