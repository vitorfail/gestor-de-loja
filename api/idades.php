<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class IdadesController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    include_once('conexao.php');
                    $data = strval(date('Y/m/d'));
                    $data_formatada = strtotime(str_replace('/', '-', $data));
                    $sql = "SELECT data_nascimento FROM clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $pesquisa = $conexao->query($sql);
                    $row_usuario = $pesquisa->fetchAll();
                    $array = array();
                    $conexao =null;
                    if(count($row_usuario)> 0){
                        foreach ($row_usuario as $row) {
                            $data_nascimento = strtotime($row['data_nascimento']);
                            $dias = ($data_formatada - $data_nascimento)/ 86400;
                            if($dias <0){
                                $dias *= -1;
                            }
                            $dias = $dias/365;
                            array_push($array, floor($dias));                  
                        }
            
                        return $array;
                    }
                    else{
                        return "1";
                    }
                }
                catch(Exception $e){
                    return "1";
                }
            }
            else{
                return "Usuário não autenticado";
            }
        }
    }

?>