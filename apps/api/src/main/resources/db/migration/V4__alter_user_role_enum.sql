-- Align users.role column with Hibernate 6 MySQL enum mapping
ALTER TABLE users
  MODIFY COLUMN role ENUM('CUSTOMER','ADMIN') NOT NULL DEFAULT 'CUSTOMER';
