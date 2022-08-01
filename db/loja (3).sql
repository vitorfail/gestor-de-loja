-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02-Ago-2022 às 00:26
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `loja`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `user-produtos`
--

CREATE TABLE `user-produtos` (
  `id` int(11) NOT NULL,
  `user-id` int(255) DEFAULT NULL,
  `produto-nome` varchar(1300) DEFAULT NULL,
  `produto_valor` varchar(1300) DEFAULT NULL,
  `percentual` varchar(130) DEFAULT NULL,
  `Vendido` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user-produtos`
--

INSERT INTO `user-produtos` (`id`, `user-id`, `produto-nome`, `produto_valor`, `percentual`, `Vendido`) VALUES
(1, 1, 'CAMISA POLO', '145.34', '13%', 'Não'),
(2, 2, 'Camisa gola polo', '140.90', '12%', 'Sim'),
(3, 1, 'Camisa gola polo', '140.90', '12%', 'Não');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users_info`
--

CREATE TABLE `users_info` (
  `id` int(11) NOT NULL,
  `nome` varchar(1400) DEFAULT NULL,
  `email` varchar(1300) DEFAULT NULL,
  `telefone` varchar(1300) DEFAULT NULL,
  `ip` varchar(1300) DEFAULT NULL,
  `plano` varchar(1300) DEFAULT NULL,
  `valor-plano` varchar(1300) DEFAULT NULL,
  `data_vencimento` varchar(1300) DEFAULT NULL,
  `data-contratacao` varchar(1300) DEFAULT NULL,
  `situacao` varchar(1300) DEFAULT NULL,
  `senha` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users_info`
--

INSERT INTO `users_info` (`id`, `nome`, `email`, `telefone`, `ip`, `plano`, `valor-plano`, `data_vencimento`, `data-contratacao`, `situacao`, `senha`) VALUES
(1, 'Loja teste', 'failcreator0.0@gmail.com', '(88) 981393182', '192.168.0.116', 'Normal', '20', '06-08-2022', '12-03-2022', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_vendas`
--

CREATE TABLE `user_vendas` (
  `id` int(130) NOT NULL,
  `user_id` int(130) DEFAULT NULL,
  `produto_nome` varchar(130) DEFAULT NULL,
  `data_venda` varchar(130) DEFAULT NULL,
  `produto_id` int(130) DEFAULT NULL,
  `valor_venda` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `user-produtos`
--
ALTER TABLE `user-produtos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users_info`
--
ALTER TABLE `users_info`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `user_vendas`
--
ALTER TABLE `user_vendas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `user-produtos`
--
ALTER TABLE `user-produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `users_info`
--
ALTER TABLE `users_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `user_vendas`
--
ALTER TABLE `user_vendas`
  MODIFY `id` int(130) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
