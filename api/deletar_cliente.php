<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class DeletarclienteController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                $_POST = json_decode(file_get_contents("php://input"), true);
                try{
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    include('conexao.php');
                    $sql = "DELETE FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." WHERE id=:id";
                    $pesquisa = $conexao->prepare($sql);
                    $pesquisa->execute(array(
                        ':id' => $_POST['id'] 
                    ));
                    $conexao = null;
                    return '1';
                    
                }
                catch(Execption $ex){
                    $conexao = null;
                    return '2';
                }            
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>