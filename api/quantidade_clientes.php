<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    
    class QuantidadeclientesController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "SELECT count(id) FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $pesquisar = $conexao->query($sql);
                    $numero = $pesquisar->fetch();
                    $indicador = $numero['count(id)'];
                    $conexao =null;
                    return $indicador;
            
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