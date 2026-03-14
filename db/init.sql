CREATE DATABASE sigillium_db;

CREATE TYPE user_role as ENUM('ADMIN','ORG_OWNER','PARTICIPANT')

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role user_role NOT NULL DEFAULT 'PARTICIPANT'
);

INSERT INTO users (email, password) 
VALUES ('test@example.com', '$2b$10$nzoV17di3tJeLLcYBnaRP.UXvJzW3KkgB1Wq8.4OwlEVdSlAvmqWu');

INSERT INTO users(email, password, role)
VALUES ('admin@example.com', '$2b$10$xdspo7yUV1D.1rTAI7/ujuGPwIWM9tvHNGGfYztJ8VXYJ5uOUJCl.');