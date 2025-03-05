-- +goose Up
-- +goose StatementBegin
INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(0, 'EA', 'ea', 0),
	(1, 'Ford', 'ford', 9),
	(2, 'Mercury', 'merc', 9),
	(3, 'Chevrolet', 'chev', 9),
	(4, 'Cadillac', 'cadi', 9),
	(5, 'Oldsmobile', 'olds', 9),
	(6, 'Buick', 'buic', 9),
	(7, 'Pontiac', 'pont', 9),
	(8, 'Chrysler', 'chry', 9),
	(9, 'Dodge', 'dodg', 9)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(10, 'Plymouth', 'plym', 9),
	(11, 'AMC', 'amer', 9),
	(12, 'AMC', NULL, 9),
	(13, 'Edelbrock', 'edel', 0),
	(14, 'Holley', 'holl', 0),
	(15, 'GM', 'gm', 9),
	(16, 'Rochester', 'roch', 0),
	(17, 'Borg - Warner', 'borg', 0),
	(18, 'Vich', 'vich', 0),
	(19, 'Tibbits', 'tibb', 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(20, 'Lindstrom', 'lind', 0),
	(21, 'Crane', 'cran', 0),
	(22, 'Carter', 'cart', 0),
	(23, 'Carter - Rochester', NULL, 0),
	(25, 'Marinn', 'mari', 0),
	(26, 'Mallory', 'mall', 0),
	(27, 'Accel', 'acce', 0),
	(28, 'Stromberg', 'stro', 0),
	(29, 'AeroFit', 'aero', 0),
	(30, 'Hooker', 'hook', 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(31, 'TFSpecial', 'tfs', 0),
	(32, 'Apex', 'apex', 0),
	(34, 'ProTread', 'prot', 0),
	(35, 'PowerGrip', 'powe', 0),
	(36, 'C & A', 'ca', 0),
	(37, 'Manley', 'manl', 0),
	(38, 'Offenhauser', 'offe', 0),
	(39, 'Signature', 'sign', 0),
	(40, 'TRW', 'trw', 0),
	(41, 'JE Pistons', 'jepi', 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(42, 'Mr. Gasket', 'mrg', 0),
	(43, 'Pro - Formance', NULL, 0),
	(44, 'Blinsky', 'blin', 0),
	(45, 'SMVintage', 'sm', 0),
	(46, 'Bully', 'bull', 0),
	(47, 'Hays', 'hays', 0),
	(48, 'Lakewood', 'lake', 0),
	(49, 'Ferrari', 'ferr', 0),
	(50, 'Monarch', 'good', 0),
	(53, 'Emberwood', NULL, 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(54, 'Full Gee', NULL, 0),
	(56, 'BlackTop', NULL, 0),
	(57, 'Monroe', NULL, 0),
	(58, 'Lunati', NULL, 0),
	(59, 'Coatili', NULL, 0),
	(60, 'Acio', NULL, 0),
	(61, 'Dana', NULL, 0),
	(62, 'Potter', NULL, 0),
	(63, 'Autolite', NULL, 0),
	(64, 'Begren', NULL, 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(65, 'Kelsey - Hayes', NULL, 0),
	(67, 'Hall', NULL, 0),
	(68, 'US Radiator', NULL, 0),
	(69, 'Gifford', NULL, 0),
	(70, 'Shade Tree', NULL, 0),
	(71, 'AC Delco', NULL, 0),
	(72, 'Bendix', NULL, 0),
	(73, 'Ansman', NULL, 0),
	(74, 'Raven', NULL, 0),
	(76, 'Panteli', NULL, 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(77, 'Reed', NULL, 0),
	(78, 'Shelby', ' ', 0),
	(79, 'Leland', NULL, 0),
	(80, 'Dunbar', NULL, 0),
	(81, 'Weiand', NULL, 0),
	(82, 'Quaker', NULL, 0),
	(83, 'Oldfield', NULL, 0),
	(84, 'Milloy', NULL, 0),
	(85, 'Quik Lift', NULL, 0),
	(86, 'Duro Rod', NULL, 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(87, 'Newcomb', NULL, 0),
	(88, 'Hedgely', NULL, 0),
	(89, 'Fyne Grind', NULL, 0),
	(90, 'Electronic Arts', ' ', 0),
	(91, 'Rad Rat', NULL, 0),
	(92, 'C & B', NULL, 0),
	(93, 'Perfect Port', NULL, 0),
	(94, 'Walter', NULL, 0),
	(95, 'Percy', NULL, 0),
	(96, 'Street Shark', NULL, 0)
on conflict do nothing;

INSERT INTO
	brand (brand_id, brand, pic_name, is_stock)
VALUES
	(97, 'Pirelli', NULL, 0),
	(98, 'Michelin', NULL, 0),
	(99, 'Firestone', NULL, 0),
	(100, 'Goodyear', NULL, 0),
	(101, 'Yokohama', NULL, 0)
on conflict do nothing;
-- +goose StatementEnd