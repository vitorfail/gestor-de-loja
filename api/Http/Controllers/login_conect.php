<?php

	session_start();
    $hotname = "localhost";
    $user = 'root';
    $password = '';
    $database = "loja";

    $conexao = new PDO("mysql:host=$hotname;dbname=$database;charset=utf8", $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if(!$conexao){
        print("Falha na conexão com banco de dados");
    }


?>