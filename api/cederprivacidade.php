<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    $_POST = json_decode(file_get_contents("php://input"), true);
    class CederprivacidadeController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include_once('Http/Controllers/login_conect.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "UPDATE user SET politicas=:chave  WHERE id = :id AND usuario= :user ";
                    $inserir = $conexao->prepare($sql);
                    $inserir->bindValue(':id', $dados_de_usuario_sql->id);
                    $inserir->bindValue(':user', $dados_de_usuario_sql->name);
                    $inserir->bindValue(':chave', $_POST['key']);
                    $inserir->execute();
                    $inserir->fetchAll();
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