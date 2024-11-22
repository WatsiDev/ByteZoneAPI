-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-11-2024 a las 04:36:27
-- Versión del servidor: 11.3.2-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bytezone`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoria_id` int(11) NOT NULL,
  `CategoriaName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`categoria_id`, `CategoriaName`) VALUES
(3, 'Componentes'),
(1, 'Computadoras');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `marca_id` int(11) NOT NULL,
  `MarcaName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`marca_id`, `MarcaName`) VALUES
(26, 'Acer'),
(32, 'Adata'),
(4, 'Aero Cool'),
(28, 'AMD'),
(14, 'AMD Ryzen'),
(2, 'Asus'),
(24, 'BenQ'),
(7, 'Cooler Master'),
(6, 'Corsair'),
(3, 'Cougar'),
(20, 'Deep Cool'),
(27, 'Dell'),
(5, 'EVGA'),
(19, 'Gamer Factor'),
(1, 'Gigabyte'),
(25, 'HP'),
(11, 'HyperX'),
(10, 'Intel'),
(33, 'Kingston'),
(29, 'Lenovo'),
(21, 'LG'),
(18, 'Logitech'),
(9, 'msi'),
(8, 'nvidia'),
(12, 'NZXT'),
(13, 'PNY'),
(15, 'Razer'),
(23, 'Samsung'),
(30, 'Seagate'),
(34, 'Sin marca'),
(31, 'Toshiba'),
(16, 'XPG'),
(22, 'Yeyian'),
(17, 'Zotac');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `modelo_id` int(11) NOT NULL,
  `ModeloName` varchar(100) NOT NULL,
  `marca_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`modelo_id`, `ModeloName`, `marca_id`) VALUES
(1, 'TUF Gaming A15', 2),
(2, 'Radeon RX 6600', 28),
(3, 'Custom PC Gamer', 34),
(4, 'Ryzen 5 5600X', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `producto_id` int(11) NOT NULL,
  `subcategoria_id` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `modelo_id` int(11) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `cantidad_en_stock` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`producto_id`, `subcategoria_id`, `categoria_id`, `modelo_id`, `precio`, `cantidad_en_stock`, `descripcion`, `imagen`) VALUES
(1, 1, 1, 3, 24599.00, 2, 'Computadora Gamer Xtreme PC Gaming CM-50219, Intel Core i9-14900KF 3.20GHz, 64GB, 4TB HDD + 2TB SSD, Wi-Fi, Windows 11 Prueba, Blanco', 'https://pconemexico.com.mx/cdn/shop/files/1_1ed07ef2-b4d6-450a-8e53-6b8c0e91a18a.png?v=1723568879'),
(2, 1, 1, 3, 6919.00, 5, 'Computadora Gamer Xtreme PC Gaming CM-053602, AMD Ryzen 5 5600G 3.90GHz, 16GB, 2TB + 120GB SSD, Wi-Fi, Windows 10 Prueba, Blanco', 'https://www.cyberpuerta.mx/img/product/M/CP-XTREMEPCGAMING-XTBRR516GBRENOIRW-1.jpg'),
(3, 11, 1, 1, 19749.00, 10, 'Laptop Gamer ASUS TUF Gaming A15 15.6\" 1920x1080 Full HD, AMD Ryzen 5 7535HS, NVIDIA GeForce RTX 2050, 16GB, 1TB SSD, Windows 11 Home, Español', 'https://www.cyberpuerta.mx/img/product/M/CP-ASUS-FA506NF-HN026W-1.png'),
(4, 3, 3, 4, 2549.00, 16, 'Procesador AMD Ryzen 5 5600X, S-AM4, 3.70GHz, 32MB L3 Cache - incluye Disipador Wraith Stealth', 'https://www.cyberpuerta.mx/img/product/M/CP-AMD-100-100000065BOX-1.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `subcategoria_id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `SubcategoriaName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `subcategoria`
--

INSERT INTO `subcategoria` (`subcategoria_id`, `categoria_id`, `SubcategoriaName`) VALUES
(1, 1, 'PC Gamer'),
(2, 1, 'All-in-one'),
(3, 3, 'Procesador'),
(4, 3, 'Memoria RAM'),
(5, 3, 'Tarjeta grafica'),
(6, 3, 'HDD'),
(7, 3, 'SSD'),
(8, 3, 'Disipador'),
(9, 3, 'Fuente de poder'),
(10, 3, 'Tarjeta madre'),
(11, 1, 'Laptop');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoria_id`),
  ADD UNIQUE KEY `nombre` (`CategoriaName`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`marca_id`),
  ADD UNIQUE KEY `nombre` (`MarcaName`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`modelo_id`),
  ADD UNIQUE KEY `nombre` (`ModeloName`),
  ADD KEY `marca_id` (`marca_id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`producto_id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `modelo_id` (`modelo_id`),
  ADD KEY `subcategoria_id` (`subcategoria_id`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`subcategoria_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `marca_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `modelo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `producto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `subcategoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `modelo_ibfk_1` FOREIGN KEY (`marca_id`) REFERENCES `marca` (`marca_id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`modelo_id`) REFERENCES `modelo` (`modelo_id`),
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`subcategoria_id`) REFERENCES `subcategoria` (`subcategoria_id`);

--
-- Filtros para la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD CONSTRAINT `subcategoria_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`categoria_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
