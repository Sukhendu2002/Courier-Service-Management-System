-- creating schema
CREATE SCHEMA `courier_system` ;

-- admin table
CREATE TABLE `courier_system`.`admin` (
  `admin_id` INT NOT NULL AUTO_INCREMENT,
  `admin_name` VARCHAR(50) NOT NULL,
  `admin_email` VARCHAR(50) NOT NULL,
  `admin_password` TEXT NOT NULL,
  `created_at` DATE NOT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE INDEX `admin_id_UNIQUE` (`admin_id` ASC) VISIBLE,
  UNIQUE INDEX `admin_email_UNIQUE` (`admin_email` ASC) VISIBLE);
  
-- branch table
CREATE TABLE `courier_system`.`branch` (
  `branch_id` INT NOT NULL AUTO_INCREMENT,
  `branch_name` VARCHAR(45) NOT NULL,
  `branch_address` TEXT NOT NULL,
  PRIMARY KEY (`branch_id`));

-- customer table
CREATE TABLE `courier_system`.`customer` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(45) NOT NULL,
  `customer_email` VARCHAR(45) NOT NULL,
  `customer_password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`customer_id`));

-- parcel table
CREATE TABLE `courier_system`.`parcel` (
  `parcel_id` VARCHAR(6) NOT NULL,
  `customer_id` INT NOT NULL,
  `parcel_name` VARCHAR(45) NOT NULL,
  `sender_branch_id` INT NOT NULL,
  `receiver_branch_id` INT NOT NULL,
  `created_at` VARCHAR(11) NOT NULL,
  `expected_delivery_date` VARCHAR(11) NOT NULL,
  `parcel_status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`parcel_id`),
  UNIQUE INDEX `parcel_id_UNIQUE` (`parcel_id` ASC) VISIBLE);