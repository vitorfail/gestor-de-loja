<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: *");

    class PagamentosmesController {
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    include_once('conexao.php');
                    $sql = "SELECT * from pagamentos_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $resultado = $conexao->query($sql);
                    $pesquisa = $resultado->fetchAll();
                    $array = array();
                    $data = array();
                    $valor = array();
                    $nome = array();
                    $id_cliente= array();
                    $tipo = array();
                    $conexao =null;
                    $_POST = json_decode(file_get_contents("php://input"),true);
                    $row_mes ='';
                    if(count($pesquisa) > 0 ){
                        foreach($pesquisa as $row){
                            if($_POST['mes'] == 'Todos'){
                                $row_mes = explode('-',$row['data']);
                                if(sizeof($row_mes) == 3 ){
                                    if($row_mes[0] == $_POST['ano']){
                                        array_push($data, $row['data']);
                                        array_push($valor, $row['valor']);
                                        array_push($nome, $row['nome']);
                                        array_push($id_cliente, $row['id_cliente']);
                                        array_push($tipo, $row['tipo']);
                                    }
                                }
                            }
                            else{
                                $row_mes = explode('-',$row['data']);
                                if(sizeof($row_mes) == 3 ){
                                    if($row_mes[1] == $_POST['mes'] && $row_mes[0] == $_POST['ano']){
                                        array_push($data, $row['data']);
                                        array_push($valor, $row['valor']);
                                        array_push($nome, $row['nome']);
                                        array_push($id_cliente, $row['id_cliente']);
                                        array_push($tipo, $row['tipo']);
                                    }
                                }
                            }
                        }
                        array_push($array, $data, $valor, $nome, $id_cliente, $tipo);
                        return $array;
                    }
                    else{
                        return "1";
                    }
                }
                catch(Exception $ex){
                    $conexao =null;
                    return "1";   
                }            
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>