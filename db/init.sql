CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,

  CONSTRAINT users_email_key UNIQUE (email),
  CONSTRAINT users_role_check CHECK (
    role IN ('EMPLOYEE', 'MANAGER')
  )
);

CREATE TABLE work_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_date DATE NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
  user_id UUID NOT NULL,

  CONSTRAINT work_locations_location_check CHECK (
    location IN ('WFO', 'WFH', 'LEAVE', 'HOLIDAY')
  ),

  CONSTRAINT fk_work_locations_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

  CONSTRAINT ux_work_locations_user_date
    UNIQUE (user_id, work_date)
);

CREATE INDEX idx_work_locations_date
  ON work_locations (work_date);

CREATE INDEX idx_work_locations_location
  ON work_locations (location);

CREATE INDEX idx_work_locations_user
  ON work_locations (user_id);
