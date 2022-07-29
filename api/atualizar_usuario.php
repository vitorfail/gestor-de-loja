<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class AtualizarusuarioController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                include_once('Http/Controllers/login_conect.php');
                $nome = preg_replace('/[^[:alpha:]_]/', '', $_POST['nome']);
                $cnpj =  $_POST['cnpj'];
                $endereco = preg_replace('/[^[:alpha:]_]/', '', $_POST['endereco']);
                $municipio = preg_replace('/[^[:alpha:]_]/', '', $_POST['municipio']);
                $uf = preg_replace('/[^[:alpha:]_]/', '', $_POST['uf']);
                $tema = preg_replace('/[^[:alpha:]_]/', '', $_POST['tema']);
                try{
                    $sql = "UPDATE user SET nome = :nome, cnpj = :cnpj, endereco = :endereco, uf = :uf , tema = :tema, municipio = :municipio WHERE id = ".$dados_de_usuario_sql->id;
                    $inserir = $conexao->prepare($sql);
                    $inserir->bindValue(':nome', $nome);
                    $inserir->bindValue(':cnpj', $cnpj);
                    $inserir->bindValue(':endereco', $endereco);
                    $inserir->bindValue(':municipio', $municipio);
                    $inserir->bindValue(':uf', $uf);
                    $inserir->bindValue(':tema', $tema);
                    $inserir->execute();
                    $conexao = null;
                    return '1';
                }
                catch(Exception $ex){
                    return '2';
                }
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>