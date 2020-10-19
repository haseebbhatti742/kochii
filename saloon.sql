-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2020 at 09:50 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saloon`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `appointment_date` text DEFAULT NULL,
  `appointment_time` text DEFAULT NULL,
  `appointment_status` text NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `user_id` text DEFAULT NULL,
  `appointment_services` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `appointment_date`, `appointment_time`, `appointment_status`, `employee_id`, `user_id`, `appointment_services`) VALUES
(27, 'Sat Jul 25 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'rejected', NULL, 'haseeb123', ''),
(28, 'Wed Jul 29 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'rejected', NULL, 'haseeb123', ''),
(29, '2020-07-27T19:00:00.000Z', '12:53', 'cancelled', 9, 'hamza123', ''),
(30, 'Sat Jul 25 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'rejected', NULL, 'hamza123', ''),
(31, 'Mon Jul 27 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'cancelled', NULL, 'haseeb123', ''),
(32, 'Fri Jul 31 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'cancelled', NULL, 'haseeb123', ''),
(33, 'Sat Jul 25 2020 00:00:00 GMT+0500 (Pakistan Standard Time)', NULL, 'cancelled', NULL, 'hamza123', ''),
(34, '2020-07-25T19:00:00.000Z', '12:30', 'cancelled', 9, 'haseeb123', ''),
(35, '2020-07-27T19:00:00.000Z', '10:57', 'cancelled', 9, 'haseeb123', ''),
(36, '2020-07-27T19:00:00.000Z', '11:18', 'accepted', 9, 'haseeb123', '');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_services`
--

CREATE TABLE `appointment_services` (
  `as_id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointment_services`
--

INSERT INTO `appointment_services` (`as_id`, `appointment_id`, `service_id`) VALUES
(40, 27, 2),
(41, 28, 4),
(42, 29, 5),
(43, 29, 2),
(44, 29, 4),
(45, 29, 3),
(46, 30, 3),
(47, 31, 2),
(48, 31, 4),
(49, 32, 2),
(50, 32, 3),
(51, 33, 2),
(52, 33, 4),
(53, 34, 3),
(54, 35, 2),
(55, 35, 3),
(56, 36, 4);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `username` text DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `day` int(11) DEFAULT NULL,
  `month` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`cart_id`, `username`, `product_id`, `quantity`, `day`, `month`, `year`, `status`) VALUES
(22, 'hamza123', 10, 2, 24, 7, 2020, 'new'),
(29, 'haseeb123', 15, 1, 26, 7, 2020, 'new'),
(30, 'haseeb123', 6, 6, 26, 7, 2020, 'new'),
(31, 'haseeb123', 5, 2, 26, 7, 2020, 'new');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` text DEFAULT NULL,
  `employee_contact` text DEFAULT NULL,
  `employee_address` text DEFAULT NULL,
  `employee_dob` text DEFAULT NULL,
  `employee_cnic` text DEFAULT NULL,
  `employee_role` text NOT NULL,
  `employee_username` text NOT NULL,
  `employee_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_name`, `employee_contact`, `employee_address`, `employee_dob`, `employee_cnic`, `employee_role`, `employee_username`, `employee_password`) VALUES
(5, 'Hamza Asif', '03062244907', 'Degan Wala Bazaar, Gujranwala', '1996-12-04', '34100-1111-12', 'receptionist', 'hamza123', '123456'),
(9, 'Haseeb', '03062244907', 'Lodhran', '1996-07-21', '369203-7903700-3', 'employee', 'hasee123', '123456'),
(14, 'Haider', '03001234567', 'gdajsdhd', '1996-02-01', '34101-1111111-1', 'employee', 'haider123', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `managers`
--

CREATE TABLE `managers` (
  `manager_id` int(11) NOT NULL,
  `fullname` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `dp` text DEFAULT NULL,
  `status1` text DEFAULT NULL,
  `status2` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `managers`
--

INSERT INTO `managers` (`manager_id`, `fullname`, `username`, `email`, `password`, `contact_number`, `dp`, `status1`, `status2`) VALUES
(1, 'Usama', 'usama123', 'usama@gmail.com', '123456', '923062244908', NULL, NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `usertype` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `appointments` int(11) DEFAULT NULL,
  `notification_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `usertype`, `username`, `appointments`, `notification_message`) VALUES
