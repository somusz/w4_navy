CREATE TABLE fleet (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(25) NOT NULL
);

CREATE TABLE ship (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(25) NOT NULL,
  date_built DATE,
  fleet_id INTEGER REFERENCES fleet(id)
);

CREATE TABLE duty (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)
);

CREATE TABLE sailor (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255),
  birth_date DATE
);

CREATE TABLE log (
  day DATE NOT NULL,
  sailor_id INTEGER REFERENCES sailor(id) NOT NULL,
  duty_id INTEGER REFERENCES duty(id),
  ship_id INTEGER REFERENCES ship(id),
  rank VARCHAR(25),
  PRIMARY KEY (day,sailor_id)
);
