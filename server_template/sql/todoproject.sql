-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-05-31 08:09:54
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
-- 数据库： `todo_project`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_system_user`
--

CREATE TABLE `t_system_user` (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `email` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `user_name` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `t_system_user`
--

INSERT INTO `t_system_user` (`user_id`, `email`, `password`, `user_name`) VALUES
(1, '736722992@qq.com', '990803axj.', 'nine'),
(2, 'happy@qq.com', '990803axj.', 'happy');

-- --------------------------------------------------------

--
-- 表的结构 `t_todo`
--

CREATE TABLE `t_todo` (
  `id` int(11) NOT NULL COMMENT '待办日程表id 自增',
  `create_time` varchar(255) NOT NULL COMMENT '日程创建时间',
  `create_user` int(11) NOT NULL COMMENT '用户id 外键约束',
  `things_name` varchar(32) NOT NULL COMMENT '日程标题',
  `things_detail` varchar(1024) NOT NULL COMMENT '日程详情',
  `things_status` int(11) NOT NULL COMMENT '日程状态 1重要 2紧急',
  `start_time` varchar(255) NOT NULL COMMENT '开始时间',
  `end_time` varchar(255) NOT NULL COMMENT '结束时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `t_todo`
--

INSERT INTO `t_todo` (`id`, `create_time`, `create_user`, `things_name`, `things_detail`, `things_status`, `start_time`, `end_time`) VALUES
(3, '2024-05-31 09:51:43', 1, 'NineTest', 'TestDetail', 2, '2024-05-31 12:00:00', '2024-06-01 08:00:00'),
(4, '2024-05-31 13:25:20', 1, 'test', '1111', 1, '2024-05-30 12:00:00', '2024-05-31 08:00:00'),
(5, '2024-05-31 13:57:00', 1, '6月事件', '1111', 1, '2024-06-01 12:00:00', '2024-06-02 08:00:00'),
(6, '2024-05-31 13:59:21', 1, 'xxx', 'xxx', 2, '2024-06-01 00:00:00', '2024-06-01 12:00:00'),
(7, '2024-05-31 14:03:54', 2, 'happy every day', '111', 1, '2024-05-31 12:00:00', '2024-06-01 08:00:00'),
(8, '2024-05-31 14:04:40', 2, 'Happy with nine happy', '111', 2, '2024-05-30 12:00:00', '2024-05-31 08:00:00');

--
-- 转储表的索引
--

--
-- 表的索引 `t_system_user`
--
ALTER TABLE `t_system_user`
  ADD PRIMARY KEY (`user_id`) USING BTREE;

--
-- 表的索引 `t_todo`
--
ALTER TABLE `t_todo`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `t_system_user`
--
ALTER TABLE `t_system_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `t_todo`
--
ALTER TABLE `t_todo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '待办日程表id 自增', AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
