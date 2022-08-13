-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Ago-2022 às 01:27
-- Versão do servidor: 10.4.21-MariaDB
-- versão do PHP: 8.0.11

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
-- Estrutura da tabela `admin`
--

CREATE TABLE `admin` (
  `id` int(130) NOT NULL,
  `nome` varchar(130) DEFAULT NULL,
  `accesstoken` varchar(130) DEFAULT NULL,
  `publickey` varchar(130) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `admin`
--

INSERT INTO `admin` (`id`, `nome`, `accesstoken`, `publickey`) VALUES
(1, 'Vitor Manoel', 'APP_USR-4390047053471485-080610-8552e3de7962295c5375753a253cd0f5-517207508', 'APP_USR-e0eaa414-897d-4880-82d7-fa1db4326221');

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
  `Vendido` varchar(130) DEFAULT NULL,
  `quantidade` int(130) DEFAULT NULL,
  `custo_indireto` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user-produtos`
--

INSERT INTO `user-produtos` (`id`, `user-id`, `produto-nome`, `produto_valor`, `percentual`, `Vendido`, `quantidade`, `custo_indireto`) VALUES
(1, 1, 'CAMISA POLO', '145.34', '13%', 'Não', 9, 0),
(2, 2, 'Camisa gola polo', '140.90', '12%', 'Sim', 7, 0),
(3, 1, 'Camisa gola polo', '140.90', '12%', 'Não', 13, 0),
(4, 1, 'Calça Jean', '45.68', '2%', 'Não', 7, 0),
(11, 1, 'Calaça leag', '12.41', '34%', 'Não', 7, 0),
(12, 1, 'Saia infantil', '45.21', '12%', 'Não', 5, 0),
(13, 1, 'Camiseta masculina', '56.53', '32%', 'Não', 12, 0),
(14, 1, 'Camisa social', '34.31', '34%', 'Não', 12, 0),
(15, 1, 'Camisa do flamengo', '56.9', '45%', 'Não', 12, 0),
(16, 1, 'Vestido transparente', '12.56', '12%', 'Não', 12, 0),
(17, 1, 'Gaita', '34.52', '34%', 'Não', 12, 0),
(18, 1, 'gelinho', '34.56', '7%', 'Não', 12, 0),
(19, 1, 'Blusa social', '34.9', '12%', 'Não', 12, 0),
(20, 1, 'Cinto', '34.9', '34%', 'Não', 4, 0);

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
(1, 'Loja teste', 'failcreator0.0@gmail.com', '(88) 981393182', '192.168.0.116', 'Normal', '20', '2022-08-10', '2022-03-12', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a'),
(2, 'Loja Belle', 'vitor_andrademanoel@hotmail.com', '8989090', '192.168.1.2', 'Normal', '20', '2022-09-03', '2022-08-03', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a'),
(4, 'Tudo é 10', 'vitor@gmail.com', '(09) 80890-8908', '177.37.176.216', 'Normal', '20', '2022-09-04', '2022-08-04', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a'),
(5, 'Tudo é 20', 'valesca@hotmail.com', '(78) 76867-8666', '', 'Normal', '20', '2022-09-04', '2022-08-04', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_despesas`
--

CREATE TABLE `user_despesas` (
  `id` int(13) NOT NULL,
  `user_id` int(13) DEFAULT NULL,
  `valor_despesas` double NOT NULL,
  `data_vencimento` varchar(130) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_financeiro`
--

CREATE TABLE `user_financeiro` (
  `id` int(130) NOT NULL,
  `user_email` varchar(130) DEFAULT NULL,
  `caixa` double DEFAULT NULL,
  `custos_fixos` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `user_financeiro`
--

INSERT INTO `user_financeiro` (`id`, `user_email`, `caixa`, `custos_fixos`) VALUES
(1, 'failcreator0.0@gmail.com', 0, 0),
(2, 'vitor_andrademanoel@hotmail.com', 0, 0),
(4, 'vitor@gmail.com', 0, 0),
(5, 'valesca@hotmail.com', 0, 0);

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
  `valor_venda` double NOT NULL,
  `tipo_de_pagamento` varchar(130) DEFAULT NULL,
  `quantidade` int(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

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
-- Índices para tabela `user_despesas`
--
ALTER TABLE `user_despesas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `user_financeiro`
--
ALTER TABLE `user_financeiro`
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
-- AUTO_INCREMENT de tabela `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(130) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `user-produtos`
--
ALTER TABLE `user-produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `users_info`
--
ALTER TABLE `users_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `user_despesas`
--
ALTER TABLE `user_despesas`
  MODIFY `id` int(13) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `user_financeiro`
--
ALTER TABLE `user_financeiro`
  MODIFY `id` int(130) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `user_vendas`
--
ALTER TABLE `user_vendas`
  MODIFY `id` int(130) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;