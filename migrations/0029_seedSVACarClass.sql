-- +goose Up
-- +goose StatementBegin
INSERT INTO
	sva_car_class (sva_car_class, "description")
VALUES
	(0, 'Null'),
	(1, 'Fat Fender'),
	(2, 'Shoebox'),
	(3, 'Muscle')
on conflict do nothing;
-- +goose StatementEnd