<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    $_POST = json_decode(file_get_contents("php://input"),true);
    class DadosuserController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include_once('Http/Controllers/login_conect.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "SELECT * FROM `user` WHERE id = :id AND usuario= :user ";
                    $inserir = $conexao->prepare($sql);
                    $inserir->bindValue(':id', $dados_de_usuario_sql->id);
                    $inserir->bindValue(':user', $dados_de_usuario_sql->name);
                    $inserir->execute();
                    $array = array();
                    $conexao = null;
                    $cnpj = array();
                    $nome = array();
                    $endereco = array();
                    $municipio = array();
                    $uf = array();
                    $tema = array();
                    $resultado = $inserir->fetchAll();
                    if(count($resultado) > 0){
                        foreach($resultado as $row){
                            array_push($cnpj, $row['cnpj']);
                            array_push($nome, $row['nome']);
                            array_push($endereco, $row['endereco']);
                            array_push($municipio, $row['municipio']);
                            array_push($uf, $row['uf']);
                            array_push($tema, $row['tema']);
                        }
                        array_push($array, $cnpj,  $nome,  $endereco,  $municipio,  $uf, $tema);
                        return $array;
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