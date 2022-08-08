<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    $_POST= json_decode(file_get_contents('php://input'), true);
    class InserirprodutosController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include_once('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "INSERT into contas_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." (conta, data, valor , situacao, tipo) values ( :conta, :data, :valor, :situacao, :tipo )";
                    $salvar = $conexao->prepare($sql);
                    $salvar->bindValue( ':conta', $_POST['conta']);
                    $salvar->bindValue(':data', $_POST['vencimento']);
                    $salvar->bindValue(':valor', $_POST['val']);
                    $salvar->bindValue(':situacao', 'Aberto');
                    $salvar->bindValue(':tipo', $_POST['tipo']);
                    $salvar->execute();
                    $conexao = null;    
                    return "1";
                }
                catch(Exception $ex){
                    $conexao = null;  
                    return 'Usuário não autenticado';
                }
            }
        }
    }
?>