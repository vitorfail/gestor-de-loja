<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class PesquisaController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                include_once('conexao.php');
                $nome ='';
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $_POST = json_decode(file_get_contents("php://input"), true);
                if(empty($_POST['nome']) or $_POST['nome'] == 'todos'){ 
                    $nome = '';
                }
                else{
                    $nome = preg_replace('/[^[:alpha:]_]/', '',$_POST['nome']);
                }
                try{
                    $sql = "SELECT * FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." WHERE nome LIKE '%$nome%'";
                    $pesquisa = $conexao->query($sql);
                    $row_usuario = $pesquisa->fetchAll();
                    $array = array();
                    $array_id = array();
                    $array_nome = array();
                    $array_email = array();
                    $array_telefone = array();
                    $array_genero = array();
                    
                    $conexao = null;
                    if(count($row_usuario)> 0){
                        foreach ($row_usuario as $row){
                            array_push($array_id, $row['id']);
                           array_push($array_nome, $row['nome']);
                           array_push($array_email, $row['email']);
                           array_push($array_telefone, $row['telefone']);
                           array_push($array_genero, $row['genero']); 
                        }
                        $conexao = null;
                        array_push($array, $array_id, $array_nome, $array_email, $array_telefone, $array_genero);
                        return $array; 
                    }
            
                    else{
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