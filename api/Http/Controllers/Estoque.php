<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    $GLOBALS['a'] = 'Authorization';
    $_POST = json_decode(file_get_contents("php://input"), true);
    class EstoqueController{
        public function valor_estoque(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT SUM((produto_valor+ custo_indireto) * quantidade) FROM `user-produtos` WHERE `user-id`= ".$dados_de_usuario_sql->id;
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = 0;
                $array = array();
                $conexao = null;
                return floatval($resultado[0]['SUM((produto_valor+ custo_indireto) * quantidade)']);            
            }
            else{
                return 'Usuário não autenticado';              
            }

        }

        public function estoque_descri(){
            if(AuthController::checkAuth()){
                include('conexao.php');
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT * FROM `user-produtos` WHERE `user-id`= ".$dados_de_usuario_sql->id." ORDER BY id DESC";
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $total = 0;
                $array = array();
                $conexao = null;
                return array_slice($resultado, $_POST['index'], $_POST['tamanho'] );            
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
        public function pesquisa(){
            $nome = $this->nome();
            $valor_estoque = $this->valor_estoque();
            $estoque_descri = $this->estoque_descri();
            return array($valor_estoque, $estoque_descri, $nome[0], $nome[1], $nome[2]);
        }
    }
?>