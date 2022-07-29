<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");


    class SexoController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    include_once('conexao.php');
                    $sql = "SELECT * FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $pesquisa = $conexao->query($sql);
                    $row_usuario = $pesquisa->fetchAll();
                    $array = array();
                    
                    if(count($row_usuario)> 0){
                        foreach ($row_usuario as $row){
                        array_push($array, $row['genero']);
                        }
                        $conexao = null;
                        return $array;
                    }
                    else{
                        $conexao = null;
                        return "1";
                    } 
                    
                }
                catch(Exception $ex){
                    return "1";
                }
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>