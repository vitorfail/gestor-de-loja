<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    $GLOBALS['a'] = 'Authorization';
    $_POST = json_decode(file_get_contents("php://input"), true);
    class HomeController{
        public function valor_estoque(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT produto_valor FROM `user-produtos` WHERE Vendido='Não' AND `user-id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = 0;
                $array = array();
                $conexao = null;
                foreach($resultado as $row){
                    $total = floatval($row['produto_valor']) + $total;
                }
                return $total;            
            }
            else{
                return 'Usuário não autenticado';              
            }

        }
        public function numero_de_roupas(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT COUNT(id) FROM `user-produtos` WHERE Vendido='Não' AND `user-id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = $resultado[0]["COUNT(id)"];
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
                $data_atual = date('d-m-Y');
                $sql = "SELECT SUM(valor_venda) AS total FROM user_vendas WHERE data_venda= ".$data_atual." AND `user_id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                
                return $resultado[0]['total'];            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function valor_estoque(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT data_venda, valor_venda  FROM `user_vendas` WHERE MONTH(data_venda) AND `user_id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $janeiro = 0;
                $fevereiro = 0;
                $marco = 0;
                $abril = 0;
                $maio = 0;
                $junho = 0;
                $julho = 0;
                $agosto = 0;
                $setembro = 0;
                $outubro = 0;
                $novembro = 0;
                $dezembro = 0;
                $array = array();
                $conexao = null;
                foreach($resultado as $row){
                    $total = floatval($row['produto_valor']) + $total;
                }
                return $total;            
            }
            else{
                return 'Usuário não autenticado';              
            }

        }
        public function pesquisa(){
            $nome = $this->nome();
            $valor_estoque = $this->valor_estoque();
            $numero_de_roupas = $this->numero_de_roupas();
            $valor_caixa = $this->valor_caixa();
            return array($numero_de_roupas, $valor_estoque, $nome[0], $nome[1], $nome[2], $valor_caixa);
        }
    }
?>