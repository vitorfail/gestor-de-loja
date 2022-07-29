<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class PagamentosController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                $_POST = json_decode(file_get_contents("php://input"), true);
                $id = preg_replace('/[^[:alnum:]_]/', '',$_POST['id']);
                try{
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    include('conexao.php');
                    $sql = "SELECT * from pagamentos_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." where id_cliente ='$id'";
                    $resultado = $conexao->query($sql);
                    $pesquisa = $resultado->fetchAll();
                    $nome = array();
                    $data = array();
                    $valor = array();
                    $tipo = array();
                    $procedimento = array();
                    $array = array();
            
            
                    $sql2 = "SELECT id, valor FROM acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $resultado2 = $conexao->query($sql2);
                    $pesquisa2 = $resultado2->fetchAll();
                    $rank = 0;
                    $ranking = array();
                    $acumulado = 0;
            
                    foreach($pesquisa2 as $row){
                        array_push($ranking , $row['valor']);
                        if($row['id'] ==$id){
                            $acumulado = $row['valor'];
                        }
                    }
                    rsort($ranking);
                    if(array_search($acumulado, $ranking) == false){
                        $rank =0;
                    }
                    if(array_search($acumulado, $ranking) == 0){
                        $rank =1;
                    }
                    else{
                        $rank = array_search($acumulado, $ranking) +1;
                    }
                    $conexao = null;
                    if( count($pesquisa) > 0){
                        foreach($pesquisa as $row){
                            array_push($nome, $row['nome']);
                            array_push($data, $row['data']);
                            array_push($valor, $row['valor']);
                            array_push($tipo, $row['tipo']);
                            if($row['procedimento'] == null){
                                array_push($procedimento, 'Não identificado');
                            }
                            else{
                                array_push($procedimento, $row['procedimento']);
                            }
            
                        }
                        array_push($array, $nome, $data, $valor, $tipo, $procedimento, $rank);
                        return $array;
                    }
                    else{
                        return '1';
                    }
                }
                catch(Exception $ex){
                    $conexao = null;
                    return '1';
                }
            
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>