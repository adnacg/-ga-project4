CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  email varchar(255) UNIQUE,
  password_hash varchar(255),
  address varchar(255),
  unit varchar(255),
  postal varchar(255),
  phone varchar(255),
  is_deleted varchar(255)
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name varchar(255),
);

CREATE TABLE IF NOT EXISTS brands (
  id SERIAL PRIMARY KEY,
  name varchar(255),
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name varchar(255),
  img varchar(255),
  price varchar(255),
  brand_id INTEGER
);

CREATE TABLE IF NOT EXISTS category_product (
  id SERIAL PRIMARY KEY,
  category_id INTEGER,
  product_id INTEGER --has many
);

CREATE TABLE IF NOT EXISTS user_product (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  product_id INTEGER --has many
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  date timestamp DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER,
  status varchar(255) -- preparing, otw, arrived, closed
);

CREATE TABLE IF NOT EXISTS order_product (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER --has many
);