(36, 'client', 'haseeb123', NULL, '28-7-2020 appointment at 10:57 has been approved'),
(38, 'client', 'haseeb123', NULL, '28-7-2020 appointment at 11:18 has been approved');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` text DEFAULT NULL,
  `product_price` double DEFAULT NULL,
  `product_quantity` int(11) DEFAULT NULL,
  `product_minQuantity` int(11) DEFAULT NULL,
  `product_desc` text DEFAULT NULL,
  `product_image` text NOT NULL,
  `product_status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_price`, `product_quantity`, `product_minQuantity`, `product_desc`, `product_image`, `product_status`) VALUES
(4, 'Hair Oil', 1500, 4, 1, 'This is hair oil for nourishing', '', 'available'),
(5, 'Nail Polish', 150, 30, 5, 'This is nail polish or nail painting', '', 'available'),
(6, 'Maskara', 350, 60, 10, 'This is maskara for eyes', '', 'available'),
(10, 'Hair Tonic for men', 10, 5, 2, 'This is hair tonic', '', 'available'),
(15, 'hey', 2000, 2, 1, 'this is hedhsvcdscvh', '', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `receptionists`
--

CREATE TABLE `receptionists` (
  `rec_id` int(11) NOT NULL,
  `fullname` text DEFAULT NULL,
  `username` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `dp` text DEFAULT NULL,
  `status1` text DEFAULT NULL,
  `status2` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `service_name` text DEFAULT NULL,
  `service_price` int(11) DEFAULT NULL,
  `service_desc` text DEFAULT NULL,
  `service_status` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `service_name`, `service_price`, `service_desc`, `service_status`) VALUES
(2, 'Hair Style Cutting', 250, 'Rs 250 for simple hair style cutting', 'available'),
(3, 'Pedicure', 2000, 'Rs 2000 only for total pedicure', 'available'),
(4, 'Menicure', 2500, 'Rs 2500 only for total menicure', 'available'),
(5, 'Pedicure1', 200, 'jhgajsghajs', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `fullname` text NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `address` text NOT NULL,
  `contact_number` text NOT NULL,
  `dp` text NOT NULL,
  `status` text NOT NULL,
  `status2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `fullname`, `username`, `email`, `password`, `address`, `contact_number`, `dp`, `status`, `status2`) VALUES
(50, 'Haseeb Ahmed', 'haseeb123', 'haseebbhatti742@gmail.com', '123456', 'Thant Wala Bazaar, Gali Sheikh Shulam Hussain wali', '+923062244907', '', '', 'active'),
(51, 'Hamza Asif', 'hamza123', '15140061@gift.edu.pk', '123456', 'Thant Wala Bazaar, Gali Sheikh Shulam Hussain wali', '+923062244907', '', '', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `user_id` (`user_id`(3072)),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `appointment_services`
--
ALTER TABLE `appointment_services`
  ADD PRIMARY KEY (`as_id`),
  ADD KEY `appointment_services_ibfk_1` (`appointment_id`),
  ADD KEY `appointment_services_ibfk_2` (`service_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `cart_ibfk_1` (`product_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `managers`
--
ALTER TABLE `managers`
  ADD PRIMARY KEY (`manager_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `receptionists`
--
ALTER TABLE `receptionists`
  ADD PRIMARY KEY (`rec_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `appointment_services`
--
ALTER TABLE `appointment_services`
  MODIFY `as_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `managers`
--
ALTER TABLE `managers`
  MODIFY `manager_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `receptionists`
--
ALTER TABLE `receptionists`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `appointment_services`
--
ALTER TABLE `appointment_services`
  ADD CONSTRAINT `appointment_services_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `appointment_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
