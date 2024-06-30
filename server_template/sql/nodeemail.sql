-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-05-27 10:39:55
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `nodeemail`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_system_limit`
--

CREATE TABLE `t_system_limit` (
  `limit_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `update_time` varchar(32) NOT NULL,
  `create_user` varchar(255) NOT NULL,
  `update_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `t_system_menu`
--

CREATE TABLE `t_system_menu` (
  `menu_id` int(11) NOT NULL,
  `menu_name` varchar(10) DEFAULT NULL,
  `menu_icon` varchar(32) NOT NULL,
  `menu_url` varchar(64) DEFAULT NULL,
  `parent_id` int(11) NOT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `update_time` varchar(32) NOT NULL,
  `create_user` varchar(255) DEFAULT NULL,
  `update_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `t_system_role`
--

CREATE TABLE `t_system_role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(16) DEFAULT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `update_time` varchar(32) NOT NULL,
  `create_user` varchar(255) DEFAULT NULL,
  `update_user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 表的结构 `t_system_user`
--

CREATE TABLE `t_system_user` (
  `user_id` varchar(255) NOT NULL,
  `user_name` varchar(16) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(32) NOT NULL,
  `role_id` tinyint(4) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `gender` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `t_system_user`
--

INSERT INTO `t_system_user` (`user_id`, `user_name`, `password`, `email`, `role_id`, `avatar`, `gender`) VALUES
('c4bd7890-ffda-405a-bc4c-124dbc6787e8', 'nine', '990803axj.', 'nine@gamil.com', 1, '1', 1),
('dc752376-379c-4f0d-b630-5a7b4242be80', '艾向阳2', '990803axj.', '736722992@qq.com12', 1, '', 1);

--
-- 转储表的索引
--

--
-- 表的索引 `t_system_limit`
--
ALTER TABLE `t_system_limit`
  ADD PRIMARY KEY (`limit_id`);

--
-- 表的索引 `t_system_menu`
--
ALTER TABLE `t_system_menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- 表的索引 `t_system_role`
--
ALTER TABLE `t_system_role`
  ADD PRIMARY KEY (`role_id`);

--
-- 表的索引 `t_system_user`
--
ALTER TABLE `t_system_user`
  ADD PRIMARY KEY (`user_id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `t_system_limit`
--
ALTER TABLE `t_system_limit`
  MODIFY `limit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `t_system_menu`
--
ALTER TABLE `t_system_menu`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `t_system_role`
--
ALTER TABLE `t_system_role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
