<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class ContasdreController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                    include('conexao.php');
                    $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                    $array = array();
                    $valor = array();
                    $tipo = array();
                    $sql = "SELECT * from contas_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id;
                    $contas = $conexao->query($sql);
                    $puxar = $contas->fetchAll();
                    $conexao = null;
            
            
                    $imposto = 0;
                    $custo = 0;
                    $despesas_operacionais = 0;
                    $despesas_venda = 0;
                    $depesas_financeiras = 0;
                    $despesas_administracao = 0;
            
                    $_POST = json_decode(file_get_contents("php://input"),true);
                    if( count($puxar)>0){
                        foreach($puxar as $row){
                            $data_formatada = explode('-' ,$row['data']);
                            if(sizeof($data_formatada) == 3){
                                if($data_formatada[1] == $_POST['mes'] && $data_formatada[0] == $_POST['ano']){
                                    if($row['tipo'] == 'imposto'){
                                        $imposto = $imposto + $row['valor'];
                                    }
                                    if($row['tipo'] == 'custo'){
                                        $custo = $custo + $row['valor'];
                                    } 
                                    if($row['tipo'] == 'despesas-operacionais'){
                                        $despesas_operacionais = $despesas_operacionais + $row['valor'];
                                    } 
                                    if($row['tipo'] == 'despesas-venda'){
                                        $despesas_venda = $despesas_venda + $row['valor'];
                                    } 
                                    if($row['tipo'] == 'depesas-financeiras'){
                                        $depesas_financeiras = $depesas_financeiras + $row['valor'];
                                    } 
                                    if($row['tipo'] == 'despesas-administracao'){
                                        $despesas_administracao = $despesas_administracao + $row['valor'];
                                    }  
                                }
                            }
                                       
                        }
                        array_push($array, $imposto, $custo, $despesas_operacionais, $despesas_venda, $depesas_financeiras,$despesas_administracao);
                        return $array;
                    }
                    else{
                        return '1';
                    }
                }
                catch(Exception $ex){
                    return '1';
                }            
            }
            else{
                return 'Usuário não autenticado';
            }
        }
    }
?>