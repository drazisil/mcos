-- +goose Up
-- +goose StatementBegin
INSERT INTO
	driver_class (driver_class_id, driver_class)
VALUES
	(0, 'C'),
	(1, 'B'),
	(2, 'A')
on conflict do nothing;
-- +goose StatementEnd