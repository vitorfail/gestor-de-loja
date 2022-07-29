<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    
    class AtualizaController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 

                    $sql = "SELECT * FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." ORDER BY id DESC LIMIT 5" ;
                    $salvar = $conexao->query( $sql);
                    $pesquisa = $salvar->fetchAll();
                    $array = array(); 
                    $nome = array();
                    $telefone = array();
                    $genero = array();
            
                    if(count($pesquisa) > 0){
                        foreach($pesquisa as $row){
                           array_push($nome, $row['nome']);
                           array_push($telefone, $row['telefone']);
                           array_push($genero, $row['genero']);            
                        }
                        $conexao=null;
                        array_push($array, $nome, $telefone, $genero);
                        return $array;
                    }
                    else{
                        $conexao = null;
                        return "2";
                    }
                }
                catch(Exception $ex){
                    $conexao = null;
                    return "0";
                }
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>