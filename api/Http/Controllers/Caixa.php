<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    $GLOBALS['a'] = 'Authorization';
    $_POST = json_decode(file_get_contents("php://input"), true);
    class CaixaController{
        public function recebido_hoje(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $data_hoje= date('Y-m-d');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT SUM(valor_venda) AS total FROM `user_vendas` WHERE data_venda = '".$data_hoje."' and `user_id` = ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total_ = 0;
                $conexao = null;
                if($resultado[0]['total'] == null){
                    $total =0;
                }
                else{
                    $total = $resultado[0]['total'];
                }
                return floatval($total);            
            }
            else{
                $conexao = null;
                return 'Usuário não autenticado';              
            }
        }
        public function despesas_hoje(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $datahoje = date('Y-m-d');
                $datasql = explode('-', $datahoje);
                $sql = "SELECT SUM(valor_despesas) FROM `user_despesas` WHERE (MONTH(data_vencimento), DAY(data_vencimento), `user_id`)  =  (".$datasql[1]." ,  ".$datasql[2].", ".$dados_de_usuario_sql->id.")";
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = 0;
                if($resultado[0]["SUM(valor_despesas)"] == null){
                    $total = 0;
                }
                else{
                    $total = $resultado[0]["SUM(valor_despesas)"];
                }
                $conexao = null;
                return $total;            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function nome(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT nome, situacao, data_vencimento FROM `users_info` WHERE id= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $nome = '';
                $situacao = '';
                $vencimento = '';
                $conexao = null;
                foreach($resultado as $row){
                    $nome = $row['nome'];
                    $situacao = $row['situacao'];
                    $vencimento = $row["data_vencimento"];
                }
                $conexao = null;
                return array($nome, $situacao, $vencimento);            
            }
            else{
                return 'Usuário não autenticado';              
            }

        }
        public function valor_caixa(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql();
                $sql = "SELECT caixa FROM user_financeiro WHERE `id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                
                return floatval($resultado[0]['caixa']);            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function pesquisa(){
            $nome = $this->nome();
            $recebido_hoje = $this->recebido_hoje();
            $despesas_hoje = $this->despesas_hoje();
            $valor_caixa = $this->valor_caixa();
            return array($despesas_hoje, $recebido_hoje, $nome[0], $nome[1], $nome[2], $valor_caixa);
        }
    }
?>