-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 29, 2024 at 05:51 AM
-- Server version: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_suits_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `departmentID` bigint(100) NOT NULL,
  `userID` bigint(100) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`departmentID`, `userID`, `department`, `description`, `status`) VALUES
(1, NULL, 'Admin', 'Administrator', 'a'),
(2, NULL, 'Lawyers', 'Lawyers Department', 'a'),
(3, NULL, 'Paralegal', 'Paralegal Department', 'a'),
(4, NULL, 'Human Resource', 'HR Department', 'a'),
(5, NULL, 'Accounting', 'Accounting Department', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `documentID` bigint(100) NOT NULL,
  `userID` bigint(100) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleID` bigint(100) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleID`, `role`, `description`, `status`) VALUES
(100, 'Admin', 'The Administrator has full access to the system. It can manage the departments, users and their privileges.', 'ad'),
(200, 'Lawyer', 'This role code is for lawyers. Specifically, it is for the Sr. Corporate Lawyer of the firm.', 'a'),
(201, 'Lawyer', 'This role code is for lawyers. Specifically, this role is for the Sr. Civil Lawyer of the firm.', 'a'),
(202, 'Lawyer', 'This role code is for lawyers. Specifically, it is for the Sr. Criminal Lawyer of the firm.', 'a'),
(203, 'Lawyer', 'This role code is for lawyers. Specifically, it is for the Sr. Financial Lawyer of the firm.', 'a'),
(210, 'Associate', 'This role code is for Junior Associates. Specifically, this role is for Jr. Associate for 200.', 'a'),
(211, 'Associate', 'This role code is for Junior Associates. Specifically, this role is for Jr. Associate for 201.', 'a'),
(212, 'Associate', 'This role code is for Junior Associates. Specifically, this role is for Jr. Associate for 202.', 'a'),
(213, 'Associate', 'This role code is for Junior Associates. Specifically, this role is for Jr. Associate for 203.', 'a'),
(301, 'Paralegals', 'This role code is for paralegals. Specifically, it is for the Sr. Paralegal of the firm.', 'a'),
(311, 'Assistant Paralegal', 'This role code is for Junior Paralegals. Specifically, this role is for Jr. Paralegal for 301.', 'a'),
(401, 'Human Resources', 'This role code is for HR employees. Specifically, it is for the Sr. HR Manager of the firm.', 'a'),
(411, 'Assistant HR', 'This role code is for Junior Associates. Specifically, this role is for Jr. HR Manager for 401.', 'a'),
(501, 'Accounting Manager', 'This role code is for accountants. Specifically, it is for the Sr. Accounting Manager of the firm.', 'a'),
(511, 'Junior Accountant', 'This role code is for Junior Associates. Specifically, this role is for a Jr. Accountant for 501.', 'a');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sessionID` bigint(100) NOT NULL,
  `userID` bigint(100) DEFAULT NULL,
  `DateTime` text,
  `activity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`sessionID`, `userID`, `DateTime`, `activity`) VALUES
(5187311, 2001, '2024-06-13 10:58:55', 'logged into system'),
(11317018, 1001, '2024-06-13 10:51:44', 'logged into system'),
(11762390, 1001, '2024-06-28 20:33:31', 'logged into system'),
(13781013, 1001, '2024-06-13 10:56:11', 'logged out of system'),
(14475167, 1, '2024-06-03 15:43:32', 'logged into system'),
(17177863, 1, '2024-06-02 18:07:32', 'logged into system'),
(17418137, 1, '2024-06-03 09:23:41', 'logged into system'),
(17471295, 1, '2024-06-03 15:15:40', 'logged out of system'),
(17651574, 1, '2024-06-03 16:15:38', 'logged out of system'),
(25178741, 1, '2024-06-03 15:14:34', 'logged into system'),
(27874115, 1, '2024-06-03 15:14:28', 'logged out of system'),
(31769172, 1001, '2024-06-28 20:45:13', 'logged out of system'),
(32591617, 2001, '2024-06-28 18:41:58', 'logged into system'),
(37171773, 1, '2024-06-02 18:15:08', 'logged out of system'),
(41318717, 1, '2024-06-03 09:24:48', 'logged out of system'),
(41752917, 1, '2024-06-03 15:15:52', 'logged into system'),
(41926710, 2001, '2024-06-28 17:20:44', 'logged into system'),
(47157013, 1, '2024-06-03 15:16:51', 'logged out of system'),
(54187171, 1, '2024-06-03 14:56:50', 'logged into system'),
(56174715, 1, '2024-06-03 16:15:40', 'logged into system'),
(57701145, 1, '2024-06-03 15:50:10', 'logged into system'),
(63717817, 1, '2024-06-02 18:06:51', 'logged into system'),
(63912751, 2001, '2024-06-28 18:41:55', 'logged out of system'),
(71129365, 2001, '2024-06-28 18:42:14', 'logged out of system'),
(71178376, 1, '2024-06-02 18:07:30', 'logged out of system'),
(71447518, 1, '2024-06-03 15:47:42', 'logged into system'),
(71654571, 1, '2024-06-03 16:15:50', 'logged out of system'),
(79161235, 1001, '2024-06-28 18:42:46', 'logged into system'),
(81170368, 1001, '2024-06-10 18:13:15', 'logged into system');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` bigint(100) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text,
  `roleID` bigint(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `roleID`, `status`) VALUES
(1001, 'Jessica Pearson', '827ccb0eea8a706c4c34a16891f84e7b', 100, 'ad'),
(2001, 'Harvey Specter', 'd0970714757783e6cf17b26fb8e2298f', 200, 'a'),
(2011, 'Louis Litt', 'd0970714757783e6cf17b26fb8e2298f', 201, 'a'),
(2012, 'Katrina Bennett', 'd0970714757783e6cf17b26fb8e2298f', 211, 'a'),
(2021, 'Samantha Wheeler', 'd0970714757783e6cf17b26fb8e2298f', 202, 'a'),
(2022, 'Dana Scott', 'd0970714757783e6cf17b26fb8e2298f', 212, 'a'),
(2031, 'Alex Williams', 'd0970714757783e6cf17b26fb8e2298f', 203, 'a'),
(2032, 'Travis Tanner', 'd0970714757783e6cf17b26fb8e2298f', 213, 'a'),
(3001, 'Rachel Zane', '2bd12a930c3012f9bb4e0ea9bec9a3fc', 301, 'a'),
(3011, 'Harold Gunderson', '2bd12a930c3012f9bb4e0ea9bec9a3fc', 311, 'a'),
(4001, 'Donna Paulson', '674f3c2c1a8a6f90461e8a66fb5550ba', 401, 'a'),
(4011, 'Gretchen', '674f3c2c1a8a6f90461e8a66fb5550ba', 411, 'a'),
(5001, 'Nathan Kruger', '91022ad929eaa50da47fb4d9e820b6cc', 501, 'a'),
(5011, 'Jeff Malone', '91022ad929eaa50da47fb4d9e820b6cc', 511, 'a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`departmentID`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`documentID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`sessionID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
