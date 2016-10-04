-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 04 okt 2016 om 14:48
-- Serverversie: 10.1.16-MariaDB
-- PHP-versie: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gerrizo42_bluescript`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `menu`
--

CREATE TABLE `menu` (
  `m_id` int(2) NOT NULL,
  `m_name` varchar(200) NOT NULL,
  `m_href` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `menu`
--

INSERT INTO `menu` (`m_id`, `m_name`, `m_href`) VALUES
(1, 'To Do lijsten', 'todo.php'),
(2, 'Statistieken', 'statistics.php');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `personal_todo`
--

CREATE TABLE `personal_todo` (
  `p_id` int(2) NOT NULL,
  `p_name` varchar(200) NOT NULL,
  `p_desc` varchar(1000) NOT NULL,
  `p_prio` int(1) NOT NULL,
  `p_done` tinyint(1) NOT NULL,
  `u_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `together_todo`
--

CREATE TABLE `together_todo` (
  `t_id` int(2) NOT NULL,
  `t_name` varchar(200) NOT NULL,
  `t_desc` varchar(1000) NOT NULL,
  `t_prio` int(1) NOT NULL,
  `t_done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `u_id` int(2) NOT NULL,
  `u_username` varchar(200) NOT NULL,
  `u_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`u_id`, `u_username`, `u_password`) VALUES
(1, 'karin', 'kreeft'),
(2, 'gerrit', 'luimstra');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users_together`
--

CREATE TABLE `users_together` (
  `u_id` int(2) NOT NULL,
  `t_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`m_id`);

--
-- Indexen voor tabel `personal_todo`
--
ALTER TABLE `personal_todo`
  ADD PRIMARY KEY (`p_id`),
  ADD UNIQUE KEY `p_name` (`p_name`);

--
-- Indexen voor tabel `together_todo`
--
ALTER TABLE `together_todo`
  ADD PRIMARY KEY (`t_id`),
  ADD UNIQUE KEY `t_name` (`t_name`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_username` (`u_username`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `m_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT voor een tabel `personal_todo`
--
ALTER TABLE `personal_todo`
  MODIFY `p_id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `together_todo`
--
ALTER TABLE `together_todo`
  MODIFY `t_id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
