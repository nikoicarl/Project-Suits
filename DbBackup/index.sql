-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 06, 2024 at 07:52 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

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
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `documentID` bigint(100) NOT NULL,
  `userID` bigint(100) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleID` bigint(100) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleID`, `role`, `description`, `status`) VALUES
(1, 'System Administrator', 'sysadmin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `sessionID` bigint(100) NOT NULL,
  `userID` bigint(100) DEFAULT NULL,
  `DateTime` text DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`sessionID`, `userID`, `DateTime`, `activity`) VALUES
(1418576, 1001, '2024-05-27 13:09:22', 'logged into system'),
(1771197, 1001, '2024-05-30 12:25:31', 'logged out of system'),
(10871987, 1001, '2024-05-30 10:24:02', 'logged into system'),
(11170170, 1001, '2024-05-30 13:30:27', 'logged out of system'),
(11377124, 1001, '2024-05-31 20:58:29', 'logged out of system'),
(11547771, 1001, '2024-05-31 10:11:07', 'logged out of system'),
(11571717, 1001, '2024-05-31 09:06:39', 'logged into system'),
(11737712, 1001, '2024-05-30 20:48:21', 'logged out of system'),
(11870378, 1001, '2024-06-02 19:13:58', 'logged into system'),
(11880476, 1001, '2024-05-27 13:13:57', 'logged out of system'),
(12785164, 1001, '2024-05-27 13:42:48', 'logged out of system'),
(15174077, 1001, '2024-06-03 14:39:17', 'logged into system'),
(16419748, 1001, '2024-05-27 14:22:33', 'logged out of system'),
(16777311, 1001, '2024-06-02 13:55:58', 'logged into system'),
(17098197, 1001, '2024-05-30 13:10:05', 'logged into system'),
(17178531, 1001, '2024-06-02 19:25:25', 'logged into system'),
(17617350, 1001, '2024-06-05 22:51:28', 'logged into system'),
(17731241, 1001, '2024-05-31 20:58:39', 'logged into system'),
(17738511, 1001, '2024-06-02 19:25:18', 'logged out of system'),
(17812571, 1001, '2024-05-30 21:08:46', 'logged into system'),
(17861644, 1001, '2024-05-27 14:18:15', 'logged into system'),
(17868114, 1001, '2024-05-27 15:15:01', 'logged out of system'),
(17917001, 1001, '2024-05-30 13:29:53', 'logged into system'),
(18718642, 1001, '2024-05-27 15:16:45', 'logged into system'),
(18746118, 1001, '2024-05-27 15:15:09', 'logged into system'),
(19081777, 1001, '2024-05-30 12:37:59', 'logged into system'),
(19760172, 1001, '2024-05-28 13:10:42', 'logged into system'),
(21377612, 1001, '2024-06-02 14:04:06', 'logged out of system'),
(21707196, 1001, '2024-05-28 13:10:35', 'logged out of system'),
(22711017, 1001, '2024-05-30 13:50:26', 'logged into system'),
(37167167, 1001, '2024-06-02 18:03:56', 'logged out of system'),
(41617881, 1001, '2024-05-27 15:16:01', 'logged out of system'),
(45716814, 1001, '2024-05-27 14:30:52', 'logged into system'),
(47171468, 1001, '2024-05-27 14:19:12', 'logged out of system'),
(47614971, 1001, '2024-05-28 18:06:39', 'logged into system'),
(51711774, 1001, '2024-05-31 10:11:15', 'logged into system'),
(59781761, 1001, '2024-05-27 17:59:37', 'logged into system'),
(61447871, 1001, '2024-05-27 14:19:27', 'logged into system'),
(61870173, 1001, '2024-05-30 03:10:25', 'logged into system'),
(64771791, 1001, '2024-06-03 22:41:22', 'logged into system'),
(66171377, 1001, '2024-06-02 18:04:04', 'logged into system'),
(67271179, 1001, '2024-05-28 13:22:35', 'logged out of system'),
(67418451, 1001, '2024-05-27 14:15:31', 'logged out of system'),
(67814110, 1001, '2024-05-27 13:16:42', 'logged out of system'),
(70191170, 1001, '2024-05-30 13:29:34', 'logged out of system'),
(71538618, 1001, '2024-05-27 18:05:13', 'logged out of system'),
(71871078, 1001, '2024-05-30 09:51:37', 'logged into system'),
(71879170, 1001, '2024-05-30 12:37:52', 'logged out of system'),
(75717141, 1001, '2024-05-31 09:56:21', 'logged into system'),
(75921176, 1001, '2024-06-01 08:48:23', 'logged out of system'),
(76112977, 1001, '2024-05-28 13:22:11', 'logged out of system'),
(76116068, 1001, '2024-05-27 18:43:29', 'logged into system'),
(76811177, 1001, '2024-05-31 11:04:32', 'logged into system'),
(77101272, 1001, '2024-05-31 19:00:42', 'logged into system'),
(77126173, 1001, '2024-06-02 14:12:26', 'logged into system'),
(78261145, 1001, '2024-05-27 13:42:55', 'logged into system'),
(81081777, 1001, '2024-05-30 09:51:36', 'logged into system'),
(81127771, 1001, '2024-05-30 20:57:25', 'logged into system'),
(84186271, 1001, '2024-05-27 15:17:30', 'logged out of system'),
(84611017, 1001, '2024-05-27 13:16:47', 'logged into system'),
(86071137, 1001, '2024-05-30 03:10:15', 'logged out of system'),
(87119976, 1001, '2024-05-29 08:50:42', 'logged into system'),
(87811460, 1001, '2024-05-27 13:14:02', 'logged into system'),
(91676291, 1001, '2024-05-28 13:09:12', 'logged into system'),
(91777012, 1001, '2024-05-30 12:27:12', 'logged into system'),
(97088711, 1001, '2024-05-30 10:23:56', 'logged out of system'),
(97767112, 1001, '2024-05-28 13:22:21', 'logged into system');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` bigint(100) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `roleID` bigint(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `roleID`, `status`) VALUES
(1001, 'admin', '827ccb0eea8a706c4c34a16891f84e7b', 1, 'admin'),
(1002, '321312', '31231', 123123, '31231');

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
  ADD PRIMARY KEY (`sessionID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
