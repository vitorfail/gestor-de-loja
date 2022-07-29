<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    $_POST = json_decode(file_get_contents("php://input"),true);
    class AtualizarcontaController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                if($_POST['situacao'] == 'true'){
                    try{
                        $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                        $sql = "UPDATE  contas_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id."  SET situacao = 'Pago' WHERE id = :id";
                        $inserir = $conexao->prepare($sql);
                          $inserir->bindValue(':id', $_POST['id']);
                        $inserir->execute();
                        $conexao = null;
                        return '1';
                    }
                    catch(Exception $ex){
                        return '2';
                    }
                }
                if($_POST['situacao'] == 'false'){
                    try{
                        $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                        $sql = "UPDATE  contas_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id."  SET situacao = 'Aberto' WHERE id =:id";
                        $inserir = $conexao->prepare($sql);
                        $inserir->bindValue(':id', $_POST['id']);
                        $inserir->execute();
                        $conexao = null;
                        return '1';
                    }
                    catch(Exception $ex){
                        return '2';
                    }
                }
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>