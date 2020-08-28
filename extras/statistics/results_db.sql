-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/

-- COMMIT: Marius Nisslmueller, Bad Honnef, Juni 2020

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Tabellenstruktur für Tabelle `Results`
--

CREATE TABLE `Results` (
  `resultID` int(11) NOT NULL,
  `ip` varchar(255) NOT NULL,
  `timest` varchar(255) NOT NULL,
  `personal` varchar(255) NOT NULL,
  `parties` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indizes für die Tabelle `Results`
--
ALTER TABLE `Results`
  ADD PRIMARY KEY (`resultID`) USING BTREE;

--
-- AUTO_INCREMENT für Tabelle `Results`
--
ALTER TABLE `Results`
  MODIFY `resultID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;
