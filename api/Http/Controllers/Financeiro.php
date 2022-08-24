<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    date_default_timezone_set('America/Sao_Paulo');
    $GLOBALS['a'] = 'Authorization';
    $_POST = json_decode(file_get_contents("php://input"), true);
    class FinanceiroController{
        public function despesas(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT SUM(valor_despesas) AS total FROM `user_despesas` WHERE YEAR(data_pagamento) = ".$_POST['ano']." AND `user_id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = $resultado[0]["total"];
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
        public function recebido_ano(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql();
                $sql = "SELECT SUM(valor_venda*quantidade) AS total FROM `user_vendas` WHERE YEAR(data_venda)  = ".$_POST['ano']." and `user_id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                
                return floatval($resultado[0]['total']);            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function faturamento_mensal(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT data_venda, (valor_venda*quantidade) AS total FROM `user_vendas` WHERE YEAR(data_venda) AND `user_id`= ".$dados_de_usuario_sql->id;
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
                if(count($resultado) == 0){
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
                }
                else{
                    foreach($resultado as $row){
                        $dataf =  explode('-', $row['data_venda']);
                        if($dataf[1] == '01'){
                            $janeiro = $janeiro + $row['total'];
                        }
                        if($dataf[1] == '02'){
                            $fevereiro = $fevereiro + $row['total'];
                        }
                        if($dataf[1] == '03'){
                            $marco = $marco + $row['total'];
                        }
                        if($dataf[1] == '04'){
                            $abril = $abril + $row['total'];
                        }
                        if($dataf[1] == '05'){
                            $maio = $maio + $row['total'];
                        }
                        if($dataf[1] == '06'){
                            $junho = $junho + $row['total'];
                        }
                        if($dataf[1] == '07'){
                            $julho = $julho + $row['total'];
                        }
                        if($dataf[1] == '08'){
                            $agosto = $agosto + $row['total'];
                        }
                        if($dataf[1] == '09'){
                            $setembro = $setembro + $row['total'];
                        }
                        if($dataf[1] == '10'){
                            $outubro = $outubro + $row['total'];
                        }
                        if($dataf[1] == '11'){
                            $novembro = $novembro + $row['total'];
                        }
                        if($dataf[1] == '12'){
                            $dezembro = $dezembro + $row['total'];
                        }
                    }    
                }
                return array($janeiro, $fevereiro, $marco, $abril, $maio, $junho, $julho, $agosto, $setembro, $outubro, $novembro, $dezembro);            }
            else{
                return 'Usuário não autenticado';              
            }

        }
        public function produto_menos_vendido(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT produto_nome, COUNT(produto_id) * SUM(quantidade) AS Qtd FROM user_vendas WHERE user_id= ".$dados_de_usuario_sql->id." GROUP BY produto_id ORDER BY COUNT(produto_id) ASC LIMIT 5";
                $pesquisa = $conexao->query($sql);
                $produto_nome = array();
                $Qtd = array();

                if($pesquisa == false){
                    return 0;
                }
                else{
                    $resultado = $pesquisa->fetchAll();
                    foreach ($resultado as $row) {
                        array_push($produto_nome, $row['produto_nome']);
                        array_push($Qtd, $row['Qtd']);
                    }
                    return array('produto_nome' => $produto_nome, 'Qtd' => $Qtd);            
                }                
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function produto_mais_vendido(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT produto_nome, COUNT(produto_id) * SUM(quantidade) AS Qtd FROM user_vendas WHERE user_id= ".$dados_de_usuario_sql->id." GROUP BY produto_id ORDER BY COUNT(produto_id) DESC LIMIT 1";
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                
                return array('produto_nome' => $resultado[0]["produto_nome"], 'quantidade' => $resultado[0]["Qtd"]);            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
        public function pesquisa(){
            $nome = $this->nome();
            $recebido_ano = $this->recebido_ano();
            $despesas = $this->despesas();
            $produto_menos_vendido = $this->produto_menos_vendido();
            $produto_mais_vendido = $this->produto_mais_vendido();
            return array( 'nome' => $nome[0], 'situacao' => $nome[1], 
            'data_vencimento' => $nome[2], 'recebido' => $recebido_ano, 'produto_mais_vendido' => $produto_mais_vendido,
             'despesas' => $despesas, 'produto_menos_vendido' => $produto_menos_vendido);
        }
    }
?>