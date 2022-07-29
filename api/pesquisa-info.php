<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    

    class PesquisainfoController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                $_POST = json_decode(file_get_contents("php://input"), true);
                $id = preg_replace('/[^[:alnum:]_]/', '',$_POST['id']);
                try{
                    include_once('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "SELECT * FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." WHERE id = $id";
                    $pesquisa = $conexao->query($sql);
                    $row_usuario = $pesquisa->fetchAll();
                    $array = array();
                    $array_id = array();
                    $array_nome = array();
                    $array_data_nascimento = array();
                    $array_cpf = array();
                    $array_estado_civil = array();
                    $array_genero = array();
                    $array_uf = array();
                    $array_endereco = array();
                    $array_cidade = array();
                    $array_telefone = array();
                    $array_email = array();
                    $array_notific = array();
                    $conexao = null;
                    if(count($row_usuario) > 0){
                        foreach($row_usuario as $row){
                            array_push($array_id, $row['id']);
                            array_push($array_nome, $row['nome']);
                            array_push($array_data_nascimento, $row['data_nascimento']);
                            array_push($array_cpf, $row['cpf']);
                            array_push($array_estado_civil, $row['estado_civil']);
                            array_push($array_genero, $row['genero']);
                            array_push($array_uf, $row['uf']);
                            array_push($array_endereco, $row['endereco']);
                            array_push($array_cidade, $row['cidade']);
                            array_push($array_telefone, $row['telefone']);
                            array_push($array_email, $row['email']);
                            array_push($array_notific, $row['notific']);            
                        }
                        array_push($array, $array_id, $array_nome, $array_data_nascimento, $array_cpf, $array_estado_civil, $array_genero, $array_uf, $array_endereco, $array_cidade, $array_telefone, $array_email, $array_notific);
                        return $array;      
                    }
                    else{
                        return "1";
                    }   
                }
                catch(Exception $ex){
                    $conexao = null;
                    return "1";
                }             
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>