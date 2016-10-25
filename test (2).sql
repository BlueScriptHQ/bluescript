-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 25 okt 2016 om 10:31
-- Serverversie: 10.1.16-MariaDB
-- PHP-versie: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `groups`
--

CREATE TABLE `groups` (
  `groups_id` int(20) NOT NULL,
  `groups_name` varchar(50) NOT NULL,
  `groups_description` varchar(50) NOT NULL,
  `groups_addedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `messages`
--

CREATE TABLE `messages` (
  `messages_id` int(20) NOT NULL,
  `messages_content` varchar(50) NOT NULL,
  `messages_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `receipt_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `messages`
--

INSERT INTO `messages` (`messages_id`, `messages_content`, `messages_time`, `receipt_id`) VALUES
(1, 'test', '2016-10-11 12:36:40', 0),
(2, 'test2', '2016-10-11 12:42:31', 0),
(3, 'test3', '2016-10-11 12:42:41', 0),
(4, 'test', '2016-10-11 12:51:28', 0),
(5, 'test', '2016-10-11 12:53:35', 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users_groups`
--

CREATE TABLE `users_groups` (
  `users_id` int(20) NOT NULL,
  `groups_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users_messages`
--

CREATE TABLE `users_messages` (
  `messages_id` int(5) NOT NULL,
  `users_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`groups_id`);

--
-- Indexen voor tabel `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messages_id`),
  ADD UNIQUE KEY `messages_id` (`messages_id`);

--
-- Indexen voor tabel `users_groups`
--
ALTER TABLE `users_groups`
  ADD UNIQUE KEY `users_id` (`users_id`),
  ADD UNIQUE KEY `groups_id` (`groups_id`);

--
-- Indexen voor tabel `users_messages`
--
ALTER TABLE `users_messages`
  ADD UNIQUE KEY `users_id` (`users_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `groups`
--
ALTER TABLE `groups`
  MODIFY `groups_id` int(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `messages`
--
ALTER TABLE `messages`
  MODIFY `messages_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
