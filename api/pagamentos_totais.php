<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    class PagamentostotaisController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include_once('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $sql = "SELECT * from pagamentos_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $resultado = $conexao->query($sql);
                    $pesquisa = $resultado->fetchAll();
                    $array = array();
                    $conexao =null;
                    if(count($pesquisa) > 0 ){
                        foreach($pesquisa as $row){
                            array_push($array, $row['tipo']);
                        }
                        return $array;
                    }
                    else{
                        return "1";
                    }
            
                }
                catch(Exception $ex){
                    $conexao =null;
                    return "2";   
                }
            }
            else{
                return 'Usuário não autenticado';
            }

        }
    }

?>