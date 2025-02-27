-- +goose Up
-- +goose StatementBegin
INSERT INTO
	part_type (
		part_type_id,
		abstract_part_type_id,
		part_type,
		part_filename,
		part_grade_id
	)
VALUES
	(101, 101, '1932 Ford V-8 Coupe', NULL, 1),
	(102, 101, '1940 Ford Deluxe Coupe', NULL, 1),
	(103, 101, '1953 Ford Crestline', NULL, 1),
	(104, 101, '1957 Ford Fairlane 500', NULL, 1),
	(105, 101, '1957 Ford Ranchero', NULL, 1),
	(106, 101, '1957 Ford Thunderbird', NULL, 1),
	(107, 101, '1963 Ford Thunderbird', NULL, 1),
	(108, 101, '1965 Ford Mustang', NULL, 1),
	(109, 101, '1964 Ford Galaxie 500', NULL, 1),
	(110, 101, '1969 Ford Torino GT', NULL, 1),
	(111, 101, '1970 Ford Boss 302 Mustang', NULL, 1),
	(112, 101, '1949 Mercury Coupe', NULL, 1),
	(113, 101, '1957 Chevrolet Bel-Air', NULL, 1),
	(114, 101, '1957 Chevrolet Corvette', NULL, 1),
	(115, 101, '1957 Chevrolet Nomad Wagon', NULL, 1),
	(116, 101, '1964 Chevrolet Impala', NULL, 1),
	(
		117,
		101,
		'1963 Chevrolet Corvette Stingray',
		NULL,
		1
	),
	(118, 101, '1958 Chevrolet Impala', NULL, 1),
	(119, 101, '1967 Chevrolet Chevelle', NULL, 1),
	(120, 101, '1967 Chevrolet Camaro', NULL, 1),
	(121, 101, '1970 Chevrolet Chevelle', NULL, 1),
	(122, 101, '1970 Chevrolet El Camino', NULL, 1),
	(123, 101, '1970 Chevrolet Nova', NULL, 1),
	(
		124,
		101,
		'1947 Cadillac Series 62 Sedanette',
		NULL,
		1
	),
	(
		125,
		101,
		'1959 Cadillac Eldorado Biarritz',
		NULL,
		1
	),
	(126, 101, '1969 Oldsmobile 4-4-2', NULL, 1),
	(127, 101, '1955 Buick Century', NULL, 1),
	(128, 101, '1966 Pontiac GTO', NULL, 1),
	(129, 101, '1969 Pontiac GTO', NULL, 1),
	(130, 101, '1973 Pontiac Firebird T/A', NULL, 1),
	(131, 101, '1969 AMX', NULL, 1),
	(132, 101, '1969 Dodge Charger', NULL, 1),
	(133, 101, '1969 Plymouth Road Runner', NULL, 1),
	(134, 101, '1970 Cuda', NULL, 1),
	(135, 101, '1971 Plymouth Duster', NULL, 1),
	(138, 101, 'Traffic 2 door', NULL, 1),
	(140, 101, '1967 Chevrolet Camaro SS', NULL, 1),
	(142, 101, '1970 Ford Boss 429 Mustang', NULL, 1),
	(146, 101, 'TRFMONTE', NULL, 1),
	(147, 101, 'TRFDELVR', NULL, 1),
	(148, 101, 'TRFBUS', NULL, 1),
	(149, 101, 'TRFGSX', NULL, 1),
	(150, 101, 'TRFSTANG', NULL, 1),
	(151, 101, 'TRFTBIRD', NULL, 1),
	(152, 101, 'TRFPUP1', NULL, 1),
	(153, 101, 'TRF2DR', NULL, 1),
	(154, 101, '1969 AMC Big Bad AMX', NULL, 1),
	(157, 101, '1969 Plymouth GTX Coupe', NULL, 1),
	(207, 101, 'Shelby 427 Cobra', NULL, 1),
	(210, 101, '1970 Ford Mustang', NULL, 1),
	(211, 101, '1969 Ford Torino GT Cobra', NULL, 1),
	(212, 101, '1970 Ford Mustang Mach 1', NULL, 1),
	(213, 101, '1970 Plymouth Hemi Cuda', NULL, 1),
	(214, 101, '1970 Plymouth 440 Cuda', NULL, 1),
	(215, 101, '1970 Plymouth AAR Cuda', NULL, 1),
	(216, 101, '1971 Plymouth 340 Duster', NULL, 1),
	(217, 101, '1964 Chevrolet Impala SS', NULL, 1),
	(218, 101, '1967 Chevrolet Chevelle SS', NULL, 1),
	(219, 101, '1967 Chevrolet Camaro RS', NULL, 1),
	(220, 101, '1967 Chevrolet Camaro Z-28', NULL, 1),
	(221, 101, '1970 Chevrolet Chevelle SS', NULL, 1),
	(222, 101, '1970 Chevrolet El Camino SS', NULL, 1),
	(223, 101, '1970 Chevrolet Nova SS', NULL, 1),
	(224, 101, '1969 Oldsmobile 442 W-30', NULL, 1),
	(225, 101, '1969 Oldsmobile Hurst 442', NULL, 1),
	(226, 101, '1969 Pontiac GTO Judge', NULL, 1),
	(
		227,
		101,
		'1973 Pontiac Firebird Formula',
		NULL,
		1
	),
	(228, 101, '1973 Pontiac Firebird', NULL, 1),
	(
		1001,
		1001,
		'Generic Chassis Suspension',
		'SUSP',
		1
	),
	(2001, 2001, 'Generic Chassis Body', NULL, 1),
	(4001, 4001, 'Generic Driveline Assembly', NULL, 1),
	(5001, 5001, 'Generic Brake Set', NULL, 1),
	(
		6001,
		6001,
		'Generic Visible Parts Assembly',
		NULL,
		1
	),
	(
		10001,
		10001,
		'10 x 2 Organic Disc Brake',
		NULL,
		1
	),
	(
		10002,
		10001,
		'11 x 2 Organic Disc Brake',
		NULL,
		2
	),
	(
		10003,
		10001,
		'12 x 2 Organic Disc Brake',
		NULL,
		2
	),
	(10004, 10001, '9 x 2 Organic Disc Brake', NULL, 1),
	(
		10005,
		10001,
		'9 x 2 Organic HT Disc Brake',
		NULL,
		1
	),
	(
		10006,
		10001,
		'10 x 2 Organic HT Disc Brake',
		NULL,
		1
	),
	(
		10007,
		10001,
		'11 x 2 Organic HT Disc Brake',
		NULL,
		2
	),
	(
		10008,
		10001,
		'12 x 2 Organic HT Disc Brake',
		NULL,
		2
	),
	(10009, 10001, '9 x 2 Organic Drum Brake', NULL, 1),
	(
		10010,
		10001,
		'10 x 2 Organic Drum Brake',
		NULL,
		1
	),
	(
		10011,
		10001,
		'11 x 2 Organic Drum Brake',
		NULL,
		1
	),
	(
		10012,
		10001,
		'12 x 2 Organic Drum Brake',
		NULL,
		1
	),
	(
		10013,
		10001,
		'9 x 2 Organic HT Drum Brake',
		NULL,
		1
	),
	(
		10014,
		10001,
		'10 x 2 Organic HT Drum Brake',
		NULL,
		1
	),
	(
		10015,
		10001,
		'11 x 2 Organic HT Drum Brake',
		NULL,
		1
	),
	(
		10016,
		10001,
		'12 x 2 Organic HT Drum Brake',
		NULL,
		2
	),
	(
		10017,
		10001,
		'11 x 2 Semi-Metallic Disc Brake',
		NULL,
		2
	),
	(
		10018,
		10001,
		'12 x 2 Semi-Metallic Disc Brake',
		NULL,
		2
	),
	(
		10019,
		10001,
		'11 x 2 Semi-Metallic Drum Brake',
		NULL,
		2
	),
	(
		10020,
		10001,
		'12 x 2 Semi-Metallic Drum Brake',
		NULL,
		2
	),
	(
		10021,
		10001,
		'11 x 2 Metallic Disc Brake',
		NULL,
		2
	),
	(
		10022,
		10001,
		'12 x 2 Metallic Disc Brake',
		NULL,
		3
	),
	(
		10023,
		10001,
		'14 x 2 Metallic Disc Brake',
		NULL,
		4
	),
	(
		10024,
		10001,
		'16 x 2 Metallic Disc Brake',
		NULL,
		4
	),
	(
		10025,
		10001,
		'10 x 2 Metallic Disc Brake',
		NULL,
		2
	),
	(
		10026,
		10001,
		'9 x 2 Metallic Disc Brake',
		NULL,
		2
	),
	(
		10027,
		10001,
		'10 x 2 Metallic Disc ABS Brake',
		NULL,
		3
	),
	(
		10028,
		10001,
		'12 x 2 Metallic Disc ABS Brake',
		NULL,
		3
	),
	(
		10029,
		10001,
		'14 x 2 Metallic Disc ABS Brake',
		NULL,
		4
	),
	(
		10030,
		10001,
		'16 x 2 Metallic Disc ABS Brake',
		NULL,
		4
	),
	(
		10031,
		10001,
		'11 x 2 Metallic Disc ABS Brake',
		NULL,
		3
	),
	(
		10032,
		10001,
		'13 x 2 Organic Drum Brake',
		NULL,
		3
	),
	(
		10033,
		10001,
		'13 x 2 Organic Disc Brake',
		NULL,
		3
	),
	(
		10034,
		10001,
		'13 x 2 Organic HT Drum Brake',
		NULL,
		3
	),
	(
		10035,
		10001,
		'13 x 2 Organic HT Disc Brake',
		NULL,
		3
	),
	(
		10036,
		10001,
		'13 x 2 Metallic Disc Brake',
		NULL,
		3
	),
	(
		10037,
		10001,
		'13 x 2 Semi-Metallic Disc Brake',
		NULL,
		3
	),
	(
		10038,
		10001,
		'13 x 2 Metallic Disc ABS Brake',
		NULL,
		3
	),
	(
		10039,
		10001,
		'14 x 2 Organic Drum Brake',
		NULL,
		3
	),
	(
		10040,
		10001,
		'14 x 2 Organic Disc Brake',
		NULL,
		3
	),
	(
		10041,
		10001,
		'14 x 2 Organic HT Drum Brake',
		NULL,
		3
	),
	(
		10042,
		10001,
		'14 x 2 Organic HT Disc Brake',
		NULL,
		3
	),
	(
		10043,
		10001,
		'9 x 2 Semi-Metallic Disc Brake',
		NULL,
		2
	),
	(
		10044,
		10001,
		'9 x 2 Metallic Disc ABS Brake',
		NULL,
		3
	),
	(11001, 11001, 'LD (0.2) Shock', NULL, 1),
	(11002, 11001, 'LD (0.3) Shock', NULL, 1),
	(11003, 11001, 'ND (0.2) Shock', NULL, 1),
	(11004, 11001, 'ND (0.3) Shock', NULL, 1),
	(11005, 11001, 'HD (0.24) Shock', NULL, 2),
	(11006, 11001, 'HD (0.3) Shock', NULL, 2),
	(11007, 11001, 'HD (0.36) Shock', NULL, 2),
	(11008, 11001, 'XHD (0.3) Shock', NULL, 3),
	(11009, 11001, 'XHD (0.36) Shock', NULL, 3),
	(11010, 11001, 'XHD (0.4) Shock', NULL, 3),
	(11011, 11001, 'ND (0.3) 12.5" Shock', NULL, 1),
	(
		11012,
		11001,
		'Edelbrock Performer IAS Shock',
		NULL,
		2
	),
	(
		11013,
		11001,
		'Edelbrock Street Stock Race Shock',
		NULL,
		3
	),
	(12001, 12001, '70 lb/in traverse spring', NULL, 1),
	(12002, 12001, '80 lb/in traverse spring', NULL, 1),
	(12003, 12001, '90 lb/in traverse spring', NULL, 1),
	(
		12004,
		12001,
		'100  lb/in traverse spring',
		NULL,
		1
	),
	(
		12005,
		12001,
		'110 lb/in traverse spring',
		NULL,
		1
	),
	(12006, 12001, '120 lb/in coil spring', NULL, 1),
	(12007, 12001, '130 lb/in coil spring', NULL, 1),
	(12008, 12001, '140 lb/in coil spring', NULL, 1),
	(12009, 12001, '150 lb/in coil spring', NULL, 1),
	(12010, 12001, '160 lb/in coil spring', NULL, 1),
	(12011, 12001, '170 lb/in coil spring', NULL, 1),
	(12012, 12001, '180 lb/in leaf spring', NULL, 2),
	(12013, 12001, '190 lb/in leaf spring', NULL, 2),
	(12014, 12001, '200 lb/in leaf spring', NULL, 3),
	(
		12015,
		12001,
		'210 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12016,
		12001,
		'220 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12017,
		12001,
		'230 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12018,
		12001,
		'240 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12019,
		12001,
		'250 lb/in coil-over spring',
		NULL,
		3
	),
	(12020, 12001, '100 lb/in coil spring', NULL, 1),
	(12021, 12001, '110 lb/in coil spring', NULL, 1),
	(12022, 12001, '150 lb/in leaf spring', NULL, 1),
	(12023, 12001, '160 lb/in leaf spring', NULL, 1),
	(12024, 12001, '170 lb/in leaf spring', NULL, 1),
	(
		12025,
		12001,
		'190 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12026,
		12001,
		'200 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12027,
		12001,
		'180 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12028,
		12001,
		'170 lb/in coil-over spring',
		NULL,
		3
	),
	(
		12029,
		12001,
		'160 lb/in coil-over spring',
		NULL,
		3
	),
	(12030, 12001, '140 lb/in leaf spring', NULL, 1),
	(12031, 12001, '130 lb/in leaf spring', NULL, 1),
	(12032, 12001, '120 lb/in leaf spring', NULL, 1),
	(12033, 12001, '110 lb/in leaf spring', NULL, 1),
	(12034, 12001, '220 lb/in coil spring', NULL, 1),
	(12035, 12001, '230 lb/in coil spring', NULL, 1),
	(12036, 12001, '240 lb/in coil spring', NULL, 1),
	(12037, 12001, '250 lb/in coil spring', NULL, 2),
	(12038, 12001, '260 lb/in coil spring', NULL, 2),
	(12039, 12001, '270 lb/in coil spring', NULL, 2),
	(12040, 12001, '280 lb/in coil spring', NULL, 2),
	(12041, 12001, '290 lb/in coil spring', NULL, 2),
	(12042, 12001, '300 lb/in coil spring', NULL, 2),
	(12043, 12001, '310 lb/in coil spring', NULL, 2),
	(12044, 12001, '320 lb/in coil spring', NULL, 2),
	(12045, 12001, '330 lb/in coil spring', NULL, 2),
	(12046, 12001, '340 lb/in coil spring', NULL, 2),
	(12047, 12001, '350 lb/in coil spring', NULL, 2),
	(12048, 12001, '360 lb/in coil spring', NULL, 3),
	(12049, 12001, '370 lb/in coil spring', NULL, 3),
	(12050, 12001, '380 lb/in coil spring', NULL, 3),
	(12051, 12001, '390 lb/in coil spring', NULL, 3),
	(12052, 12001, '400 lb/in coil spring', NULL, 3),
	(12053, 12001, '410 lb/in coil spring', NULL, 3),
	(12054, 12001, '420 lb/in coil spring', NULL, 3),
	(12055, 12001, '430 lb/in coil spring', NULL, 3),
	(12056, 12001, '440 lb/in coil spring', NULL, 3),
	(12057, 12001, '450 lb/in coil spring', NULL, 3),
	(12058, 12001, '460 lb/in coil spring', NULL, 4),
	(12059, 12001, '470 lb/in coil spring', NULL, 4),
	(12060, 12001, '480 lb/in coil spring', NULL, 4),
	(12061, 12001, '490 lb/in coil spring', NULL, 4),
	(12062, 12001, '500 lb/in coil spring', NULL, 4),
	(12063, 12001, '510 lb/in coil spring', NULL, 4),
	(12064, 12001, '180 lb/in coil spring', NULL, 1),
	(12065, 12001, 'Edelbrock AS Coil Spring', NULL, 2),
	(12066, 12001, 'Edelbrock AB Coil Spring', NULL, 2),
	(
		12067,
		12001,
		'Edelbrock AGB Coil Spring',
		NULL,
		2
	),
	(12068, 12001, 'Edelbrock F Coil Spring', NULL, 2),
	(12069, 12001, 'Edelbrock M Coil Spring', NULL, 2),
	(13001, 13001, '50 Nm Sway Bar', NULL, 1),
	(13002, 13001, '60 Nm Sway Bar', NULL, 1),
	(13003, 13001, '70 Nm Sway Bar', NULL, 1),
	(13004, 13001, '80 Nm Sway Bar', NULL, 1),
	(13005, 13001, '90 Nm Sway Bar', NULL, 1),
	(13006, 13001, '100 Nm Sway Bar', NULL, 1),
	(13007, 13001, '110 Nm Sway Bar', NULL, 1),
	(13008, 13001, '120 Nm Sway Bar', NULL, 1),
	(13009, 13001, '130 Nm Sway Bar', NULL, 1),
	(13010, 13001, '140 Nm Sway Bar', NULL, 1),
	(13011, 13001, '150 Nm Sway Bar', NULL, 1),
	(13012, 13001, '160 Nm Sway Bar', NULL, 1),
	(13013, 13001, '170 Nm Sway Bar', NULL, 1),
	(13014, 13001, '180 Nm Sway Bar', NULL, 2),
	(13015, 13001, '190 Nm Sway Bar', NULL, 2),
	(13016, 13001, '200 Nm Sway Bar', NULL, 2),
	(13017, 13001, '210 Nm Sway Bar', NULL, 2),
	(13018, 13001, '220 Nm Sway Bar', NULL, 2),
	(13019, 13001, '230 Nm Sway Bar', NULL, 2),
	(13020, 13001, '240 Nm Sway Bar', NULL, 2),
	(13021, 13001, '250 Nm Sway Bar', NULL, 3),
	(13022, 13001, '260 Nm Sway Bar', NULL, 3),
	(13023, 13001, '270 Nm Sway Bar', NULL, 3),
	(13024, 13001, '280 Nm Sway Bar', NULL, 3),
	(
		13025,
		13001,
		'Edelbrock Tubular Panhard Rod',
		NULL,
		2
	),
	(14001, 14001, 'LD Traction Bar', NULL, 1),
	(14002, 14001, 'ND Traction Bar', NULL, 2),
	(14003, 14001, 'HD Traction Bar', NULL, 3),
	(14004, 14001, 'XHD Traction Bar', NULL, 4),
	(14005, 14001, 'Edelbrock Anti-Hop Bar', NULL, 2),
	(15001, 15001, 'Wheel Assembly', NULL, 1),
	(
		16001,
		16001,
		'Fuzzy Dice Accessory',
		'fuzzdice',
		1
	),
	(17001, 17001, 'Generic Roll Bar', '.bodymod', 1),
	(
		18001,
		18001,
		'Medium Window Tinting',
		'.bodymod',
		1
	),
	(
		18002,
		18001,
		'Light Window Tinting',
		'.bodymod',
		1
	),
	(
		18003,
		18001,
		'Dark Window Tinting',
		'.bodymod',
		1
	),
	(
		18004,
		18001,
		'Very Dark Window Tinting',
		'.bodymod',
		1
	),
	(20101, 20001, '1932 Ford Coupe', '32ford', 1),
	(20102, 20001, '1940 Ford Coupe', '40ford', 1),
	(20103, 20001, '1953 Ford Crestline', '53ford', 1),
	(20104, 20001, '1957 Ford Fairlane', '57fair', 1),
	(20105, 20001, '1957 Ford Ranchero', '57ranch', 1),
	(
		20106,
		20001,
		'1957 Ford Thunderbird',
		'57tbird',
		1
	),
	(
		20107,
		20001,
		'1963 Ford Thunderbird',
		'63tbird',
		1
	),
	(20108, 20001, '1964 Ford Mustang', '64stang', 1),
	(20109, 20001, '1964 Ford Galaxie', '64galaxi', 1),
	(
		20110,
		20001,
		'1969 Ford Torino GT',
		'69torino',
		1
	),
	(20111, 20001, '1970 Ford Boss 302', '70stang', 1),
	(20112, 20001, '1949 Mercury Coupe', '49merc', 1),
	(
		20113,
		20001,
		'1957 Chevrolet Bel-Air',
		'57chevy',
		1
	),
	(
		20114,
		20001,
		'1957 Chevrolet Corvette',
		'57vette',
		1
	),
	(
		20115,
		20001,
		'1957 Chevrolet Nomad',
		'57nomad',
		1
	),
	(
		20116,
		20001,
		'1964 Chevrolet Impala',
		'64impala',
		1
	),
	(
		20117,
		20001,
		'1963 Chevrolet Stingray',
		'63vette',
		1
	),
	(
		20118,
		20001,
		'1958 Chevrolet Impala',
		'58impala',
		1
	),
	(
		20119,
		20001,
		'1967 Chevrolet Chevelle',
		'67chev',
		1
	),
	(
		20120,
		20001,
		'1967 Chevrolet Camaro',
		'67camaro',
		1
	),
	(
		20121,
		20001,
		'1970 Chevrolet Chevelle',
		'70chev',
		1
	),
	(
		20122,
		20001,
		'1970 Chevrolet El Camino',
		'70camino',
		1
	),
	(20123, 20001, '1970 Chevrolet Nova', '70nova', 1),
	(
		20124,
		20001,
		'1947 Cadillac Series 62',
		'47caddy',
		1
	),
	(
		20125,
		20001,
		'1959 Cadillac Eldorado',
		'59caddy',
		1
	),
	(
		20126,
		20001,
		'1969 Oldsmobile 4-4-2',
		'69old442',
		1
	),
	(20127, 20001, '1955 Buick Century', '55cent', 1),
	(20128, 20001, '1966 Pontiac GTO', '66gto', 1),
	(20129, 20001, '1969 Pontiac GTO', '69gto', 1),
	(
		20130,
		20001,
		'1973 Pontiac Firebird T/A',
		'73trans',
		1
	),
	(20131, 20001, '1969 AMC AMX', '69amcamx', 1),
	(20132, 20001, '1969 Dodge Charger', '69charge', 1),
	(
		20133,
		20001,
		'1969 Plymouth Rd. Runner',
		'69runner',
		1
	),
	(20134, 20001, '1970 Plymouth Cuda', '70hemicu', 1),
	(
		20135,
		20001,
		'1971 Plymouth Duster',
		'71duster',
		1
	),
	(
		20138,
		20001,
		'1999 EA Traffic 2 door',
		'trf2dr',
		1
	),
	(
		20140,
		20001,
		'1967 Chevrolet Camaro SS',
		'67sscam',
		1
	),
	(20146, 20001, '1990 EA TRFMONTE', 'TRFMONTE', 1),
	(20147, 20001, '1990 EA TRFDELVR', 'TRFDELVR', 1),
	(20148, 20001, '1990 EA TRFBUS', 'TRFBUS', 1),
	(20149, 20001, '1990 EA TRFGSX', 'TRFGSX', 1),
	(20150, 20001, '1990 EA TRFSTANG', 'TRFSTANG', 1),
	(20151, 20001, '1990 EA TRFTBIRD', 'TRFTBIRD', 1),
	(20152, 20001, '1990 EA TRFPUP1', 'TRFPUP1', 1),
	(20153, 20001, '1990 EA TRF2DR', 'TRF2DR', 1),
	(20157, 20001, '1969 Plymouth GTX', '69GTX', 1),
	(20207, 20001, '1966 Shelby 427 Cobra', '66cob', 1),
	(20210, 20001, '1970 Ford Mustang', '70stang', 1),
	(
		20211,
		20001,
		'1969 Ford Torino Cobra',
		'69torino',
		1
	),
	(20212, 20001, '1970 Ford Mach 1', '70STANG', 1),
	(
		20213,
		20001,
		'1970 Plymouth Hemi Cuda',
		'70hemicu',
		1
	),
	(
		20214,
		20001,
		'1970 Plymouth 440 Cuda',
		'70hemicu',
		1
	),
	(
		20215,
		20001,
		'1970 Plymouth AAR Cuda',
		'70CUDA',
		1
	),
	(
		20216,
		20001,
		'1971 Plymouth 340 Duster',
		'71duster',
		1
	),
	(
		20217,
		20001,
		'1964 Chevrolet Impala SS',
		'64impala',
		1
	),
	(
		20218,
		20001,
		'1967 Chevrolet Chevelle SS',
		'67chev',
		1
	),
	(
		20219,
		20001,
		'1967 Chevrolet Camaro RS',
		'67camaro',
		1
	),
	(
		20220,
		20001,
		'1967 Chevrolet Camaro Z-28',
		'67camaro',
		1
	),
	(
		20221,
		20001,
		'1970 Chevrolet Chevelle SS',
		'70CHEV',
		1
	),
	(
		20222,
		20001,
		'1970 Chevrolet El Camino SS',
		'70CAMINO',
		1
	),
	(
		20223,
		20001,
		'1970 Chevrolet Nova SS',
		'70nova',
		1
	),
	(
		20224,
		20001,
		'1969 Oldsmobile 4-4-2 W-30',
		'69W30old',
		1
	),
	(
		20225,
		20001,
		'1969 Oldsmobile Hurst 4-4-2',
		'69old442',
		1
	),
	(
		20226,
		20001,
		'1969 Pontiac GTO Judge',
		'69gto',
		1
	),
	(
		20227,
		20001,
		'1973 Pontiac Firebird Formula',
		'73fireb',
		1
	),
	(
		20228,
		20001,
		'1973 Pontiac Firebird',
		'73fireb',
		1
	),
	(21001, 21001, '1947 Cadillac', '.bodymod', 1),
	(21002, 21001, '1949 Ford', '.bodymod', 1),
	(
		21003,
		21001,
		'1973 Cadillac Fleetwood Eldorado',
		'.bodymod',
		1
	),
	(21004, 21001, '1953 Chevy Bel Air', '.bodymod', 1),
	(21005, 21001, '1967 Chevy Impala', '.bodymod', 1),
	(
		21006,
		21001,
		'1969 Chevy Chevelle',
		'.bodymod',
		1
	),
	(
		21007,
		21001,
		'1970 Chevrolet Monte Carlo',
		'.bodymod',
		1
	),
	(
		21008,
		21001,
		'53 C.line Fender Skirt',
		'.bodymod',
		1
	),
	(21009, 21001, '1955 Ford Fairlane', '.bodymod', 1),
	(
		21010,
		21001,
		'1956 Ford / Thunderbird',
		'.bodymod',
		1
	),
	(
		21011,
		21001,
		'1957 Ford / Thunderbird',
		'.bodymod',
		1
	),
	(21012, 21001, '1937 Ford', '.bodymod', 1),
	(21013, 21001, '1939 Chevrolet', '.bodymod', 1),
	(
		21014,
		21001,
		'40 Coupe Fender Skirt',
		'.bodymod',
		1
	),
	(21015, 21001, '1941 Plymouth', '.bodymod', 1),
	(
		21016,
		21001,
		'49 Coupe Fender Skirt',
		'.bodymod',
		1
	),
	(22001, 22001, 'Vanilla Horn', NULL, 1),
	(22002, 22001, 'Cuda A', NULL, 1),
	(22003, 22001, 'Cuda B', NULL, 1),
	(22004, 22001, 'Cuda 2stone', NULL, 1),
	(22005, 22001, 'El Camino A', NULL, 1),
	(22006, 22001, 'El Camino B', NULL, 1),
	(22007, 22001, 'Firebird A', NULL, 1),
	(22008, 22001, 'Firebird B', NULL, 1),
	(22009, 22001, 'Fury', NULL, 1),
	(22010, 22001, 'GMC', NULL, 1),
	(22011, 22001, 'Hillman', NULL, 1),
	(22012, 22001, 'Impala', NULL, 1),
	(22013, 22001, 'Metropolitan', NULL, 1),
	(22014, 22001, 'Metropolitan Siren', NULL, 1),
	(22015, 22001, 'Mustang', NULL, 1),
	(22016, 22001, 'Snubnose', NULL, 1),
	(22017, 22001, 'Aoooga A', NULL, 1),
	(22018, 22001, 'Aoooga B', NULL, 1),
	(22019, 22001, 'Aoooga C', NULL, 1),
	(22020, 22001, 'Horn La cooca racha', NULL, 1),
	(22021, 22001, 'Horn Reville', NULL, 1),
	(22022, 22001, 'Horn Dixie', NULL, 1),
	(22023, 22001, 'Horn Charge', NULL, 1),
	(22024, 22001, 'Horn Charge Short', NULL, 1),
	(
		23001,
		23001,
		'1927 Ford Model T Boards',
		'.bodymod',
		1
	),
	(
		23002,
		23001,
		'1931 Ford Model A Boards',
		'.bodymod',
		1
	),
	(
		23003,
		23001,
		'1932 Ford Coupe Boards',
		'.bodymod',
		1
	),
	(
		23004,
		23001,
		'1932 Chevrolet Confederate Boards',
		'.bodymod',
		1
	),
	(
		23005,
		23001,
		'1934 Ford Coupe Boards',
		'.bodymod',
		1
	),
	(
		23006,
		23001,
		'1937 Ford Coupe Boards',
		'.bodymod',
		1
	),
	(
		23007,
		23001,
		'1937 Chevy Coupe Boards',
		'.bodymod',
		1
	),
	(
		23008,
		23001,
		'1939 Chevy Coupe Boards',
		'.bodymod',
		1
	),
	(
		23009,
		23001,
		'1940 Ford Deluxe Coupe Boards',
		'.bodymod',
		1
	),
	(
		23010,
		23001,
		'1941 Plymouth Coupe Boards',
		'.bodymod',
		1
	),
	(
		23011,
		23001,
		'1947 Cadillac Sedanette Boards',
		'.bodymod',
		1
	),
	(
		23012,
		23001,
		'1948 Ford Woody Boards',
		'.bodymod',
		1
	),
	(
		25001,
		340333,
		'Sipper Air Scoop 1%',
		'scooprec',
		1
	),
	(
		25002,
		340333,
		'Slipstream Air Scoop 2%',
		'scooprec',
		2
	),
	(
		25003,
		340333,
		'Impeller Air Scoop 3%',
		'scooptri',
		3
	),
	(
		25004,
		340333,
		'Holley Forced Air Scoop 4%',
		'scooptri',
		3
	),
	(
		25005,
		340333,
		'Holley Ram Air Scoop 5%',
		'scooprec',
		4
	),
	(
		25006,
		340333,
		'Pontiac Ram Air Induction System',
		'SCOOPREC',
		2
	),
	(
		25007,
		340333,
		'Olds W30 Forced Air Induction System',
		'SCOOPREC',
		2
	),
	(
		25008,
		340333,
		'Flared Velocity Stack',
		'STACK1F',
		2
	),
	(
		25009,
		340333,
		'Tall Flared Velocity Stack',
		'STACK1FH',
		2
	),
	(
		25010,
		340333,
		'Straight Velocity Stack',
		'STACK1S',
		2
	),
	(
		25011,
		340333,
		'Dual Flared Velocity Stacks',
		'STACK2F',
		2
	),
	(
		25012,
		340333,
		'Dual Tall Flared Velocity Stacks',
		'STACK2FH',
		2
	),
	(
		25013,
		340333,
		'Dual Straight Velocity Stacks',
		'STACK2S',
		2
	),
	(
		25014,
		340333,
		'Triple Flared Velocity Stacks',
		'stack3f',
		2
	),
	(
		25015,
		340333,
		'Triple Tall Flared Velocity Stacks',
		'stack3fh',
		2
	),
	(
		25016,
		340333,
		'Triple Straight Velocity Stacks',
		'stack3s',
		2
	),
	(
		25017,
		340333,
		'Quad Flared Velocity Stacks',
		'STACK4F',
		2
	),
	(
		25018,
		340333,
		'Quad Tall Flared Velocity Stacks',
		'STACK4FH',
		2
	),
	(
		25019,
		340333,
		'Quad Straight Velocity Stacks',
		'STACK4S',
		2
	),
	(
		25020,
		340333,
		'Eight Flared Velocity Stacks',
		'STACK8F',
		2
	),
	(
		25021,
		340333,
		'Eight Tall Flared Velocity Stacks',
		'STACK8FH',
		2
	),
	(
		25022,
		340333,
		'Eight Straight Velocity Stacks',
		'STACK8S',
		2
	),
	(26001, 26001, 'White Fog Lights', 'FOGWHITE', 1),
	(27001, 26001, 'Amber Fog Lights', 'FOGAMBER', 1),
	(
		28001,
		28001,
		'1940 Ford Spot Light',
		'SPOTLITE',
		1
	),
	(
		28002,
		28001,
		'1947 Cadillac Spot Light',
		'SPOTLITE',
		1
	),
	(
		28003,
		28001,
		'1955 Buick Spot Light',
		'SPOTLITE',
		1
	),
	(
		28004,
		28001,
		'1957 Chevy Bel-Air Spot Light',
		'SPOTLITE',
		1
	),
	(
		28005,
		28001,
		'1957 Chevy Wagon Spot Light',
		'SPOTLITE',
		1
	),
	(29001, 29001, '25 kg Spoiler', '.bodymod', 1),
	(29002, 29001, '50 kg Spoiler', '.bodymod', 1),
	(29003, 29001, '75 kg Spoiler', '.bodymod', 1),
	(29004, 29001, '100 kg Spoiler', '.bodymod', 2),
	(29005, 29001, '125 kg Spoiler', '.bodymod', 2),
	(29006, 29001, '150 kg Spoiler', '.bodymod', 2),
	(29007, 29001, '175 kg Spoiler', '.bodymod', 3),
	(29008, 29001, '200 kg Spoiler', '.bodymod', 3),
	(29009, 29001, '225 kg Spoiler', '.bodymod', 3),
	(29010, 29001, '250 kg Spoiler', '.bodymod', 4),
	(30001, 30001, '25 kg Rear Spoiler', 'SPOILER', 1),
	(30002, 30001, '50 kg Rear Spoiler', 'SPOILER', 1),
	(30003, 30001, '75 kg Rear Spoiler', 'SPOILER', 1),
	(30004, 30001, '100 kg Rear Spoiler', 'SPOILER', 2),
	(30005, 30001, '125 kg Rear Spoiler', 'SPOILER', 2),
	(30006, 30001, '150 kg Rear Spoiler', 'SPOILER', 2),
	(30007, 30001, '175 kg Rear Spoiler', 'SPOILER', 3),
	(30008, 30001, '200 kg Rear Spoiler', 'SPOILER', 3),
	(30009, 30001, '225 kg Rear Spoiler', 'SPOILER', 3),
	(30010, 30001, '250 kg Rear Spoiler', 'SPOILER', 4),
	(31166, 31001, 'Hardtop', NULL, 1),
	(31167, 31001, 'Chopped Top', '.chopped', 1),
	(31168, 31001, 'Convertible Top', '.convert', 1),
	(31169, 31001, 'Vinyl Top', '.vinyl', 1),
	(
		32001,
		32001,
		'Wheelie Bar Attachment',
		'WHEELIE',
		1
	),
	(33001, 33001, 'Speedline Driver', 'DRIVER10', 1),
	(34001, 34001, '32 Ford Fenders', '.bodymod', 0),
	(35001, 35001, '32 Ford Bumpers', '.bodymod', 0),
	(35002, 35001, '40 Ford Bumpers', '.bodymod', 0),
	(
		35003,
		35001,
		'65 Shelby Cobra Bumpers',
		'.bodymod',
		0
	),
	(36002, 36001, 'Engine Assembly', NULL, 1),
	(36003, 36001, 'Buick 322 4V (255 hp)', NULL, 1),
	(36004, 36001, 'Chevy SB 265 2V (162 hp)', NULL, 1),
	(36005, 36001, 'Chevy SB 265 4V (180 hp)', NULL, 1),
	(36006, 36001, 'Chevy SB 265 4V (195 hp)', NULL, 1),
	(36007, 36001, 'Chevy SB 283 2V (185 hp)', NULL, 1),
	(36008, 36001, 'Chevy SB 283 4V (220 hp)', NULL, 1),
	(
		36009,
		36001,
		'Chevy SB 283 2x4V (245 hp)',
		NULL,
		1
	),
	(
		36010,
		36001,
		'Chevy SB 283 2x4V (270 hp)',
		NULL,
		1
	),
	(36011, 36001, 'Chevy SB 283 FI (283 hp)', NULL, 2),
	(36012, 36001, 'Chevy SB 283 FI (290 hp)', NULL, 2),
	(36013, 36001, 'Chevy SB 283 FI (275 hp)', NULL, 2),
	(36014, 36001, 'Chevy SB 283 FI (315 hp)', NULL, 2),
	(
		36015,
		36001,
		'Chevy SB 265 2x4V (225 hp)',
		NULL,
		1
	),
	(36016, 36001, 'Chevy SB 327 4V (250 hp)', NULL, 1),
	(36017, 36001, 'Chevy SB 327 4V (300 hp)', NULL, 1),
	(36018, 36001, 'Chevy SB 327 4V (340 hp)', NULL, 2),
	(36019, 36001, 'Chevy SB 327 FI (360 hp)', NULL, 2),
	(36020, 36001, 'Chevy SB 327 4V (365 hp)', NULL, 2),
	(36021, 36001, 'Chevy SB 327 FI (375 hp)', NULL, 2),
	(36022, 36001, 'Chevy SB 302 4V (290 hp)', NULL, 2),
	(36023, 36001, 'Chevy SB 350 4V (295 hp)', NULL, 1),
	(36024, 36001, 'Chevy SB 350 4V (250 hp)', NULL, 1),
	(36025, 36001, 'Chevy SB 350 4V (350 hp)', NULL, 2),
	(
		36026,
		36001,
		'Chevy SB 350 4V (360 hp) Z/28',
		NULL,
		2
	),
	(
		36027,
		36001,
		'Chevy SB 350 4V (370 hp) LT-1',
		NULL,
		2
	),
	(36028, 36001, 'Chevy SB 400 4V (265 hp)', NULL, 1),
	(36029, 36001, 'Chevy W 348 4V (250 hp)', NULL, 1),
	(
		36030,
		36001,
		'Chevy W 348 3x2V (280 hp)',
		NULL,
		1
	),
	(36031, 36001, 'Chevy W 348 4V (305 hp)', NULL, 2),
	(36032, 36001, 'Chevy W 348 4V (315 hp)', NULL, 2),
	(
		36033,
		36001,
		'Chevy W 348 3x2V (315 hp)',
		NULL,
		2
	),
	(36034, 36001, 'Chevy W 348 4V (320 hp)', NULL, 2),
	(
		36035,
		36001,
		'Chevy W 348 3x2V (335 hp)',
		NULL,
		2
	),
	(36036, 36001, 'Chevy W 348 4V (340 hp)', NULL, 2),
	(
		36037,
		36001,
		'Chevy W 348 3x2V (350 hp)',
		NULL,
		2
	),
	(36038, 36001, 'Chevy W 409 4V (360 hp)', NULL, 2),
	(36039, 36001, 'Chevy W 409 4V (380 hp)', NULL, 2),
	(
		36040,
		36001,
		'Chevy W 409 2x4V (409 hp)',
		NULL,
		2
	),
	(36041, 36001, 'Chevy W 409 4V (340 hp)', NULL, 2),
	(36042, 36001, 'Chevy W 409 4V (400 hp)', NULL, 2),
	(
		36043,
		36001,
		'Chevy W 409 2x4V (425 hp)',
		NULL,
		2
	),
	(
		36044,
		36001,
		'Chevy W 427 2x4V (430 hp) Z11',
		NULL,
		2
	),
	(36045, 36001, 'Chevy BB 396 4V (325 hp)', NULL, 1),
	(36046, 36001, 'Chevy BB 396 4V (350 hp)', NULL, 2),
	(36047, 36001, 'Chevy BB 396 4V (425 hp)', NULL, 2),
	(36048, 36001, 'Chevy BB 396 4V (360 hp)', NULL, 1),
	(36049, 36001, 'Chevy BB 427 4V (390 hp)', NULL, 1),
	(36050, 36001, 'Chevy BB 427 4V (425 hp)', NULL, 2),
	(
		36051,
		36001,
		'Chevy BB 427 3x2V (400 hp)',
		NULL,
		2
	),
	(
		36052,
		36001,
		'Chevy BB 427 4V (430 hp) L88',
		NULL,
		3
	),
	(
		36053,
		36001,
		'Chevy BB 427 3x2V (435 hp) L89',
		NULL,
		3
	),
	(
		36054,
		36001,
		'Chevy BB 427 3x2V (435 hp) L71',
		NULL,
		3
	),
	(36055, 36001, 'Chevy BB 402 4V (325 hp)', NULL, 1),
	(
		36056,
		36001,
		'Chevy BB 454 4V (345 hp) LS4',
		NULL,
		1
	),
	(
		36057,
		36001,
		'Chevy BB 454 4V (360 hp) LS5',
		NULL,
		1
	),
	(
		36058,
		36001,
		'Chevy BB 454 4V (390 hp) LS5',
		NULL,
		2
	),
	(
		36059,
		36001,
		'Chevy BB 454 4V (450 hp) LS6',
		NULL,
		3
	),
	(
		36060,
		36001,
		'Chevy BB 454 4V (465 hp) LS7',
		NULL,
		3
	),
	(
		36061,
		36001,
		'Chevy BB 454 4V (425 hp) LS6',
		NULL,
		3
	),
	(36062, 36001, 'Olds 455 2V (310 hp)', NULL, 1),
	(36063, 36001, 'Olds 455 4V (365 hp)', NULL, 1),
	(36064, 36001, 'Olds 455 4V (375 hp)', NULL, 1),
	(36065, 36001, 'Olds 455 4V (390 hp)', NULL, 2),
	(36066, 36001, 'Olds 455 4V (400 hp)', NULL, 2),
	(36067, 36001, 'Olds 400 4V (345 hp)', NULL, 1),
	(36068, 36001, 'Olds 400 4V (350 hp)', NULL, 1),
	(36069, 36001, 'Olds 400 3x2V (365 hp)', NULL, 2),
	(36070, 36001, 'Olds 400 2V (300 hp)', NULL, 1),
	(36071, 36001, 'Olds 400 4V W30', NULL, 2),
	(36072, 36001, 'Pontiac 389 2V (215 hp)', NULL, 1),
	(36073, 36001, 'Pontiac 389 2V (245 hp)', NULL, 1),
	(36074, 36001, 'Pontiac 389 4V (260 hp)', NULL, 1),
	(36075, 36001, 'Pontiac 389 2V (280 hp)', NULL, 1),
	(36076, 36001, 'Pontiac 389 4V (303 hp)', NULL, 1),
	(
		36077,
		36001,
		'Pontiac 389 Trophy 4V (300 hp)',
		NULL,
		2
	),
	(
		36078,
		36001,
		'Pontiac 389 Trophy 3x2V (315 hp)',
		NULL,
		2
	),
	(
		36079,
		36001,
		'Pontiac 389 SD 4V (330 hp)',
		NULL,
		3
	),
	(
		36080,
		36001,
		'Pontiac 389 SD 3x2V (345 hp)',
		NULL,
		3
	),
	(
		36081,
		36001,
		'Pontiac 389 Trophy 3x2V (333 hp)',
		NULL,
		2
	),
	(
		36082,
		36001,
		'Pontiac 389 Trophy 4V (318 hp)',
		NULL,
		2
	),
	(
		36083,
		36001,
		'Pontiac 389 SD 3x2V (363 hp)',
		NULL,
		2
	),
	(
		36084,
		36001,
		'Pontiac 421 SD 2x4V (373 hp)',
		NULL,
		2
	),
	(36085, 36001, 'Pontiac 421 4V (320 hp)', NULL, 1),
	(
		36086,
		36001,
		'Pontiac 421 SD 2x4V (405 hp)',
		NULL,
		3
	),
	(
		36087,
		36001,
		'Pontiac 421 HO 4V (353 hp)',
		NULL,
		2
	),
	(
		36088,
		36001,
		'Pontiac 421 HO 3x2V (370 hp)',
		NULL,
		2
	),
	(
		36089,
		36001,
		'Pontiac 421 SD 4V (390 hp)',
		NULL,
		3
	),
	(
		36090,
		36001,
		'Pontiac 421 SD 2x4V (410 hp)',
		NULL,
		3
	),
	(36091, 36001, 'Pontiac 400 2V (255 hp)', NULL, 1),
	(36092, 36001, 'Pontiac 400 4V (290 hp)', NULL, 1),
	(36093, 36001, 'Pontiac 400 Ram Air I', NULL, 2),
	(36094, 36001, 'Pontiac 400 Ram Air II', NULL, 2),
	(36095, 36001, 'Pontiac 400 Ram Air IV', NULL, 2),
	(36096, 36001, 'Pontiac 455 4V (360 hp)', NULL, 2),
	(36097, 36001, 'Pontiac 455 4V (370 hp)', NULL, 2),
	(
		36098,
		36001,
		'Pontiac 455 HO 4V (335 hp)',
		NULL,
		1
	),
	(
		36099,
		36001,
		'Pontiac 455 SD 4V (290 hp)',
		NULL,
		2
	),
	(36100, 36001, 'Ford Y 292 4V (193 hp)', NULL, 1),
	(36101, 36001, 'Ford Y 292 4V (198 hp)', NULL, 1),
	(36102, 36001, 'Ford Y 292 4V (212 hp)', NULL, 1),
	(36103, 36001, 'Ford Y 312 4V (210 hp)', NULL, 1),
	(36104, 36001, 'Ford Y 312 4V (225 hp)', NULL, 1),
	(36105, 36001, 'Ford Y 312 2x4V (265 hp)', NULL, 1),
	(36106, 36001, 'Ford FE 352 4V (300 hp)', NULL, 2),
	(
		36107,
		36001,
		'Ford FE 352 HP 4V (360 hp)',
		NULL,
		2
	),
	(36108, 36001, 'Ford FE 352 2V (220 hp)', NULL, 1),
	(36109, 36001, 'Ford FE 390 4V (300 hp)', NULL, 1),
	(
		36110,
		36001,
		'Ford FE 390 HP 4V (375 hp)',
		NULL,
		2
	),
	(
		36111,
		36001,
		'Ford FE 390 HP 3x2V (401 hp)',
		NULL,
		2
	),
	(
		36112,
		36001,
		'Ford FE 390 PI 4V (330 hp)',
		NULL,
		2
	),
	(
		36113,
		36001,
		'Ford FE 390 3x2V (340 hp)',
		NULL,
		1
	),
	(36114, 36001, 'Ford FE 390 2V (250 hp)', NULL, 1),
	(36115, 36001, 'Ford FE 390 2V (275 hp)', NULL, 1),
	(36116, 36001, 'Ford FE 390 4V (315 hp)', NULL, 1),
	(
		36117,
		36001,
		'Ford FE 390 GT 4V (335 hp)',
		NULL,
		1
	),
	(36118, 36001, 'Ford FE 406 4V (385 hp)', NULL, 2),
	(
		36119,
		36001,
		'Ford FE 406 3x2V (405 hp)',
		NULL,
		2
	),
	(
		36120,
		36001,
		'Ford FE 427 LR 4V (410 hp)',
		NULL,
		2
	),
	(
		36121,
		36001,
		'Ford FE 427 MR 4V (410 hp)',
		NULL,
		2
	),
	(
		36122,
		36001,
		'Ford FE 427 MR 2x4V (425 hp)',
		NULL,
		2
	),
	(
		36123,
		36001,
		'Ford FE 427 SOHC 4V (615 hp)',
		NULL,
		3
	),
	(36124, 36001, 'Ford FE 428 4V (345 hp)', NULL, 1),
	(36125, 36001, 'Ford FE 428 4V (360 hp)', NULL, 1),
	(
		36126,
		36001,
		'Ford FE 428 CJ 4V (335 hp)',
		NULL,
		2
	),
	(
		36127,
		36001,
		'Ford FE 428 SCJ 4V (335 hp)',
		NULL,
		2
	),
	(36128, 36001, 'Ford SB 260 2V (164 hp)', NULL, 1),
	(
		36129,
		36001,
		'Ford SB 289 HP 4V (271 hp)',
		NULL,
		1
	),
	(36130, 36001, 'Ford SB 289 4V (210 hp)', NULL, 1),
	(36131, 36001, 'Ford SB 289 4V (225 hp)', NULL, 1),
	(36132, 36001, 'Ford SB 302 2V (210 hp)', NULL, 1),
	(36133, 36001, 'Ford SB 302 4V (230 hp)', NULL, 1),
	(
		36134,
		36001,
		'Ford SB 302 Boss 4V (290 hp)',
		NULL,
		2
	),
	(36135, 36001, 'Ford SB 351W 2V (250 hp)', NULL, 1),
	(36136, 36001, 'Ford SB 351W 4V (290 hp)', NULL, 1),
	(36137, 36001, 'Ford SB 351W 2V (240 hp)', NULL, 1),
	(36138, 36001, 'Ford 351C 2V (250 hp)', NULL, 1),
	(36139, 36001, 'Ford 351C 4V (300 hp)', NULL, 1),
	(36140, 36001, 'Ford 351C CJ 4V (280 hp)', NULL, 2),
	(
		36141,
		36001,
		'Ford 351C Boss 4V (330 hp)',
		NULL,
		2
	),
	(36142, 36001, 'Ford 351C HO 4V (275 hp)', NULL, 2),
	(36143, 36001, 'Ford 351C 2V (177 hp)', NULL, 1),
	(36144, 36001, 'Ford 400C 2V (260 hp)', NULL, 1),
	(36145, 36001, 'Ford 400C 2V (172 hp)', NULL, 1),
	(36146, 36001, 'Ford 385 429 4V (360 hp)', NULL, 1),
	(36147, 36001, 'Ford 385 429 2V (320 hp)', NULL, 1),
	(
		36148,
		36001,
		'Ford 385 429 SCJ 4V (375 hp)',
		NULL,
		2
	),
	(
		36149,
		36001,
		'Ford 385 429 CJ 4V (370 hp)',
		NULL,
		2
	),
	(36150, 36001, 'Ford 385 429 4V (212 hp)', NULL, 1),
	(36151, 36001, 'Ford 385 429 NASCAR', NULL, 3),
	(36152, 36001, 'Ford 385 460 4V (365 hp)', NULL, 1),
	(36153, 36001, 'Ford 385 460 4V (224 hp)', NULL, 1),
	(
		36154,
		36001,
		'Ford 385 460 PI 4V (274 hp)',
		NULL,
		1
	),
	(
		36155,
		36001,
		'Chrysler BB 383 2V (305 hp)',
		NULL,
		1
	),
	(
		36156,
		36001,
		'Chrysler BB 383 4V (325 hp)',
		NULL,
		1
	),
	(
		36157,
		36001,
		'Chrysler BB 383 2V (270 hp)',
		NULL,
		1
	),
	(
		36158,
		36001,
		'Chrysler BB 383 2x4V (330 hp)',
		NULL,
		2
	),
	(
		36159,
		36001,
		'Chrysler BB 400 2V (190 hp)',
		NULL,
		1
	),
	(
		36160,
		36001,
		'Chrysler BB 400 4V (255 hp)',
		NULL,
		1
	),
	(
		36161,
		36001,
		'Chrysler BB 400 4V (205 hp)',
		NULL,
		1
	),
	(
		36162,
		36001,
		'Chrysler BB 413 4V (350 hp)',
		NULL,
		1
	),
	(
		36163,
		36001,
		'Chrysler BB 413 2x4V (380 hp)',
		NULL,
		1
	),
	(
		36164,
		36001,
		'Chrysler BB 413 Long Ram 2x4V (375 hp)',
		NULL,
		2
	),
	(
		36165,
		36001,
		'Chrysler BB 413 Short Ram 2x4V (400 hp)',
		NULL,
		2
	),
	(
		36166,
		36001,
		'Chrysler BB 413 Max Wedge 2x4V (410 hp)',
		NULL,
		2
	),
	(
		36167,
		36001,
		'Chrysler BB 413 Max Wedge 2x4V (420 hp)',
		NULL,
		2
	),
	(
		36168,
		36001,
		'Chrysler BB 413 4V (365 hp)',
		NULL,
		1
	),
	(
		36169,
		36001,
		'Chrysler BB 413 2x4V (390 hp)',
		NULL,
		2
	),
	(
		36170,
		36001,
		'Chrysler BB 426 Max Wedge III 2x4V (415 hp)',
		NULL,
		2
	),
	(
		36171,
		36001,
		'Chrysler BB 426 Max Wedge III 2x4V (425 hp)',
		NULL,
		2
	),
	(
		36172,
		36001,
		'Chrysler BB 426 Max Wedge 2x4V (415 hp)',
		NULL,
		2
	),
	(
		36173,
		36001,
		'Chrysler BB 426 Max Wedge 2x4V (425 hp)',
		NULL,
		3
	),
	(
		36174,
		36001,
		'Chrysler BB 426 4V (365 hp) b',
		NULL,
		1
	),
	(
		36175,
		36001,
		'Chrysler Hemi 426 2x4V (425 hp)',
		NULL,
		3
	),
	(
		36176,
		36001,
		'Chrysler BB 440 4V (350 hp)',
		NULL,
		1
	),
	(
		36177,
		36001,
		'Chrysler BB 440 3x2V (390 hp)',
		NULL,
		2
	),
	(36178, 36001, 'AMC 343 2V (235 hp)', NULL, 1),
	(36179, 36001, 'AMC 390 4V (315 hp)', NULL, 1),
	(36180, 36001, 'AMC 390 4V (325 hp)', NULL, 2),
	(
		36181,
		36001,
		'AMC 390 4V Rebel Machine (340 hp)',
		NULL,
		2
	),
	(36182, 36001, 'Chevy SB 265 4V (205 hp)', NULL, 2),
	(
		36183,
		36001,
		'Chevy W 409 2x4V (425 hp)',
		NULL,
		3
	),
	(
		36184,
		36001,
		'Chevrolet BB 402 4V (350 hp)',
		NULL,
		2
	),
	(
		36185,
		36001,
		'Chevrolet BB 402 4V (375 hp)',
		NULL,
		2
	),
	(36186, 36001, 'Pontiac 400 Ram Air III', NULL, 2),
	(36187, 36001, 'Pontiac 400 Ram Air V', NULL, 3),
	(36188, 36001, 'Ford FE 352 4V (235 hp)', NULL, 1),
	(36189, 36001, 'Shade Tree 2V (140 hp)', NULL, 1),
	(37001, 37001, 'Generic Exh Assembly', NULL, 1),
	(39001, 39001, 'Cop Lights', 'siren', 1),
	(40001, 40001, 'Vanilla Hood', '.bodymod', 1),
	(40002, 40001, '32 Coupe', '.bodymod', 1),
	(40003, 40001, '40 Coupe', '.bodymod', 1),
	(40004, 40001, '49 Mercury', '.bodymod', 1),
	(40005, 40001, '53 Coupe', '.bodymod', 1),
	(40006, 40001, '57 Fairlane', '.bodymod', 1),
	(40007, 40001, '57 Ranchero', '.bodymod', 1),
	(40008, 40001, '57 Thunderbird', '.bodymod', 1),
	(40009, 40001, '63 Thunderbird', '.bodymod', 1),
	(40010, 40001, '64 Mustang', '.bodymod', 1),
	(40011, 40001, '64 Galaxie', '.bodymod', 1),
	(40012, 40001, '69 Torino', '.bodymod', 1),
	(40013, 40001, '70 Mustang', '.bodymod', 1),
	(40014, 40001, '47 Caddy', '.bodymod', 1),
	(40015, 40001, '55 Century', '.bodymod', 1),
	(40016, 40001, '57 Bel-Air', '.bodymod', 1),
	(40017, 40001, '57 Nomad', '.bodymod', 1),
	(40018, 40001, '57 Corvette', '.bodymod', 1),
	(40019, 40001, '58 Impala', '.bodymod', 1),
	(40020, 40001, '59 Eldorado', '.bodymod', 1),
	(40021, 40001, '63 Corvette', '.bodymod', 1),
	(40022, 40001, '64 Impala', '.bodymod', 1),
	(40023, 40001, '66 GTO', '.bodymod', 1),
	(40024, 40001, '67 Chevelle', '.bodymod', 1),
	(40025, 40001, '67 Camaro', '.bodymod', 1),
	(40026, 40001, '69 Olds 442', '.bodymod', 1),
	(40027, 40001, '69 GTO', '.bodymod', 1),
	(40028, 40001, '70 El Camino', '.bodymod', 1),
	(40029, 40001, '70 Nova', '.bodymod', 1),
	(40030, 40001, '70 Chevelle', '.bodymod', 1),
	(40031, 40001, '73 Firebird', '.bodymod', 1),
	(40032, 40001, '69 Charger', '.bodymod', 1),
	(40033, 40001, '69 Road Runner', '.bodymod', 1),
	(40034, 40001, '69 AMX', '.bodymod', 1),
	(40035, 40001, '70 Cuda', '.large', 1),
	(40036, 40001, '71 Duster', '.bodymod', 1),
	(
		40037,
		40001,
		'1963 Ford Thunderbird Scoop',
		'.factory',
		2
	),
	(
		40038,
		40001,
		'1969 Hurst/Olds 4-4-2 Scoop',
		'.factory',
		2
	),
	(
		40039,
		40001,
		'1969 Ford Torino GT Scoop',
		'.factory',
		2
	),
	(
		40040,
		40001,
		'1969 Ford Torino Scoop',
		'.factory',
		2
	),
	(
		40041,
		40001,
		'1967 Chevy Chevelle SS-396 Scoop',
		'.factory',
		2
	),
	(
		40042,
		40001,
		'1967 Camaro SS-396 Scoop',
		'.bodymod',
		2
	),
	(
		40043,
		40001,
		'1957 Ford Thunderbird Scoop',
		'.factory',
		2
	),
	(
		40044,
		40001,
		'1964 Pontiac GTO Scoop',
		'.factory',
		2
	),
	(
		40045,
		40001,
		'1963 Corvette Stingray Scoop',
		'.factory',
		2
	),
	(
		40046,
		40001,
		'1969 Oldsmobile 4-4-2 W-30 Scoop',
		'.factory',
		2
	),
	(
		40047,
		40001,
		'1973 Pontiac Firebird Scoop',
		'.factory',
		2
	),
	(
		40048,
		40001,
		'1966 Pontiac GTO Scoop',
		'.factory',
		2
	),
	(
		40049,
		40001,
		'1969 Pontiac GTO Scoop',
		'.factory',
		2
	),
	(
		40050,
		40001,
		'1969 Pontiac Firebird Scoop',
		'.factory',
		2
	),
	(
		40051,
		40001,
		'1969 Plymouth Road Runner Scoop',
		'.factory',
		2
	),
	(
		40052,
		40001,
		'1970 Buick Gran Sport Scoop',
		'.factory',
		2
	),
	(
		40053,
		40001,
		'1970 Chevy Nova SS-396 Scoop',
		'.factory',
		2
	),
	(
		40054,
		40001,
		'1970 Plymouth ''Cuda Scoop',
		'.bodymod',
		2
	),
	(
		40055,
		40001,
		'1973 Pontiac Trans-Am Scoop',
		'.factory',
		2
	),
	(
		40056,
		40001,
		'1970 Dodge Challenger R/T Scoop',
		'.factory',
		2
	),
	(
		40057,
		40001,
		'1958 Chevy Impala Sport Scoop',
		'.factory',
		2
	),
	(
		40058,
		40001,
		'1970 Plymouth ''Cuda Hemi Scoop',
		'.factory',
		2
	),
	(40059, 40001, 'Hood Mod Bel-Air', '.large', 2),
	(
		40060,
		40001,
		'66 Shelby Cobra Hood',
		'.bodymod',
		1
	),
	(
		40061,
		40001,
		'1970 Chevy Chevelle SS Hood',
		'.factory',
		1
	),
	(
		40062,
		40001,
		'1970 Ford Mustang Factory Scoop Hood',
		'.factory',
		2
	),
	(
		100001,
		100001,
		'Cast Iron Rim (Round Flat)',
		'RIM01',
		1
	),
	(
		100002,
		100001,
		'Steel Rim (Web Polished)',
		'RIM11',
		1
	),
	(
		100003,
		100001,
		'Steel Slotted Rim (Star Polished)',
		'RIM02',
		1
	),
	(
		100004,
		100001,
		'Aluminum Alloy Rim (Twist Split Star)',
		'RIM05',
		2
	),
	(
		100005,
		100001,
		'Magnesium Rim (Round Flat)',
		'RIM01',
		3
	),
	(100006, 100001, 'HS-00', 'HC00', 1),
	(100007, 100001, 'HS-01', 'HC01', 1),
	(100008, 100001, 'HS-02', 'HC02', 1),
	(100009, 100001, 'HS-03', 'HC03', 1),
	(100010, 100001, 'HS-04', 'HC04', 1),
	(100011, 100001, 'HS-05', 'HC05', 1),
	(100012, 100001, 'HS-06', 'HC06', 1),
	(100013, 100001, 'HS-07', 'HC07', 1),
	(100014, 100001, 'HS-08', 'HC08', 1),
	(100015, 100001, 'HS-09', 'HC09', 1),
	(100016, 100001, 'HS-10', 'HC10', 1),
	(100017, 100001, 'HS-11', 'HC11', 1),
	(100018, 100001, 'HS-12', 'HC12', 1),
	(100019, 100001, 'HS-13', 'HC13', 1),
	(100020, 100001, 'HS-14', 'HC14', 1),
	(100021, 100001, 'HS-15', 'HC15', 1),
	(100022, 100001, 'HS-16', 'HC16', 1),
	(100023, 100001, 'HS-17', 'HC17', 1),
	(100024, 100001, 'HS-18', 'HC18', 1),
	(100025, 100001, 'HS-19', 'HC19', 1),
	(100026, 100001, 'HS-20', 'HC20', 1),
	(100027, 100001, 'HS-21', 'HC21', 1),
	(100028, 100001, 'HS-22', 'HC22', 1),
	(100029, 100001, 'HS-23', 'HC23', 1),
	(100030, 100001, 'HS-24', 'HC24', 1),
	(100031, 100001, 'HS-25', 'HC25', 1),
	(100032, 100001, 'HS-26', 'HC26', 1),
	(100033, 100001, 'HS-27', 'HC27', 1),
	(100034, 100001, 'HS-28', 'HC28', 1),
	(100035, 100001, 'HS-29', 'HC29', 1),
	(100036, 100001, 'HS-30', 'HC30', 1),
	(100037, 100001, 'HS-31', 'HC31', 1),
	(100038, 100001, 'HS-32', 'HC32', 1),
	(100039, 100001, 'HS-33', 'HC33', 1),
	(100040, 100001, 'HS-34', 'HC34', 1),
	(100041, 100001, 'HS-35', 'HC35', 1),
	(100042, 100001, 'HS-36', 'HC36', 1),
	(100043, 100001, 'HS-37', 'HC37', 1),
	(100044, 100001, 'HS-38', 'HC38', 1),
	(100045, 100001, 'HS-39', 'HC39', 1),
	(100046, 100001, 'HS-40', 'HC40', 1),
	(100047, 100001, 'HS-41', 'HC41', 1),
	(100048, 100001, 'HS-42', 'HC42', 1),
	(100049, 100001, 'HS-43', 'HC43', 1),
	(100050, 100001, 'HS-44', 'HC44', 1),
	(100051, 100001, 'HS-45', 'HC45', 1),
	(100052, 100001, 'HS-46', 'HC46', 1),
	(100053, 100001, 'HS-47', 'HC47', 1),
	(100054, 100001, 'HS-48', 'HC48', 1),
	(100055, 100001, 'HS-49', 'HC49', 1),
	(100056, 100001, 'HS-50', 'HC50', 1),
	(100057, 100001, 'HS-51', 'HC51', 1),
	(100058, 100001, 'HS-52', 'HC52', 1),
	(100059, 100001, 'HS-53', 'hc53', 1),
	(100060, 100001, 'HS-54', 'hc54', 1),
	(100061, 100001, 'HS-55', 'hc55', 1),
	(100062, 100001, 'HS-56', 'hc56', 1),
	(100063, 100001, 'HS-57', 'hc57', 1),
	(100064, 100001, 'HS-58', 'hc58', 1),
	(100065, 100001, 'HA-00', 'HCA00', 1),
	(100066, 100001, 'HA-01', 'HCA01', 1),
	(100067, 100001, 'HA-02', 'HCA02', 1),
	(100068, 100001, 'HA-03', 'HCA03', 1),
	(100069, 100001, 'HA-04', 'HCA04', 1),
	(100070, 100001, 'HA-05', 'HCA05', 1),
	(100071, 100001, 'HA-06', 'HCA06', 1),
	(100072, 100001, 'HA-07', 'HCA07', 1),
	(100073, 100001, 'HA-08', 'HCA08', 1),
	(100074, 100001, 'HA-09', 'HCA09', 1),
	(100075, 100001, 'HA-10', 'HCA10', 1),
	(100076, 100001, 'HA-11', 'HCA11', 1),
	(100077, 100001, 'HA-12', 'HCA12', 1),
	(100078, 100001, 'HA-13', 'HCA13', 1),
	(100079, 100001, 'HA-14', 'HCA14', 1),
	(100080, 100001, 'HA-15', 'HCA15', 1),
	(100081, 100001, 'HA-16', 'HCA16', 1),
	(100082, 100001, 'HA-17', 'HCA17', 1),
	(100083, 100001, 'HA-18', 'HCA18', 1),
	(100084, 100001, 'HA-19', 'HCA19', 1),
	(100085, 100001, 'HA-20', 'HCA20', 1),
	(100086, 100001, 'HA-21', 'HCA21', 1),
	(100087, 100001, 'HA-22', 'HCA22', 1),
	(100088, 100001, 'HA-23', 'HCA23', 1),
	(100089, 100001, 'HA-24', 'HCA24', 1),
	(100090, 100001, 'HA-25', 'HCA25', 1),
	(100091, 100001, 'HA-26', 'HCA26', 1),
	(100092, 100001, 'HA-27', 'HCA27', 1),
	(100093, 100001, 'RS-00', 'RIM00', 1),
	(100094, 100001, 'RS-01', 'RIM01', 1),
	(100095, 100001, 'RS-02', 'RIM02', 1),
	(100096, 100001, 'RS-03', 'RIM03', 1),
	(100097, 100001, 'RS-04', 'RIM04', 1),
	(100098, 100001, 'RS-05', 'RIM05', 1),
	(100099, 100001, 'RS-06', 'RIM06', 1),
	(100100, 100001, 'RS-07', 'RIM07', 1),
	(100101, 100001, 'RS-08', 'RIM08', 1),
	(100102, 100001, 'RS-09', 'RIM09', 1),
	(100103, 100001, 'RS-10', 'RIM10', 1),
	(100104, 100001, 'RS-11', 'RIM11', 1),
	(100105, 100001, 'RS-12', 'RIM12', 1),
	(100106, 100001, 'RA-00', 'RIMA00', 1),
	(100107, 100001, 'RA-01', 'RIMA01', 1),
	(100108, 100001, 'RA-02', 'RIMA02', 1),
	(100109, 100001, 'RA-03', 'RIMA03', 1),
	(100110, 100001, 'RA-04', 'RIMA04', 1),
	(100111, 100001, 'RA-05', 'RIMA05', 1),
	(100112, 100001, 'RA-06', 'RIMA06', 1),
	(100113, 100001, 'RA-07', 'RIMA07', 1),
	(100114, 100001, 'RA-08', 'RIMA08', 1),
	(100115, 100001, 'RA-09', 'RIMA09', 1),
	(100116, 100001, 'RA-10', 'RIMA10', 1),
	(100117, 100001, 'RA-11', 'RIMA11', 1),
	(100118, 100001, 'RA-12', 'RIMA12', 1),
	(100119, 100001, 'RA-13', 'RIMA13', 1),
	(100120, 100001, 'RA-14', 'RIMA14', 1),
	(100121, 100001, 'RA-15', 'RIMA15', 1),
	(100122, 100001, 'RA-16', 'RIMA16', 1),
	(100123, 100001, 'RA-17', 'RIMA17', 1),
	(100124, 100001, 'RA-18', 'RIMA18', 1),
	(100125, 100001, 'RA-19', 'RIMA19', 1),
	(100126, 100001, 'RA-20', 'RIMA20', 1),
	(100127, 100001, 'RA-21', 'RIMA21', 1),
	(100128, 100001, 'RA-22', 'RIMA22', 1),
	(100129, 100001, 'RA-23', 'RIMA23', 1),
	(100130, 100001, 'RA-24', 'RIMA24', 1),
	(100131, 100001, 'RA-25', 'RIMA25', 1),
	(100132, 100001, 'RA-26', 'RIMA26', 1),
	(100133, 100001, 'RA-27', 'RIMA27', 1),
	(100134, 100001, 'RA-28', 'RIMA28', 1),
	(100135, 100001, 'RA-29', 'RIMA29', 1),
	(
		100136,
		100001,
		'22.5" Heavy Truck Rim',
		'RIM01',
		1
	),
	(100137, 100001, 'Aluminum Slot', 'RIMA00', 2),
	(100138, 100001, 'Aluminum Round', 'RIMA01', 1),
	(100139, 100001, 'Aluminum Twistar 5', 'HCA03', 2),
	(100140, 100001, 'Aluminum Rippled Orb', 'HC14', 2),
	(
		100141,
		100001,
		'Aluminum Hypnotic Star 6',
		'HC13',
		2
	),
	(
		100142,
		100001,
		'Aluminum Super Slot 15',
		'HCA03',
		2
	),
	(
		100143,
		100001,
		'Aluminum Teardrop Slot 8',
		'HCA04',
		2
	),
	(100144, 100001, 'Aluminum Twistar 7', 'HCA05', 2),
	(
		100145,
		100001,
		'Aluminum Power Turbine',
		'HCA15',
		2
	),
	(
		110001,
		110001,
		'18 x 5.25 Bias Ply Blackwalls (2ply)',
		'TIREBLAC',
		1
	),
	(
		110002,
		110001,
		'150/82/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110003,
		110001,
		'170/82/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110004,
		110001,
		'178/82/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110005,
		110001,
		'190/82/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110006,
		110001,
		'210/82/14 Bias Ply',
		'TIREBLAC',
		2
	),
	(
		110007,
		110001,
		'150/92/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110008,
		110001,
		'170/92/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110009,
		110001,
		'178/92/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110010,
		110001,
		'190/92/14 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110011,
		110001,
		'210/92/14 Bias Ply',
		'TIREBLAC',
		2
	),
	(
		110012,
		110001,
		'170/82/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110013,
		110001,
		'190/82/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110014,
		110001,
		'210/82/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110015,
		110001,
		'150/92/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110016,
		110001,
		'170/92/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110017,
		110001,
		'190/92/15 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110018,
		110001,
		'150/92/16 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110019,
		110001,
		'170/92/16 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110020,
		110001,
		'190/92/16 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110021,
		110001,
		'210/92/16 Bias Ply',
		'TIREBLAC',
		1
	),
	(
		110022,
		110001,
		'190/60/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110023,
		110001,
		'214/60/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110024,
		110001,
		'238/60/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110025,
		110001,
		'190/72/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110026,
		110001,
		'202/72/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110027,
		110001,
		'214/72/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110028,
		110001,
		'226/72/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110029,
		110001,
		'238/72/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110030,
		110001,
		'166/82/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110031,
		110001,
		'178/82/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110032,
		110001,
		'190/82/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110033,
		110001,
		'202/82/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110034,
		110001,
		'214/82/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110035,
		110001,
		'178/92/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110036,
		110001,
		'202/92/14 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110037,
		110001,
		'178/60/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110038,
		110001,
		'202/60/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110039,
		110001,
		'226/60/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110040,
		110001,
		'238/60/15 Bias Belted',
		'TIREBLAC',
		2
	),
	(
		110041,
		110001,
		'202/72/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110042,
		110001,
		'226/72/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110043,
		110001,
		'238/72/15 Bias Belted',
		'TIREBLAC',
		2
	),
	(
		110044,
		110001,
		'190/82/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110045,
		110001,
		'214/82/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110046,
		110001,
		'238/82/15 Bias Belted',
		'TIREBLAC',
		2
	),
	(
		110047,
		110001,
		'178/92/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110048,
		110001,
		'202/92/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110049,
		110001,
		'226/92/15 Bias Belted',
		'TIREBLAC',
		1
	),
	(
		110050,
		110001,
		'238/92/15 Bias Belted',
		'TIREBLAC',
		2
	),
	(110051, 110001, '185/65/14 Radial', 'TIREBLAC', 1),
	(110052, 110001, '205/65/14 Radial', 'TIREBLAC', 1),
	(110053, 110001, '195/70/14 Radial', 'TIREBLAC', 1),
	(110054, 110001, '215/70/14 Radial', 'TIREBLAC', 1),
	(110055, 110001, '195/75/14 Radial', 'TIREBLAC', 1),
	(110056, 110001, '205/75/14 Radial', 'TIREBLAC', 1),
	(110057, 110001, '195/65/15 Radial', 'TIREBLAC', 1),
	(110058, 110001, '215/65/15 Radial', 'TIREBLAC', 2),
	(110059, 110001, '205/70/15 Radial', 'TIREBLAC', 1),
	(110060, 110001, '215/70/15 Radial', 'TIREBLAC', 1),
	(110061, 110001, '225/70/15 Radial', 'TIREBLAC', 2),
	(110062, 110001, '205/75/15 Radial', 'TIREBLAC', 1),
	(110063, 110001, '215/75/15 Radial', 'TIREBLAC', 1),
	(110064, 110001, '235/75/15 Radial', 'TIREBLAC', 2),
	(110065, 110001, '215/65/16 Radial', 'TIREBLAC', 1),
	(110066, 110001, '215/60/16 Radial', 'TIREBLAC', 1),
	(110067, 110001, '225/60/16 Radial', 'TIREBLAC', 1),
	(110068, 110001, '225/55/16 Radial', 'TIREBLAC', 1),
	(
		110069,
		110001,
		'205/55/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110070,
		110001,
		'195/60/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110071,
		110001,
		'205/60/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110072,
		110001,
		'215/60/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110073,
		110001,
		'185/65/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110074,
		110001,
		'195/65/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110075,
		110001,
		'205/65/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110076,
		110001,
		'215/65/15 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110077,
		110001,
		'225/55/16 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110078,
		110001,
		'215/60/16 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110079,
		110001,
		'225/60/16 Radial Rain',
		'TIREBLAC',
		2
	),
	(
		110080,
		110001,
		'195/55/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110081,
		110001,
		'205/55/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110082,
		110001,
		'195/60/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110083,
		110001,
		'205/60/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110084,
		110001,
		'215/60/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110085,
		110001,
		'185/65/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110086,
		110001,
		'195/65/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110087,
		110001,
		'205/65/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110088,
		110001,
		'215/65/15VR Performance',
		'TIREBLAC',
		3
	),
	(
		110089,
		110001,
		'205/40/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110090,
		110001,
		'215/40/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110091,
		110001,
		'205/45/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110092,
		110001,
		'215/45/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110093,
		110001,
		'205/50/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110094,
		110001,
		'225/50/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110095,
		110001,
		'245/50/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110096,
		110001,
		'205/55/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110097,
		110001,
		'215/55/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110098,
		110001,
		'225/55/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110099,
		110001,
		'215/60/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110100,
		110001,
		'225/60/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110101,
		110001,
		'235/60/16VR Performance',
		'TIREBLAC',
		3
	),
	(
		110102,
		110001,
		'215/40/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110103,
		110001,
		'235/40/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110104,
		110001,
		'255/40/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110105,
		110001,
		'215/45/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110106,
		110001,
		'225/45/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110107,
		110001,
		'235/45/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110108,
		110001,
		'245/45/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110109,
		110001,
		'315/35/17VR Performance',
		'TIREBLAC',
		3
	),
	(
		110110,
		110001,
		'195/55/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110111,
		110001,
		'205/55/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110112,
		110001,
		'195/60/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110113,
		110001,
		'205/60/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110114,
		110001,
		'215/60/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110115,
		110001,
		'185/65/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110116,
		110001,
		'195/65/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110117,
		110001,
		'205/65/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110118,
		110001,
		'215/65/15VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110119,
		110001,
		'205/40/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110120,
		110001,
		'205/45/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110121,
		110001,
		'215/45/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110122,
		110001,
		'205/50/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110123,
		110001,
		'225/50/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110124,
		110001,
		'245/50/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110125,
		110001,
		'205/55/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110126,
		110001,
		'225/55/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110127,
		110001,
		'215/60/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110128,
		110001,
		'225/60/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110129,
		110001,
		'235/60/16VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110130,
		110001,
		'215/40/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110131,
		110001,
		'235/40/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110132,
		110001,
		'215/45/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110133,
		110001,
		'225/45/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110134,
		110001,
		'235/45/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110135,
		110001,
		'245/45/17VR Performance Rain',
		'TIREBLAC',
		3
	),
	(
		110136,
		110001,
		'162/68/18 Bias Belted',
		'TIREBLAC',
		1
	),
	(110137, 110001, 'Big Tire', 'TIREBLAC', 1),
	(
		110138,
		110001,
		'245/50/16VR High Performance',
		'TIREBLAC',
		4
	),
	(110139, 110001, '195/60/15 Street', 'TIREBLAC', 2),
	(
		110140,
		110001,
		'295/80/22.5 Bus Tire',
		'TIREBLAC',
		1
	),
	(
		110141,
		110001,
		'207/70/14 (D70-14)',
		'TIREWHIT',
		1
	),
	(
		110142,
		110001,
		'212/70/14 (E70-14)',
		'TIREWHIT',
		1
	),
	(
		110143,
		110001,
		'221/70/14 (F70-14)',
		'TIREWHIT',
		1
	),
	(
		110144,
		110001,
		'232/70/14 (G70-14)',
		'TIREWHIT',
		1
	),
	(
		110145,
		110001,
		'210/70/15 (E70-15)',
		'TIREWHIT',
		1
	),
	(
		110146,
		110001,
		'216/70/15 (F70-15)',
		'TIREWHIT',
		1
	),
	(
		110147,
		110001,
		'227/70/15 (G70-15)',
		'TIREWHIT',
		1
	),
	(
		110148,
		110001,
		'231/60/15 (F60-15)',
		'TIREWHIT',
		1
	),
	(
		110149,
		110001,
		'243/60/15 (G60-15)',
		'TIREWHIT',
		1
	),
	(
		110150,
		110001,
		'224/60/15 (E60-15)',
		'TIREWHIT',
		1
	),
	(110151, 110001, '175/65/14 Radial', 'TIREBLAC', 1),
	(110152, 110001, '195/65/14 Radial', 'TIREBLAC', 1),
	(110153, 110001, '185/60/14 Radial', 'TIREBLAC', 1),
	(110154, 110001, '195/60/14 Radial', 'TIREBLAC', 1),
	(110155, 110001, '185/65/15 Radial', 'TIREBLAC', 1),
	(110156, 110001, '205/65/15 Radial', 'TIREBLAC', 1),
	(110157, 110001, '195/60/15 Radial', 'TIRERED', 1),
	(110158, 110001, '205/60/15 Radial', 'TIRERED', 1),
	(110159, 110001, '215/60/15 Radial', 'TIRERED', 1),
	(110160, 110001, '195/55/15 Radial', 'TIRERED', 1),
	(110161, 110001, '205/55/15 Radial', 'TIRERED', 1),
	(110162, 110001, '195/50/15 Radial', 'TIRERED', 1),
	(110163, 110001, '205/50/15 Radial', 'TIRERED', 1),
	(110164, 110001, '225/50/15 Radial', 'TIRERED', 1),
	(
		110165,
		110001,
		'195/50/15VR Performance',
		'TIREBLAC',
		2
	),
	(
		110166,
		110001,
		'205/50/15VR Performance',
		'TIREBLAC',
		2
	),
	(
		110167,
		110001,
		'225/50/15VR Performance',
		'TIREBLAC',
		2
	),
	(
		110168,
		110001,
		'205/40/17VR Performance',
		'TIREBLAC',
		2
	),
	(
		110169,
		110001,
		'245/45/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110170,
		110001,
		'225/60/16VR High Performance',
		'TIREBLAC',
		4
	),
	(110171, 110001, '225/60/16ZR SCUT', 'TIREBLAC', 4),
	(110172, 110001, '245/45/17ZR SCUT', 'TIREBLAC', 4),
	(110173, 110001, '245/50/16ZR SCUT', 'TIREBLAC', 4),
	(
		110174,
		110001,
		'225/35/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110175,
		110001,
		'205/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110176,
		110001,
		'215/40/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110177,
		110001,
		'215/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110178,
		110001,
		'225/40/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110179,
		110001,
		'235/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110180,
		110001,
		'245/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110181,
		110001,
		'255/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110182,
		110001,
		'265/40/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110183,
		110001,
		'205/45/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110184,
		110001,
		'215/45/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110185,
		110001,
		'215/45/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110186,
		110001,
		'225/45/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110187,
		110001,
		'225/45/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110188,
		110001,
		'235/45/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110189,
		110001,
		'245/45/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110190,
		110001,
		'205/50/15VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110191,
		110001,
		'205/50/16VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110192,
		110001,
		'205/50/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110193,
		110001,
		'215/50/15VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110194,
		110001,
		'215/50/17VR High Performance',
		'TIREBLAC',
		4
	),
	(
		110195,
		110001,
		'225/50/16VR High Performance',
		'TIREBLAC',
		4
	),
	(110196, 110001, '235/60/15 Radial', 'TIREBLAC', 1),
	(110197, 110001, '275/60/15 Radial', 'TIREBLAC', 2),
	(110198, 110001, '295/60/15 Radial', 'TIREBLAC', 3),
	(110199, 110001, '245/60/15 Radial', 'TIREBLAC', 2),
	(110200, 110001, '255/60/15 Radial', 'TIREBLAC', 2),
	(110201, 110001, '265/60/15 Radial', 'TIREBLAC', 2),
	(
		130001,
		130001,
		'3-Speed Auto (2.5/1.56/1)',
		NULL,
		1
	),
	(
		130002,
		130001,
		'3-Speed Auto (2.4/1.479/1)',
		NULL,
		1
	),
	(
		130003,
		130001,
		'4-Speed Auto (2.741/1.568/1/0.674)',
		NULL,
		1
	),
	(
		130004,
		130001,
		'3-Speed Auto (2.52/1.52/1) A',
		NULL,
		1
	),
	(
		130005,
		130001,
		'3-Speed Auto (2.482/1.482/1)',
		NULL,
		1
	),
	(
		130006,
		130001,
		'4-Speed Auto (3.059/1.625/1/0.696) A',
		NULL,
		1
	),
	(
		130007,
		130001,
		'4-Speed Auto (2.4/1.479/1/0.723)',
		NULL,
		1
	),
	(
		130008,
		130001,
		'4-Speed Auto (2.482/1.482/1/0.75)',
		NULL,
		1
	),
	(
		130009,
		130001,
		'4-Speed Auto (2.74/1.57/1/0.67)',
		NULL,
		1
	),
	(
		130010,
		130001,
		'4-Speed Auto (3.06/1.62/1/0.7)',
		NULL,
		1
	),
	(
		130011,
		130001,
		'4-Speed Auto (3.97/2.55/1.55/1)',
		NULL,
		1
	),
	(
		130012,
		130001,
		'3-Speed Manual (2.5/1.18/1)',
		NULL,
		1
	),
	(
		130013,
		130001,
		'5-Speed Manual (2.95/1.94/1.34/1/0.63)',
		NULL,
		2
	),
	(
		130014,
		130001,
		'5-Speed Manual (2.75/1.94/1.34/1/0.74)',
		NULL,
		2
	),
	(
		130015,
		130001,
		'4-Speed Manual (2.64/1.61/1.23/1)',
		NULL,
		1
	),
	(
		130016,
		130001,
		'4-Speed Manual (2.88/1.74/1.33/1)',
		NULL,
		1
	),
	(
		130017,
		130001,
		'4-Speed Manual (3.44/2.28/1.46/1)',
		NULL,
		1
	),
	(
		130018,
		130001,
		'4-Speed Manual (2.66/1.91/1.39/1)',
		NULL,
		1
	),
	(
		130019,
		130001,
		'4-Speed Manual (2.22/1.64/1.28/1)',
		NULL,
		1
	),
	(
		130020,
		130001,
		'4-Speed Manual (2.65/1.93/1.39/1)',
		NULL,
		1
	),
	(
		130021,
		130001,
		'Powerglide Auto (1.82/1) Chevrolet 2-Speed Powerglide',
		NULL,
		1
	),
	(
		130022,
		130001,
		'Chevrolet 3-Speed Standard Ratio',
		NULL,
		1
	),
	(
		130023,
		130001,
		'3-Speed Close Ratio (2.21/1.32/1)',
		NULL,
		1
	),
	(
		130024,
		130001,
		'Chevrolet 3-Speed w/ Overdrive',
		NULL,
		1
	),
	(
		130025,
		130001,
		'4-Speed Close Ratio (2.21/1.66/1.31/1)',
		NULL,
		2
	),
	(
		130026,
		130001,
		'Ford Cruise-O-Matic (Automatic)',
		NULL,
		1
	),
	(
		130027,
		130001,
		'Muncie Close-Ratio M22 (2.2/1.64/1.27/1)',
		NULL,
		2
	),
	(
		130028,
		130001,
		'Muncie Early Wide-Ratio (Manual)',
		NULL,
		1
	),
	(
		130029,
		130001,
		'Muncie Close-Ratio (Manual)',
		NULL,
		1
	),
	(
		130030,
		130001,
		'Muncie Wide-Ratio M20 Manual (2.52/1.88/1.46/1)',
		NULL,
		1
	),
	(
		130031,
		130001,
		'1997 Corvette 4-Speed Automatic Transmission',
		NULL,
		3
	),
	(
		130032,
		130001,
		'Speedliner 5-Speed Automatic Transmission',
		NULL,
		3
	),
	(
		130033,
		130001,
		'Powerglide Automatic (1.76/1)',
		NULL,
		1
	),
	(
		130034,
		130001,
		'Turbo Hydra-Matic 350 (Automatic)',
		NULL,
		1
	),
	(
		130035,
		130001,
		'Ford C-4 Dual Range (Automatic)',
		NULL,
		1
	),
	(
		130036,
		130001,
		'Borg-Warner T-10 Special Close-Ratio (Manual)',
		NULL,
		3
	),
	(
		130037,
		130001,
		'Borg-Warner T-10X Special Competition (Manual)',
		NULL,
		3
	),
	(
		130038,
		130001,
		'Borg-Warner T-10W Special Wide-Ratio (Manual)',
		NULL,
		3
	),
	(
		130039,
		130001,
		'Borg-Warner T-10Y Second Design, Extra Low-Ratio (Manual)',
		NULL,
		3
	),
	(
		130040,
		130001,
		'T+C Top Loader Close Ratio M (2.32/1.69/1.29/1)',
		NULL,
		1
	),
	(
		130041,
		130001,
		'Ford T+C Top Loader Overdrive (Manual)',
		NULL,
		1
	),
	(
		130042,
		130001,
		'Ford T+C Top Loader Overdrive2 (Manual)',
		NULL,
		1
	),
	(
		130043,
		130001,
		'3-speed Synchro-Mesh (Manual)',
		NULL,
		1
	),
	(
		130044,
		130001,
		'4-speed All-Synchro (Manual)',
		NULL,
		1
	),
	(
		130045,
		130001,
		'Bully 727 Torqueflite A (2.45/1.45/1)',
		NULL,
		2
	),
	(
		130046,
		130001,
		'Bully Turbo-Hydro 400 A (2.48/1.48/1)',
		NULL,
		2
	),
	(130047, 130001, 'Borg T-85 3 spd manual', NULL, 2),
	(
		130048,
		130001,
		'Ford-o-matic Auto (1.76/1)',
		NULL,
		1
	),
	(
		130049,
		130001,
		'Shift Command A (2.45/1.45/1)',
		NULL,
		2
	),
	(
		130050,
		130001,
		'Borg-Warner T56 6 Speed Auto',
		NULL,
		3
	),
	(
		130051,
		130001,
		'LD 3-Speed Manual (2.5/1.18/1)',
		NULL,
		1
	),
	(
		130052,
		130001,
		'Hall Helix 3-Speed Manual',
		NULL,
		4
	),
	(
		130053,
		130001,
		'Hall Helix 3-Speed Automatic',
		NULL,
		4
	),
	(130054, 130001, 'Super Muncie', NULL, 3),
	(
		130055,
		130001,
		'Muncie Close-Ratio M21 (2.2/1.64/1.27/1)',
		NULL,
		1
	),
	(130056, 130001, 'M13 3 Speed Manual', NULL, 2),
	(
		130057,
		130001,
		'Buick Dynaflow Auto (2.4/1.479/1)',
		NULL,
		1
	),
	(
		140001,
		140001,
		'Rear Differential (2.73)',
		NULL,
		1
	),
	(
		140002,
		140001,
		'Rear Differential (2.93)',
		NULL,
		1
	),
	(
		140003,
		140001,
		'Rear Differential (3.00)',
		NULL,
		1
	),
	(
		140004,
		140001,
		'Rear Differential (3.23)',
		NULL,
		1
	),
	(
		140005,
		140001,
		'Rear Differential (3.31)',
		NULL,
		1
	),
	(
		140006,
		140001,
		'Rear Differential (3.42)',
		NULL,
		2
	),
	(
		140007,
		140001,
		'Rear Differential (3.50)',
		NULL,
		2
	),
	(
		140008,
		140001,
		'Rear Differential (3.54)',
		NULL,
		2
	),
	(
		140009,
		140001,
		'Rear Differential (3.55)',
		NULL,
		2
	),
	(
		140010,
		140001,
		'Rear Differential (3.64)',
		NULL,
		2
	),
	(
		140011,
		140001,
		'Rear Differential (3.70)',
		NULL,
		2
	),
	(
		140012,
		140001,
		'Rear Differential (3.77)',
		NULL,
		2
	),
	(
		140013,
		140001,
		'Rear Differential (3.90)',
		NULL,
		3
	),
	(
		140014,
		140001,
		'Rear Differential (4.10)',
		NULL,
		3
	),
	(
		140015,
		140001,
		'Rear Differential (4.33)',
		NULL,
		3
	),
	(
		140016,
		140001,
		'Ford 3.10 Differential (Ford-O-Matic)',
		NULL,
		1
	),
	(
		140017,
		140001,
		'Rear Differential (3.56)',
		NULL,
		2
	),
	(
		140018,
		140001,
		'GM Rear Differential 3.40 (Dynaflow)',
		NULL,
		1
	),
	(
		140019,
		140001,
		'Rear Differential (3.25)',
		NULL,
		1
	),
	(
		140020,
		140001,
		'Rear Differential (3.91)',
		NULL,
		3
	),
	(
		140021,
		140001,
		'GM Rear Differential (3.71)',
		NULL,
		2
	),
	(
		140022,
		140001,
		'Rear Differential (3.07) L',
		NULL,
		1
	),
	(
		140023,
		140001,
		'Rear Differential (4.10) LD',
		NULL,
		1
	),
	(
		140024,
		140001,
		'Rear Differential (3.90) LD',
		NULL,
		1
	),
	(
		140025,
		140001,
		'Rear Differential (3.31) LD',
		NULL,
		1
	),
	(140026, 140001, 'Ford 9" (3.08)', NULL, 2),
	(140027, 140001, 'Ford 9" (3.27)', NULL, 2),
	(140028, 140001, 'Ford 9" (3.45)', NULL, 2),
	(140029, 140001, 'Ford 9" (3.55)', NULL, 2),
	(140030, 140001, 'Ford 9" (3.73)', NULL, 2),
	(140031, 140001, 'Ford 9" (4.10)', NULL, 3),
	(140032, 140001, 'Ford 8" (3.08)', NULL, 1),
	(140033, 140001, 'Ford 8" (3.27)', NULL, 1),
	(140034, 140001, 'Ford 8" (3.45)', NULL, 1),
	(140035, 140001, 'Ford 8" (3.55)', NULL, 1),
	(140036, 140001, 'Ford 8" (3.73)', NULL, 1),
	(140037, 140001, 'Ford 8" (4.10)', NULL, 1),
	(140038, 140001, 'GM 10-bolt (2.73)', NULL, 1),
	(140039, 140001, 'GM 10-bolt (3.08)', NULL, 1),
	(140040, 140001, 'GM 10-bolt (3.36)', NULL, 1),
	(140041, 140001, 'GM 10-bolt (3.55)', NULL, 1),
	(140042, 140001, 'GM 10-bolt (3.70)', NULL, 1),
	(140043, 140001, 'GM 12-bolt (3.07)', NULL, 2),
	(140044, 140001, 'GM 12-bolt (3.31)', NULL, 2),
	(140045, 140001, 'GM 12-bolt (3.55)', NULL, 2),
	(140046, 140001, 'GM 12-bolt (3.73)', NULL, 2),
	(140047, 140001, 'GM 12-bolt (4.10)', NULL, 3),
	(140048, 140001, 'GM 12-bolt (2.73)', NULL, 2),
	(
		140049,
		140001,
		'GM 12-bolt (3.55) Police',
		NULL,
		3
	),
	(140050, 140001, 'Hall 14-bolt (3.42)', NULL, 3),
	(140051, 140001, 'Hall 14-bolt (3.73)', NULL, 3),
	(140052, 140001, 'Hall 14-bolt (4.10)', NULL, 3),
	(
		150001,
		150001,
		'Bully Torqueflite HD Transmission Cooler',
		NULL,
		3
	),
	(
		150002,
		150001,
		'Bully Turbo ND Tranmission Cooler',
		NULL,
		2
	),
	(
		150003,
		150001,
		'Bully Powerglide LD Transmission Cooler',
		NULL,
		1
	),
	(
		150004,
		150001,
		'Bully C-6 XHD Transmission Cooler',
		NULL,
		4
	),
	(160001, 160001, 'Buick V8 322', 'ENGINE', 2),
	(160002, 160001, 'Buick SB V8 350', 'ENGINE', 2),
	(160003, 160001, 'Buick BB V8 455', 'ENGINE', 3),
	(160004, 160001, 'Chevy W V8 427', 'ENGINE', 3),
	(160005, 160001, 'Chevy V8 265', 'ENGINE', 1),
	(160006, 160001, 'Chevy V8 283', 'ENGINE', 1),
	(160007, 160001, 'Chevy V8 302', 'ENGINE', 1),
	(160008, 160001, 'Chevy V8 307', 'ENGINE', 1),
	(160009, 160001, 'Chevy V8 327', 'ENGINE', 2),
	(
		160010,
		160001,
		'Cadillac L-Head V8 346',
		'ENGINE',
		1
	),
	(160011, 160001, 'Chevy V8 348', 'ENGINE', 1),
	(160012, 160001, 'Chevy V8 350', 'ENGINE', 2),
	(160013, 160001, 'Cadillac V8 390', 'ENGINE', 2),
	(160014, 160001, 'Chevy V8 396', 'ENGINE', 2),
	(160015, 160001, 'Chevy V8 400', 'ENGINE', 2),
	(160016, 160001, 'Chevy V8 409', 'ENGINE', 3),
	(160017, 160001, 'Chevy V8 454', 'ENGINE', 3),
	(160018, 160001, 'Chevy V8 502', 'ENGINE', 4),
	(160019, 160001, 'Chevy V8 402', 'ENGINE', 3),
	(
		160020,
		160001,
		'Ford V8 351 Windsor',
		'ENGINE',
		2
	),
	(160021, 160001, 'Ford V8 400', 'ENGINE', 3),
	(
		160022,
		160001,
		'221-V8 24-bolt (32)',
		'ENGINE',
		1
	),
	(160023, 160001, 'Ford V8 239', 'ENGINE', 1),
	(160024, 160001, 'Ford V8 260', 'ENGINE', 1),
	(160025, 160001, 'Ford V8 272', 'ENGINE', 1),
	(160026, 160001, 'Ford V8 289', 'ENGINE', 1),
	(160027, 160001, 'Ford V8 292', 'ENGINE', 1),
	(160028, 160001, 'Ford V8 302', 'ENGINE', 1),
	(160029, 160001, 'Ford V8 312', 'ENGINE', 1),
	(160030, 160001, 'Ford V8 351', 'ENGINE', 2),
	(160031, 160001, 'Ford V8 390', 'ENGINE', 2),
	(160032, 160001, 'Ford V8 406', 'ENGINE', 3),
	(160033, 160001, 'Ford V8 427', 'ENGINE', 3),
	(160034, 160001, 'Ford V8 428', 'ENGINE', 3),
	(160035, 160001, 'Ford V8 429', 'ENGINE', 3),
	(160036, 160001, 'Ford V8 352', 'ENGINE', 2),
	(160037, 160001, 'Oldsmobile V8 350', 'ENGINE', 2),
	(160038, 160001, 'Oldsmobile V8 400', 'ENGINE', 3),
	(160039, 160001, 'Oldsmobile V8 455', 'ENGINE', 3),
	(160040, 160001, 'Pontiac V8 350', 'ENGINE', 2),
	(160041, 160001, 'Pontiac V8 421', 'ENGINE', 3),
	(160042, 160001, 'Pontiac V8 389', 'ENGINE', 2),
	(160043, 160001, 'Pontiac V8 400', 'ENGINE', 3),
	(160044, 160001, 'Pontiac V8 428', 'ENGINE', 3),
	(160045, 160001, 'Pontiac V8 455', 'ENGINE', 3),
	(
		160046,
		160001,
		'AMC V8 290 Aluminum Indy',
		'ENGINE',
		4
	),
	(160047, 160001, 'Ford V8 460', 'ENGINE', 3),
	(160048, 160001, 'Chevy V8 427', 'ENGINE', 3),
	(160049, 160001, 'Hi-Pro V8 5.0L', 'ENGINE', 4),
	(
		160050,
		160001,
		'Mercury Flathead 255',
		'ENGINE',
		1
	),
	(160051, 160001, 'Chrysler V8 273', 'ENGINE', 1),
	(160052, 160001, 'Chrysler V8 318', 'ENGINE', 1),
	(160053, 160001, 'Chrysler V8 340', 'ENGINE', 2),
	(160054, 160001, 'Chrysler V8 360', 'ENGINE', 2),
	(160055, 160001, 'Chrysler V8 383', 'ENGINE', 2),
	(160056, 160001, 'Chrysler V8 400', 'ENGINE', 3),
	(160057, 160001, 'Chrysler V8 413', 'ENGINE', 3),
	(160058, 160001, 'Chrysler V8 426', 'ENGINE', 3),
	(160059, 160001, 'Chrysler V8 440', 'ENGINE', 3),
	(160060, 160001, 'AMC V8 290', 'ENGINE', 1),
	(160061, 160001, 'AMC V8 343', 'ENGINE', 2),
	(160062, 160001, 'AMC V8 390', 'ENGINE', 2),
	(160063, 160001, 'ShadeTree V8 265', 'ENGINE', 1),
	(160064, 160001, 'AMC V8 360', 'ENGINE', 2),
	(
		160065,
		160001,
		'Chrysler V8 426 Hemi',
		'ENGINE',
		4
	),
	(160066, 160001, 'Ford V8 390 HP', 'ENGINE', 3),
	(160067, 160001, 'Ford V8 429 Boss', 'ENGINE', 4),
	(160068, 160001, 'Ford V8 289 HP', 'ENGINE', 2),
	(160069, 160001, 'Ford V8 302 Boss', 'ENGINE', 2),
	(160070, 160001, 'Buick BB V8 400', 'ENGINE', 3),
	(160071, 160001, 'Buick BB V8 430', 'ENGINE', 3),
	(160072, 160001, 'Chevy V8 427 ZL1', 'ENGINE', 4),
	(160073, 160001, 'Buick V8 364', 'ENGINE', 2),
	(160074, 160001, 'Buick V8 401', 'ENGINE', 3),
	(160075, 160001, 'Buick V8 425', 'ENGINE', 3),
	(160076, 160001, 'Buick SB V8 300', 'ENGINE', 1),
	(160077, 160001, 'Buick SB V8 340', 'ENGINE', 2),
	(160078, 160001, 'Cadillac V8 365', 'ENGINE', 2),
	(160079, 160001, 'Cadillac V8 429', 'ENGINE', 3),
	(
		160080,
		160001,
		'Ford 385 NASCAR Mg Block',
		'ENGINE',
		4
	),
	(
		160081,
		160001,
		'Ford 385 NASCAR Block',
		'ENGINE',
		4
	),
	(160082, 160001, 'AMC V8 401', 'ENGINE', 3),
	(
		180001,
		180001,
		'Chevrolet SB Cast Iron Crankshaft',
		NULL,
		1
	),
	(
		180002,
		180001,
		'Chevrolet BB Stock CI Crankshaft',
		NULL,
		1
	),
	(
		180003,
		180001,
		'Buick BB Stock Crankshaft',
		NULL,
		1
	),
	(
		180004,
		180001,
		'Buick SB Stock Crankshaft',
		NULL,
		1
	),
	(
		180005,
		180001,
		'Cadillac BB Stock Crankshaft',
		NULL,
		1
	),
	(
		180006,
		180001,
		'Chevrolet BB Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180007,
		180001,
		'Chevrolet SB Stock FS Crankshaft',
		NULL,
		1
	),
	(
		180008,
		180001,
		'Chrysler BB Stock FS Crankshaft',
		NULL,
		1
	),
	(
		180009,
		180001,
		'Chrysler SB Stock FS Crankshaft',
		NULL,
		1
	),
	(
		180010,
		180001,
		'Ford BB Stock Crankshaft',
		NULL,
		1
	),
	(
		180011,
		180001,
		'Ford Y Stock Crankshaft',
		NULL,
		1
	),
	(
		180012,
		180001,
		'Ford Flathead Stock Crankshaft',
		NULL,
		1
	),
	(
		180013,
		180001,
		'Olds BB Forged Steel Crankshaft',
		NULL,
		1
	),
	(
		180014,
		180001,
		'Olds SB Stock Crankshaft',
		NULL,
		1
	),
	(
		180015,
		180001,
		'AMC Stock TI Crankshaft',
		NULL,
		1
	),
	(
		180016,
		180001,
		'Pontiac Stock Crankshaft',
		NULL,
		1
	),
	(
		180017,
		180001,
		'Chevrolet SB Treated Iron Crankshaft',
		NULL,
		1
	),
	(
		180018,
		180001,
		'Crower Pure-Stock Chevrolet SB Crankshaft',
		NULL,
		1
	),
	(
		180019,
		180001,
		'Crower Stock-Plus Chevrolet SB Crankshaft',
		NULL,
		2
	),
	(
		180020,
		180001,
		'Crower Enduro Chevrolet SB Crankshaft',
		NULL,
		2
	),
	(
		180021,
		180001,
		'Crower Ultra-Light Chevrolet SB Crankshaft',
		NULL,
		2
	),
	(
		180022,
		180001,
		'Crower Standard Chevrolet SB Crankshaft',
		NULL,
		3
	),
	(
		180023,
		180001,
		'Crower Standard Chevrolet BB Crankshaft',
		NULL,
		3
	),
	(
		180024,
		180001,
		'Olds SB Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180025,
		180001,
		'Olds BB Stock Cast Iron Crankshaft',
		NULL,
		1
	),
	(
		180026,
		180001,
		'Olds BB Stock Treated Iron Crankshaft',
		NULL,
		1
	),
	(
		180027,
		180001,
		'Pontiac Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180028,
		180001,
		'Pontiac Armasteel (TI) Crankshaft',
		NULL,
		1
	),
	(
		180029,
		180001,
		'Pontiac SD Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180030,
		180001,
		'Ford SB Stock TI Crankshaft',
		NULL,
		1
	),
	(
		180031,
		180001,
		'Ford BB Truck Forged Steel Crankshaft',
		NULL,
		1
	),
	(
		180032,
		180001,
		'Ford BB 427 MR Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180033,
		180001,
		'Ford BB Treated Iron Crankshaft',
		NULL,
		2
	),
	(
		180034,
		180001,
		'Ford SB Boss (TI) Crankshaft',
		NULL,
		2
	),
	(
		180035,
		180001,
		'Ford BB Forged Steel Crankshaft',
		NULL,
		2
	),
	(
		180036,
		180001,
		'Chrysler BB Stock CI Crankshaft',
		NULL,
		1
	),
	(
		180037,
		180001,
		'Chrysler Hemi (FS) Crankshaft',
		NULL,
		2
	),
	(
		180038,
		180001,
		'Chrysler SB Stock CI Crankshaft',
		NULL,
		1
	),
	(
		180039,
		180001,
		'Crower Enduro Chevrolet BB Crankshaft',
		NULL,
		2
	),
	(
		180040,
		180001,
		'Crower Ultra-Light Chevrolet BB Crankshaft',
		NULL,
		2
	),
	(
		180041,
		180001,
		'Crower Enduro Ford SB Crankshaft',
		NULL,
		2
	),
	(
		180042,
		180001,
		'Crower Standard Ford SB Crankshaft',
		NULL,
		3
	),
	(
		180043,
		180001,
		'Crower Enduro Ford BB Crankshaft',
		NULL,
		2
	),
	(
		180044,
		180001,
		'Crower Standard Ford BB Crankshaft',
		NULL,
		3
	),
	(
		180045,
		180001,
		'Crower Enduro Chrysler BB Crankshaft',
		NULL,
		2
	),
	(
		180046,
		180001,
		'Crower Enduro Chrysler SB Crankshaft',
		NULL,
		2
	),
	(
		180047,
		180001,
		'Crower Standard Chrysler BB Crankshaft',
		NULL,
		3
	),
	(
		180048,
		180001,
		'Crower Standard Chrysler SB Crankshaft',
		NULL,
		3
	),
	(
		180049,
		180001,
		'Buick Nailhead Stock FS Crankshaft',
		NULL,
		1
	),
	(
		180050,
		180001,
		'Ford BB HD CI Crankshaft',
		NULL,
		2
	),
	(
		180051,
		180001,
		'Ford SB HP TI Crankshaft',
		NULL,
		2
	),
	(
		180052,
		180001,
		'AMC Group 19 Crankshaft',
		NULL,
		2
	),
	(
		180053,
		180001,
		'Cadillac L-Head Crankshaft',
		NULL,
		1
	),
	(
		180054,
		180001,
		'Ford Cleveland Block Stock Crankshaft',
		NULL,
		1
	),
	(
		180055,
		180001,
		'Ford Cleveland Block Boss Crankshaft',
		NULL,
		2
	),
	(
		180056,
		180001,
		'Ford 385 Block Stock CI Crankshaft',
		NULL,
		1
	),
	(
		180057,
		180001,
		'Ford 385 Block Boss FS Crankshaft',
		NULL,
		2
	),
	(
		180058,
		180001,
		'Ford 385 Block NASCAR Crankshaft',
		NULL,
		4
	),
	(
		180059,
		180001,
		'Ford Y Truck Crankshaft',
		NULL,
		1
	),
	(
		180060,
		180001,
		'Chevrolet W Stock FS Crankshaft',
		NULL,
		1
	),
	(
		180061,
		180001,
		'Buick Nailhead Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180062,
		180001,
		'Buick SB Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180063,
		180001,
		'Buick BB Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180064,
		180001,
		'Cadillac L-Head Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180065,
		180001,
		'Cadillac Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180066,
		180001,
		'Chevrolet W Block Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180067,
		180001,
		'Chrysler Hemi Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180068,
		180001,
		'Ford Flathead Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180069,
		180001,
		'Oldsmobile SB Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180070,
		180001,
		'Oldsmobile BB Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180071,
		180001,
		'Newcomb Y Block Stump Puller Crankshaft',
		NULL,
		2
	),
	(
		180072,
		180001,
		'Newcomb Y Block Street Max Crankshaft',
		NULL,
		2
	),
	(
		180073,
		180001,
		'Newcomb Y Block Super Max Crankshaft',
		NULL,
		2
	),
	(
		180074,
		180001,
		'Duro Rod Y Block Marathon Crankshaft',
		NULL,
		1
	),
	(
		180075,
		180001,
		'Duro Rod Y Block Lightweight Crankshaft',
		NULL,
		2
	),
	(
		180076,
		180001,
		'Duro Rod Y Block Champion Crankshaft',
		NULL,
		2
	),
	(
		180077,
		180001,
		'Hedgely Y Block Super 292 Crankshaft',
		NULL,
		1
	),
	(
		180078,
		180001,
		'Hedgely Y Block Super 312 Crankshaft',
		NULL,
		2
	),
	(
		180079,
		180001,
		'Duro Rod Ford SB Champion Crank',
		NULL,
		2
	),
	(
		180080,
		180001,
		'Newcomb Ford SB Super Max Crank',
		NULL,
		2
	),
	(
		180081,
		180001,
		'Newcomb Ford SB Street Max Crank',
		NULL,
		2
	),
	(
		180082,
		180001,
		'Newcomb Buick Nailhead Stump Puller Crank',
		NULL,
		2
	),
	(
		180083,
		180001,
		'Newcomb Buick Nailhead Super Max Crank',
		NULL,
		2
	),
	(
		180084,
		180001,
		'Newcomb Buick Nailhead Street Max Crank',
		NULL,
		2
	),
	(
		180085,
		180001,
		'Hedgely Buick Nailhead Super 300 Crank',
		NULL,
		1
	),
	(
		180086,
		180001,
		'Hedgely Buick Nailhead Super 400 Crank',
		NULL,
		2
	),
	(
		180087,
		180001,
		'Duro Rod Buick Nailhead Champion Crank',
		NULL,
		2
	),
	(
		180088,
		180001,
		'Duro Rod Buick Nailhead Lightweight Crank',
		NULL,
		2
	),
	(
		180089,
		180001,
		'Duro Rod Buick Nailhead Marathon Crank',
		NULL,
		2
	),
	(
		180090,
		180001,
		'Hedgely Chrysler SB Super 340 Crank',
		NULL,
		2
	),
	(
		180091,
		180001,
		'Duro Rod Chrysler SB Lightweight Crank',
		NULL,
		2
	),
	(
		180092,
		180001,
		'Duro Rod Chrysler SB Marathon Crank',
		NULL,
		2
	),
	(
		180093,
		180001,
		'Percy Chrysler SB Lightweight Crank',
		NULL,
		3
	),
	(
		180094,
		180001,
		'Duro Rod Pontiac Lightweight Crank',
		NULL,
		2
	),
	(
		180095,
		180001,
		'Duro Rod Pontiac Marathon Crank',
		NULL,
		2
	),
	(
		180096,
		180001,
		'Hedgely Pontiac SD Special Crank',
		NULL,
		2
	),
	(
		180097,
		180001,
		'Newcomb Cleveland Stump Puller Crank',
		NULL,
		1
	),
	(
		180098,
		180001,
		'Newcomb Cleveland Street Max Crank',
		NULL,
		2
	),
	(
		180099,
		180001,
		'Newcomb Cleveland Super Max Crank',
		NULL,
		3
	),
	(
		180100,
		180001,
		'Duro Rod Cleveland Contender Crank',
		NULL,
		1
	),
	(
		180101,
		180001,
		'Duro Rod Cleveland Champion Crank',
		NULL,
		2
	),
	(
		180102,
		180001,
		'Duro Rod Cleveland Lightweight Crank',
		NULL,
		3
	),
	(
		180103,
		180001,
		'Duro Rod Cleveland Marathon Crank',
		NULL,
		3
	),
	(
		180104,
		180001,
		'Duro Rod Cleveland Legend Crank',
		NULL,
		4
	),
	(
		180105,
		180001,
		'Newcomb Ford 385 Stump Puller Crank',
		NULL,
		1
	),
	(
		180106,
		180001,
		'Newcomb Ford 385 Street Max Crank',
		NULL,
		2
	),
	(
		180107,
		180001,
		'Newcomb Ford 385 Super Max Crank',
		NULL,
		3
	),
	(
		180108,
		180001,
		'Duro Rod Ford 385 Contender Crank',
		NULL,
		1
	),
	(
		180109,
		180001,
		'Duro Rod Ford 385 Champion Crank',
		NULL,
		2
	),
	(
		180110,
		180001,
		'Duro Rod Ford 385 Lightweight Crank',
		NULL,
		3
	),
	(
		180111,
		180001,
		'Duro Rod Ford 385 Marathon Crank',
		NULL,
		3
	),
	(
		180112,
		180001,
		'Duro Rod Ford 385 Legend Crank',
		NULL,
		4
	),
	(
		180113,
		180001,
		'Newcomb Hemi Stump Puller Crank',
		NULL,
		1
	),
	(
		180114,
		180001,
		'Newcomb Hemi Street Max Crank',
		NULL,
		2
	),
	(
		180115,
		180001,
		'Newcomb Hemi Super Max Crank',
		NULL,
		3
	),
	(
		180116,
		180001,
		'Duro Rod Hemi Contender Crank',
		NULL,
		1
	),
	(
		180117,
		180001,
		'Duro Rod Hemi Champion Crank',
		NULL,
		2
	),
	(
		180118,
		180001,
		'Duro Rod Hemi Lighweight Crank',
		NULL,
		3
	),
	(
		180119,
		180001,
		'Duro Rod Hemi Marathon Crank',
		NULL,
		3
	),
	(
		180120,
		180001,
		'Duro Rod Hemi Legend Crank',
		NULL,
		4
	),
	(
		180121,
		180001,
		'Newcomb Cadillac BB Stump Puller Crank',
		NULL,
		1
	),
	(
		180122,
		180001,
		'Newcomb Cadillac BB Street Max Crank',
		NULL,
		2
	),
	(
		180123,
		180001,
		'Newcomb Cadillac BB Super Max Crank',
		NULL,
		3
	),
	(
		180124,
		180001,
		'Duro Rod Cadillac BB Contender Crank',
		NULL,
		1
	),
	(
		180125,
		180001,
		'Duro Rod Cadillac BB Champion Crank',
		NULL,
		2
	),
	(
		180126,
		180001,
		'Duro Rod Cadillac BB Lightweight Crank',
		NULL,
		3
	),
	(
		180127,
		180001,
		'Duro Rod Cadillac BB Marathon Crank',
		NULL,
		3
	),
	(
		180128,
		180001,
		'Duro Rod Cadillac BB Legend Crank',
		NULL,
		4
	),
	(
		180129,
		180001,
		'Duro Rod Chevy W Contender Crank',
		NULL,
		2
	),
	(
		180130,
		180001,
		'Duro Rod Chevy W Champion Crank',
		NULL,
		2
	),
	(
		180131,
		180001,
		'Duro Rod Chevy W Lightweight Crank',
		NULL,
		3
	),
	(
		180132,
		180001,
		'Duro Rod Chevy W Marathon Crank',
		NULL,
		3
	),
	(
		180133,
		180001,
		'Duro Rod Chevy W Legend Crank',
		NULL,
		4
	),
	(
		180134,
		180001,
		'Newcomb Chevy W Stump Puller Crank',
		NULL,
		1
	),
	(
		180135,
		180001,
		'Newcomb Chevy W Street Max Crank',
		NULL,
		2
	),
	(
		180136,
		180001,
		'Newcomb Chevy W Super Max Crank',
		NULL,
		3
	),
	(
		180137,
		180001,
		'Newcomb AMC Stump Puller Crank',
		NULL,
		1
	),
	(
		180138,
		180001,
		'Newcomb AMC Street Max Crank',
		NULL,
		2
	),
	(
		180139,
		180001,
		'Newcomb AMC Super Max Crank',
		NULL,
		3
	),
	(
		180140,
		180001,
		'Duro Rod AMC Contender Crank',
		NULL,
		1
	),
	(
		180141,
		180001,
		'Duro Rod AMC Champion Crank',
		NULL,
		2
	),
	(
		180142,
		180001,
		'Duro Rod AMC Lightweight Crank',
		NULL,
		3
	),
	(
		180143,
		180001,
		'Duro Rod AMC Marathon Crank',
		NULL,
		3
	),
	(
		180144,
		180001,
		'Duro Rod AMC Legend Crank',
		NULL,
		4
	),
	(
		180145,
		180001,
		'Newcomb Olds BB Stump Puller Crank',
		NULL,
		1
	),
	(
		180146,
		180001,
		'Newcomb Olds BB Street Max Crank',
		NULL,
		2
	),
	(
		180147,
		180001,
		'Newcomb Olds BB Super Max Crank',
		NULL,
		3
	),
	(
		180148,
		180001,
		'Duro Rod Olds BB Contender Crank',
		NULL,
		1
	),
	(
		180149,
		180001,
		'Duro Rod Olds BB Champion Crank',
		NULL,
		2
	),
	(
		180150,
		180001,
		'Duro Rod Olds BB Lightweight Crank',
		NULL,
		3
	),
	(
		180151,
		180001,
		'Duro Rod Olds BB Marathon Crank',
		NULL,
		3
	),
	(
		180152,
		180001,
		'Duro Rod Olds BB Legend Crank',
		NULL,
		4
	),
	(
		180153,
		180001,
		'Newcomb Chrylser BB Stump Puller Crank',
		NULL,
		1
	),
	(
		180154,
		180001,
		'Newcomb Chrysler BB Street Max Crank',
		NULL,
		2
	),
	(
		180155,
		180001,
		'Newcomb Chrysler BB Super Max Crank',
		NULL,
		3
	),
	(
		180156,
		180001,
		'Duro Rod Chrysler BB Contender Crank',
		NULL,
		1
	),
	(
		180157,
		180001,
		'Duro Rod Chrysler BB Champion Crank',
		NULL,
		2
	),
	(
		180158,
		180001,
		'Duro Rod Chrysler BB Lightweight Crank',
		NULL,
		3
	),
	(
		180159,
		180001,
		'Duro Rod Chrysler BB Marathon Crank',
		NULL,
		3
	),
	(
		180160,
		180001,
		'Duro Rod Chrysler BB Legend Crank',
		NULL,
		4
	),
	(
		180161,
		180001,
		'Newcomb Ford BB Stump Puller Crank',
		NULL,
		1
	),
	(
		180162,
		180001,
		'Newcomb Ford BB Street Max Crank',
		NULL,
		2
	),
	(
		180163,
		180001,
		'Newcomb Ford BB Super Max Crank',
		NULL,
		3
	),
	(
		180164,
		180001,
		'Duro Rod Ford BB Contender Crank',
		NULL,
		1
	),
	(
		180165,
		180001,
		'Duro Rod Ford BB Champion Crank',
		NULL,
		2
	),
	(
		180166,
		180001,
		'Duro Rod Ford BB Lightweight Crank',
		NULL,
		3
	),
	(
		180167,
		180001,
		'Duro Rod Ford BB Marathon Crank',
		NULL,
		3
	),
	(
		180168,
		180001,
		'Duro Rod Ford BB Legend Crank',
		NULL,
		4
	),
	(
		180169,
		180001,
		'Newcomb Chevy BB Stump Puller Crank',
		NULL,
		1
	),
	(
		180170,
		180001,
		'Newcomb Chevy BB Street Max Crank',
		NULL,
		2
	),
	(
		180171,
		180001,
		'Newcomb Chevy BB Super Max Crank',
		NULL,
		3
	),
	(
		180172,
		180001,
		'Duro Rod Chevy BB Contender Crank',
		NULL,
		1
	),
	(
		180173,
		180001,
		'Duro Rod Chevy BB Champion Crank',
		NULL,
		2
	),
	(
		180174,
		180001,
		'Duro Rod Chevy BB Lightweight Crank',
		NULL,
		3
	),
	(
		180175,
		180001,
		'Duro Rod Chevy BB Marathon Crank',
		NULL,
		3
	),
	(
		180176,
		180001,
		'Duro Rod Chevy BB Legend Crank',
		NULL,
		4
	),
	(190001, 190001, 'Ford SB Boss 302 Rod', NULL, 2),
	(
		190002,
		190001,
		'Ford BB HD Capscrew Rod',
		NULL,
		2
	),
	(190003, 190001, 'Ford BB HP 390 Rod', NULL, 2),
	(190004, 190001, 'Pontiac Ram Air V Rod', NULL, 2),
	(
		190005,
		190001,
		'Cadillac BB Stock CI Rod',
		NULL,
		1
	),
	(190006, 190001, 'Pontiac CI Stock Rod', NULL, 1),
	(190007, 190001, 'Buick BB Stock Rod', NULL, 1),
	(
		190008,
		190001,
		'Buick Nailhead Stock Rod',
		NULL,
		1
	),
	(190009, 190001, 'Cadillac BB Stock Rod', NULL, 1),
	(190010, 190001, 'Chevrolet BB Stock Rod', NULL, 1),
	(190011, 190001, 'Chevrolet SB Stock Rod', NULL, 1),
	(190012, 190001, 'Chrysler BB Stock Rod', NULL, 1),
	(190013, 190001, 'Chrysler SB Stock Rod', NULL, 1),
	(190014, 190001, 'Ford BB Stock Rod', NULL, 1),
	(190015, 190001, 'Ford SB Stock Rod', NULL, 1),
	(
		190016,
		190001,
		'Ford Flathead Stock Rod',
		NULL,
		1
	),
	(190017, 190001, 'Olds BB Stock Rod', NULL, 1),
	(190018, 190001, 'Olds SB Stock Rod', NULL, 1),
	(190019, 190001, 'AMC Stock Rod', NULL, 1),
	(190020, 190001, 'Pontiac Stock Rod', NULL, 1),
	(
		190021,
		190001,
		'Crower Sportsman Ford SB Rod',
		NULL,
		2
	),
	(
		190022,
		190001,
		'Crower Billet Steel Ford SB Rod',
		NULL,
		3
	),
	(
		190023,
		190001,
		'Crower Lightweight Billet Steel Ford SB Rod',
		NULL,
		3
	),
	(
		190024,
		190001,
		'Crower Maxi-Light 93 Billet Steel Ford SB Rod',
		NULL,
		3
	),
	(
		190025,
		190001,
		'Crower Titanium Ford BB Rod',
		NULL,
		4
	),
	(
		190026,
		190001,
		'Ford BB Le Mans Capscrew Rod',
		NULL,
		4
	),
	(190027, 190001, 'Ford BB PI Rod', NULL, 2),
	(190028, 190001, 'Ford 385 Boss Rod', NULL, 3),
	(190029, 190001, 'Ford 385 820-S Rod', NULL, 4),
	(190030, 190001, 'Ford 385 820-T Rod', NULL, 3),
	(190031, 190001, 'Chrysler BB HD Rod', NULL, 2),
	(
		190032,
		190001,
		'Crower Sportsman Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190033,
		190001,
		'Crower Sportsman Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190034,
		190001,
		'Crower Billet Steel Ford BB Rod',
		NULL,
		2
	),
	(
		190035,
		190001,
		'Crower Billet Steel Pontiac Rod',
		NULL,
		2
	),
	(
		190036,
		190001,
		'Crower Billet Steel Olds BB Rod',
		NULL,
		2
	),
	(
		190037,
		190001,
		'Crower Billet Steel Buick BB Rod',
		NULL,
		2
	),
	(
		190038,
		190001,
		'Crower Billet Steel Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190039,
		190001,
		'Crower Billet Steel Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190040,
		190001,
		'Crower Lightweight Billet Steel Buick BB Rod',
		NULL,
		2
	),
	(
		190041,
		190001,
		'Crower Lightweight Billet Steel Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190042,
		190001,
		'Crower Lightweight Billet Steel Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190043,
		190001,
		'Crower Lightweight Billet Steel Ford BB Rod',
		NULL,
		2
	),
	(
		190044,
		190001,
		'Crower Lightweight Billet Steel Olds BB Rod',
		NULL,
		2
	),
	(
		190045,
		190001,
		'Crower Lightweight Billet Steel Pontiac Rod',
		NULL,
		2
	),
	(
		190046,
		190001,
		'Crower Maxi-Light 93 Billet Steel Chevrolet SB Rod',
		NULL,
		3
	),
	(
		190047,
		190001,
		'Crower Titanium Buick BB Rod',
		NULL,
		4
	),
	(
		190048,
		190001,
		'Crower Titanium Chevrolet BB Rod',
		NULL,
		4
	),
	(
		190049,
		190001,
		'Crower Titanium Chevrolet SB Rod',
		NULL,
		4
	),
	(
		190050,
		190001,
		'Lunati Forged Aluminum Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190051,
		190001,
		'Lunati Forged Aluminum Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190052,
		190001,
		'Lunati Street Race Ford SB Rod',
		NULL,
		2
	),
	(
		190053,
		190001,
		'Lunati Street Race Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190054,
		190001,
		'Lunati Street Race Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190055,
		190001,
		'Lunati Pro Billet Ford SB Rod',
		NULL,
		3
	),
	(
		190056,
		190001,
		'Lunati Pro Billet Chevrolet SB Rod',
		NULL,
		3
	),
	(
		190057,
		190001,
		'Lunati Pro Billet Chevrolet BB Rod',
		NULL,
		3
	),
	(
		190058,
		190001,
		'Lunati Pro Mod Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190059,
		190001,
		'Lunati Pro Mod Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190060,
		190001,
		'Lunati Sportsman H-Beam Chevrolet SB Rod',
		NULL,
		2
	),
	(
		190061,
		190001,
		'Lunati Sportsman H-Beam Chevrolet BB Rod',
		NULL,
		2
	),
	(
		190062,
		190001,
		'Lunati Sportsman H-Beam Ford BB Rod',
		NULL,
		2
	),
	(
		190063,
		190001,
		'Lunati Sportsman H-Beam Ford SB Rod',
		NULL,
		2
	),
	(
		190064,
		190001,
		'Lunati Sportsman H-Beam Chrysler BB Rod',
		NULL,
		2
	),
	(
		190065,
		190001,
		'Lunati Sportsman H-Beam Pontiac Rod',
		NULL,
		2
	),
	(
		190066,
		190001,
		'Chevrolet SB 400 FS Rod',
		NULL,
		1
	),
	(190067, 190001, 'Chevrolet W HD FS Rod', NULL, 2),
	(190068, 190001, 'AMC Stock TI Rod', NULL, 1),
	(190069, 190001, 'Chrysler Hemi Rods', NULL, 3),
	(190070, 190001, 'Cadillac L-Head Rods', NULL, 1),
	(
		190071,
		190001,
		'Buick SB Cast Iron Connecting Rod',
		NULL,
		1
	),
	(
		190072,
		190001,
		'Ford Cleveland Block Stock Rods',
		NULL,
		1
	),
	(
		190073,
		190001,
		'Ford Cleveland Block Boss Rods',
		NULL,
		2
	),
	(
		190074,
		190001,
		'Ford 385 Block Stock Rod',
		NULL,
		1
	),
	(190075, 190001, 'Ford SB HP Rod', NULL, 2),
	(190076, 190001, 'Ford Y Stock Rods', NULL, 1),
	(190077, 190001, 'Ford Y Truck Rods', NULL, 1),
	(190078, 190001, 'Buick Nailhead 364 Rod', NULL, 2),
	(190079, 190001, 'Buick SB FS Rod', NULL, 2),
	(190080, 190001, 'Cadillac L-Head FS Rod', NULL, 2),
	(
		190081,
		190001,
		'Chevrolet W Stock FS Rod',
		NULL,
		1
	),
	(
		190082,
		190001,
		'Lunati Sportsman H-Beam Chevrolet W Rod',
		NULL,
		2
	),
	(
		190083,
		190001,
		'Crower Billet Steel Chrysler SB Rod',
		NULL,
		2
	),
	(
		190084,
		190001,
		'Crower Billet Steel Chrysler Hemi Rod',
		NULL,
		3
	),
	(
		190085,
		190001,
		'Crower Lightweight Billet Steel Chrysler Hemi Rod',
		NULL,
		3
	),
	(
		190086,
		190001,
		'Crower Titanium Chrysler Hemi Rod',
		NULL,
		4
	),
	(
		190087,
		190001,
		'Lunati Pro Billet Chrysler Hemi Rod',
		NULL,
		3
	),
	(
		190088,
		190001,
		'Edelbrock Ford Flathead FS Rod',
		NULL,
		2
	),
	(190089, 190001, 'Olds SB W-31 FS Rod', NULL, 2),
	(
		190090,
		190001,
		'Newcomb Y Block Stump Puller Rod',
		NULL,
		1
	),
	(
		190091,
		190001,
		'Newcomb Y Block Street Max Rod',
		NULL,
		2
	),
	(
		190092,
		190001,
		'Newcomb Y Block Super Max Rod',
		NULL,
		2
	),
	(
		190093,
		190001,
		'Duro Rod Y Block Marathon Rod',
		NULL,
		1
	),
	(
		190094,
		190001,
		'Duro Rod Y Block Lightweight Rod',
		NULL,
		2
	),
	(
		190095,
		190001,
		'Duro Rod Y Block Champion Rod',
		NULL,
		2
	),
	(
		190096,
		190001,
		'Duro Rod Y Block Legend Rod',
		NULL,
		3
	),
	(
		190097,
		190001,
		'Hedgely Y Block Extra Y Rod',
		NULL,
		1
	),
	(
		190098,
		190001,
		'Hedgely Y Block T-Bird Special Rod',
		NULL,
		2
	),
	(
		190099,
		190001,
		'Hedgely Buick Nailhead Century Special Rod',
		NULL,
		1
	),
	(
		190100,
		190001,
		'Hedgely Buick Nailhead Riviera Special Rod',
		NULL,
		2
	),
	(
		190101,
		190001,
		'Duro Rod Buick Nailhead Champion Rod',
		NULL,
		2
	),
	(
		190102,
		190001,
		'Duro Rod Buick Nailhead Legend Rod',
		NULL,
		3
	),
	(
		190103,
		190001,
		'Duro Rod Buick Nailhead Lightweight Rod',
		NULL,
		2
	),
	(
		190104,
		190001,
		'Duro Rod Buick Nailhead Marathon Rod',
		NULL,
		2
	),
	(
		190105,
		190001,
		'Newcomb Buick Nailhead Stump Puller Rod',
		NULL,
		2
	),
	(
		190106,
		190001,
		'Newcomb Buick Nailhead Street Max Rod',
		NULL,
		2
	),
	(
		190107,
		190001,
		'Newcomb Buick Nailhead Super Max Rod',
		NULL,
		3
	),
	(
		190108,
		190001,
		'Hedgely Ford SB T351 Billet Rod',
		NULL,
		3
	),
	(
		190109,
		190001,
		'Hedgely Ford SB Power I Rod',
		NULL,
		2
	),
	(
		190110,
		190001,
		'Percy Chrysler SB Replica Rod',
		NULL,
		1
	),
	(
		190111,
		190001,
		'Percy Chrysler SB Replica Street Racer Rod',
		NULL,
		2
	),
	(
		190112,
		190001,
		'Percy Chrysler SB Factory Lightweight Rod',
		NULL,
		3
	),
	(
		190113,
		190001,
		'Duro Rod Chrysler SB Marathon Rod',
		NULL,
		2
	),
	(
		190114,
		190001,
		'Duro Rod Chrysler SB Lightweight Rod',
		NULL,
		2
	),
	(
		190115,
		190001,
		'Newcomb Chrysler SB Street Max Rod',
		NULL,
		2
	),
	(
		190116,
		190001,
		'Duro Rod Pontiac Champion Rod',
		NULL,
		2
	),
	(
		190117,
		190001,
		'Duro Rod Pontiac Lightweight Rod',
		NULL,
		2
	),
	(
		190118,
		190001,
		'Duro Rod Pontiac Marathon Rod',
		NULL,
		2
	),
	(
		190119,
		190001,
		'Newcomb Cleveland Stump Puller Rod',
		NULL,
		1
	),
	(
		190120,
		190001,
		'Newcomb Cleveland Street Max Rod',
		NULL,
		2
	),
	(
		190121,
		190001,
		'Newcomb Cleveland Super Max Rod',
		NULL,
		3
	),
	(
		190122,
		190001,
		'Duro Rod Cleveland Lightweight Rod',
		NULL,
		3
	),
	(
		190123,
		190001,
		'Duro Rod Cleveland Marathon Rod',
		NULL,
		3
	),
	(
		190124,
		190001,
		'Duro Rod Cleveland Legend Rod',
		NULL,
		4
	),
	(
		190125,
		190001,
		'Newcomb Ford 385 Stump Puller Rod',
		NULL,
		1
	),
	(
		190126,
		190001,
		'Newcomb Ford 385 Street Max Rod',
		NULL,
		2
	),
	(
		190127,
		190001,
		'Newcomb Ford 385 Super Max Rod',
		NULL,
		3
	),
	(
		190128,
		190001,
		'Duro Rod Ford 385 Lightweight Rod',
		NULL,
		3
	),
	(
		190129,
		190001,
		'Duro Rod Ford 385 Marathon Rod',
		NULL,
		3
	),
	(
		190130,
		190001,
		'Duro Rod Ford 385 Legend Rod',
		NULL,
		4
	),
	(
		190131,
		190001,
		'Duro Rod Hemi Champion Rod',
		NULL,
		2
	),
	(
		190132,
		190001,
		'Duro Rod Hemi Lightweight Rod',
		NULL,
		3
	),
	(
		190133,
		190001,
		'Duro Rod Hemi Marathon Rod',
		NULL,
		3
	),
	(
		190134,
		190001,
		'Duro Rod Hemi Legend Rod',
		NULL,
		4
	),
	(
		190135,
		190001,
		'Duro Rod Cadillac BB Champion Rod',
		NULL,
		2
	),
	(
		190136,
		190001,
		'Duro Rod Cadillac BB Lightweight Rod',
		NULL,
		3
	),
	(
		190137,
		190001,
		'Duro Rod Cadillac BB Marathon Rod',
		NULL,
		3
	),
	(
		190138,
		190001,
		'Duro Rod Cadillac BB Legend Rod',
		NULL,
		4
	),
	(
		190139,
		190001,
		'Newcomb Cadillac BB Stump Puller Rod',
		NULL,
		1
	),
	(
		190140,
		190001,
		'Newcomb Cadillac BB Street Max Rod',
		NULL,
		2
	),
	(
		190141,
		190001,
		'Newcomb Cadillac BB Super Max Rod',
		NULL,
		3
	),
	(
		190142,
		190001,
		'Newcomb Chevy W Stump Puller Rod',
		NULL,
		1
	),
	(
		190143,
		190001,
		'Newcomb Chevy W Street Max Rod',
		NULL,
		2
	),
	(
		190144,
		190001,
		'Newcomb Chevy W Super Max Rod',
		NULL,
		3
	),
	(
		190145,
		190001,
		'Duro Rod Chevy W Contender Rod',
		NULL,
		1
	),
	(
		190146,
		190001,
		'Duro Rod Chevy W Champion Rod',
		NULL,
		2
	),
	(
		190147,
		190001,
		'Duro Rod Chevy W Lightweight Rod',
		NULL,
		3
	),
	(
		190148,
		190001,
		'Duro Rod Chevy W Marathon Rod',
		NULL,
		3
	),
	(
		190149,
		190001,
		'Duro Rod Chevy W Legend Rod',
		NULL,
		4
	),
	(
		190150,
		190001,
		'Newcomb AMC Stump Puller Rod',
		NULL,
		1
	),
	(
		190151,
		190001,
		'Newcomb AMC Street Max Rod',
		NULL,
		2
	),
	(
		190152,
		190001,
		'Newcomb AMC Super Max Rod',
		NULL,
		3
	),
	(
		190153,
		190001,
		'Duro Rod AMC Contender Rod',
		NULL,
		1
	),
	(
		190154,
		190001,
		'Duro Rod AMC Champion Rod',
		NULL,
		2
	),
	(
		190155,
		190001,
		'Duro Rod AMC Lightweight Rod',
		NULL,
		3
	),
	(
		190156,
		190001,
		'Duro Rod AMC Marathon Rod',
		NULL,
		3
	),
	(
		190157,
		190001,
		'Duro Rod AMC Legend Rod',
		NULL,
		4
	),
	(
		190158,
		190001,
		'Duro Rod Olds BB Contender Rod',
		NULL,
		1
	),
	(
		190159,
		190001,
		'Duro Rod Olds BB Champion Rod',
		NULL,
		2
	),
	(
		190160,
		190001,
		'Duro Rod Olds BB Lightweight Rod',
		NULL,
		3
	),
	(
		190161,
		190001,
		'Duro Rod Olds BB Marathon Rod',
		NULL,
		3
	),
	(
		190162,
		190001,
		'Duro Rod Olds BB Legend Rod',
		NULL,
		4
	),
	(
		190163,
		190001,
		'Newcomb Chrysler BB Stump Puller Rod',
		NULL,
		1
	),
	(
		190164,
		190001,
		'Newcomb Chrysler BB Street Max Rod',
		NULL,
		2
	),
	(
		190165,
		190001,
		'Newcomb Chrylser BB Super Max Rod',
		NULL,
		3
	),
	(
		190166,
		190001,
		'Duro Rod Chrysler BB Contender Rod',
		NULL,
		1
	),
	(
		190167,
		190001,
		'Duro Rod Chrysler BB Champion Rod',
		NULL,
		2
	),
	(
		190168,
		190001,
		'Duro Rod Chrysler BB Lightweight Rod',
		NULL,
		3
	),
	(
		190169,
		190001,
		'Duro Rod Chrysler BB Marathon Rod',
		NULL,
		3
	),
	(
		190170,
		190001,
		'Duro Rod Chrysler BB Legend Rod',
		NULL,
		4
	),
	(
		190171,
		190001,
		'Duro Rod Ford BB Contender Rod',
		NULL,
		1
	),
	(
		190172,
		190001,
		'Duro Rod Ford BB Champion Rod',
		NULL,
		2
	),
	(
		190173,
		190001,
		'Duro Rod Ford BB Lightweight Rod',
		NULL,
		3
	),
	(
		190174,
		190001,
		'Duro Rod Ford BB Marathon Rod',
		NULL,
		3
	),
	(
		190175,
		190001,
		'Duro Rod Ford BB Legend Rod',
		NULL,
		4
	),
	(
		200001,
		200001,
		'Ford BB Flat Top Piston',
		NULL,
		1
	),
	(
		200002,
		200001,
		'Ford SB Flat Top Piston',
		NULL,
		1
	),
	(
		200003,
		200001,
		'Chevrolet BB Flat Top Piston',
		NULL,
		1
	),
	(
		200004,
		200001,
		'JE Pistons Domed Top Ford BB Piston',
		NULL,
		2
	),
	(
		200005,
		200001,
		'Ford BB Cammer Pop-up Piston',
		NULL,
		4
	),
	(
		200006,
		200001,
		'Chevrolet SB Flat Top Piston',
		NULL,
		1
	),
	(
		200007,
		200001,
		'JE Pistons Wedge Top Ford Y Piston',
		NULL,
		2
	),
	(
		200008,
		200001,
		'Ford BB Recessed Top Piston',
		NULL,
		1
	),
	(
		200009,
		200001,
		'Chrysler SB Flat Top Piston',
		NULL,
		1
	),
	(200010, 200001, 'AMC Group 19 Piston', NULL, 2),
	(
		200011,
		200001,
		'Chevrolet W Z11 Domed Top (3.25)  Piston',
		NULL,
		4
	),
	(
		200012,
		200001,
		'Pontiac Ram Air IV Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200013,
		200001,
		'JE Pistons Domed Top Ford SB Piston',
		NULL,
		2
	),
	(200014, 200001, 'Ford 385 Boss Piston', NULL, 2),
	(
		200015,
		200001,
		'Chrysler BB Flat Top Piston',
		NULL,
		1
	),
	(
		200016,
		200001,
		'Buick BB Flat Top Piston',
		NULL,
		1
	),
	(
		200017,
		200001,
		'Buick SB Flat Top Piston',
		NULL,
		1
	),
	(
		200018,
		200001,
		'Cadillac BB Flat Top Piston',
		NULL,
		1
	),
	(
		200019,
		200001,
		'Ford Flathead Flat Top Piston',
		NULL,
		1
	),
	(
		200020,
		200001,
		'Olds BB Flat Top Piston',
		NULL,
		1
	),
	(
		200021,
		200001,
		'Olds SB Flat Top Piston',
		NULL,
		1
	),
	(200022, 200001, 'AMC Flat Top Piston', NULL, 1),
	(
		200023,
		200001,
		'Pontiac Flat Top Piston',
		NULL,
		1
	),
	(
		200024,
		200001,
		'Chevrolet SB Flat Top Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200025,
		200001,
		'Buick BB Stage I Piston',
		NULL,
		2
	),
	(
		200026,
		200001,
		'Buick BB Stage II Piston',
		NULL,
		2
	),
	(
		200027,
		200001,
		'Pontiac Flat Top Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200028,
		200001,
		'Ford BB Flat Top Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200029,
		200001,
		'Chrysler BB Flat Top Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200030,
		200001,
		'Chevrolet W Domed Top (0.75) Piston',
		NULL,
		2
	),
	(
		200031,
		200001,
		'JE Pistons Wedge Top Ford SB Piston',
		NULL,
		2
	),
	(
		200032,
		200001,
		'JE Pistons Wedge Top Chevrolet SB Piston',
		NULL,
		2
	),
	(
		200033,
		200001,
		'JE Pistons Wedge Top Chevrolet BB Piston',
		NULL,
		2
	),
	(
		200034,
		200001,
		'JE Pistons Wedge Top Buick BB Piston',
		NULL,
		2
	),
	(
		200035,
		200001,
		'JE Pistons Wedge Top Olds BB Piston',
		NULL,
		2
	),
	(
		200036,
		200001,
		'JE Pistons Domed Top Chevrolet SB Piston',
		NULL,
		2
	),
	(
		200037,
		200001,
		'JE Pistons Domed Top Chevrolet BB Piston',
		NULL,
		2
	),
	(
		200038,
		200001,
		'JE Pistons Wedge Top Chrysler BB Piston',
		NULL,
		2
	),
	(
		200039,
		200001,
		'JE Pistons Domed Top Chrysler BB Piston',
		NULL,
		2
	),
	(
		200040,
		200001,
		'JE Pistons Domed Top Buick BB Piston',
		NULL,
		2
	),
	(
		200041,
		200001,
		'JE Pistons Domed Top Olds BB Piston',
		NULL,
		2
	),
	(
		200042,
		200001,
		'Ford Y Domed Top Piston',
		NULL,
		2
	),
	(
		200043,
		200001,
		'Ford BB LR Domed (0.4) Piston',
		NULL,
		3
	),
	(
		200044,
		200001,
		'Ford BB Recessed (-0.1) Piston',
		NULL,
		1
	),
	(
		200045,
		200001,
		'Chrysler BB Wedge (0.1) Piston',
		NULL,
		2
	),
	(
		200046,
		200001,
		'Chevrolet BB Flat Top Forged Aluminum Piston',
		NULL,
		2
	),
	(
		200047,
		200001,
		'Chevrolet SB Z28 Recessed Top Piston',
		NULL,
		2
	),
	(
		200048,
		200001,
		'Chevrolet W Recessed (-0.75) Cast Al. Piston',
		NULL,
		1
	),
	(
		200049,
		200001,
		'Chevrolet W Domed Top (1.0) Piston',
		NULL,
		2
	),
	(
		200050,
		200001,
		'Chevrolet W Recessed (-0.25) FA Piston',
		NULL,
		1
	),
	(
		200051,
		200001,
		'Chevrolet BB Wedge Top FA Piston',
		NULL,
		3
	),
	(
		200052,
		200001,
		'Olds BB Wedge Top Piston',
		NULL,
		2
	),
	(
		200053,
		200001,
		'Chrysler Hemi Flat Top FA Piston',
		NULL,
		2
	),
	(
		200054,
		200001,
		'Ford SB Boss 302 FA Piston',
		NULL,
		2
	),
	(200055, 200001, 'Cadillac L-Head Piston', NULL, 1),
	(
		200056,
		200001,
		'Buick Nailhead Recessed (-0.5) Piston',
		NULL,
		1
	),
	(
		200057,
		200001,
		'Buick Nailhead Flat Top (0.0) Piston',
		NULL,
		1
	),
	(
		200058,
		200001,
		'Buick Nailhead Wedge Top (0.5) Piston',
		NULL,
		1
	),
	(
		200059,
		200001,
		'Buick Nailhead Domed Top (1.0) Piston',
		NULL,
		1
	),
	(
		200060,
		200001,
		'JE Pistons Chrysler SB FT FA Piston',
		NULL,
		1
	),
	(
		200061,
		200001,
		'Ford Cleveland Block Stock Piston',
		NULL,
		1
	),
	(
		200062,
		200001,
		'Ford Cleveland Block FT FA Piston',
		NULL,
		1
	),
	(
		200063,
		200001,
		'Ford 385 Block Stock Piston',
		NULL,
		1
	),
	(
		200064,
		200001,
		'Ford 385 Block CJ Piston',
		NULL,
		2
	),
	(200065, 200001, 'Ford Y Stock CA Piston', NULL, 1),
	(
		200066,
		200001,
		'Buick SB Wedge Top Piston',
		NULL,
		2
	),
	(
		200067,
		200001,
		'Cadillac L-Head FA Piston',
		NULL,
		1
	),
	(
		200068,
		200001,
		'Cadillac L-Head Wedge Top Piston',
		NULL,
		2
	),
	(
		200069,
		200001,
		'Cadillac BB Wedge Top Piston',
		NULL,
		2
	),
	(
		200070,
		200001,
		'Chrysler Hemi Wedge Top FA Piston',
		NULL,
		3
	),
	(
		200071,
		200001,
		'Chrysler Hemi Recessed Top FA Piston',
		NULL,
		3
	),
	(
		200072,
		200001,
		'Ford Flathead Wedge Top Piston',
		NULL,
		2
	),
	(
		200073,
		200001,
		'Ford Flathead Domed Top Piston',
		NULL,
		2
	),
	(
		200074,
		200001,
		'Oldsmobile SB Wedge Top Piston',
		NULL,
		2
	),
	(
		200075,
		200001,
		'Blinsky HiPo Adept Piston',
		NULL,
		4
	),
	(
		200076,
		200001,
		'Newcomb Y Block Wedge (.15)',
		NULL,
		1
	),
	(
		200077,
		200001,
		'Newcomb Y Block Wedge (.35)',
		NULL,
		2
	),
	(
		200078,
		200001,
		'Newcomb Y Block Wedge (.4)',
		NULL,
		2
	),
	(
		200079,
		200001,
		'Newcomb Y Block Wedge (.2)',
		NULL,
		1
	),
	(
		200080,
		200001,
		'Newcomb Y Block Wedge (.3)',
		NULL,
		2
	),
	(
		200081,
		200001,
		'Duro Rod Y Block Domed (.1)',
		NULL,
		1
	),
	(
		200082,
		200001,
		'Duro Rod Y Block Domed (.45)',
		NULL,
		2
	),
	(
		200083,
		200001,
		'Duro Rod Y Block Domed (.2)',
		NULL,
		1
	),
	(
		200084,
		200001,
		'Duro Rod Y Block Domed (.35)',
		NULL,
		2
	),
	(
		200085,
		200001,
		'Duro Rod Y Block Domed (.5)',
		NULL,
		2
	),
	(
		200086,
		200001,
		'C&B Chevy SB Domed (.1)',
		NULL,
		1
	),
	(
		200087,
		200001,
		'C&B Chevy SB Domed (.2)',
		NULL,
		1
	),
	(
		200088,
		200001,
		'C&B Chevy SB Domed (.3)',
		NULL,
		1
	),
	(
		200089,
		200001,
		'C&B Chevy SB Domed (.4)',
		NULL,
		2
	),
	(
		200090,
		200001,
		'C&B Chevy SB Domed (.5)',
		NULL,
		2
	),
	(
		200091,
		200001,
		'C&B Chevy SB Domed (.6)',
		NULL,
		2
	),
	(
		200092,
		200001,
		'C&B Chevy SB Domed (.75)',
		NULL,
		3
	),
	(200093, 200001, 'JE Chevy SB Domed (.3)', NULL, 2),
	(200094, 200001, 'JE Chevy SB Domed (.2)', NULL, 2),
	(
		200095,
		200001,
		'JE Chevy SB Wedge (.15)',
		NULL,
		2
	),
	(
		200096,
		200001,
		'JE Chevy SB Wedge (.35)',
		NULL,
		2
	),
	(200097, 200001, 'JE Ford SB Domed (.3)', NULL, 2),
	(200098, 200001, 'JE Ford SB Domed (.75)', NULL, 2),
	(200099, 200001, 'JE Ford SB Wedge (.5)', NULL, 2),
	(200100, 200001, 'JE Ford SB Wedge (.15)', NULL, 1),
	(
		200101,
		200001,
		'Duro Rod Ford SB Domed (.2)',
		NULL,
		1
	),
	(
		200102,
		200001,
		'Duro Rod Ford SB Domed (.35)',
		NULL,
		2
	),
	(
		200103,
		200001,
		'Duro Rod Ford SB Domed (.65)',
		NULL,
		2
	),
	(
		200104,
		200001,
		'Newcomb Ford SB Wedge (.3)',
		NULL,
		2
	),
	(
		200105,
		200001,
		'Newcomb Ford SB Wedge (.6)',
		NULL,
		2
	),
	(
		200106,
		200001,
		'Newcomb Ford SB Recessed (-.45)',
		NULL,
		2
	),
	(
		200107,
		200001,
		'Duro Rod Ford SB Recessed (-.15)',
		NULL,
		1
	),
	(
		200108,
		200001,
		'Newcomb Ford SB Recessed (-.25)',
		NULL,
		1
	),
	(200109, 200001, 'JE Ford SB Wedge (.4)', NULL, 2),
	(
		200110,
		200001,
		'Duro Rod Buick Nailhead Domed (.3)',
		NULL,
		2
	),
	(
		200111,
		200001,
		'Duro Rod Buick Nailhead Domed (.5)',
		NULL,
		2
	),
	(
		200112,
		200001,
		'Newcomb Buick Nailhead Domed (.25)',
		NULL,
		1
	),
	(
		200113,
		200001,
		'Duro Rod Buick Nailhead Wedge (.25)',
		NULL,
		1
	),
	(
		200114,
		200001,
		'Newcomb Buick Nailhead Wedge (.35)',
		NULL,
		2
	),
	(
		200115,
		200001,
		'Duro Rod Buick Nailhead Wedge (.15)',
		NULL,
		1
	),
	(
		200116,
		200001,
		'Newcomb Buick Nailhead Recessed (-.2)',
		NULL,
		1
	),
	(
		200117,
		200001,
		'Duro Rod Buick Nailhead Recessed (-.1)',
		NULL,
		1
	),
	(
		200118,
		200001,
		'Newcomb Buick Nailhead Recessed (-.25)',
		NULL,
		2
	),
	(
		200119,
		200001,
		'Duro Rod Buick Nailhead Recessed (-.35)',
		NULL,
		2
	),
	(
		200120,
		200001,
		'Duro Rod Buick Nailhead Flat Top',
		NULL,
		1
	),
	(
		200121,
		200001,
		'Newcomb Buick Nailhead Flat Top',
		NULL,
		2
	),
	(
		200122,
		200001,
		'Newcomb Chrysler SB Recessed (-.75)',
		NULL,
		2
	),
	(
		200123,
		200001,
		'Newcomb Chrysler SB Recessed (-.5)',
		NULL,
		2
	),
	(
		200124,
		200001,
		'Newcomb Chrysler SB Recessed (-.25)',
		NULL,
		1
	),
	(
		200125,
		200001,
		'Duro Rod Chrysler SB Recessed (-.6)',
		NULL,
		2
	),
	(
		200126,
		200001,
		'Duro Rod Chrysler SB Recessed (-.3)',
		NULL,
		1
	),
	(
		200127,
		200001,
		'Duro Rod Chrysler SB Wedge (.3)',
		NULL,
		1
	),
	(
		200128,
		200001,
		'Duro Rod Chrysler SB Wedge (.5)',
		NULL,
		2
	),
	(
		200129,
		200001,
		'Duro Rod Chrysler SB Wedge (.75)',
		NULL,
		2
	),
	(
		200130,
		200001,
		'Newcomb Chrysler SB Wedge (.25)',
		NULL,
		1
	),
	(
		200131,
		200001,
		'Newcomb Chrysler SB Wedge (1.0)',
		NULL,
		2
	),
	(
		200132,
		200001,
		'Newcomb Chrysler SB Flat Top Lightweight',
		NULL,
		2
	),
	(
		200133,
		200001,
		'JE Pistons Chrysler SB Domed (.25)',
		NULL,
		1
	),
	(
		200134,
		200001,
		'JE Pistons Chrysler SB Domed (.75)',
		NULL,
		2
	),
	(
		200135,
		200001,
		'JE Pistons Chrysler SB Domed (1.0)',
		NULL,
		3
	),
	(
		200136,
		200001,
		'JE Pistons Chrysler SB Domed (1.25)',
		NULL,
		4
	),
	(
		200137,
		200001,
		'Newcomb Pontiac Recessed (-.25)',
		NULL,
		1
	),
	(
		200138,
		200001,
		'Newcomb Pontiac Recessed (-.5)',
		NULL,
		2
	),
	(
		200139,
		200001,
		'Newcomb Pontiac Recessed (-.75)',
		NULL,
		2
	),
	(
		200140,
		200001,
		'Duro Rod Pontiac Recessed (-.3)',
		NULL,
		1
	),
	(
		200141,
		200001,
		'Duro Rod Pontiac Recessed (-.6)',
		NULL,
		2
	),
	(
		200142,
		200001,
		'Duro Rod Pontiac Wedge (.2)',
		NULL,
		1
	),
	(
		200143,
		200001,
		'Duro Rod Pontiac Wedge (.6)',
		NULL,
		2
	),
	(
		200144,
		200001,
		'Duro Rod Pontiac Wedge (.8)',
		NULL,
		3
	),
	(
		200145,
		200001,
		'Newcomb Pontiac Wedge (.4)',
		NULL,
		2
	),
	(
		200146,
		200001,
		'Newcomb Pontiac Wedge (1.0)',
		NULL,
		3
	),
	(
		200147,
		200001,
		'JE Pistons Pontiac Domed (.25)',
		NULL,
		1
	),
	(
		200148,
		200001,
		'JE Pistons Pontiac Domed (.5)',
		NULL,
		2
	),
	(
		200149,
		200001,
		'JE Pistons Pontiac Domed (.75)',
		NULL,
		2
	),
	(
		200150,
		200001,
		'JE Pistons Pontiac Domed (1.0)',
		NULL,
		3
	),
	(
		200151,
		200001,
		'JE Pistons Pontiac Domed (1.25)',
		NULL,
		4
	),
	(
		200152,
		200001,
		'JE Chevy BB Recessed (-.15)',
		NULL,
		1
	),
	(
		200153,
		200001,
		'JE Chevy BB Recessed (-.25)',
		NULL,
		1
	),
	(
		200154,
		200001,
		'JE Chevy BB Recessed (-.35)',
		NULL,
		2
	),
	(
		200155,
		200001,
		'JE Chevy BB Recessed (-.5)',
		NULL,
		2
	),
	(
		200156,
		200001,
		'JE Chevy BB Recessed (-.75)',
		NULL,
		3
	),
	(
		200157,
		200001,
		'JE Chevy BB Wedge (.35)',
		NULL,
		2
	),
	(200158, 200001, 'JE Chevy BB Wedge (.5)', NULL, 2),
	(
		200159,
		200001,
		'JE Chevy BB Wedge (.75)',
		NULL,
		2
	),
	(
		200160,
		200001,
		'JE Chevy BB Wedge (1.0)',
		NULL,
		3
	),
	(
		200161,
		200001,
		'JE Chevy BB Domed (.25)',
		NULL,
		1
	),
	(
		200162,
		200001,
		'JE Chevy BB Domed (.75)',
		NULL,
		2
	),
	(
		200163,
		200001,
		'JE Chevy BB Domed (1.0)',
		NULL,
		3
	),
	(
		200164,
		200001,
		'JE Chevy BB Domed (1.25)',
		NULL,
		4
	),
	(
		200165,
		200001,
		'Duro Rod Ford BB Recessed (-.3)',
		NULL,
		2
	),
	(
		200166,
		200001,
		'Duro Rod Ford BB Recessed (-.6)',
		NULL,
		2
	),
	(
		200167,
		200001,
		'Newcomb Ford BB Recessed (-.25)',
		NULL,
		1
	),
	(
		200168,
		200001,
		'Newcomb Ford BB Recessed (-.5)',
		NULL,
		2
	),
	(
		200169,
		200001,
		'Newcomb Ford BB Recessed (-.75)',
		NULL,
		2
	),
	(200170, 200001, 'JE Ford BB Wedge (.15)', NULL, 1),
	(200171, 200001, 'JE Ford BB Wedge (.25)', NULL, 2),
	(200172, 200001, 'JE Ford BB Wedge (.5)', NULL, 2),
	(200173, 200001, 'JE Ford BB Wedge (.75)', NULL, 2),
	(200174, 200001, 'JE Ford BB Wedge (1.0)', NULL, 3),
	(200175, 200001, 'JE Ford BB Domed (.25)', NULL, 2),
	(200176, 200001, 'JE Ford BB Domed (.75)', NULL, 2),
	(200177, 200001, 'JE Ford BB Domed (1.0)', NULL, 3),
	(
		200178,
		200001,
		'JE Ford BB Domed (1.25)',
		NULL,
		4
	),
	(
		200179,
		200001,
		'JE Chrysler BB Wedge (.15)',
		NULL,
		1
	),
	(
		200180,
		200001,
		'JE Chrysler BB Wedge (.5)',
		NULL,
		2
	),
	(
		200181,
		200001,
		'JE Chrysler BB Wedge (.75)',
		NULL,
		2
	),
	(
		200182,
		200001,
		'JE Chrysler BB Wedge (1.0)',
		NULL,
		3
	),
	(
		200183,
		200001,
		'JE Chrysler BB Domed (.25)',
		NULL,
		2
	),
	(
		200184,
		200001,
		'JE Chrysler BB Domed (.75)',
		NULL,
		2
	),
	(
		200185,
		200001,
		'JE Chrysler BB Domed (1.0)',
		NULL,
		3
	),
	(
		200186,
		200001,
		'JE Chrysler BB Domed (1.25)',
		NULL,
		4
	),
	(
		200187,
		200001,
		'Duro Rod Chrysler BB Recessed (-.3)',
		NULL,
		2
	),
	(
		200188,
		200001,
		'Duro Rod Chrysler BB Recessed (-.6)',
		NULL,
		2
	),
	(
		200189,
		200001,
		'Newcomb Chrysler BB Recessed (-.25)',
		NULL,
		2
	),
	(
		200190,
		200001,
		'Newcomb Chrysler BB Recessed (-.5)',
		NULL,
		2
	),
	(
		200191,
		200001,
		'Newcomb Chrysler BB Recessed (-.75)',
		NULL,
		2
	),
	(
		200192,
		200001,
		'Duro Rod Olds BB Recessed (-.3)',
		NULL,
		2
	),
	(
		200193,
		200001,
		'Duro Rod Olds BB Recessed (-.6)',
		NULL,
		2
	),
	(
		200194,
		200001,
		'Newcomb Olds BB Recessed (-.25)',
		NULL,
		2
	),
	(
		200195,
		200001,
		'Newcomb Olds BB Recessed (-.5)',
		NULL,
		2
	),
	(
		200196,
		200001,
		'Newcomb Olds BB Recessed (-.75)',
		NULL,
		2
	),
	(200197, 200001, 'JE Olds BB Wedge (.15)', NULL, 1),
	(200198, 200001, 'JE Olds BB Wedge (.5)', NULL, 2),
	(200199, 200001, 'JE Olds BB Wedge (.75)', NULL, 2),
	(200200, 200001, 'JE Olds BB Wedge (1.0)', NULL, 3),
	(200201, 200001, 'JE Olds BB Domed (.25)', NULL, 2),
	(200202, 200001, 'JE Olds BB Domed (.75)', NULL, 2),
	(200203, 200001, 'JE Olds BB Domed (1.0)', NULL, 3),
	(
		200204,
		200001,
		'JE Olds BB Domed (1.25)',
		NULL,
		4
	),
	(
		200205,
		200001,
		'Duro Rod AMC Recessed (-.3)',
		NULL,
		2
	),
	(
		200206,
		200001,
		'Duro Rod AMC Recessed (-.6)',
		NULL,
		2
	),
	(
		200207,
		200001,
		'Newcomb AMC Recessed (-.25)',
		NULL,
		2
	),
	(
		200208,
		200001,
		'Newcomb AMC Recessed (-.5)',
		NULL,
		2
	),
	(
		200209,
		200001,
		'Newcomb AMC Recessed (-.75)',
		NULL,
		2
	),
	(200210, 200001, 'JE AMC Wedge (.15)', NULL, 1),
	(200211, 200001, 'JE AMC Wedge (.25)', NULL, 2),
	(200212, 200001, 'JE AMC Wedge (.5)', NULL, 2),
	(200213, 200001, 'JE AMC Wedge (.75)', NULL, 2),
	(200214, 200001, 'JE AMC Wedge (1.0)', NULL, 3),
	(200215, 200001, 'JE AMC Domed (.25)', NULL, 2),
	(200216, 200001, 'JE AMC Domed (.5)', NULL, 2),
	(200217, 200001, 'JE AMC Domed (.75)', NULL, 2),
	(200218, 200001, 'JE AMC Domed (1.0)', NULL, 3),
	(200219, 200001, 'JE AMC Domed (1.25)', NULL, 4),
	(
		200220,
		200001,
		'Newcomb Chevy W Recessed (-.5)',
		NULL,
		2
	),
	(
		200221,
		200001,
		'Duro Rod Chevy W Recessed (-.3)',
		NULL,
		2
	),
	(
		200222,
		200001,
		'Duro Rod Chevy W Recessed (-.6)',
		NULL,
		2
	),
	(200223, 200001, 'JE Chevy W Wedge (.15)', NULL, 1),
	(200224, 200001, 'JE Chevy W Wedge (.25)', NULL, 2),
	(200225, 200001, 'JE Chevy W Wedge (.5)', NULL, 2),
	(200226, 200001, 'JE Chevy W Wedge (.75)', NULL, 2),
	(200227, 200001, 'JE Chevy W Wedge (1.0)', NULL, 3),
	(200228, 200001, 'JE Chevy W Domed (.25)', NULL, 2),
	(200229, 200001, 'JE Chevy W Domed (.5)', NULL, 2),
	(
		200230,
		200001,
		'JE Chevy W Domed (1.25)',
		NULL,
		4
	),
	(
		200231,
		200001,
		'Newcomb Cadillac BB Recessed (-.25)',
		NULL,
		2
	),
	(
		200232,
		200001,
		'Newcomb Cadillac BB Recessed (-.5)',
		NULL,
		2
	),
	(
		200233,
		200001,
		'Newcomb Cadillac BB Recessed (-.75)',
		NULL,
		2
	),
	(
		200234,
		200001,
		'Duro Rod Cadillac BB Recessed (-.3)',
		NULL,
		2
	),
	(
		200235,
		200001,
		'Duro Rod Cadillac BB Recessed (-.6)',
		NULL,
		2
	),
	(
		200236,
		200001,
		'JE Cadillac BB Domed (.25)',
		NULL,
		2
	),
	(
		200237,
		200001,
		'JE Cadillac BB Domed (.5)',
		NULL,
		2
	),
	(
		200238,
		200001,
		'JE Cadillac BB Domed (.75)',
		NULL,
		2
	),
	(
		200239,
		200001,
		'JE Cadillac BB Domed (1.0)',
		NULL,
		3
	),
	(
		200240,
		200001,
		'JE Cadillac BB Domed (1.25)',
		NULL,
		4
	),
	(
		200241,
		200001,
		'JE Cadillac BB Wedge (.15)',
		NULL,
		1
	),
	(
		200242,
		200001,
		'JE Cadillac BB Wedge (.25)',
		NULL,
		2
	),
	(
		200243,
		200001,
		'JE Cadillac BB Wedge (.5)',
		NULL,
		2
	),
	(
		200244,
		200001,
		'JE Cadillac BB Wedge (.75)',
		NULL,
		2
	),
	(
		200245,
		200001,
		'JE Cadillac BB Wedge (1.0)',
		NULL,
		3
	),
	(
		200246,
		200001,
		'Newcomb Hemi Recessed (-.25)',
		NULL,
		2
	),
	(
		200247,
		200001,
		'Newcomb Hemi Recessed (-.5)',
		NULL,
		2
	),
	(
		200248,
		200001,
		'Newcomb Hemi Recessed (-.75)',
		NULL,
		2
	),
	(
		200249,
		200001,
		'Duro Rod Hemi Recessed (-.3)',
		NULL,
		2
	),
	(
		200250,
		200001,
		'Duro Rod Hemi Recessed (-.6)',
		NULL,
		2
	),
	(200251, 200001, 'JE Hemi Domed (.25)', NULL, 2),
	(200252, 200001, 'JE Hemi Domed (.5)', NULL, 2),
	(200253, 200001, 'JE Hemi Domed (.75)', NULL, 2),
	(200254, 200001, 'JE Hemi Domed (1.0)', NULL, 3),
	(200255, 200001, 'JE Hemi Domed (1.25)', NULL, 4),
	(200256, 200001, 'JE Hemi Wedge (.15)', NULL, 1),
	(200257, 200001, 'JE Hemi Wedge (.25)', NULL, 2),
	(200258, 200001, 'JE Hemi Wedge (.5)', NULL, 2),
	(200259, 200001, 'JE Hemi Wedge (.75)', NULL, 2),
	(200260, 200001, 'JE Hemi Wedge (1.0)', NULL, 3),
	(
		200261,
		200001,
		'Newcomb Ford 385 Recessed (-.25)',
		NULL,
		2
	),
	(
		200262,
		200001,
		'Newcomb Ford 385 Recessed (-.5)',
		NULL,
		2
	),
	(
		200263,
		200001,
		'Newcomb Ford 385 Recessed (-.75)',
		NULL,
		2
	),
	(
		200264,
		200001,
		'Duro Rod Ford 385 Recessed (-.3)',
		NULL,
		2
	),
	(
		200265,
		200001,
		'Duro Rod Ford 385 Recessed (-.6)',
		NULL,
		2
	),
	(
		200266,
		200001,
		'JE Ford 385 Domed (.25)',
		NULL,
		2
	),
	(200267, 200001, 'JE Ford 385 Domed (.5)', NULL, 2),
	(
		200268,
		200001,
		'JE Ford 385 Domed (.75)',
		NULL,
		2
	),
	(
		200269,
		200001,
		'JE Ford 385 Domed (1.0)',
		NULL,
		3
	),
	(
		200270,
		200001,
		'JE Ford 385 Domed (1.25)',
		NULL,
		4
	),
	(
		200271,
		200001,
		'JE Ford 385 Wedge (.15)',
		NULL,
		1
	),
	(
		200272,
		200001,
		'JE Ford 385 Wedge (.25)',
		NULL,
		2
	),
	(200273, 200001, 'JE Ford 385 Wedge (.5)', NULL, 2),
	(
		200274,
		200001,
		'JE Ford 385 Wedge (.75)',
		NULL,
		2
	),
	(
		200275,
		200001,
		'JE Ford 385 Wedge (1.0)',
		NULL,
		3
	),
	(
		200276,
		200001,
		'Newcomb Cleveland Recessed (-.25)',
		NULL,
		2
	),
	(
		200277,
		200001,
		'Newcomb Cleveland Recessed (-.5)',
		NULL,
		2
	),
	(
		200278,
		200001,
		'Newcomb Cleveland Recessed (-.75)',
		NULL,
		2
	),
	(
		200279,
		200001,
		'Duro Rod Cleveland Recessed (-.3)',
		NULL,
		2
	),
	(
		200280,
		200001,
		'Duro Rod Cleveland Recessed (-.6)',
		NULL,
		2
	),
	(
		200281,
		200001,
		'JE Cleveland Domed (.25)',
		NULL,
		2
	),
	(
		200282,
		200001,
		'JE Cleveland Domed (.5)',
		NULL,
		2
	),
	(
		200283,
		200001,
		'JE Cleveland Domed (.75)',
		NULL,
		2
	),
	(
		200284,
		200001,
		'JE Cleveland Domed (1.0)',
		NULL,
		3
	),
	(
		200285,
		200001,
		'JE Cleveland Domed (1.25)',
		NULL,
		4
	),
	(
		200286,
		200001,
		'JE Cleveland Wedge (.15)',
		NULL,
		1
	),
	(
		200287,
		200001,
		'JE Cleveland Wedge (.25)',
		NULL,
		2
	),
	(
		200288,
		200001,
		'JE Cleveland Wedge (.5)',
		NULL,
		2
	),
	(
		200289,
		200001,
		'JE Cleveland Wedge (.75)',
		NULL,
		2
	),
	(
		200290,
		200001,
		'JE Cleveland Wedge (1.0)',
		NULL,
		3
	),
	(
		230001,
		230001,
		'Normal Duty Cooling System',
		NULL,
		1
	),
	(
		230002,
		230001,
		'Light Duty Cooling System',
		NULL,
		1
	),
	(
		230003,
		230001,
		'Heavy Duty Cooling System',
		NULL,
		3
	),
	(
		230004,
		230001,
		'Extra Heavy Duty Cooling System',
		NULL,
		4
	),
	(
		230005,
		230001,
		'Ford BB Boss XHD Cooling System',
		NULL,
		4
	),
	(
		230006,
		230001,
		'Edelbrock Victor Series Cooling System',
		NULL,
		2
	),
	(230007, 230001, 'Chevy SB Standard', NULL, 1),
	(230008, 230001, 'Chevy SB Heavy Duty', NULL, 2),
	(230009, 230001, 'Chevy W Standard', NULL, 1),
	(230010, 230001, 'Chevy W Heavy Duty', NULL, 2),
	(230011, 230001, 'Chevy BB Standard', NULL, 1),
	(230012, 230001, 'Chevy BB Heavy Duty', NULL, 2),
	(230013, 230001, 'Chrysler SB Standard', NULL, 1),
	(230014, 230001, 'Chrysler SB Heavy Duty', NULL, 2),
	(
		230015,
		230001,
		'Chrysler SB Performance',
		NULL,
		3
	),
	(230016, 230001, 'Chrysler BB Standard', NULL, 1),
	(230017, 230001, 'Chrysler BB Heavy Duty', NULL, 2),
	(
		230018,
		230001,
		'Chrysler BB Performance',
		NULL,
		3
	),
	(
		230019,
		230001,
		'Cadillac L-Head Standard',
		NULL,
		1
	),
	(230020, 230001, 'AMC Standard', NULL, 1),
	(230021, 230001, 'AMC Heavy Duty', NULL, 2),
	(230022, 230001, 'Cadillac BB Standard', NULL, 1),
	(230023, 230001, 'Cadillac BB Heavy Duty', NULL, 2),
	(230024, 230001, 'Pontiac Standard', NULL, 1),
	(230025, 230001, 'Pontiac Performance', NULL, 2),
	(230026, 230001, 'Olds BB Standard', NULL, 1),
	(230027, 230001, 'Olds BB Heavy Duty', NULL, 2),
	(
		230028,
		230001,
		'Buick Nailhead Standard',
		NULL,
		1
	),
	(
		230029,
		230001,
		'Buick Nailhead Heavy Duty',
		NULL,
		2
	),
	(230030, 230001, 'Ford Flathead Standard', NULL, 1),
	(230031, 230001, 'Ford Y Block Standard', NULL, 1),
	(
		230032,
		230001,
		'Ford Y Block Heavy Duty',
		NULL,
		2
	),
	(230033, 230001, 'Ford SB Standard', NULL, 1),
	(230034, 230001, 'Ford SB Heavy Duty', NULL, 2),
	(230035, 230001, 'Ford SB Boss', NULL, 3),
	(230036, 230001, 'Ford BB Standard', NULL, 1),
	(230037, 230001, 'Ford BB Heavy Duty', NULL, 2),
	(
		240001,
		240001,
		'Marinn Normal Duty Electrical System',
		NULL,
		1
	),
	(
		240002,
		240001,
		'Ford Boss Electronic Ignition',
		NULL,
		3
	),
	(
		240003,
		240001,
		'Mallory Light Duty Electrical System',
		NULL,
		1
	),
	(
		240004,
		240001,
		'AMC Group 19 Electrical System',
		NULL,
		2
	),
	(
		240005,
		240001,
		'Accel Billetproof Breakerless',
		NULL,
		2
	),
	(
		240006,
		240001,
		'Accel Blueprint Electronic Ignition',
		NULL,
		2
	),
	(
		240007,
		240001,
		'Crane Fireball XR700 Ignition System',
		NULL,
		3
	),
	(
		240008,
		240001,
		'Crane Fireball XR3000 Ignition System',
		NULL,
		4
	),
	(
		240009,
		240001,
		'Holley Avenger Ignition',
		NULL,
		3
	),
	(
		240010,
		240001,
		'Holley Dominator Ignition',
		NULL,
		3
	),
	(
		240011,
		240001,
		'Holley Excelerator Ignition',
		NULL,
		3
	),
	(
		240012,
		240001,
		'GM Standard Single Point',
		NULL,
		1
	),
	(
		240013,
		240001,
		'GM Performance Single Point',
		NULL,
		2
	),
	(240014, 240001, 'GM Standard Dual Point', NULL, 1),
	(
		240015,
		240001,
		'GM Performance Dual Point',
		NULL,
		2
	),
	(240016, 240001, 'GM Standard Electronic', NULL, 2),
	(
		240017,
		240001,
		'GM Performance Electronic',
		NULL,
		2
	),
	(
		240018,
		240001,
		'Chrysler Standard Single Point',
		NULL,
		1
	),
	(
		240019,
		240001,
		'Chrysler Performance Single Point',
		NULL,
		2
	),
	(
		240020,
		240001,
		'Chrysler Standard Dual Point',
		NULL,
		1
	),
	(
		240021,
		240001,
		'Chrysler Performance Dual Point',
		NULL,
		2
	),
	(
		240022,
		240001,
		'Chrysler Standard Electronic',
		NULL,
		2
	),
	(
		240023,
		240001,
		'Chrysler Performance Electronic',
		NULL,
		2
	),
	(
		240024,
		240001,
		'Ford Standard Single Point',
		NULL,
		1
	),
	(
		240025,
		240001,
		'Ford Performance Single Point',
		NULL,
		2
	),
	(
		240026,
		240001,
		'Ford Standard Dual Point',
		NULL,
		1
	),
	(
		240027,
		240001,
		'Ford Performance Dual Point',
		NULL,
		2
	),
	(
		240028,
		240001,
		'Ford Standard Electronic',
		NULL,
		2
	),
	(
		240029,
		240001,
		'Ford Performance Electronic',
		NULL,
		2
	),
	(
		240030,
		240001,
		'AMC Standard Single Point',
		NULL,
		1
	),
	(
		240031,
		240001,
		'AMC Performance Single Point',
		NULL,
		2
	),
	(
		240032,
		240001,
		'AMC Standard Dual Point',
		NULL,
		1
	),
	(
		240033,
		240001,
		'AMC Performance Dual Point',
		NULL,
		2
	),
	(
		250001,
		250001,
		'Ford SB Stock Lubrication System',
		NULL,
		1
	),
	(
		250002,
		250001,
		'Chevy BB Stock Lubrication System',
		NULL,
		1
	),
	(
		250003,
		250001,
		'AMC Stock Lubrication System',
		NULL,
		1
	),
	(
		250004,
		250001,
		'GM Z11 Lubrication System',
		NULL,
		3
	),
	(
		250005,
		250001,
		'Ford BB Boss Lubrication System',
		NULL,
		3
	),
	(
		250006,
		250001,
		'Bully HD Lubrication System',
		NULL,
		2
	),
	(
		250007,
		250001,
		'Bully XHD Lubrication System',
		NULL,
		3
	),
	(
		250008,
		250001,
		'Ford Cobra Lubrication System',
		NULL,
		3
	),
	(
		250009,
		250001,
		'Chevy SB Stock Lubrication System',
		NULL,
		1
	),
	(
		250010,
		250001,
		'Chevy SB Performance Lubrication System',
		NULL,
		2
	),
	(
		250011,
		250001,
		'Chevy BB Performance Lubrication System',
		NULL,
		2
	),
	(
		250012,
		250001,
		'Chrysler SB Stock Lubrication System',
		NULL,
		1
	),
	(
		250013,
		250001,
		'Chrysler BB Stock Lubrication System',
		NULL,
		1
	),
	(
		250014,
		250001,
		'Chrysler BB Performance Lubrication System',
		NULL,
		2
	),
	(
		250015,
		250001,
		'Cadillac BB Stock Lubrication System',
		NULL,
		1
	),
	(
		250016,
		250001,
		'Cadillac L-Head Stock Lubrication System',
		NULL,
		1
	),
	(
		250017,
		250001,
		'Pontiac Stock Lubrication System',
		NULL,
		1
	),
	(
		250018,
		250001,
		'Pontiac Performance Lubrication System',
		NULL,
		2
	),
	(
		250019,
		250001,
		'Olds BB Stock Lubrication System',
		NULL,
		1
	),
	(
		250020,
		250001,
		'Olds BB Performance Lubrication System',
		NULL,
		2
	),
	(
		250021,
		250001,
		'Buick Nailhead Stock Lubrication System',
		NULL,
		1
	),
	(
		250022,
		250001,
		'Ford Flathead Stock Lubrication System',
		NULL,
		1
	),
	(
		250023,
		250001,
		'Ford Y Block Stock Lubrication System',
		NULL,
		1
	),
	(
		250024,
		250001,
		'Ford SB Boss Lubrication System',
		NULL,
		3
	),
	(
		250025,
		250001,
		'Ford SB Windsor Stock Lubrication System',
		NULL,
		1
	),
	(
		250026,
		250001,
		'Ford Cleveland Stock Lubrication System',
		NULL,
		1
	),
	(
		250027,
		250001,
		'Ford BB Stock Lubrication System',
		NULL,
		1
	),
	(
		250028,
		250001,
		'Ford BB Performance Lubrication System',
		NULL,
		2
	),
	(
		250029,
		250001,
		'Ford 385 Stock Lubrication System',
		NULL,
		1
	),
	(
		250030,
		250001,
		'Ford 385 Performance Lubrication System',
		NULL,
		2
	),
	(
		280001,
		280001,
		'Ford BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280002,
		280001,
		'Chevrolet BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280003,
		280001,
		'Chrysler SB Stock Exhaust Manifold',
		NULL,
		1
	),
	(280004, 280001, 'Ford 385 Boss Dual EM', NULL, 2),
	(280005, 280001, 'Chevrolet BB HP EM', NULL, 2),
	(280006, 280001, 'Chevrolet W Z11 HP EM', NULL, 2),
	(
		280007,
		280001,
		'Hooker Street Rodder Chevrolet SB Headers',
		NULL,
		3
	),
	(
		280008,
		280001,
		'Ford BB Cobrajet Dual EM',
		NULL,
		2
	),
	(
		280009,
		280001,
		'Ford BB Tri-Y Steel Tube Headers',
		NULL,
		3
	),
	(
		280010,
		280001,
		'Chrysler BB Max Wedge Exhaust Manifold',
		NULL,
		2
	),
	(
		280011,
		280001,
		'AMC Rebel Machine Dual EM',
		NULL,
		2
	),
	(
		280012,
		280001,
		'Edelbrock TES Chevrolet BB Exhaust Headers',
		NULL,
		3
	),
	(
		280013,
		280001,
		'Buick BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280014,
		280001,
		'Buick SB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280015,
		280001,
		'Cadillac BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280016,
		280001,
		'Chevrolet SB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280017,
		280001,
		'Chrysler BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280018,
		280001,
		'Ford SB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280019,
		280001,
		'Ford Flathead Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280020,
		280001,
		'Olds BB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280021,
		280001,
		'Olds SB Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280022,
		280001,
		'AMC Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280023,
		280001,
		'Pontiac Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280024,
		280001,
		'Chevrolet SB Ram''s Horn EM',
		NULL,
		1
	),
	(280025, 280001, 'Buick BB Stage I EM', NULL, 2),
	(
		280026,
		280001,
		'Buick BB Mickey Thompson Headers',
		NULL,
		3
	),
	(280027, 280001, 'Olds BB Divider EM', NULL, 1),
	(280028, 280001, 'Pontiac Ram Air I EM', NULL, 2),
	(280029, 280001, 'Pontiac HP EM', NULL, 2),
	(280030, 280001, 'Ford Y 1957 Manifold', NULL, 1),
	(280031, 280001, 'Ford BB CJ/SCJ HP EM', NULL, 2),
	(280032, 280001, 'Ford 385 NASCAR EM', NULL, 3),
	(
		280033,
		280001,
		'Chrysler BB Max Wedge I Headers',
		NULL,
		3
	),
	(
		280034,
		280001,
		'Chrysler BB 440 Stock EM',
		NULL,
		1
	),
	(
		280035,
		280001,
		'Chrysler BB Tri-Y Max Wedge EM',
		NULL,
		2
	),
	(280036, 280001, 'Chrysler BB HP EM', NULL, 2),
	(
		280037,
		280001,
		'Chrysler SB Improved Flow EM',
		NULL,
		2
	),
	(
		280038,
		280001,
		'Chevrolet SB HP Exhaust Manifold',
		NULL,
		2
	),
	(280039, 280001, 'Pontiac Trophy EM', NULL, 2),
	(280040, 280001, 'Ford SB Boss 302 EM', NULL, 2),
	(
		280041,
		280001,
		'Chrysler Hemi Exhaust Manifold',
		NULL,
		2
	),
	(
		280042,
		280001,
		'Shade Tree Chrysler Hemi Exhaust Manifold',
		NULL,
		1
	),
	(
		280043,
		280001,
		'Cadillac L-Head Exhaust Manifold',
		NULL,
		1
	),
	(
		280044,
		280001,
		'Buick Nailhead Stock Exhaust Manifold',
		NULL,
		1
	),
	(
		280045,
		280001,
		'Ford Cleveland Block Stock EM',
		NULL,
		1
	),
	(
		280046,
		280001,
		'Ford 385 Block Stock EM',
		NULL,
		1
	),
	(
		280047,
		280001,
		'Ford 385 Block CJ/SCJ EM',
		NULL,
		2
	),
	(280048, 280001, 'Ford SB HP EM', NULL, 2),
	(280049, 280001, 'Ford Y Stock EM', NULL, 1),
	(280050, 280001, 'Chevrolet W Stock EM', NULL, 1),
	(280051, 280001, 'Chevrolet W HP EM', NULL, 2),
	(
		280052,
		280001,
		'Ford Cleveland Block HP EM',
		NULL,
		2
	),
	(
		280053,
		280001,
		'Buick Nailhead Performance EM',
		NULL,
		2
	),
	(
		280054,
		280001,
		'Cadillac L-Head Performance EM',
		NULL,
		2
	),
	(
		280055,
		280001,
		'Buick SB Performance EM',
		NULL,
		2
	),
	(280056, 280001, 'Buick SB Headers', NULL, 2),
	(
		280057,
		280001,
		'Cadillac Performance EM',
		NULL,
		2
	),
	(
		280058,
		280001,
		'Ford Flathead Performance EM',
		NULL,
		2
	),
	(280059, 280001, 'Olds SB Performance EM', NULL, 2),
	(
		280060,
		280001,
		'Edelbrock TES Pontiac Exhaust Headers',
		NULL,
		3
	),
	(
		280061,
		280001,
		'Edelbrock TES Chevrolet W Exhaust Headers',
		NULL,
		3
	),
	(
		280062,
		280001,
		'Edelbrock TES Ford 385 Exhaust Headers',
		NULL,
		3
	),
	(280063, 280001, 'AMC Small Tube Headers', NULL, 3),
	(
		280064,
		280001,
		'Buick Nailhead Small Tube Headers',
		NULL,
		3
	),
	(
		280065,
		280001,
		'Cadillac L-Head Small Tube Headers',
		NULL,
		3
	),
	(
		280066,
		280001,
		'Cadillac Small Tube Headers',
		NULL,
		3
	),
	(
		280067,
		280001,
		'Chevy SB Small Tube Headers',
		NULL,
		3
	),
	(
		280068,
		280001,
		'Chrysler SB Small Tube Headers',
		NULL,
		3
	),
	(
		280069,
		280001,
		'Ford Flathead Small Tube Headers',
		NULL,
		3
	),
	(
		280070,
		280001,
		'Ford SB Small Tube Headers',
		NULL,
		3
	),
	(
		280071,
		280001,
		'Ford Y Block Small Tube Headers',
		NULL,
		3
	),
	(
		280072,
		280001,
		'Ford Cleveland Block Small Tube Headers',
		NULL,
		3
	),
	(
		280073,
		280001,
		'Oldsmobile SB Small Tube Headers',
		NULL,
		3
	),
	(
		280074,
		280001,
		'Oldsmobile BB Small Tube Headers',
		NULL,
		3
	),
	(
		280075,
		280001,
		'Chrysler Hemi Small Tube Headers',
		NULL,
		3
	),
	(
		280076,
		280001,
		'Ford Y Block Factory Headers',
		NULL,
		2
	),
	(
		280077,
		280001,
		'Oldfield Y Block Free Flow EM',
		NULL,
		1
	),
	(
		280078,
		280001,
		'Oldfield Y Block Free Flow Aluminum EM',
		NULL,
		1
	),
	(
		280079,
		280001,
		'Oldfield Y Block Street King Headers',
		NULL,
		3
	),
	(
		280080,
		280001,
		'Oldfield Y Block Strip King Headers',
		NULL,
		3
	),
	(
		280081,
		280001,
		'Oldfield Y Block Track King Headers',
		NULL,
		3
	),
	(
		280082,
		280001,
		'Quaker Y Block Air Stream EM',
		NULL,
		1
	),
	(
		280083,
		280001,
		'Quaker Y Block Air Stream Aluminum EM',
		NULL,
		1
	),
	(
		280084,
		280001,
		'Quaker Y Block Super Stream Headers',
		NULL,
		3
	),
	(
		280085,
		280001,
		'Rad Rat Chevy SB Window Rattler Headers',
		NULL,
		3
	),
	(
		280086,
		280001,
		'Rad Rat Chevy SB Street Lion Headers',
		NULL,
		3
	),
	(
		280087,
		280001,
		'Rad Rat Chevy SB Rumble Pipe Headers',
		NULL,
		3
	),
	(
		280088,
		280001,
		'C&B Chevy SB Masterpiece EM',
		NULL,
		2
	),
	(
		280089,
		280001,
		'C&B Chevy SB Blueprint EM',
		NULL,
		1
	),
	(
		280090,
		280001,
		'C&B Chevy SB Beach Racer Headers',
		NULL,
		3
	),
	(
		280091,
		280001,
		'Rad Rat Chevy SB Street Mod EM',
		NULL,
		1
	),
	(
		280092,
		280001,
		'Quaker Ford SB Interceptor EM',
		NULL,
		2
	),
	(
		280093,
		280001,
		'Quaker Ford SB Super Stream Headers',
		NULL,
		3
	),
	(
		280094,
		280001,
		'Oldfield Ford SB Police Special EM',
		NULL,
		2
	),
	(
		280095,
		280001,
		'Dunbar Buick Nailhead Performance EM',
		NULL,
		2
	),
	(
		280096,
		280001,
		'Dunbar Buick Nailhead Lightweight EM',
		NULL,
		1
	),
	(
		280097,
		280001,
		'Dunbar Buick Nailhead Performance Headers',
		NULL,
		2
	),
	(
		280098,
		280001,
		'Dunbar Buick Nailhead Street Headers',
		NULL,
		2
	),
	(
		280099,
		280001,
		'Quaker Chrysler SB Airstream EM',
		NULL,
		1
	),
	(
		280100,
		280001,
		'Quaker Chrysler SB Double Demon HP EM',
		NULL,
		2
	),
	(
		280101,
		280001,
		'Quaker Chrysler SB Super Stream Headers',
		NULL,
		4
	),
	(
		280102,
		280001,
		'Walter Chrysler SB LA Street EM',
		NULL,
		2
	),
	(
		280103,
		280001,
		'Walter Chrysler SB Performance LA HP EM',
		NULL,
		2
	),
	(
		280104,
		280001,
		'Walter Chrysler SB LA Sm. Headers',
		NULL,
		3
	),
	(
		280105,
		280001,
		'Walter Chrysler SB Super LA Lg. Headers',
		NULL,
		4
	),
	(
		280106,
		280001,
		'Quaker Pontiac Airstream EM',
		NULL,
		1
	),
	(
		280107,
		280001,
		'Quaker Pontiac Aluminum Airstream EM',
		NULL,
		1
	),
	(
		280108,
		280001,
		'Quaker Pontiac Jet Stream Headers',
		NULL,
		3
	),
	(
		280109,
		280001,
		'Quaker Pontiac Super Stream Headers',
		NULL,
		4
	),
	(
		280110,
		280001,
		'Quaker Cleveland Air Stream EM',
		NULL,
		1
	),
	(
		280111,
		280001,
		'Quaker Cleveland Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280112,
		280001,
		'Quaker Cleveland Interceptor EM',
		NULL,
		2
	),
	(
		280113,
		280001,
		'Oldfield Cleveland Street King EM',
		NULL,
		2
	),
	(
		280114,
		280001,
		'Quaker Cleveland Super Stream Headers',
		NULL,
		4
	),
	(
		280115,
		280001,
		'Oldfield Cleveland Track King Headers',
		NULL,
		4
	),
	(
		280116,
		280001,
		'Oldfield Cleveland Strip King Headers',
		NULL,
		3
	),
	(
		280117,
		280001,
		'Oldfield Ford 385 Strip King Headers',
		NULL,
		3
	),
	(
		280118,
		280001,
		'Oldfield Ford 385 Track King Headers',
		NULL,
		4
	),
	(
		280119,
		280001,
		'Oldfield Ford 385 Street King EM',
		NULL,
		2
	),
	(
		280120,
		280001,
		'Quaker Ford 385 Air Stream EM',
		NULL,
		1
	),
	(
		280121,
		280001,
		'Quaker Ford 385 Interceptor EM',
		NULL,
		2
	),
	(
		280122,
		280001,
		'Quaker Ford 385 Jet Stream Headers',
		NULL,
		3
	),
	(
		280123,
		280001,
		'Quaker Ford 385 Super Stream Headers',
		NULL,
		4
	),
	(
		280124,
		280001,
		'Quaker Hemi Air Stream EM',
		NULL,
		1
	),
	(
		280125,
		280001,
		'Quaker Hemi Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280126,
		280001,
		'Quaker Hemi Super Stream Headers',
		NULL,
		4
	),
	(280127, 280001, 'Walter Hemi Street EM', NULL, 1),
	(
		280128,
		280001,
		'Walter Hemi Performance EM',
		NULL,
		2
	),
	(
		280129,
		280001,
		'Walter Hemi Hemi Headers',
		NULL,
		3
	),
	(
		280130,
		280001,
		'Walter Hemi Super Hemi Headers',
		NULL,
		4
	),
	(
		280131,
		280001,
		'Quaker Cadillac BB Air Stream EM',
		NULL,
		1
	),
	(
		280132,
		280001,
		'Quaker Cadillac BB Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280133,
		280001,
		'Quaker Cadillac BB Interceptor EM',
		NULL,
		2
	),
	(
		280134,
		280001,
		'Quaker Cadillac BB Super Stream Headers',
		NULL,
		4
	),
	(
		280135,
		280001,
		'Leland Cadillac BB Street Headers',
		NULL,
		3
	),
	(
		280136,
		280001,
		'Leland Cadillac BB Rad Cad Headers',
		NULL,
		4
	),
	(
		280137,
		280001,
		'Leland Cadillac BB HP EM',
		NULL,
		3
	),
	(
		280138,
		280001,
		'Rad Rat Chevy W Street Mod EM',
		NULL,
		2
	),
	(
		280139,
		280001,
		'Rad Rat Chevy W Rumble Pipe Headers',
		NULL,
		2
	),
	(
		280140,
		280001,
		'Rad Rat Chevy W Street Lion Headers',
		NULL,
		3
	),
	(
		280141,
		280001,
		'Rad Rat Chevy W Window Rattler Headers',
		NULL,
		4
	),
	(
		280142,
		280001,
		'Quaker Chevy W Air Stream EM',
		NULL,
		1
	),
	(
		280143,
		280001,
		'Quaker Chevy W Interceptor EM',
		NULL,
		2
	),
	(
		280144,
		280001,
		'Quaker Chevy W Jet Stream Headers',
		NULL,
		3
	),
	(
		280145,
		280001,
		'Quaker Chevy W Super Stream Headers',
		NULL,
		4
	),
	(
		280146,
		280001,
		'Quaker AMC Air Stream EM',
		NULL,
		1
	),
	(
		280147,
		280001,
		'Quaker AMC Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280148,
		280001,
		'Quaker AMC Interceptor EM',
		NULL,
		2
	),
	(
		280149,
		280001,
		'Quaker AMC Super Stream Headers',
		NULL,
		4
	),
	(
		280150,
		280001,
		'Street Shark AMC Stalker EM',
		NULL,
		2
	),
	(
		280151,
		280001,
		'Street Shark AMC Hunter Headers',
		NULL,
		3
	),
	(
		280152,
		280001,
		'Street Shark AMC Predator Headers',
		NULL,
		4
	),
	(
		280153,
		280001,
		'Quaker Olds BB Air Stream EM',
		NULL,
		1
	),
	(
		280154,
		280001,
		'Quaker Olds BB Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280155,
		280001,
		'Quaker Olds BB Interceptor EM',
		NULL,
		2
	),
	(
		280156,
		280001,
		'Quaker Olds BB Super Stream Headers',
		NULL,
		4
	),
	(
		280157,
		280001,
		'Street Shark Olds BB Stalker EM',
		NULL,
		2
	),
	(
		280158,
		280001,
		'Street Shark Olds BB Hunter Headers',
		NULL,
		3
	),
	(
		280159,
		280001,
		'Street Shark Olds BB Predator Headers',
		NULL,
		4
	),
	(
		280160,
		280001,
		'Quaker Chrysler BB Air Stream EM',
		NULL,
		1
	),
	(
		280161,
		280001,
		'Quaker Chrysler BB Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280162,
		280001,
		'Quaker Chrysler BB Interceptor EM',
		NULL,
		2
	),
	(
		280163,
		280001,
		'Quaker Chrysler BB Jet Stream Headers',
		NULL,
		3
	),
	(
		280164,
		280001,
		'Quaker Chrysler BB Super Stream Headers',
		NULL,
		4
	),
	(
		280165,
		280001,
		'Street Shark Chrysler BB Stalker EM',
		NULL,
		2
	),
	(
		280166,
		280001,
		'Street Shark Chrylser BB Hunter Headers',
		NULL,
		3
	),
	(
		280167,
		280001,
		'Street Shark Chrysler BB Predator Headers',
		NULL,
		4
	),
	(
		280168,
		280001,
		'Quaker Ford BB Air Stream EM',
		NULL,
		1
	),
	(
		280169,
		280001,
		'Quaker Ford BB Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280170,
		280001,
		'Quaker Ford BB Interceptor EM',
		NULL,
		2
	),
	(
		280171,
		280001,
		'Quaker Ford BB Jet Stream Headers',
		NULL,
		3
	),
	(
		280172,
		280001,
		'Quaker Ford BB Super Stream Headers',
		NULL,
		4
	),
	(
		280173,
		280001,
		'Oldfield Ford BB Street King EM',
		NULL,
		2
	),
	(
		280174,
		280001,
		'Oldfield Ford BB Strip King Headers',
		NULL,
		3
	),
	(
		280175,
		280001,
		'Oldfield Ford BB Track King Headers',
		NULL,
		4
	),
	(
		280176,
		280001,
		'Quaker Chevy BB Air Stream EM',
		NULL,
		1
	),
	(
		280177,
		280001,
		'Quaker Chevy BB Air Stream Alum. EM',
		NULL,
		1
	),
	(
		280178,
		280001,
		'Quaker Chevy BB Interceptor EM',
		NULL,
		2
	),
	(
		280179,
		280001,
		'Quaker Chevy BB Jet Stream Headers',
		NULL,
		3
	),
	(
		280180,
		280001,
		'Quaker Chevy BB Super Stream Headers',
		NULL,
		4
	),
	(
		280181,
		280001,
		'Rad Rat Chevy BB Street Mod EM',
		NULL,
		2
	),
	(
		280182,
		280001,
		'Rad Rat Chevy BB Rumble Pipe Headers',
		NULL,
		3
	),
	(
		280183,
		280001,
		'Rad Rat Chevy BB Street Lion Headers',
		NULL,
		3
	),
	(
		280184,
		280001,
		'Rad Rat Chevy BB Window Rattler Headers',
		NULL,
		4
	),
	(
		290001,
		290001,
		'1.625" Treated Iron Single Exhaust Pipe',
		NULL,
		1
	),
	(
		290002,
		290001,
		'1.625" Treated Iron Dual Exhaust Pipe',
		NULL,
		1
	),
	(
		290003,
		290001,
		'1.625" Cast Iron Single Exhaust Pipe',
		NULL,
		1
	),
	(
		290004,
		290001,
		'1.625" Cast Iron Dual Exhaust Pipe',
		NULL,
		1
	),
	(
		290005,
		290001,
		'Hooker Street Racer Crossflow Exhaust Pipe',
		NULL,
		3
	),
	(
		290006,
		290001,
		'Hooker Performance Crossflow Exhaust Pipe',
		NULL,
		3
	),
	(
		290007,
		290001,
		'Hooker Maximum Performance Crossflow Exhaust Pipe',
		NULL,
		4
	),
	(
		290008,
		290001,
		'Edelbrock Cat-Back System',
		NULL,
		3
	),
	(290009, 290001, 'Fat Shiny Pipe', NULL, 3),
	(290010, 290001, 'Manley 1.75" CI Single', NULL, 1),
	(
		290011,
		290001,
		'Manley 1.875" CI Single',
		NULL,
		1
	),
	(290012, 290001, 'Manley 2" CI Single', NULL, 2),
	(290013, 290001, 'Manley 2.25" CI Dual', NULL, 4),
	(290014, 290001, 'Manley 1.75" TI Single', NULL, 1),
	(
		290015,
		290001,
		'Manley 1.875" TI Single',
		NULL,
		1
	),
	(290016, 290001, 'Manley 2" TI Single', NULL, 2),
	(290017, 290001, 'Manley 2.25" TI Dual', NULL, 4),
	(290018, 290001, 'Manley 1.75" CI Dual', NULL, 2),
	(290019, 290001, 'Manley 1.875" CI Dual', NULL, 2),
	(290020, 290001, 'Manley 2" CI Dual', NULL, 3),
	(290021, 290001, 'Manley 1.75" TI Dual', NULL, 2),
	(290022, 290001, 'Manley 1.875" TI Dual', NULL, 2),
	(290023, 290001, 'Manley 2" TI Dual', NULL, 3),
	(290024, 290001, 'Manley 1.625" FS Dual', NULL, 2),
	(290025, 290001, 'Manley 1.75" FS Dual', NULL, 2),
	(290026, 290001, 'Manley 1.875" FS Dual', NULL, 2),
	(290027, 290001, 'Manley 2" FS Dual', NULL, 3),
	(290028, 290001, 'Manley 2.25" FS Dual', NULL, 4),
	(
		290029,
		290001,
		'Manley 1.625" Alloy Steel Dual',
		NULL,
		2
	),
	(
		290030,
		290001,
		'Manley 1.75" Alloy Steel Dual',
		NULL,
		2
	),
	(
		290031,
		290001,
		'Manley 1.875" Alloy Steel Dual',
		NULL,
		2
	),
	(
		290032,
		290001,
		'Manley 2" Alloy Steel Dual',
		NULL,
		3
	),
	(
		290033,
		290001,
		'Manley 2.25" Alloy Steel Dual',
		NULL,
		4
	),
	(
		290034,
		290001,
		'Manley 1.625" Aluminum Alloy Dual',
		NULL,
		2
	),
	(
		290035,
		290001,
		'Manley 1.75" Aluminum Alloy Dual',
		NULL,
		2
	),
	(
		290036,
		290001,
		'Manley 1.875" Aluminum Alloy Dual',
		NULL,
		2
	),
	(
		290037,
		290001,
		'Manley 2" Aluminum Alloy Dual',
		NULL,
		3
	),
	(
		290038,
		290001,
		'Manley 2.25" Aluminum Alloy Dual',
		NULL,
		4
	),
	(300001, 300001, 'Midas Stock Muffler', NULL, 1),
	(
		300002,
		300001,
		'Midas Aluminum Stock Muffler',
		NULL,
		1
	),
	(300003, 300001, 'GM Side Pipes', 'PIPESIDE', 2),
	(300004, 300001, 'GM Dual Resonators', NULL, 2),
	(300005, 300001, 'Edelbrock RPM Muffler', NULL, 3),
	(
		300006,
		300001,
		'Edelbrock Victor Muffler',
		NULL,
		3
	),
	(300007, 300001, 'Edelbrock 304 Muffler', NULL, 3),
	(300008, 300001, 'Hooker Maximum Flow', NULL, 4),
	(
		300009,
		300001,
		'Hooker Super Competition',
		NULL,
		4
	),
	(
		300010,
		300001,
		'Hooker Elite Glasspack',
		'PIPELAKE',
		4
	),
	(300011, 300001, 'Hooker Street Shaker', NULL, 3),
	(310001, 310001, 'Dual Tail Pipe Tip 001', NULL, 1),
	(310002, 310001, 'Dual Tail Pipe Tip 002', NULL, 1),
	(310003, 310001, 'Stock Tip', 'TIPCYL', 1),
	(
		310004,
		310001,
		'Single Tail Pipe Tip (Flaming)',
		NULL,
		1
	),
	(
		310005,
		310001,
		'1969 Dodge Charger RT Tip',
		'TIPCIRC',
		1
	),
	(
		310006,
		310001,
		'1969 Olds 4-4-2 Trumpet Tip',
		NULL,
		1
	),
	(
		310007,
		310001,
		'1970 Ford Mustang Oval Trumpet Tip',
		NULL,
		1
	),
	(
		310008,
		310001,
		'1970 Plymouth ''Cuda Chrome Tip',
		'TIPCONE',
		1
	),
	(
		310009,
		310001,
		'1973 Pontiac Trans-Am Chrome Extension',
		NULL,
		1
	),
	(
		310010,
		310001,
		'1973 Pontiac Firebird Chrome Extension',
		NULL,
		1
	),
	(
		310011,
		310001,
		'Marinn Large Bore Tip',
		'tipcirc',
		1
	),
	(
		310012,
		310001,
		'Marinn Large Bore (Dual) Tip',
		'tipcirc',
		1
	),
	(
		310013,
		310001,
		'Marinn Large Bore Tip w/resonator',
		'tipcirc',
		1
	),
	(
		310014,
		310001,
		'Marinn Large Bore Tip w/resonator (Dual)',
		'tipcirc',
		1
	),
	(
		310015,
		310001,
		'Marinn MegaCone Tip',
		'tipcone',
		1
	),
	(
		310016,
		310001,
		'Marinn MegaCone (Dual) Tip',
		'tipcone',
		1
	),
	(
		310017,
		310001,
		'Marinn Slanted Cut Tip',
		'tiprect',
		1
	),
	(
		310018,
		310001,
		'Marinn Slanted Cut (Dual) Tip',
		'tiprect',
		1
	),
	(
		310019,
		310001,
		'Marinn Slanted Cut Tip w/resonator',
		'tiprect',
		1
	),
	(
		310020,
		310001,
		'Marinn Slanted Cut Tip w/resonator (Dual)',
		'tiprect',
		1
	),
	(
		310021,
		310001,
		'Edelbrock Angle Cut Tip',
		NULL,
		1
	),
	(
		310022,
		310001,
		'Edelbrock Angle Cut (Dual) Tip',
		NULL,
		1
	),
	(
		310023,
		310001,
		'Edelbrock Flat Oval Tip',
		NULL,
		1
	),
	(
		310024,
		310001,
		'Edelbrock Flat Oval (Dual) Tip',
		NULL,
		1
	),
	(
		310025,
		310001,
		'Edelbrock Round Double Wall Tip',
		NULL,
		1
	),
	(
		310026,
		310001,
		'Edelbrock Round Double Wall (Dual) Tip',
		NULL,
		1
	),
	(
		310027,
		310001,
		'Edelbrock Round Turn-Down Tip',
		NULL,
		1
	),
	(
		310028,
		310001,
		'Edelbrock Round Turn-Down (Dual) Tip',
		NULL,
		1
	),
	(
		310029,
		310001,
		'Stock Round Chrome',
		'TIPCIRC',
		1
	),
	(
		320001,
		320001,
		'Ford BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320002,
		320001,
		'Chevrolet BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320003,
		320001,
		'Chrysler SB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320004,
		320001,
		'Chrysler BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320005,
		320001,
		'Chevrolet BB Single Plane IM',
		'MANISING',
		1
	),
	(
		320006,
		320001,
		'Ford BB Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320007,
		320001,
		'Buick BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320008,
		320001,
		'Buick SB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320009,
		320001,
		'Chevrolet SB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320010,
		320001,
		'Cadillac BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320011,
		320001,
		'Ford SB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320012,
		320001,
		'Ford Flathead Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320013,
		320001,
		'Olds BB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320014,
		320001,
		'Olds SB Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320015,
		320001,
		'AMC Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320016,
		320001,
		'Pontiac Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320017,
		320001,
		'Chevrolet SB RPO411 Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320018,
		320001,
		'Chevrolet SB High Rise Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320019,
		320001,
		'Chevrolet SB Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320020,
		320001,
		'Chevrolet BB High Rise Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320021,
		320001,
		'Chevrolet BB LS6 Low Rise Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320022,
		320001,
		'Buick Nailhead Stock 322 DP IM',
		'MANIDUAL',
		1
	),
	(
		320023,
		320001,
		'Edelbrock Stage II Buick BB Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320024,
		320001,
		'Olds SB Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320025,
		320001,
		'Olds SB W-31 HP Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320026,
		320001,
		'Olds BB W-30 HP Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320027,
		320001,
		'Pontiac Ram Air IV HP Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320028,
		320001,
		'Pontiac Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320029,
		320001,
		'Ford Y 1957 Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320030,
		320001,
		'Edelbrock Aluminum Dual Plane Ford SB IM',
		'MANIDUAL',
		2
	),
	(
		320031,
		320001,
		'Ford BB HR Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320032,
		320001,
		'Ford BB Cammer IM',
		'MANISING',
		3
	),
	(
		320033,
		320001,
		'Ford BB Sidewinder Single Plane IM',
		'MANIDUAL',
		2
	),
	(
		320034,
		320001,
		'Ford BB Single Plane IM',
		'MANIDUAL',
		2
	),
	(
		320035,
		320001,
		'Offenhauser Ford 385 Single Plane IM',
		'MANIDUAL',
		3
	),
	(
		320036,
		320001,
		'Chrysler BB High Rise IM',
		'MANIDUAL',
		2
	),
	(
		320037,
		320001,
		'Chrysler BB Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320038,
		320001,
		'Chrysler BB Long Ram IM',
		'MANIDUAL',
		2
	),
	(
		320039,
		320001,
		'Chrysler BB Short Ram IM',
		'MANIDUAL',
		2
	),
	(
		320040,
		320001,
		'Edelbrock Chrysler BB Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320041,
		320001,
		'Chrysler SB Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320042,
		320001,
		'AMC Rebel Machine IM',
		'MANIDUAL',
		2
	),
	(
		320043,
		320001,
		'Ford 385 Boss Dual Plane Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320044,
		320001,
		'Edelbrock R4B AMC Block IM',
		'MANIDUAL',
		2
	),
	(
		320045,
		320001,
		'Edelbrock Super Dual Ford Flathead IM',
		'MANIDUAL',
		2
	),
	(
		320046,
		320001,
		'Edelbrock Performer RPM Cadillac BB IM',
		'MANIDUAL',
		2
	),
	(
		320047,
		320001,
		'Edelbrock Performer Chevrolet BB IM',
		'MANIDUAL',
		2
	),
	(
		320048,
		320001,
		'Edelbrock Performer Chevrolet SB IM',
		'MANIDUAL',
		2
	),
	(
		320049,
		320001,
		'Edelbrock Performer Chrysler BB IM',
		'MANIDUAL',
		2
	),
	(
		320050,
		320001,
		'Edelbrock Performer Chrysler SB IM',
		'MANIDUAL',
		2
	),
	(
		320051,
		320001,
		'Edelbrock Performer Ford BB IM',
		'MANIDUAL',
		2
	),
	(
		320052,
		320001,
		'Edelbrock Performer Ford SB IM',
		'MANIDUAL',
		2
	),
	(
		320053,
		320001,
		'Edelbrock Performer Olds BB IM',
		'MANIDUAL',
		2
	),
	(
		320054,
		320001,
		'Edelbrock Performer Olds SB IM',
		'MANIDUAL',
		2
	),
	(320055, 320001, 'Chrysler Hemi IM', 'MANIDUAL', 2),
	(
		320056,
		320001,
		'Edelbrock Performer Pontiac IM',
		'MANIDUAL',
		2
	),
	(
		320057,
		320001,
		'Edelbrock Performer RPM Chevrolet BB IM',
		'MANIDUAL',
		2
	),
	(
		320058,
		320001,
		'Edelbrock Performer RPM Chevrolet SB IM',
		'MANIDUAL',
		2
	),
	(
		320059,
		320001,
		'Edelbrock Performer RPM Chrysler BB IM',
		'MANIDUAL',
		2
	),
	(
		320060,
		320001,
		'Edelbrock Performer RPM Chrysler SB IM',
		'MANIDUAL',
		2
	),
	(
		320061,
		320001,
		'Edelbrock Performer RPM Ford BB IM',
		'MANIDUAL',
		2
	),
	(
		320062,
		320001,
		'Edelbrock Performer RPM Ford SB IM',
		'MANIDUAL',
		2
	),
	(
		320063,
		320001,
		'Edelbrock Performer RPM Olds BB IM',
		'MANIDUAL',
		2
	),
	(
		320064,
		320001,
		'Edelbrock Performer RPM Olds SB IM',
		'MANIDUAL',
		2
	),
	(
		320065,
		320001,
		'Shade Tree Chrysler Hemi IM',
		'MANIDUAL',
		1
	),
	(
		320066,
		320001,
		'Edelbrock Performer RPM Pontiac IM',
		'MANIDUAL',
		2
	),
	(
		320067,
		320001,
		'Edelbrock Torker Chevrolet BB IM',
		'MANIDUAL',
		3
	),
	(
		320068,
		320001,
		'Edelbrock Torker Chevrolet SB IM',
		'MANIDUAL',
		3
	),
	(
		320069,
		320001,
		'Edelbrock Torker Chrysler BB IM',
		'MANIDUAL',
		3
	),
	(
		320070,
		320001,
		'Edelbrock Torker Chrysler SB IM',
		'MANIDUAL',
		3
	),
	(
		320071,
		320001,
		'Edelbrock Torker Ford BB IM',
		'MANIDUAL',
		3
	),
	(
		320072,
		320001,
		'Edelbrock Torker Ford SB IM',
		'MANIDUAL',
		3
	),
	(
		320073,
		320001,
		'Edelbrock Torker Olds BB IM',
		'MANIDUAL',
		3
	),
	(
		320074,
		320001,
		'Edelbrock Torker Olds SB IM',
		'MANIDUAL',
		3
	),
	(
		320075,
		320001,
		'Edelbrock Torker Pontiac IM',
		'MANIDUAL',
		3
	),
	(
		320076,
		320001,
		'Edelbrock Torker Pontiac IM',
		'MANIDUAL',
		3
	),
	(
		320077,
		320001,
		'Chevrolet BB Dual Plane Aluminum IM',
		'MANIDUAL',
		1
	),
	(
		320078,
		320001,
		'Chrysler SB Tunnel Ram IM',
		'MANIDUAL',
		2
	),
	(
		320079,
		320001,
		'Chevrolet W Z11 Dual Plane Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320080,
		320001,
		'Ford BB Cobrajet Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320081,
		320001,
		'Offenhauser Magnesium Chrysler Hemi DP IM',
		'MANIDUAL',
		4
	),
	(
		320082,
		320001,
		'Chrysler BB Max Wedge Aluminum Cross-Ram IM',
		'MANIDUAL',
		2
	),
	(
		320083,
		320001,
		'Edelbrock Torker Buick BB IM',
		'MANISING',
		3
	),
	(
		320084,
		320001,
		'Edelbrock Performer RPM Buick BB IM',
		'MANIDUAL',
		3
	),
	(
		320085,
		320001,
		'Edelbrock Torker II Buick BB IM',
		'MANISING',
		3
	),
	(
		320086,
		320001,
		'Edelbrock Performer Buick BB IM',
		'MANIDUAL',
		2
	),
	(
		320087,
		320001,
		'Ford SB Single Plane Aluminum IM',
		'MANISING',
		2
	),
	(
		320088,
		320001,
		'Ford SB Dual Plane Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320089,
		320001,
		'Pontiac Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320090,
		320001,
		'Pontiac SD Aluminum Single Plane IM',
		'MANISING',
		3
	),
	(
		320091,
		320001,
		'Cadillac L-Head Intake Manifold',
		'MANIDUAL',
		1
	),
	(
		320092,
		320001,
		'Ford Cleveland Block Stock IM',
		'MANIDUAL',
		1
	),
	(
		320093,
		320001,
		'Ford Cleveland Block Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320094,
		320001,
		'Ford 385 Stock IM',
		'MANIDUAL',
		1
	),
	(
		320095,
		320001,
		'Ford 385 CJ/SCJ IM',
		'MANIDUAL',
		2
	),
	(
		320096,
		320001,
		'Ford SB Cross Boss IM',
		'MANIDUAL',
		3
	),
	(320097, 320001, 'Ford Y Stock IM', 'MANIDUAL', 1),
	(
		320098,
		320001,
		'Edelbrock Ford Y Tri-Power Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320099,
		320001,
		'Chevrolet W Stock IM',
		'MANIDUAL',
		1
	),
	(
		320100,
		320001,
		'Chevrolet W Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320101,
		320001,
		'Dunbar Buick Nailhead Breezer DP IM',
		'MANIDUAL',
		2
	),
	(
		320102,
		320001,
		'Dunbar Buick Nailhead Tornado SP IM',
		'MANISING',
		2
	),
	(
		320103,
		320001,
		'Buick SB Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320104,
		320001,
		'Cadillac L-Head Aluminum IM',
		'MANIDUAL',
		2
	),
	(
		320105,
		320001,
		'Edelbrock Performer AMC IM',
		'MANIDUAL',
		2
	),
	(
		320106,
		320001,
		'Edelbrock Torker AMC IM',
		'MANIDUAL',
		3
	),
	(
		320107,
		320001,
		'Offenhauser Aluminum AMC IM',
		'MANIDUAL',
		3
	),
	(
		320108,
		320001,
		'Ford Y Block Dual Quad Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320109,
		320001,
		'Ford Y Block Supercharger Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320110,
		320001,
		'Edelbrock Y Block 3x2 Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320111,
		320001,
		'Offenhauser Y Block 3x2 Dual Planer IM',
		'MANIDUAL',
		2
	),
	(
		320112,
		320001,
		'Offenhauser Y Block Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320113,
		320001,
		'Edelbrock Y Block Aluminum Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320114,
		320001,
		'Oldfield Y Block Aluminum Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320115,
		320001,
		'Oldfield Y Block Special Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320116,
		320001,
		'Edelbrock Y Block Aluminum Single Plane IM',
		'MANISING',
		2
	),
	(
		320117,
		320001,
		'Offenhauser Y Block Aluminum Single Plane IM',
		'MANISING',
		2
	),
	(
		320118,
		320001,
		'Oldfield Y Block Lightning Single Plane IM',
		'MANISING',
		2
	),
	(
		320119,
		320001,
		'Oldfield Y Block HiBoy Tunnel Ram IM',
		'MANIHIGH',
		2
	),
	(
		320120,
		320001,
		'Oldfield Y Block Midget Tunnel Ram IM',
		'MANILOW',
		2
	),
	(
		320121,
		320001,
		'Oldfield Y Block Strip King Tunnel Ram IM',
		'MANIHIGH',
		3
	),
	(
		320122,
		320001,
		'Rad Rat Chevy SB Vortex Single Plane IM',
		'MANISING',
		2
	),
	(
		320123,
		320001,
		'Rad Rat Chevy SB Screamer Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320124,
		320001,
		'Rad Rat Chevy SB Scooter Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320125,
		320001,
		'Rad Rat Chevy SB Scooter Alum. Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320126,
		320001,
		'C&B Chevy SB Classic Dual Plane IM',
		'MANIDUAL',
		1
	),
	(
		320127,
		320001,
		'C&B Chevy SB Street Classic Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320128,
		320001,
		'C&B Chevy SB Classic Single Plane IM',
		'MANISING',
		2
	),
	(
		320129,
		320001,
		'C&B Chevy SB Super Single Plane IM',
		'MANISING',
		3
	),
	(
		320130,
		320001,
		'Rad Rat Chevy SB Vortex Ultra Single Plane IM',
		'MANISING',
		2
	),
	(
		320131,
		320001,
		'Rad Rat Chevy SB Power Tower Tunnel Ram IM',
		'MANIHIGH',
		2
	),
	(
		320132,
		320001,
		'Rad Rat Chevy SB Ultimate Tunnel Ram IM',
		'MANIHIGH',
		3
	),
	(
		320133,
		320001,
		'C&B Chevy SB Classic Low Rise Tunnel Ram IM',
		'MANILOW',
		2
	),
	(
		320134,
		320001,
		'C&B Chevy SB Classic High Rise Tunnel Ram IM',
		'MANIHIGH',
		3
	),
	(
		320135,
		320001,
		'Rad Rat Chevy SB Screamer Ultra Dual Plane IM',
		'MANIDUAL',
		2
	),
	(
		320136,
		320001,
		'Buick Nailhead 364 DP IM',
		'MANIDUAL',
		1
	),
	(
		320137,
		320001,
		'Buick Nailhead 401/425 DP IM',
		'MANIDUAL',
		1
	),
	(
		320138,
		320001,
		'Dunbar Buick Nailhead Improved DP IM',
		'MANIDUAL',
		1
	),
	(
		320139,
		320001,
		'Dunbar Buick Nailhead Breezer DP IM',
		'MANIDUAL',
		1
	),
	(
		320140,
		320001,
		'Per. Port Buick Nailhead Street Port DP IM',
		'MANIDUAL',
		2
	),
	(
		320141,
		320001,
		'Per. Port Buick Nailhead Street Port Alum. DP IM',
		'MANIDUAL',
		2
	),
	(
		320142,
		320001,
		'Dunbar Buick Nailhead Tornado SP IM',
		'MANISING',
		2
	),
	(
		320143,
		320001,
		'Per. Port Buick Nailhead Street Port SP IM',
		'MANISING',
		2
	),
	(
		320144,
		320001,
		'Dunbar Buick Nailhead Wind Tunnel SP IM',
		'MANISING',
		2
	),
	(
		320145,
		320001,
		'Dunbar Buick Nailhead Hurricane Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320146,
		320001,
		'Dunbar Buick Nailhead Cyclone Tunnel Ram',
		'MANILOW',
		2
	),
	(
		320147,
		320001,
		'Dunbar Buick Nailhead Super Cyclone Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320148,
		320001,
		'Oldfield Ford SB Performance DP IM',
		'MANIDUAL',
		2
	),
	(
		320149,
		320001,
		'Oldfield Ford SB Performance Alum. DP IM',
		'MANIDUAL',
		2
	),
	(
		320150,
		320001,
		'Per. Port Ford SB Road Squire DP IM',
		'MANIDUAL',
		1
	),
	(
		320151,
		320001,
		'Per. Port Ford SB Road Squire Alum. DP IM',
		'MANIDUAL',
		1
	),
	(
		320152,
		320001,
		'Per. Port Ford SB Centurion DP IM',
		'MANIDUAL',
		2
	),
	(
		320153,
		320001,
		'Per. Port Ford SB Street Knight SP IM',
		'MANISING',
		2
	),
	(
		320154,
		320001,
		'Oldfield Ford SB Lightning SP IM',
		'MANISING',
		2
	),
	(
		320155,
		320001,
		'Per. Port Ford SB Commander SP IM',
		'MANISING',
		2
	),
	(
		320156,
		320001,
		'Per. Port Ford SB Emperor Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320157,
		320001,
		'Oldfield Ford SB Midget Tunnel Ram',
		'MANILOW',
		2
	),
	(
		320158,
		320001,
		'Oldfield Ford SB Strip King Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320159,
		320001,
		'Per. Port Ford SB Street Lord Tunnel Ram',
		'MANILOW',
		2
	),
	(
		320160,
		320001,
		'Walter Chrysler SB Street DP IM',
		'MANIDUAL',
		1
	),
	(
		320161,
		320001,
		'Walter Chrysler SB Stocker DP IM',
		'MANIDUAL',
		2
	),
	(
		320162,
		320001,
		'Walter Chrysler SB Street SP IM',
		'MANISING',
		2
	),
	(
		320163,
		320001,
		'Walter Chrysler SB Stocker SP IM',
		'MANISING',
		3
	),
	(
		320164,
		320001,
		'Walter Chyrsler SB Super Stocker SP IM',
		'MANISING',
		4
	),
	(
		320165,
		320001,
		'Walter Chrysler SB Intimidator Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320166,
		320001,
		'Walter Chrysler SB Bighorn Tunnel Ram',
		'MANIHIGH',
		2
	),
	(
		320167,
		320001,
		'Perfect Port Chrysler SB Centurion DP IM',
		'MANIDUAL',
		1
	),
	(
		320168,
		320001,
		'Perfect Port Chrysler SB Commander SP IM',
		'MANISING',
		2
	),
	(
		320169,
		320001,
		'Per. Port Pontiac Emperor Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320170,
		320001,
		'Per. Port Pontiac Street Lord Tunnel Ram',
		'MANILOW',
		2
	),
	(
		320171,
		320001,
		'Per. Port Pontiac Crusader Tunnel Ram',
		'MANIHIGH',
		2
	),
	(
		320172,
		320001,
		'Per. Port Pontiac Track Assassin SP IM',
		'MANISING',
		3
	),
	(
		320173,
		320001,
		'Per. Port Pontiac Street Knight SP IM',
		'MANISING',
		2
	),
	(
		320174,
		320001,
		'Per. Port Pontiac Super Centurion DP IM',
		'MANIDUAL',
		3
	),
	(
		320175,
		320001,
		'Rad Rat Chevy BB Screamer Ultra Light DP',
		'MANIDUAL',
		3
	),
	(
		320176,
		320001,
		'Rad Rat Chevy BB Vortex SP IM',
		'MANISING',
		2
	),
	(
		320177,
		320001,
		'Rad Rat Chevy BB Vortex Ultra Light SP IM',
		'MANISING',
		3
	),
	(
		320178,
		320001,
		'Rad Rat Chevy BB Power Tower Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320179,
		320001,
		'Rad Rat Chevy BB Ultimate Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320180,
		320001,
		'Oldfield Ford BB Strip King DP IM',
		'MANIDUAL',
		2
	),
	(
		320181,
		320001,
		'Oldfield Ford BB Street King DP IM',
		'MANIDUAL',
		2
	),
	(
		320182,
		320001,
		'Oldfield Ford BB Strip King SP IM',
		'MANISING',
		2
	),
	(
		320183,
		320001,
		'Oldfield Ford BB Midget Tunnel Ram',
		'MANILOW',
		2
	),
	(
		320184,
		320001,
		'Oldfield Ford BB Hiboy Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320185,
		320001,
		'Oldfield Ford BB Strip King Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320186,
		320001,
		'Walter Chrysler BB Bighorn Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320187,
		320001,
		'Walter Chrysler BB Intimidator Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320188,
		320001,
		'Walter Chrysler BB Super Stocker DP IM',
		'MANIDUAL',
		4
	),
	(
		320189,
		320001,
		'Walter Chrysler BB Super Stocker SP IM',
		'MANISING',
		4
	),
	(
		320190,
		320001,
		'Walter Chrysler BB Stocker SP IM',
		'MANISING',
		3
	),
	(
		320191,
		320001,
		'Walter Chrysler BB Stocker DP IM',
		'MANIDUAL',
		3
	),
	(
		320192,
		320001,
		'Walter Chrysler BB Street DP IM',
		'MANIDUAL',
		2
	),
	(
		320193,
		320001,
		'Walter Chrylser BB Street SP IM',
		'MANIDUAL',
		2
	),
	(
		320194,
		320001,
		'Perf. Port Olds BB Road Squire DP IM',
		'MANIDUAL',
		1
	),
	(
		320195,
		320001,
		'Perf. Port Olds BB Street Port DP IM',
		'MANIDUAL',
		2
	),
	(
		320196,
		320001,
		'Perf. Port Olds BB Usurper DP IM',
		'MANIDUAL',
		4
	),
	(
		320197,
		320001,
		'Perf. Port Olds BB Centurion SP IM',
		'MANISING',
		2
	),
	(
		320198,
		320001,
		'Perf. Port Olds BB Commander SP IM',
		'MANISING',
		3
	),
	(
		320199,
		320001,
		'Perf. Port Olds BB Track Assassin SP IM',
		'MANISING',
		4
	),
	(
		320200,
		320001,
		'Perf. Port Olds BB Street Lord Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320201,
		320001,
		'Perf. Port Olds BB Crusader Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320202,
		320001,
		'Perf. Port Olds BB Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320203,
		320001,
		'Rad Rat Chevy W Screamer DP IM',
		'MANIDUAL',
		2
	),
	(
		320204,
		320001,
		'Rad Rat Chevy W Vortex SP IM',
		'MANISING',
		3
	),
	(
		320205,
		320001,
		'Rad Rat Chevy W Banshee DP IM',
		'MANIDUAL',
		4
	),
	(
		320206,
		320001,
		'Rad Rat Chevy W Banshee SP IM',
		'MANISING',
		4
	),
	(
		320207,
		320001,
		'Rad Rat Chevy W Power Tower Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320208,
		320001,
		'Rad Rat Chevy W Ultimate Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320209,
		320001,
		'Perf.Port Chevy W Usurper DP IM',
		'MANIDUAL',
		4
	),
	(
		320210,
		320001,
		'Perf. Port Chevy W Centurion SP IM',
		'MANISING',
		2
	),
	(
		320211,
		320001,
		'Perf. Port Chevy W Track Assassin SP IM',
		'MANISING',
		4
	),
	(
		320212,
		320001,
		'Perf. Port Chevy W Street Lord Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320213,
		320001,
		'Perf. Port Chevy W Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320214,
		320001,
		'Perfect Port AMC Track Assassin SP IM',
		'MANISING',
		4
	),
	(
		320215,
		320001,
		'Perfect Port AMC Street Knight SP IM',
		'MANISING',
		2
	),
	(
		320216,
		320001,
		'Street Shark AMC Hunter SP IM',
		'MANISING',
		3
	),
	(
		320217,
		320001,
		'Street Shark AMC Predator DP IM',
		'MANIDUAL',
		4
	),
	(
		320218,
		320001,
		'Street Shark AMC Stalker DP IM',
		'MANIDUAL',
		2
	),
	(
		320219,
		320001,
		'Perfort Port AMC Street Lord Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320220,
		320001,
		'Perfect Port AMC Crusader Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320221,
		320001,
		'Perfect Port AMC Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320222,
		320001,
		'Street Shark AMC Tiger Shark Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320223,
		320001,
		'Perf. Port Cadillac BB Road Squire DP IM',
		'MANIDUAL',
		1
	),
	(
		320224,
		320001,
		'Perf. Port Cadillac BB Road Squire Alum. DP IM',
		'MANIDUAL',
		1
	),
	(
		320225,
		320001,
		'Perf. Port Cadillac BB Street Port DP IM',
		'MANIDUAL',
		2
	),
	(
		320226,
		320001,
		'Perf. Port Cadillac BB Centurion DP IM',
		'MANIDUAL',
		2
	),
	(
		320227,
		320001,
		'Perf. Port Cadillac BB Usurper DP IM',
		'MANIDUAL',
		4
	),
	(
		320228,
		320001,
		'Perf. Port Cadillac BB Street Lord DP IM',
		'MANIDUAL',
		3
	),
	(
		320229,
		320001,
		'Perf. Port Cadillac BB Street Knight SP IM',
		'MANISING',
		2
	),
	(
		320230,
		320001,
		'Perf. Port Cadillac BB Centurion SP IM',
		'MANISING',
		2
	),
	(
		320231,
		320001,
		'Perf. Port Cadillac BB Super Centurion SP IM',
		'MANISING',
		3
	),
	(
		320232,
		320001,
		'Perf. Port Cadillac BB Track Assassin SP IM',
		'MANISING',
		4
	),
	(
		320233,
		320001,
		'Perf. Port Cadillac BB Street Lord Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320234,
		320001,
		'Perf. Port Cadillac BB Crusader Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320235,
		320001,
		'Perf. Port Cadillac BB Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320236,
		320001,
		'Perf. Port Cadillac BB Usurper Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320237,
		320001,
		'Walter Hemi Perf. Street DP IM',
		'MANIDUAL',
		2
	),
	(
		320238,
		320001,
		'Walter Hemi Perf. Lightweight Street DP IM',
		'MANIDUAL',
		2
	),
	(
		320239,
		320001,
		'Walter Hemi Stocker DP IM',
		'MANIDUAL',
		3
	),
	(
		320240,
		320001,
		'Walter Hemi Lightweight Stocker DP IM',
		'MANIDUAL',
		3
	),
	(
		320241,
		320001,
		'Walter Hemi Super Stocker DP IM',
		'MANIDUAL',
		4
	),
	(
		320242,
		320001,
		'Walter Hemi Perf. Street SP IM',
		'MANISING',
		2
	),
	(
		320243,
		320001,
		'Walter Hemi Stocker SP IM',
		'MANISING',
		3
	),
	(
		320244,
		320001,
		'Walter Hemi Super Stocker SP IM',
		'MANISING',
		3
	),
	(
		320245,
		320001,
		'Walter Hemi Intimidator Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320246,
		320001,
		'Walter Hemi Bighorn Tunnel Ram',
		'MANIDUAL',
		3
	),
	(
		320247,
		320001,
		'Perf. Port Ford 385 Road Squire DP IM',
		'MANIDUAL',
		1
	),
	(
		320248,
		320001,
		'Perf. Port Ford 385 Centurion SP IM',
		'MANISING',
		2
	),
	(
		320249,
		320001,
		'Perf. Port Ford 385 Street Lord Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320250,
		320001,
		'Perf. Port Ford 385 Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320251,
		320001,
		'Oldfield Ford 385 Perf. DP IM',
		'MANIDUAL',
		2
	),
	(
		320252,
		320001,
		'Oldfield Ford 385 Lightning SP IM',
		'MANISING',
		3
	),
	(
		320253,
		320001,
		'Oldfield Ford 385 Track King DP IM',
		'MANIDUAL',
		4
	),
	(
		320254,
		320001,
		'Oldfield Ford 385 Strip King Tunnel Ram',
		'MANIHIGH',
		3
	),
	(
		320255,
		320001,
		'Oldfield Ford 385 Track King Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320256,
		320001,
		'Perf. Port Cleveland Street Port DP IM',
		'MANIDUAL',
		2
	),
	(
		320257,
		320001,
		'Perf. Port Cleveland Emperor DP IM',
		'MANIDUAL',
		4
	),
	(
		320258,
		320001,
		'Perf. Port Cleveland Emperor SP IM',
		'MANISING',
		4
	),
	(
		320259,
		320001,
		'Perf. Port Cleveland Centurion SP IM',
		'MANISING',
		2
	),
	(
		320260,
		320001,
		'Perf. Port Cleveland Emperor Tunnel Ram',
		'MANIHIGH',
		4
	),
	(
		320261,
		320001,
		'Oldfield Cleveland Performance DP IM',
		'MANIDUAL',
		2
	),
	(
		320262,
		320001,
		'Oldfield Cleveland Track King DP IM',
		'MANIDUAL',
		4
	),
	(
		320263,
		320001,
		'Oldfield Cleveland Performance SP IM',
		'MANISING',
		2
	),
	(
		320264,
		320001,
		'Oldfield Cleveland Track King SP IM',
		'MANISING',
		4
	),
	(
		320265,
		320001,
		'Oldfield Cleveland Midget Tunnel Ram',
		'MANILOW',
		3
	),
	(
		330001,
		330001,
		'Autolite 4V (300 cfm)',
		'CARBSING',
		1
	),
	(
		330002,
		330001,
		'Autolite 6V (600 cfm)',
		'CARBTRI',
		2
	),
	(
		330003,
		330001,
		'Autolite 2V (300 cfm)',
		'CARBSING',
		1
	),
	(
		330004,
		330001,
		'Holley 4100 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330005,
		330001,
		'Rochester 2GV 2V (200 cfm)',
		'CARBSING',
		1
	),
	(
		330006,
		330001,
		'Stromberg 97 2V (125 cfm)',
		'CARBSING',
		1
	),
	(
		330007,
		330001,
		'Holley 2300 2V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330008,
		330001,
		'Rochester 4G 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330009,
		330001,
		'Rochester Monojet 2V (350 cfm)',
		'CARBSING',
		1
	),
	(
		330010,
		330001,
		'Holley Dominator 2300 2V (400 cfm)',
		'CARBSING',
		2
	),
	(
		330011,
		330001,
		'Holley 4150 4V (650 cfm)',
		'CARBSING',
		2
	),
	(
		330012,
		330001,
		'Edelbrock Performer 4V (600 cfm)',
		'CARBSING',
		2
	),
	(330013, 330001, 'Ramjet Fuel Injector', NULL, 1),
	(
		330014,
		330001,
		'Rochester 6V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330015,
		330001,
		'Ford Detroit Lubricator 1V (100 cfm)',
		'CARBSING',
		1
	),
	(
		330016,
		330001,
		'Rochester Quadrajet 2x4V (800 cfm)',
		'CARBDUAL',
		3
	),
	(
		330017,
		330001,
		'Carter Tri-Power 3x2V (780 cfm)',
		'CARBTRI',
		3
	),
	(
		330018,
		330001,
		'Carter AFB 2x4V (800 cfm)',
		'CARBDUAL',
		3
	),
	(
		330019,
		330001,
		'Edelbrock Q-Jet (600 cfm)',
		'CARBSING',
		2
	),
	(
		330020,
		330001,
		'Rochester Quadrajet 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330021,
		330001,
		'Carter AFB 4V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330022,
		330001,
		'Holley 3x2V (680 cfm)',
		'CARBTRI',
		2
	),
	(
		330023,
		330001,
		'Holley 4300 2x4V (1000 cfm)',
		'Carbquad',
		3
	),
	(
		330024,
		330001,
		'Autolite 4V (350 cfm)',
		'CARBSING',
		1
	),
	(
		330025,
		330001,
		'Autolite 4V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330026,
		330001,
		'Holley 4100 4V (780 cfm)',
		'CARBSING',
		2
	),
	(
		330027,
		330001,
		'Corvette Cross-Fire Fuel Injection',
		NULL,
		2
	),
	(
		330028,
		330001,
		'Holley 4100 4V (850 cfm)',
		'CARBSING',
		3
	),
	(330029, 330001, 'Cadillac EFI', NULL, 1),
	(
		330030,
		330001,
		'Cadillac Tri-Power 3x2V (600 cfm)',
		'CARBTRI',
		2
	),
	(
		330031,
		330001,
		'Rochester Tri-Power 3x2V (650 cfm)',
		'CARBTRI',
		2
	),
	(
		330032,
		330001,
		'Chevrolet Turbo Thrust 4V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330033,
		330001,
		'Holley 4300 2x4V (800 cfm)',
		'CARBDUAL',
		3
	),
	(
		330034,
		330001,
		'Holley 4100 4V (735 cfm)',
		'CARBSING',
		2
	),
	(
		330035,
		330001,
		'Carter AVS 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330036,
		330001,
		'Autolite 4100 4V (480 cfm)',
		'CARBSING',
		1
	),
	(
		330037,
		330001,
		'Autolite 4100 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330038,
		330001,
		'Autolite 4300 4V (600 cfm)',
		'CARBSING',
		2
	),
	(
		330039,
		330001,
		'Autolite 4300D 4V (715 cfm)',
		'CARBSING',
		2
	),
	(
		330040,
		330001,
		'Holley 3x2V (600 cfm)',
		'CARBTRI',
		2
	),
	(
		330041,
		330001,
		'Holley 4160 4V (1000 cfm)',
		'CARBSING',
		3
	),
	(
		330042,
		330001,
		'Autolite 2100 2V (356 cfm)',
		'CARBSING',
		1
	),
	(
		330043,
		330001,
		'Autolite 2100 2V (424 cfm)',
		'CARBSING',
		1
	),
	(
		330044,
		330001,
		'Rochester Quadrajet 4V (715 cfm)',
		'CARBSING',
		2
	),
	(
		330045,
		330001,
		'Holley Dominator 2V (550 cfm)',
		'CARBSING',
		2
	),
	(
		330046,
		330001,
		'Holley Dominator 2V (650 cfm)',
		'CARBSING',
		2
	),
	(
		330047,
		330001,
		'Holley Dominator 2V (675 cfm)',
		'CARBSING',
		2
	),
	(
		330048,
		330001,
		'Holley Dominator 4V (1050 cfm)',
		'CARBSING',
		3
	),
	(
		330049,
		330001,
		'Holley Dominator 4V (1150 cfm)',
		'CARBSING',
		3
	),
	(
		330050,
		330001,
		'Holley Dominator 2x4V (1150 cfm)',
		'CARBDUAL',
		3
	),
	(
		330051,
		330001,
		'Holley Dominator 2x4V (1250 cfm)',
		'CARBDUAL',
		4
	),
	(
		330052,
		330001,
		'Holley Dominator 4V (1250 cfm)',
		'CARBSING',
		4
	),
	(
		330053,
		330001,
		'Carter 2V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330054,
		330001,
		'Carter AFB 4V (500 cfm) Carb',
		'CARBSING',
		1
	),
	(
		330055,
		330001,
		'Rochester Monojet 2V (400 cfm)',
		'CARBSING',
		1
	),
	(
		330056,
		330001,
		'Rochester Quadrajet 2x4V (600 cfm)',
		'CARBDUAL',
		2
	),
	(
		330057,
		330001,
		'Rochester Quadrajet 4V (500 cfm)',
		'CARBSING',
		1
	),
	(
		330058,
		330001,
		'Ramjet Fuel Injector RPO 579D',
		NULL,
		2
	),
	(
		330059,
		330001,
		'Rochester Monojet 2V (500 cfm)',
		'CARBSING',
		1
	),
	(
		330060,
		330001,
		'Rochester Monojet 2V (600 cfm)',
		'CARBSING',
		1
	),
	(
		330061,
		330001,
		'Rochester Quadrajet 4V (660 cfm) Carb',
		'CARBDUAL',
		1
	),
	(
		330062,
		330001,
		'Autolite 2x4V (600 cfm)',
		'CARBDUAL',
		1
	),
	(
		330063,
		330001,
		'Autolite 2100 2V (600 cfm)',
		'CARBSING',
		1
	),
	(
		330064,
		330001,
		'Autolite 3x2V (860 cfm)',
		'CARBTRI',
		2
	),
	(
		330065,
		330001,
		'Holley 3x2V (840 cfm)',
		'CARBTRI',
		2
	),
	(
		330066,
		330001,
		'Carter 2V (600 cfm)',
		'CARBSING',
		1
	),
	(
		330067,
		330001,
		'Carter AVS 4V (700 cfm)',
		'CARBDUAL',
		1
	),
	(
		330068,
		330001,
		'Carter AVS 4V (800 cfm)',
		'CARBDUAL',
		2
	),
	(
		330069,
		330001,
		'Edelbrock Performer 4V (500 cfm)',
		'CARBDUAL',
		2
	),
	(
		330070,
		330001,
		'Edelbrock Performer 4V (750 cfm)',
		'CARBDUAL',
		2
	),
	(
		330071,
		330001,
		'Edelbrock Q-Jet (850 cfm)',
		'CARBDUAL',
		3
	),
	(
		330072,
		330001,
		'Edelbrock Q-Jet (795 cfm)',
		'CARBDUAL',
		3
	),
	(
		330073,
		330001,
		'Edelbrock Pro-Flo EFI System',
		NULL,
		3
	),
	(
		340001,
		340001,
		'Light Duty Air Cleaner',
		'airoil',
		1
	),
	(
		340002,
		340001,
		'Normal Duty Air Cleaner',
		'airsnork',
		1
	),
	(
		340003,
		340001,
		'Holley Hi-Tek Air Cleaner',
		'AIRSTD',
		2
	),
	(
		340004,
		340001,
		'Edelbrock Pro-Flo 1000 XHD Air Cleaner',
		'airoval',
		4
	),
	(
		340005,
		340001,
		'Tri-angular Air Cleaner',
		'AIRTRI',
		2
	),
	(
		340006,
		340001,
		'Edelbrock Pro-Flo Round Air Cleaner',
		'AIRSTD',
		3
	),
	(
		340007,
		340001,
		'Edelbrock Pro-Flo Oval Air Cleaner',
		'AIROVAL',
		3
	),
	(
		340008,
		340001,
		'Edelbrock Pro-Flo Triangular Air Cleaner',
		'AIRTRI',
		3
	),
	(
		340009,
		340001,
		'Edelbrock Elite Round Air Cleaner',
		'AIRSTD',
		2
	),
	(
		340010,
		340001,
		'Edelbrock Elite Oval Air Cleaner',
		'AIROVAL',
		2
	),
	(
		340011,
		340001,
		'Edelbrock Elite Triangular Air Cleaner',
		'AIRTRI',
		2
	),
	(
		350001,
		350001,
		'Lindstrom P05 Blower',
		'BLOWSMAL',
		1
	),
	(
		350002,
		350001,
		'Holley Street Blower',
		'BLOWSMAL',
		2
	),
	(
		350003,
		350001,
		'Holley Street PowerCharger Blower',
		'BLOWSMAL',
		2
	),
	(
		350004,
		350001,
		'Holley PowerCharger Blower',
		'BLOWLARG',
		3
	),
	(
		350005,
		350001,
		'Holley MegaBlower',
		'BLOWLARG',
		4
	),
	(
		350006,
		350001,
		'Weiand 671 Blower',
		'BLOWSMAL',
		3
	),
	(
		350007,
		350001,
		'Weiand 871 Blower',
		'BLOWLARG',
		3
	),
	(
		350008,
		350001,
		'Weiand 1071 Blower',
		'BLOWLARG',
		4
	),
	(
		360001,
		360001,
		'Lindstrom Little Rabbit 5/1 NOS',
		NULL,
		1
	),
	(
		360002,
		360001,
		'Lindstrom Cheetah 15/5 NOS',
		NULL,
		2
	),
	(
		360003,
		360001,
		'Holley Powershot 125 NOS',
		NULL,
		3
	),
	(
		360004,
		360001,
		'Holley Super Powershot 200 NOS',
		NULL,
		4
	),
	(360005, 360001, 'Holley Cheater 250 NOS', NULL, 4),
	(
		360006,
		360001,
		'Holley Sneeky Pete 75 NOS',
		NULL,
		3
	),
	(
		1000001,
		1000001,
		'Ford Y (9.0) 1.925i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000002,
		1000001,
		'Ford Flathead (6.15) Stock CH',
		NULL,
		1
	),
	(
		1000003,
		1000001,
		'Ford Flathead (6.8) Stock CH',
		NULL,
		1
	),
	(
		1000004,
		1000001,
		'Ford Flathead (7.2) Stock CH',
		NULL,
		1
	),
	(
		1000005,
		1000001,
		'Ford BB Low Riser (11.6) 2.09i/1.66e CH',
		NULL,
		3
	),
	(
		1000006,
		1000001,
		'Ford 385 Street Boss (10.5) 2.28i/1.90e CH',
		NULL,
		3
	),
	(
		1000007,
		1000001,
		'AMC (10.0) 1.787i/1.406e Stock CH',
		NULL,
		1
	),
	(
		1000008,
		1000001,
		'AMC (10.2) 2.02i/1.625e Stock CH',
		NULL,
		2
	),
	(
		1000009,
		1000001,
		'AMC (10.2) 2.02i/1.625e SS HP W/F CH',
		NULL,
		3
	),
	(
		1000010,
		1000001,
		'Pontiac (9.2) Stock W CH',
		NULL,
		1
	),
	(
		1000011,
		1000001,
		'Chrysler Hemi (10.25) 2.25i/1.90e Canted CH',
		NULL,
		3
	),
	(
		1000012,
		1000001,
		'Chrysler SB (10.5) AAR W/P CH',
		NULL,
		2
	),
	(
		1000013,
		1000001,
		'Chrysler SB (10.5) 1.78i/1.50e Wedge CH',
		NULL,
		1
	),
	(
		1000014,
		1000001,
		'Olds SB (9.0) Stock CH',
		NULL,
		1
	),
	(
		1000015,
		1000001,
		'Chevrolet SB (9.5) Wedge CH',
		NULL,
		1
	),
	(
		1000016,
		1000001,
		'Pontiac (10.5) Wedge CH',
		NULL,
		1
	),
	(
		1000017,
		1000001,
		'Olds BB (10.25) Stock CH',
		NULL,
		1
	),
	(1000018, 1000001, 'Pontiac (10.75) W CH', NULL, 2),
	(
		1000019,
		1000001,
		'Chevrolet BB HP (11.0) Canted CH',
		NULL,
		3
	),
	(
		1000020,
		1000001,
		'Ford Flathead (7.5) Denver CH',
		NULL,
		2
	),
	(1000021, 1000001, 'Olds BB (8.5) CH', NULL, 1),
	(
		1000022,
		1000001,
		'Chevrolet W (10.25) 2.07i/1.72e CH',
		NULL,
		2
	),
	(
		1000023,
		1000001,
		'Chevrolet BB L72 (11.0) HP CH',
		NULL,
		3
	),
	(
		1000024,
		1000001,
		'Chevrolet BB L88 Aluminum  (12.5) HP CH',
		NULL,
		4
	),
	(
		1000025,
		1000001,
		'Chevrolet BB L89 Aluminum (11.0) HP CH',
		NULL,
		3
	),
	(
		1000026,
		1000001,
		'Ford Y 1957 (9.0) 1.925i/1.51e Stock CH',
		NULL,
		2
	),
	(
		1000027,
		1000001,
		'Ford 385 (8.5) 2.08i/1.66e Canted CH',
		NULL,
		1
	),
	(
		1000028,
		1000001,
		'Ford 385 (11.0) 2.08i/1.66e Canted CH',
		NULL,
		3
	),
	(
		1000029,
		1000001,
		'Ford Cleveland (9.2) 2.19i/1.71e HP Canted CH',
		NULL,
		3
	),
	(
		1000030,
		1000001,
		'Ford BB (9.6) 2.04i/1.57e W CH',
		NULL,
		2
	),
	(
		1000031,
		1000001,
		'Ford BB (11.4) 2.09i/1.66e W/P CH',
		NULL,
		2
	),
	(
		1000032,
		1000001,
		'Ford BB High Riser (11.5) 2.195i/1.73e CH',
		NULL,
		3
	),
	(
		1000033,
		1000001,
		'Ford BB Cammer 2.25i/1.90e HP CH',
		NULL,
		4
	),
	(
		1000034,
		1000001,
		'Ford 385 (10.5) 2.08i/1.66e Canted CH',
		NULL,
		2
	),
	(
		1000035,
		1000001,
		'Ford 385 (11.3) 2.25i/1.72e CJ HP CH',
		NULL,
		3
	),
	(
		1000037,
		1000001,
		'Pontiac (10.0) W/P CH',
		NULL,
		3
	),
	(
		1000038,
		1000001,
		'Chrysler BB (11.0) Max Wedge I CH',
		NULL,
		3
	),
	(
		1000039,
		1000001,
		'Chrysler BB (13.5) Max Wedge I HP CH',
		NULL,
		4
	),
	(
		1000040,
		1000001,
		'Edelbrock Performer RPM (9.25) Chevy SB CH',
		NULL,
		3
	),
	(
		1000041,
		1000001,
		'Edelbrock Performer RPM (10.5) Chevy SB CH',
		NULL,
		3
	),
	(
		1000042,
		1000001,
		'Edelbrock Performer (9.25) Chevy SB CH',
		NULL,
		2
	),
	(
		1000043,
		1000001,
		'Edelbrock Performer (10.5) Chevrolet SB CH',
		NULL,
		2
	),
	(
		1000044,
		1000001,
		'Edelbrock Performer RPM 454-O Chevy BB (9.5) CH',
		NULL,
		2
	),
	(
		1000045,
		1000001,
		'Edelbrock Performer 454-O Chevy BB (9.5) CH',
		NULL,
		2
	),
	(
		1000046,
		1000001,
		'Edelbrock Performer RPM 454-R Chevy BB (9.5) CH',
		NULL,
		3
	),
	(
		1000047,
		1000001,
		'Edelbrock Performer RPM (11.5) Chevy SB CH',
		NULL,
		3
	),
	(
		1000048,
		1000001,
		'Buick BB (10.0) 2.0i/1.625e Stock',
		NULL,
		1
	),
	(1000049, 1000001, 'Pontiac (12.0) Wedge', NULL, 3),
	(1000050, 1000001, 'Pontiac (13.0) Wedge', NULL, 4),
	(
		1000051,
		1000001,
		'Pontiac Ram Air II Cylinder Head',
		NULL,
		2
	),
	(
		1000052,
		1000001,
		'Ford BB Medium Riser (11.6) 2.195i/1.73e CH',
		NULL,
		3
	),
	(
		1000053,
		1000001,
		'Ford BB (10.6) 2.04i/1.57e W/P CH',
		NULL,
		2
	),
	(
		1000054,
		1000001,
		'Ford 385 2.37i/1.90e NASCAR CH',
		NULL,
		4
	),
	(
		1000055,
		1000001,
		'Chrysler BB (12.5) Max Wedge III CH',
		NULL,
		3
	),
	(
		1000056,
		1000001,
		'Chevrolet W (10.25) 2.19/1.73 CH',
		NULL,
		3
	),
	(
		1000057,
		1000001,
		'Chevrolet W (10.25) 1.94/1.65 CH',
		NULL,
		2
	),
	(
		1000058,
		1000001,
		'Ford Cleveland Boss 351 (11.7) 2.19i/1.71e CH',
		NULL,
		3
	),
	(
		1000060,
		1000001,
		'Buick Nailhead Wedge (8.5)',
		NULL,
		1
	),
	(
		1000061,
		1000001,
		'Ford SB (10.5) 1.78i/1.45e HP Wedge CH',
		NULL,
		2
	),
	(
		1000063,
		1000001,
		'Buick BB (8.5) 2.0i/1.625e Wedge CH',
		NULL,
		1
	),
	(1000064, 1000001, 'Buick SB Wedge (8.5)', NULL, 1),
	(1000065, 1000001, 'Buick SB Wedge (9.0)', NULL, 1),
	(
		1000066,
		1000001,
		'Buick SB Wedge (10.25)',
		NULL,
		2
	),
	(
		1000067,
		1000001,
		'Cadillac BB Stock (9.1)',
		NULL,
		1
	),
	(
		1000068,
		1000001,
		'Cadillac BB Wedge (10.5)',
		NULL,
		1
	),
	(
		1000069,
		1000001,
		'Chevrolet SB Wedge (8.0)',
		NULL,
		1
	),
	(
		1000070,
		1000001,
		'Chevrolet SB Wedge (9.25)',
		NULL,
		1
	),
	(
		1000071,
		1000001,
		'Chevrolet SB Stock Wedge (10.5) 1.72i/1.50e',
		NULL,
		2
	),
	(
		1000072,
		1000001,
		'Chevrolet SB Wedge (11.0)',
		NULL,
		2
	),
	(
		1000073,
		1000001,
		'Chevrolet SB Wedge (11.25) 1.94i/1.50e',
		NULL,
		2
	),
	(
		1000074,
		1000001,
		'Chevrolet SB Wedge (9.0)',
		NULL,
		1
	),
	(
		1000075,
		1000001,
		'Chevrolet BB Canted (10.25)',
		NULL,
		3
	),
	(
		1000076,
		1000001,
		'Chevrolet BB Canted ZL1 (12.0)',
		NULL,
		3
	),
	(
		1000077,
		1000001,
		'Chevrolet BB Canted LS6 (9.0)',
		NULL,
		2
	),
	(
		1000078,
		1000001,
		'Olds SB (10.25) Stock CH',
		NULL,
		1
	),
	(
		1000079,
		1000001,
		'Olds SB (10.5) W-31 CH',
		NULL,
		3
	),
	(
		1000080,
		1000001,
		'Olds BB (10.5) Stock CH',
		NULL,
		2
	),
	(
		1000081,
		1000001,
		'Olds BB (9.0) Stock CH',
		NULL,
		1
	),
	(
		1000082,
		1000001,
		'Olds BB (10.25) Stock CH',
		NULL,
		2
	),
	(
		1000083,
		1000001,
		'Olds BB (10.5) W-30 CH',
		NULL,
		3
	),
	(
		1000084,
		1000001,
		'Pontiac (8.6) Stock W CH',
		NULL,
		1
	),
	(
		1000085,
		1000001,
		'Pontiac (10.0) Stock W CH',
		NULL,
		2
	),
	(
		1000086,
		1000001,
		'Pontiac (11.0) SD W CH',
		NULL,
		3
	),
	(
		1000087,
		1000001,
		'Pontiac (10.75) HO W CH',
		NULL,
		3
	),
	(1000088, 1000001, 'Pontiac (10.5)  W CH', NULL, 2),
	(
		1000089,
		1000001,
		'Pontiac (10.25)  W CH',
		NULL,
		2
	),
	(
		1000090,
		1000001,
		'Pontiac (10.0) Stock W CH',
		NULL,
		1
	),
	(
		1000091,
		1000001,
		'Pontiac (8.4) SD W CH',
		NULL,
		2
	),
	(
		1000092,
		1000001,
		'Ford Y (7.6) 1.78i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000093,
		1000001,
		'Ford Y (8.5) 1.78i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000094,
		1000001,
		'Ford Y (8.1) 1.78i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000095,
		1000001,
		'Ford Y (8.0) 1.78i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000096,
		1000001,
		'Ford Y (8.4) 1.78i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000097,
		1000001,
		'Ford Y (8.6) 1.925i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000098,
		1000001,
		'Ford Y (9.7) 1.925i/1.51e Stock CH',
		NULL,
		2
	),
	(
		1000099,
		1000001,
		'Ford Y (8.3) 1.925i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000100,
		1000001,
		'Ford Y (8.8) 1.925i/1.51e Stock CH',
		NULL,
		1
	),
	(
		1000101,
		1000001,
		'Ford Y (9.6) 1.925i/1.51e Stock CH',
		NULL,
		2
	),
	(
		1000102,
		1000001,
		'Ford BB (12.1) 2.09i/1.66e Wedge CH',
		NULL,
		3
	),
	(
		1000103,
		1000001,
		'Ford BB (11.0) 2.04i/1.57e Wedge CH',
		NULL,
		2
	),
	(
		1000104,
		1000001,
		'Ford BB (10.1) 2.04i/1.57e Wedge CH',
		NULL,
		2
	),
	(
		1000105,
		1000001,
		'Ford BB (9.4) 2.04i/1.57e Wedge CH',
		NULL,
		1
	),
	(
		1000106,
		1000001,
		'Ford Cleveland (9.5) 2.05i/1.65e CH',
		NULL,
		2
	),
	(
		1000107,
		1000001,
		'Ford Cleveland (11.0) 2.19i/1.71e CH',
		NULL,
		3
	),
	(
		1000108,
		1000001,
		'Ford Cleveland (9.0) 2.19i/1.71e CH',
		NULL,
		2
	),
	(
		1000109,
		1000001,
		'Ford Cleveland (8.6) 2.05i/1.65e CH',
		NULL,
		1
	),
	(
		1000111,
		1000001,
		'Ford 385 (10.2) 2.08i/1.66e Canted CH',
		NULL,
		3
	),
	(
		1000112,
		1000001,
		'Chrysler BB (10.0) Large Port W CH',
		NULL,
		2
	),
	(
		1000113,
		1000001,
		'Chrysler BB (9.6) W CH',
		NULL,
		1
	),
	(
		1000114,
		1000001,
		'Chrysler BB (9.2) W CH',
		NULL,
		1
	),
	(
		1000115,
		1000001,
		'Chrysler SB (8.8) 1.78i/1.50e Stock W CH',
		NULL,
		1
	),
	(
		1000116,
		1000001,
		'Chrysler SB (10.5) 2.02i/1.60e Stock W CH',
		NULL,
		2
	),
	(
		1000117,
		1000001,
		'Chrysler SB (9.0) Stock W CH',
		NULL,
		1
	),
	(
		1000118,
		1000001,
		'Chrysler SB (9.2) Stock W CH',
		NULL,
		1
	),
	(
		1000119,
		1000001,
		'Chrysler BB (10.0) W CH',
		NULL,
		1
	),
	(
		1000120,
		1000001,
		'Chevrolet SB Large Valve Wedge (10.5)',
		NULL,
		2
	),
	(
		1000121,
		1000001,
		'Chevrolet SB Wedge (10.25)',
		NULL,
		2
	),
	(
		1000122,
		1000001,
		'Chevrolet SB Wedge (8.5)',
		NULL,
		1
	),
	(
		1000123,
		1000001,
		'Chevrolet SB Wedge (10.5) 1.94i/1.50e',
		NULL,
		2
	),
	(
		1000124,
		1000001,
		'Chevrolet SB Wedge (11.25) 2.02i/1.60e',
		NULL,
		2
	),
	(
		1000125,
		1000001,
		'Chevrolet BB L36 Canted (10.25)',
		NULL,
		2
	),
	(
		1000126,
		1000001,
		'Pontiac (10.25) Stock W CH',
		NULL,
		1
	),
	(
		1000127,
		1000001,
		'Pontiac (10.75) W/P CH',
		NULL,
		3
	),
	(1000128, 1000001, 'Pontiac (10.75) W CH', NULL, 2),
	(
		1000129,
		1000001,
		'Pontiac (11.0) SD 2.02i/1.76e W CH',
		NULL,
		3
	),
	(
		1000130,
		1000001,
		'Pontiac Ram Air V Cylinder Head',
		NULL,
		3
	),
	(
		1000131,
		1000001,
		'Ford BB (10.2) 2.04i/1.57e Wedge CH',
		NULL,
		2
	),
	(
		1000132,
		1000001,
		'Ford BB (8.9) 2.04i/1.57e Wedge CH',
		NULL,
		1
	),
	(
		1000133,
		1000001,
		'Ford BB (10.5) 2.04i/1.57e Wedge CH',
		NULL,
		2
	),
	(
		1000134,
		1000001,
		'Ford SB (8.7) 1.67i/1.45e Wedge CH',
		NULL,
		1
	),
	(
		1000135,
		1000001,
		'Ford SB (10.5) 1.67i/1.45e HP Wedge CH',
		NULL,
		2
	),
	(
		1000136,
		1000001,
		'Ford SB (9.0) 1.67i/1.45e Wedge CH',
		NULL,
		1
	),
	(
		1000137,
		1000001,
		'Ford SB (10.0) 1.78i/1.45e Wedge CH',
		NULL,
		1
	),
	(
		1000138,
		1000001,
		'Ford SB Boss (10.5) 2.23i/1.72e Canted CH',
		NULL,
		3
	),
	(
		1000139,
		1000001,
		'Ford SB (9.5) 1.84i/1.54e Wedge CH',
		NULL,
		2
	),
	(
		1000140,
		1000001,
		'Ford SB (10.7) 1.84i/1.54e Wedge CH',
		NULL,
		2
	),
	(
		1000141,
		1000001,
		'Chrysler BB (8.2) W CH',
		NULL,
		1
	),
	(
		1000142,
		1000001,
		'Chrysler BB  (11.0) Max Wedge III Cylinder Head',
		NULL,
		3
	),
	(
		1000143,
		1000001,
		'Chrysler BB (10.5) W CH',
		NULL,
		2
	),
	(
		1000144,
		1000001,
		'Buick BB Stage I (10) 2.12i/1.75e CH',
		NULL,
		2
	),
	(
		1000145,
		1000001,
		'Pontiac (8.0) Stock W CH',
		NULL,
		1
	),
	(
		1000146,
		1000001,
		'Chevrolet BB (8.5) Stock CH',
		NULL,
		1
	),
	(
		1000147,
		1000001,
		'Shade Tree Chevrolet SB (8.0)',
		NULL,
		1
	),
	(
		1000148,
		1000001,
		'AMC (9.0) 1.787i/1.406e Stock CH',
		NULL,
		1
	),
	(
		1000149,
		1000001,
		'AMC (9.0) 2.02i/1.625e Stock CH',
		NULL,
		1
	),
	(
		1000150,
		1000001,
		'AMC (10.0) 2.02i/1.625e Stock CH',
		NULL,
		2
	),
	(
		1000151,
		1000001,
		'AMC (10.0) 2.02i/1.625e Dog Leg CH',
		NULL,
		2
	),
	(
		1000152,
		1000001,
		'Cadillac L-Head Stock CH',
		NULL,
		1
	),
	(
		1000153,
		1000001,
		'Buick BB (10.25) 2.0i/1.625e Wedge CH',
		NULL,
		2
	),
	(
		1000154,
		1000001,
		'Chevrolet W (10.25) 2.19/1.73 Z11 CH',
		NULL,
		3
	),
	(
		1000155,
		1000001,
		'Cadillac L-Head (7.5) CH',
		NULL,
		2
	),
	(
		1000156,
		1000001,
		'Cadillac L-Head (7.8) CH',
		NULL,
		2
	),
	(
		1000157,
		1000001,
		'Cadillac L-Head (8.0) CH',
		NULL,
		2
	),
	(
		1000158,
		1000001,
		'Cadillac L-Head (8.2) CH',
		NULL,
		2
	),
	(
		1000159,
		1000001,
		'Buick Nailhead (8.75) CH',
		NULL,
		2
	),
	(
		1000160,
		1000001,
		'Buick Nailhead (9.0) CH',
		NULL,
		2
	),
	(
		1000161,
		1000001,
		'Buick Nailhead (10.25) CH',
		NULL,
		3
	),
	(
		1000162,
		1000001,
		'Buick Nailhead (10.5) CH',
		NULL,
		3
	),
	(
		1000163,
		1000001,
		'Cadillac (9.75) Wedge CH',
		NULL,
		2
	),
	(
		1000164,
		1000001,
		'Cadillac (10.0) Wedge CH',
		NULL,
		2
	),
	(
		1000165,
		1000001,
		'Hemi (10.5) Canted CH',
		NULL,
		3
	),
	(
		1000166,
		1000001,
		'Hemi (10.75) Canted CH',
		NULL,
		3
	),
	(
		1000167,
		1000001,
		'Edelbrock Ford Flathead Cylinder Head',
		NULL,
		3
	),
	(
		1000168,
		1000001,
		'Holley SystemMax Chevrolet BB CH',
		NULL,
		4
	),
	(1000169, 1000001, 'AMC NASCAR CH', NULL, 4),
	(
		1000170,
		1000001,
		'AMC (9.5) 2.02i/1.68e Stock CH',
		NULL,
		2
	),
	(
		1000171,
		1000001,
		'AMC (8.5) 2.02i/1.68e Stock CH',
		NULL,
		1
	),
	(
		1000172,
		1000001,
		'Ford SB (9.0) 1.84i/1.54e Wedge CH',
		NULL,
		1
	),
	(
		1000173,
		1000001,
		'Ford SB Boss (10.5) 2.19i/1.72e Canted CH',
		NULL,
		3
	),
	(
		1000174,
		1000001,
		'Ford SB TP (10.0) 2.12i/1.54e Wedge CH',
		NULL,
		3
	),
	(
		1100001,
		1100001,
		'Chevrolet SB Stock Cam',
		NULL,
		1
	),
	(
		1100002,
		1100001,
		'Chrysler SB Barracuda Cam',
		NULL,
		1
	),
	(
		1100003,
		1100001,
		'Edelbrock Performer Plus Chrysler SB HP Cam',
		NULL,
		3
	),
	(
		1100004,
		1100001,
		'Edelbrock Performer RPM Chrysler SB HP Cam',
		NULL,
		2
	),
	(1100005, 1100001, 'Ford SB Stock Cam', NULL, 1),
	(
		1100006,
		1100001,
		'Reed TorqueMaster Chrysler SB HP Cam',
		NULL,
		2
	),
	(
		1100007,
		1100001,
		'Reed XLH Chrysler SB DP Cam',
		NULL,
		3
	),
	(
		1100008,
		1100001,
		'Crane PowerMax HP Chrysler SB Cam',
		NULL,
		2
	),
	(
		1100009,
		1100001,
		'Crane Saturday Night Special Chrysler SB Cam',
		NULL,
		3
	),
	(
		1100010,
		1100001,
		'Edelbrock Torker-Plus Chrysler SB DP Cam',
		NULL,
		3
	),
	(1100011, 1100001, 'Buick BB Stock Cam', NULL, 1),
	(1100012, 1100001, 'Buick SB Stock Cam', NULL, 1),
	(
		1100013,
		1100001,
		'Cadillac BB Stock Cam',
		NULL,
		1
	),
	(
		1100014,
		1100001,
		'Chevrolet BB Stock Cam',
		NULL,
		1
	),
	(1100015, 1100001, 'Chevrolet SB HP Cam', NULL, 2),
	(
		1100016,
		1100001,
		'Chrysler BB Stock Cam',
		NULL,
		1
	),
	(
		1100017,
		1100001,
		'Chrysler SB Stock Cam',
		NULL,
		1
	),
	(1100018, 1100001, 'Ford BB Stock Cam', NULL, 1),
	(1100019, 1100001, 'Ford SB HP Cam', NULL, 2),
	(
		1100020,
		1100001,
		'Ford Flathead Stock Cam',
		NULL,
		1
	),
	(
		1100021,
		1100001,
		'Oldsmobile BB Stock Cam',
		NULL,
		1
	),
	(
		1100022,
		1100001,
		'Oldsmobile SB Stock Cam',
		NULL,
		1
	),
	(1100023, 1100001, 'AMC Stock Cam', NULL, 1),
	(1100024, 1100001, 'Pontiac Stock Cam', NULL, 1),
	(
		1100025,
		1100001,
		'Chevrolet SB Stock Hi-Lift Cam',
		NULL,
		1
	),
	(
		1100026,
		1100001,
		'Chevrolet SB HP Duntov Cam',
		NULL,
		3
	),
	(1100028, 1100001, 'Chevrolet BB HP Cam', NULL, 2),
	(
		1100029,
		1100001,
		'Chevrolet BB HP LS7 Cam',
		NULL,
		3
	),
	(
		1100030,
		1100001,
		'Buick BB 1968 Stage I Cam',
		NULL,
		1
	),
	(
		1100031,
		1100001,
		'Buick BB 1969 Stage I Cam',
		NULL,
		2
	),
	(
		1100032,
		1100001,
		'Buick BB Stage II Cam',
		NULL,
		2
	),
	(
		1100033,
		1100001,
		'Oldsmobile SB W31 Performance Cam',
		NULL,
		2
	),
	(
		1100034,
		1100001,
		'Oldsmobile BB W30 Performance Cam',
		NULL,
		2
	),
	(1100035, 1100001, 'Pontiac SD Cam', NULL, 3),
	(
		1100036,
		1100001,
		'Pontiac Ram Air I Cam',
		NULL,
		2
	),
	(
		1100037,
		1100001,
		'Pontiac Ram Air IV Cam',
		NULL,
		3
	),
	(1100038, 1100001, 'Pontiac SD Cam', NULL, 3),
	(1100039, 1100001, 'Pontiac HO Cam', NULL, 2),
	(1100040, 1100001, 'Ford Y Truck Cam', NULL, 1),
	(1100041, 1100001, 'Ford BB HO Cam', NULL, 2),
	(1100042, 1100001, 'Ford BB HO Mild Cam', NULL, 2),
	(1100043, 1100001, 'Ford BB Cammer Cam', NULL, 4),
	(1100044, 1100001, 'Ford BB PI Cam', NULL, 2),
	(1100045, 1100001, 'Ford 385 Boss Cam', NULL, 3),
	(1100046, 1100001, 'Chrysler BB HP Cam', NULL, 2),
	(
		1100047,
		1100001,
		'Chrysler BB Max Wedge I Cam',
		NULL,
		2
	),
	(
		1100048,
		1100001,
		'Chrysler BB Max  Wedge III Cam',
		NULL,
		3
	),
	(1100049, 1100001, 'Chrysler Hemi Cam', NULL, 3),
	(1100050, 1100001, 'Chrysler SB AAR Cam', NULL, 2),
	(1100051, 1100001, 'AMC Group 19 Cam', NULL, 2),
	(1100052, 1100001, 'AMC SS/AMX Cam', NULL, 3),
	(
		1100054,
		1100001,
		'Crane PowerMax HP Cadillac BB Cam',
		NULL,
		2
	),
	(
		1100055,
		1100001,
		'Crane PowerMax HP Buick BB Cam',
		NULL,
		2
	),
	(
		1100056,
		1100001,
		'Crane PowerMax HP Buick SB Cam',
		NULL,
		2
	),
	(
		1100057,
		1100001,
		'Crane PowerMax HP Chevrolet BB Cam',
		NULL,
		2
	),
	(
		1100058,
		1100001,
		'Crane PowerMax HP Chevrolet SB Cam',
		NULL,
		2
	),
	(
		1100059,
		1100001,
		'Crane PowerMax HP Chrysler BB Cam',
		NULL,
		2
	),
	(
		1100060,
		1100001,
		'Crane PowerMax HP Ford BB Cam',
		NULL,
		2
	),
	(
		1100061,
		1100001,
		'Crane PowerMax HP Ford SB Cam',
		NULL,
		2
	),
	(
		1100062,
		1100001,
		'Crane PowerMax HP Olds BB Cam',
		NULL,
		2
	),
	(
		1100063,
		1100001,
		'Crane PowerMax HP Olds SB Cam',
		NULL,
		2
	),
	(
		1100064,
		1100001,
		'Crane PowerMax HP Pontiac Cam',
		NULL,
		2
	),
	(1100065, 1100001, 'Shade Tree Hemi Cam', NULL, 2),
	(
		1100066,
		1100001,
		'Crane Saturday Night Special Chrysler BB Cam',
		NULL,
		3
	),
	(
		1100067,
		1100001,
		'Crane Saturday Night Special Buick BB Cam',
		NULL,
		3
	),
	(
		1100068,
		1100001,
		'Crane Saturday Night Special Buick SB Cam',
		NULL,
		3
	),
	(
		1100069,
		1100001,
		'Crane Saturday Night Special Chevrolet BB Cam',
		NULL,
		3
	),
	(
		1100070,
		1100001,
		'Crane Saturday Night Special Chevrolet SB Cam',
		NULL,
		3
	),
	(
		1100071,
		1100001,
		'Crane Saturday Night Special Ford BB Cam',
		NULL,
		3
	),
	(
		1100072,
		1100001,
		'Crane Saturday Night Special Ford SB Cam',
		NULL,
		3
	),
	(
		1100073,
		1100001,
		'Crane Saturday Night Special Olds BB Cam',
		NULL,
		3
	),
	(
		1100074,
		1100001,
		'Crane Saturday Night Special Olds SB Cam',
		NULL,
		3
	),
	(
		1100075,
		1100001,
		'Crane Saturday Night Special Pontiac Cam',
		NULL,
		3
	),
	(
		1100076,
		1100001,
		'Crane Saturday Night Special Chevy W Cam',
		NULL,
		3
	),
	(
		1100077,
		1100001,
		'Edelbrock Performer Plus Chevrolet SB HP Cam',
		NULL,
		3
	),
	(
		1100078,
		1100001,
		'Edelbrock Performer Plus Ford SB HP Cam',
		NULL,
		3
	),
	(
		1100079,
		1100001,
		'Edelbrock Performer Plus Ford BB HP Cam',
		NULL,
		3
	),
	(
		1100080,
		1100001,
		'Edelbrock Performer RPM Chrysler BB HP Cam',
		NULL,
		2
	),
	(
		1100081,
		1100001,
		'Edelbrock Performer RPM Buick BB HP Cam',
		NULL,
		2
	),
	(
		1100082,
		1100001,
		'Edelbrock Performer RPM Chevrolet BB HP Cam',
		NULL,
		2
	),
	(
		1100083,
		1100001,
		'Edelbrock Performer RPM Chevrolet SB HP Cam',
		NULL,
		2
	),
	(
		1100084,
		1100001,
		'Edelbrock Performer RPM Ford BB HP Cam',
		NULL,
		2
	),
	(
		1100085,
		1100001,
		'Edelbrock Performer RPM Ford SB HP Cam',
		NULL,
		2
	),
	(
		1100087,
		1100001,
		'Edelbrock Performer RPM Olds SB HP Cam',
		NULL,
		2
	),
	(
		1100088,
		1100001,
		'Edelbrock Performer RPM Pontiac HP Cam',
		NULL,
		2
	),
	(
		1100090,
		1100001,
		'Edelbrock Torker-Plus Chrysler BB DP Cam',
		NULL,
		3
	),
	(
		1100092,
		1100001,
		'Edelbrock Torker-Plus Chevrolet BB DP Cam',
		NULL,
		3
	),
	(
		1100093,
		1100001,
		'Edelbrock Torker-Plus Chevrolet SB DP Cam',
		NULL,
		3
	),
	(
		1100094,
		1100001,
		'Edelbrock Torker-Plus Ford BB DP Cam',
		NULL,
		3
	),
	(
		1100095,
		1100001,
		'Edelbrock Torker-Plus Ford SB DP Cam',
		NULL,
		3
	),
	(
		1100098,
		1100001,
		'Edelbrock Torker-Plus Pontiac DP Cam',
		NULL,
		3
	),
	(1100100, 1100001, 'Oldsmobile BB HP Cam', NULL, 2),
	(
		1100101,
		1100001,
		'Pontiac m/t Stock Cam',
		NULL,
		1
	),
	(
		1100102,
		1100001,
		'Pontiac Trophy (HP) Cam',
		NULL,
		2
	),
	(1100103, 1100001, 'Ford SB HP Cam', NULL, 2),
	(
		1100104,
		1100001,
		'Ford SB Special Stock Cam',
		NULL,
		1
	),
	(
		1100105,
		1100001,
		'Ford Flathead Power Cam',
		NULL,
		2
	),
	(
		1100106,
		1100001,
		'Buick SB Special Stock Cam',
		NULL,
		1
	),
	(
		1100107,
		1100001,
		'Cadillac BB Midrange Cam',
		NULL,
		2
	),
	(
		1100108,
		1100001,
		'Chevrolet BB Midrange Cam',
		NULL,
		2
	),
	(
		1100109,
		1100001,
		'Chevrolet SB Special Stock Cam',
		NULL,
		1
	),
	(
		1100110,
		1100001,
		'Chrysler BB Midrange Cam',
		NULL,
		2
	),
	(
		1100111,
		1100001,
		'Oldsmobile BB Special Stock Cam',
		NULL,
		1
	),
	(1100112, 1100001, 'Pontiac Midrange Cam', NULL, 2),
	(
		1100113,
		1100001,
		'Shade Tree Chevrolet SB Stock Cam',
		NULL,
		1
	),
	(
		1100114,
		1100001,
		'Cadillac L-Head Camshaft',
		NULL,
		1
	),
	(
		1100115,
		1100001,
		'Buick Nailhead Stock 322 Camshaft',
		NULL,
		1
	),
	(
		1100116,
		1100001,
		'Ford Cleveland Block Stock Camshaft',
		NULL,
		1
	),
	(
		1100117,
		1100001,
		'Ford Cleveland Block Boss Camshaft',
		NULL,
		2
	),
	(
		1100118,
		1100001,
		'Ford Cleveland Block HO Camshaft',
		NULL,
		2
	),
	(
		1100119,
		1100001,
		'Ford 385 Block Stock Camshaft',
		NULL,
		1
	),
	(
		1100120,
		1100001,
		'Ford 385 Block Special Stock Camshaft',
		NULL,
		1
	),
	(
		1100121,
		1100001,
		'Ford Y Stock Camshaft',
		NULL,
		1
	),
	(
		1100122,
		1100001,
		'Chevrolet W Stock Camshaft',
		NULL,
		1
	),
	(
		1100123,
		1100001,
		'Chevrolet W HP Camshaft',
		NULL,
		2
	),
	(
		1100124,
		1100001,
		'Chevrolet W Z11 Camshaft',
		NULL,
		3
	),
	(
		1100125,
		1100001,
		'Buick Nailhead Power Plus',
		NULL,
		2
	),
	(1100126, 1100001, 'Buick Nailhead HP', NULL, 2),
	(
		1100127,
		1100001,
		'Cadillac L-Head Power Plus',
		NULL,
		2
	),
	(1100128, 1100001, 'Cadillac L-Head HP', NULL, 2),
	(1100129, 1100001, 'Ford Y E4 Low Range', NULL, 2),
	(
		1100130,
		1100001,
		'Edelbrock Performer Plus AMC Camshaft',
		NULL,
		3
	),
	(1100131, 1100001, 'AMC WG Camshaft', NULL, 2),
	(
		1100132,
		1100001,
		'Edelbrock Performer Plus Olds SB HP Cam',
		NULL,
		3
	),
	(
		1100133,
		1100001,
		'Edelbrock Performer Plus Olds BB HP Cam',
		NULL,
		3
	),
	(
		1100134,
		1100001,
		'Fyne Grind Y Block Street 36 Cam',
		NULL,
		1
	),
	(
		1100135,
		1100001,
		'Fyne Grind Y Block Street 39 Cam',
		NULL,
		1
	),
	(
		1100136,
		1100001,
		'Fyne Grind Y Block Street 40 Cam',
		NULL,
		1
	),
	(
		1100137,
		1100001,
		'Fyne Grind Y Block Super 39 HP Cam',
		NULL,
		2
	),
	(
		1100138,
		1100001,
		'Fyne Grind Y Block Super 40 HP Cam',
		NULL,
		2
	),
	(
		1100139,
		1100001,
		'Fyne Grind Y Block Super 43 HP Cam',
		NULL,
		2
	),
	(
		1100140,
		1100001,
		'Fyne Grind Y Block Super 44 HP Cam',
		NULL,
		2
	),
	(
		1100141,
		1100001,
		'Fyne Grind Y Block Ultra 44 DP Cam',
		NULL,
		3
	),
	(
		1100142,
		1100001,
		'Fyne Grind Y Block Ultra 48 DP Cam',
		NULL,
		3
	),
	(
		1100143,
		1100001,
		'Fyne Grind Buick Nailhead Street 45 Cam',
		NULL,
		2
	),
	(
		1100144,
		1100001,
		'Fyne Grind Buick Nailhead Street 47 Cam',
		NULL,
		2
	),
	(
		1100145,
		1100001,
		'Fyne Grind Buick Nailhead Street 48 Cam',
		NULL,
		2
	),
	(
		1100146,
		1100001,
		'Fyne Grind Buick Nailhead Super 47 Cam',
		NULL,
		3
	),
	(
		1100147,
		1100001,
		'Fyne Grind Buick Nailhead Super 49 Cam',
		NULL,
		3
	),
	(
		1100148,
		1100001,
		'Buick Nailhead Stock 401 Cam',
		NULL,
		1
	),
	(
		1100149,
		1100001,
		'Buick Nailhead Stock 425 Cam',
		NULL,
		1
	),
	(
		1100150,
		1100001,
		'Oldfield Ford 385 Street King Cam',
		NULL,
		2
	),
	(
		1100151,
		1100001,
		'Oldfield Cleveland Street King Cam',
		NULL,
		2
	),
	(
		1100152,
		1100001,
		'Oldfield Cleveland New Boss Cam',
		NULL,
		3
	),
	(
		1100153,
		1100001,
		'Oldfield Ford 385 New Boss Cam',
		NULL,
		3
	),
	(
		1100154,
		1100001,
		'Walter Hemi Blueprint Classic Cam',
		NULL,
		2
	),
	(
		1100155,
		1100001,
		'Walter Hemi Extra Stock Cam',
		NULL,
		3
	),
	(
		1100156,
		1100001,
		'Leland Cadillac BB Highway Plus Cam',
		NULL,
		1
	),
	(
		1100157,
		1100001,
		'Leland Cadillac BB Streeter Cam',
		NULL,
		2
	),
	(
		1100158,
		1100001,
		'Leland Cadillac Racing Cam',
		NULL,
		4
	),
	(
		1100159,
		1100001,
		'Walter Hemi Bighorn Cam',
		NULL,
		4
	),
	(
		1100160,
		1100001,
		'Chevrolet Chevy SB Corvette (220hp) Cam',
		NULL,
		1
	),
	(
		1100161,
		1100001,
		'Ford 88 Flathead Camshaft',
		NULL,
		2
	),
	(
		1200001,
		1200001,
		'Chevrolet BB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200002,
		1200001,
		'Chrysler SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200003,
		1200001,
		'Ford BB Stock Hydraulic Valve Train',
		NULL,
		1
	),
	(
		1200004,
		1200001,
		'Crane PowerMax Ford BB VT',
		NULL,
		2
	),
	(
		1200005,
		1200001,
		'Ford 385 Boss Solid Lifter Valve Train',
		NULL,
		2
	),
	(
		1200006,
		1200001,
		'Chevrolet BB Hi-Lift Hydraulic Valve Train',
		NULL,
		2
	),
	(
		1200007,
		1200001,
		'Chrysler BB Max Wedge III Valve Train',
		NULL,
		3
	),
	(
		1200008,
		1200001,
		'Crane Energizer Ford BB VT',
		NULL,
		2
	),
	(
		1200009,
		1200001,
		'Reed T-UL Solid Lifter Ford BB Valvetrain',
		NULL,
		2
	),
	(
		1200010,
		1200001,
		'Reed R-ULX Roller Lifter Ford BB Valvetrain',
		NULL,
		3
	),
	(
		1200011,
		1200001,
		'Reed TM Hydraulic Lifter Ford BB Valvetrain',
		NULL,
		2
	),
	(
		1200012,
		1200001,
		'Buick BB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200013,
		1200001,
		'Buick Nailhead Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200014,
		1200001,
		'Cadillac BB Stock Valvetrain',
		NULL,
		1
	),
	(
		1200015,
		1200001,
		'Chrysler BB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200016,
		1200001,
		'Chrysler SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200017,
		1200001,
		'Ford SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200018,
		1200001,
		'Ford Flathead Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200019,
		1200001,
		'Olds BB Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200020,
		1200001,
		'Olds SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200021,
		1200001,
		'AMC Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200022,
		1200001,
		'Buick SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200023,
		1200001,
		'Chevrolet SB Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200024,
		1200001,
		'Chevrolet BB Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200025,
		1200001,
		'Chevrolet BB SS Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200026,
		1200001,
		'Pontiac Ram Air V Solid Lifter Valvetrain',
		NULL,
		3
	),
	(
		1200027,
		1200001,
		'Ford Y Truck Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200028,
		1200001,
		'Ford BB Stock Mechanical Lifter Valvetrain',
		NULL,
		1
	),
	(
		1200029,
		1200001,
		'Ford BB Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200030,
		1200001,
		'Ford BB Cammer Valvetrain',
		NULL,
		4
	),
	(
		1200031,
		1200001,
		'Ford BB SCJ Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200032,
		1200001,
		'Chrysler BB Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200033,
		1200001,
		'Chrysler SB Stock Mechanical Lifter Valvetrain',
		NULL,
		1
	),
	(
		1200034,
		1200001,
		'Chevrolet SB Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200035,
		1200001,
		'Pontiac Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200036,
		1200001,
		'AMC Group 19 Mechanical Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200037,
		1200001,
		'Pontiac SD Mech Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200038,
		1200001,
		'Ford SB HP Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200039,
		1200001,
		'Chrysler Hemi Solid Lifter Valvetrain',
		NULL,
		2
	),
	(
		1200040,
		1200001,
		'Shade Tree Chrysler Hemi Valvetrain',
		NULL,
		1
	),
	(
		1200041,
		1200001,
		'Chrysler Hemi Hydraulic Valvetrain',
		NULL,
		2
	),
	(
		1200042,
		1200001,
		'Cadillac L-Head Valvetrain',
		NULL,
		1
	),
	(
		1200043,
		1200001,
		'Ford Cleveland Block Stock Valvetrain',
		NULL,
		1
	),
	(
		1200044,
		1200001,
		'Ford Cleveland Block Boss Valvetrain',
		NULL,
		2
	),
	(
		1200045,
		1200001,
		'Ford 385 Block Stock Valvetrain',
		NULL,
		1
	),
	(
		1200046,
		1200001,
		'Ford 385 Block SCJ Valvetrain',
		NULL,
		2
	),
	(
		1200047,
		1200001,
		'Ford 385 Block Boss Hydraulic Valvetrain',
		NULL,
		2
	),
	(
		1200048,
		1200001,
		'Ford Y Stock Solid Valvetrain',
		NULL,
		1
	),
	(
		1200049,
		1200001,
		'Chevrolet W Stock Hydraulic Valvetrain',
		NULL,
		1
	),
	(
		1200050,
		1200001,
		'Chevrolet W STT Solid Valvetrain',
		NULL,
		2
	),
	(
		1200051,
		1200001,
		'Buick Nailhead Solid Valvetrain',
		NULL,
		2
	),
	(
		1200052,
		1200001,
		'Buick SB Solid Valvetrain',
		NULL,
		2
	),
	(
		1200053,
		1200001,
		'Buick BB Solid Valvetrain',
		NULL,
		2
	),
	(
		1200054,
		1200001,
		'Cadillac L-Head Super Hydraulic Valvetrain',
		NULL,
		2
	),
	(
		1200055,
		1200001,
		'Ford Flathead Super Hydraulic Valvetrain',
		NULL,
		2
	),
	(
		1200056,
		1200001,
		'Cadillac Solid Valvetrain',
		NULL,
		2
	),
	(
		1200057,
		1200001,
		'Oldsmobile SB Solid Valvetrain',
		NULL,
		2
	),
	(
		1200058,
		1200001,
		'Oldsmobile BB Solid Valvetrain',
		NULL,
		2
	),
	(
		1200059,
		1200001,
		'Edelbrock AMC Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200060,
		1200001,
		'Edelbrock Chevrolet SB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200061,
		1200001,
		'Edelbrock Chevrolet BB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200062,
		1200001,
		'Edelbrock Chrysler SB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200063,
		1200001,
		'Edelbrock Chrysler BB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200064,
		1200001,
		'Edelbrock Ford SB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200065,
		1200001,
		'Edelbrock Ford C Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200066,
		1200001,
		'Edelbrock Ford BB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200067,
		1200001,
		'Edelbrock Ford 385 Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200068,
		1200001,
		'Edelbrock Olds SB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200069,
		1200001,
		'Edelbrock Olds BB Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200070,
		1200001,
		'Edelbrock Pontiac Hydraulic Lifters',
		NULL,
		2
	),
	(
		1200071,
		1200001,
		'Crane PowerMax Roller Ford BB VT',
		NULL,
		3
	),
	(
		1200072,
		1200001,
		'Crane PowerMax AMC VT',
		NULL,
		2
	),
	(
		1200073,
		1200001,
		'Crane PowerMax Roller AMC VT',
		NULL,
		3
	),
	(
		1200074,
		1200001,
		'Crane Energizer Buick SB VT',
		NULL,
		2
	),
	(
		1200075,
		1200001,
		'Crane PowerMax Buick SB VT',
		NULL,
		2
	),
	(
		1200076,
		1200001,
		'Crane Energizer Chevrolet SB VT',
		NULL,
		2
	),
	(
		1200077,
		1200001,
		'Crane PowerMax Chevrolet SB VT',
		NULL,
		2
	),
	(
		1200078,
		1200001,
		'Crane PowerMax Roller Chevrolet SB VT',
		NULL,
		3
	),
	(
		1200079,
		1200001,
		'Crane Energizer Chevrolet BB VT',
		NULL,
		2
	),
	(
		1200080,
		1200001,
		'Crane PowerMax Chevrolet BB VT',
		NULL,
		2
	),
	(
		1200081,
		1200001,
		'Crane PowerMax Roller Chevrolet BB VT',
		NULL,
		3
	),
	(
		1200082,
		1200001,
		'Crane Energizer Chevrolet W VT',
		NULL,
		2
	),
	(
		1200083,
		1200001,
		'Crane PowerMax Chevrolet W VT',
		NULL,
		2
	),
	(
		1200084,
		1200001,
		'Crane PowerMax Roller Chevrolet W VT',
		NULL,
		3
	),
	(
		1200085,
		1200001,
		'Crane Energizer Chrysler SB VT',
		NULL,
		2
	),
	(
		1200086,
		1200001,
		'Crane PowerMax Chrysler SB VT',
		NULL,
		2
	),
	(
		1200087,
		1200001,
		'Crane PowerMax Roller Chrysler SB VT',
		NULL,
		3
	),
	(
		1200088,
		1200001,
		'Crane Energizer Chrysler BB VT',
		NULL,
		2
	),
	(
		1200089,
		1200001,
		'Crane PowerMax Chrysler BB VT',
		NULL,
		2
	),
	(
		1200090,
		1200001,
		'Crane PowerMax Roller Chrysler BB VT',
		NULL,
		3
	),
	(
		1200091,
		1200001,
		'Crane PowerMax Chrysler Hemi VT',
		NULL,
		2
	),
	(
		1200092,
		1200001,
		'Crane PowerMax Roller Chrysler Hemi VT',
		NULL,
		3
	),
	(
		1200093,
		1200001,
		'Crane Energizer Ford SB VT',
		NULL,
		2
	),
	(
		1200094,
		1200001,
		'Crane PowerMax Ford SB VT',
		NULL,
		2
	),
	(
		1200095,
		1200001,
		'Crane PowerMax Roller Ford SB VT',
		NULL,
		3
	),
	(
		1200096,
		1200001,
		'Crane Energizer Ford C VT',
		NULL,
		2
	),
	(
		1200097,
		1200001,
		'Crane PowerMax Ford C VT',
		NULL,
		2
	),
	(
		1200098,
		1200001,
		'Crane PowerMax Roller Ford C VT',
		NULL,
		3
	),
	(
		1200099,
		1200001,
		'Crane Energizer Ford 385 VT',
		NULL,
		2
	),
	(
		1200100,
		1200001,
		'Crane PowerMax Ford 385 VT',
		NULL,
		2
	),
	(
		1200101,
		1200001,
		'Crane PowerMax Roller Ford 385 VT',
		NULL,
		3
	),
	(
		1200102,
		1200001,
		'Crane Energizer Olds SB VT',
		NULL,
		2
	),
	(
		1200103,
		1200001,
		'Crane PowerMax Olds SB VT',
		NULL,
		2
	),
	(
		1200104,
		1200001,
		'Crane PowerMax Roller Olds SB VT',
		NULL,
		3
	),
	(
		1200105,
		1200001,
		'Crane Energizer Pontiac VT',
		NULL,
		2
	),
	(
		1200106,
		1200001,
		'Crane PowerMax Pontiac VT',
		NULL,
		2
	),
	(
		1200107,
		1200001,
		'Crane PowerMax Roller Pontiac VT',
		NULL,
		3
	),
	(
		1200108,
		1200001,
		'Crane Energizer Olds BB VT',
		NULL,
		2
	),
	(
		1200109,
		1200001,
		'Crane PowerMax Olds BB VT',
		NULL,
		2
	),
	(
		1200110,
		1200001,
		'Crane PowerMax Roller Olds BB VT',
		NULL,
		3
	),
	(
		1200111,
		1200001,
		'Oldfield Y Block Street King Solid VT',
		NULL,
		2
	),
	(
		1200112,
		1200001,
		'Oldfield Y Block Strip King Solid VT',
		NULL,
		2
	),
	(
		1200113,
		1200001,
		'Oldfield Y Block Race Pro Roller VT',
		NULL,
		2
	),
	(
		1200114,
		1200001,
		'Quik Lift Y Block Solid VT',
		NULL,
		2
	),
	(
		1200115,
		1200001,
		'Quik Lift Y Block Performance Solid VT',
		NULL,
		2
	),
	(
		1200116,
		1200001,
		'Quik Lift Y Block Race Roller VT',
		NULL,
		2
	),
	(
		1200117,
		1200001,
		'Milloy Y Block Speed Lifter Solid VT',
		NULL,
		2
	),
	(
		1200118,
		1200001,
		'Milloy Y Block Super Lifter Solid VT',
		NULL,
		2
	),
	(
		1200119,
		1200001,
		'Milloy Chevy SB Speed Lifter Solid VT',
		NULL,
		2
	),
	(
		1200120,
		1200001,
		'Milloy Chevy SB Street Plus Hydraulic VT',
		NULL,
		1
	),
	(
		1200121,
		1200001,
		'Milloy Chevy SB Premier Roller VT',
		NULL,
		3
	),
	(
		1200122,
		1200001,
		'Quik Lift Chevy SB Performance Solid VT',
		NULL,
		2
	),
	(
		1200123,
		1200001,
		'Quik Lift Chevy SB Performance Hydraulic VT',
		NULL,
		2
	),
	(
		1200124,
		1200001,
		'Quik Lift Chevy SB Race Roller VT',
		NULL,
		2
	),
	(
		1200125,
		1200001,
		'Milloy Buick Nailhead Super Lift Solid VT',
		NULL,
		2
	),
	(
		1200126,
		1200001,
		'Quik Lift Buick Nailhead Perf. Hydraulic VT',
		NULL,
		2
	),
	(
		1200127,
		1200001,
		'Dunbar Buick Nailhead Craftsmith Roller VT',
		NULL,
		2
	),
	(
		1200128,
		1200001,
		'Quik Lift Buick Nailhead Race Roller VT',
		NULL,
		2
	),
	(
		1200129,
		1200001,
		'Quik Lift Buick Nailhead Solid VT',
		NULL,
		2
	),
	(
		1200130,
		1200001,
		'Milloy Buick Nailhead Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200131,
		1200001,
		'Dunbar Buick Nailhead Craftsmith Hydraulic VT',
		NULL,
		1
	),
	(
		1200132,
		1200001,
		'Dunbar Buick Nailhead Craftsmith Solid VT',
		NULL,
		2
	),
	(
		1200133,
		1200001,
		'Oldfield Ford SB Street King Solid VT',
		NULL,
		2
	),
	(
		1200134,
		1200001,
		'Oldfield Ford SB Strip King Solid VT',
		NULL,
		2
	),
	(
		1200135,
		1200001,
		'Milloy Ford SB Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200136,
		1200001,
		'Millory Ford SB Strip King Solid VT',
		NULL,
		2
	),
	(
		1200137,
		1200001,
		'Quik Lift Ford SB Solid VT',
		NULL,
		2
	),
	(
		1200138,
		1200001,
		'Quik Lift Ford SB Performance Hydraulic VT',
		NULL,
		2
	),
	(
		1200139,
		1200001,
		'Quik Lift Ford SB Race Rolller VT',
		NULL,
		2
	),
	(
		1200140,
		1200001,
		'Milloy Ford SB Super Lift Solid VT',
		NULL,
		2
	),
	(
		1200141,
		1200001,
		'Milloy Chrysler SB Super Lift Solid VT',
		NULL,
		2
	),
	(
		1200142,
		1200001,
		'Milloy Chrysler SB Premier Roller VT',
		NULL,
		3
	),
	(
		1200143,
		1200001,
		'Quik Lift Chrysler SB Race Roller VT',
		NULL,
		2
	),
	(
		1200144,
		1200001,
		'Milloy Pontiac Premier Roller VT',
		NULL,
		3
	),
	(
		1200145,
		1200001,
		'Quik Lift Pontiac Race Roller VT',
		NULL,
		3
	),
	(
		1200146,
		1200001,
		'Milloy Cleveland Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200147,
		1200001,
		'Milloy Cleveland Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200148,
		1200001,
		'Milloy Cleveland Premier Roller VT',
		NULL,
		4
	),
	(
		1200149,
		1200001,
		'Oldfield Cleveland Strip King Roller VT',
		NULL,
		3
	),
	(
		1200150,
		1200001,
		'Oldfield Cleveland Track King Roller VT',
		NULL,
		4
	),
	(
		1200151,
		1200001,
		'Milloy Ford 385 Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200152,
		1200001,
		'Milloy Ford 385 Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200153,
		1200001,
		'Milloy Ford 385 Premier Roller VT',
		NULL,
		4
	),
	(
		1200154,
		1200001,
		'Oldfield Ford 385 Strip King Roller VT',
		NULL,
		3
	),
	(
		1200155,
		1200001,
		'Oldfield Ford 385 Track King Roller VT',
		NULL,
		4
	),
	(
		1200156,
		1200001,
		'Milloy Hemi Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200157,
		1200001,
		'Milloy Hemi Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200158,
		1200001,
		'Milloy Hemi Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200159,
		1200001,
		'Millloy Hemi Premier Roller VT',
		NULL,
		4
	),
	(
		1200160,
		1200001,
		'Quik Lift Hemi Race Roller VT',
		NULL,
		3
	),
	(
		1200161,
		1200001,
		'Millloy Cadillac BB Street Plus Hydraulic VT',
		NULL,
		1
	),
	(
		1200162,
		1200001,
		'Milloy Cadillac BB Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200163,
		1200001,
		'Milloy Cadillac BB Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200164,
		1200001,
		'Milloy Cadillac BB Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200165,
		1200001,
		'Milloy Cadillac BB Premier Roller VT',
		NULL,
		4
	),
	(
		1200166,
		1200001,
		'Quik Lift Cadillac BB Perf. Hydraulic VT',
		NULL,
		2
	),
	(
		1200167,
		1200001,
		'Quik Lift Cadillac BB Perf. Solid VT',
		NULL,
		2
	),
	(
		1200168,
		1200001,
		'Quik Lift Cadillac BB Race Roller VT',
		NULL,
		3
	),
	(
		1200169,
		1200001,
		'Milloy Chevy W Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200170,
		1200001,
		'Milloy Chevy W Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200171,
		1200001,
		'Milloy Chevy W Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200172,
		1200001,
		'Milloy Chevy W Premier Roller VT',
		NULL,
		4
	),
	(
		1200173,
		1200001,
		'Quik Lift Chevy W Perf. Hydraulic VT',
		NULL,
		2
	),
	(
		1200174,
		1200001,
		'Quik Lift Chevy W Perf. Solid VT',
		NULL,
		2
	),
	(
		1200175,
		1200001,
		'Quik Lift Chevy W Race Roller VT',
		NULL,
		3
	),
	(
		1200176,
		1200001,
		'Milloy AMC Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200177,
		1200001,
		'Milloy AMC Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200178,
		1200001,
		'Milloy AMC Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200179,
		1200001,
		'Milloy AMC Premier Roller VT',
		NULL,
		4
	),
	(
		1200180,
		1200001,
		'Quik Lift AMC Perf. Hydraulic VT',
		NULL,
		2
	),
	(
		1200181,
		1200001,
		'Quik Lift AMC Perf. Solid VT',
		NULL,
		2
	),
	(
		1200182,
		1200001,
		'Quik Lift AMC Race Roller VT',
		NULL,
		3
	),
	(
		1200183,
		1200001,
		'Milloy Olds BB Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200184,
		1200001,
		'Milloy Olds BB Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200185,
		1200001,
		'Milloy Olds BB Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200186,
		1200001,
		'Milloy Olds BB Premier Roller VT',
		NULL,
		4
	),
	(
		1200187,
		1200001,
		'Milloy Chrysler BB Speed Lift Hydraulic VT',
		NULL,
		2
	),
	(
		1200188,
		1200001,
		'Milloy Chrysler BB Speed Lift Solid VT',
		NULL,
		2
	),
	(
		1200189,
		1200001,
		'Milloy Chrysler BB Super Lift Solid VT',
		NULL,
		3
	),
	(
		1200190,
		1200001,
		'Milloy Chrysler BB Premier Roller VT',
		NULL,
		4
	),
	(
		1200191,
		1200001,
		'Milloy Chevy BB Premier Roller VT',
		NULL,
		4
	),
	(
		1200192,
		1200001,
		'Quik Lift Chevy BB Race Roller VT',
		NULL,
		3
	),
	(
		1200193,
		1200001,
		'Crane PowerMax Ford Flathead VT',
		NULL,
		2
	)
on conflict do nothing;
-- +goose StatementEnd
