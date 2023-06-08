-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 07:49 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pixelplayground`
--

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `history` int(11) DEFAULT NULL,
  `highscore` int(11) DEFAULT NULL,
  `playedcount` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `name`, `history`, `highscore`, `playedcount`, `score`) VALUES
(1, 'Hangman', NULL, NULL, 0, NULL),
(2, 'Snake', NULL, NULL, 0, NULL),
(3, 'Pong', NULL, NULL, 0, NULL),
(4, 'Crazy Pong', NULL, NULL, 0, NULL),
(5, 'Illusion Pong', NULL, NULL, 0, NULL),
(6, 'Tic_Tac_Toe', NULL, NULL, 0, NULL),
(7, 'Tetris', NULL, NULL, 0, NULL),
(8, 'Scramble', NULL, NULL, 0, NULL),
(9, 'Memory', NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `highscore`
--

CREATE TABLE `highscore` (
  `id` int(11) NOT NULL,
  `game_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `highscore`
--

INSERT INTO `highscore` (`id`, `game_id`, `user_id`, `score`) VALUES
(43, 3, 5, 15),
(52, 2, 5, 3);

-- --------------------------------------------------------

--
-- Stand-in structure for view `top_scores`
-- (See below for the actual view)
--
CREATE TABLE `top_scores` (
`id` int(11)
,`name` varchar(30)
,`username` varchar(30)
,`score` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(2, 'mehdi', '$2y$10$PmhuY4VqkdMgx8cWuve3oeYMwvC6TqBtYWWqx0p0Zz292kA.u.D9S'),
(5, 'him', '');

-- --------------------------------------------------------

--
-- Structure for view `top_scores`
--
DROP TABLE IF EXISTS `top_scores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `top_scores`  AS SELECT `h`.`id` AS `id`, `g`.`name` AS `name`, `u`.`username` AS `username`, `h`.`score` AS `score` FROM (((`highscore` `h` join `game` `g` on(`g`.`id` = `h`.`game_id`)) join `users` `u` on(`u`.`id` = `h`.`user_id`)) join (select `h1`.`game_id` AS `game_id`,max(`h1`.`score`) AS `max_score` from `highscore` `h1` group by `h1`.`game_id`) `sub` on(`h`.`game_id` = `sub`.`game_id` and `h`.`score` = `sub`.`max_score`)) ORDER BY `g`.`id` ASC, `h`.`score` DESC ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`,`playedcount`);

--
-- Indexes for table `highscore`
--
ALTER TABLE `highscore`
  ADD PRIMARY KEY (`id`),
  ADD KEY `game_id` (`game_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `game`
--
ALTER TABLE `game`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `highscore`
--
ALTER TABLE `highscore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `highscore`
--
ALTER TABLE `highscore`
  ADD CONSTRAINT `highscore_game_fk` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `highscore_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
