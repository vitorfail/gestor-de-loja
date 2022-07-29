<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class PoliticasprivacidadeController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include_once('Http/Controllers/login_conect.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "SELECT politicas FROM `user` WHERE id = :id AND usuario= :user ";
                    $inserir = $conexao->prepare($sql);
                    $inserir->bindValue(':id', $dados_de_usuario_sql->id);
                    $inserir->bindValue(':user', $dados_de_usuario_sql->name);
                    $inserir->execute();
                    $array = array();
                    $conexao = null;
                    $politicas = array();
                    $resultado = $inserir->fetchAll();
                    if(count($resultado) > 0){
                        foreach($resultado as $row){
                            array_push($politicas, $row['politicas']);
                        }
                        if($politicas[0] === '0'){
                            return false;
                        }
                        if($politicas[0] === '1'){
                            return true;
                        }
                    }
                    else{
                        return '2';
                    }
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