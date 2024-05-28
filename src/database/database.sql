CREATE DATABASE Prestamos_Database;

USE Prestamos_Database;

CREATE TABLE `clients` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `amounts` (
  `id_amount` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_amount`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `time_periods` (
  `id_time_period` int(11) NOT NULL AUTO_INCREMENT,
  `time_period` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_time_period`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `loans` (
  `id_loan` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `id_amount` int(11) NOT NULL,
  `id_time_period` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_loan`),
  FOREIGN KEY (`id_client`) REFERENCES `clients`(`id_client`),
  FOREIGN KEY (`id_amount`) REFERENCES `amounts`(`id_amount`),
  FOREIGN KEY (`id_time_period`) REFERENCES `time_periods`(`id_time_period`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `clients` (`name`, `lastname`, `email`, `contact`, `address`) 
VALUES ('Juan', 'Perez', 'Juan@email.com', '1234567890', 'Calle 123 # 123'),
       ('Maria', 'Lopez', 'Maria@email.com', '0987654321', 'Calle 321 # 321');


-- Path: server/src/models/database.js
