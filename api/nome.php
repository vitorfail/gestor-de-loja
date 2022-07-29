<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class NomeController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT nome, tema from identificacao_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." WHERE id=1";
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $nome = '';
                $tema = '';
                $array = array();
                $conexao = null;
                foreach($resultado as $row){
                    $nome = $row['nome'];
                    $tema = $row['tema'];
                }
                array_push($array, $nome, $tema);
                return $array;            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
    }
?>