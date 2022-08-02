<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");
    $GLOBALS['a'] = 'Authorization';
    $_POST = json_decode(file_get_contents("php://input"), true);
    function Check_user($usuario, $senha){
        include_once("login_conect.php");

        $sql = "SELECT id, nome, situacao FROM users_info WHERE email=:usuario and senha=:senha ";
        $pesquisa = $conexao->prepare($sql);
        $pesquisa->execute(array(
            ':usuario'=> $usuario
            ,':senha' => $senha));
        $puxar= $pesquisa->fetchAll();
        $conexao = null;

        $id = null;
        $nome = null;
        $situacao = null;
        $check = 0;
        if(count($puxar) >0 ){
            $check = 1;
            foreach($puxar as $row){
                $id= $row['id'];
                $nome = $row['nome'];
                $situacao = $row['situacao'];
            }
        }
        return array($check, $id, $nome, $situacao);
    }
    function Check_user_email($usuario){
        include_once("login_conect.php");

        $sql = "SELECT id, nome, situacao FROM users_info WHERE email=:usuario";
        $pesquisa = $conexao->prepare($sql);
        $pesquisa->execute(array(
            ':usuario'=> $usuario
            ,':senha' => $senha));
        $puxar= $pesquisa->fetchAll();
        $conexao = null;

        $id = null;
        $nome = null;
        $situacao = null;
        $check = 0;
        if(count($puxar) >0 ){
            $check = 1;
            foreach($puxar as $row){
                $id= $row['id'];
                $nome = $row['nome'];
                $situacao = $row['situacao'];
            }
        }
        return array($check, $id, $nome, $situacao);
    }
    class AuthController{
        public function login(){
            if(isset($_POST['user']) && isset($_POST['password'])){
                $resultado = Check_user($_POST['user'], md5($_POST['password']));

                if($resultado[0] >0){
                    $key = 'KILLLAKILLERUIM';
    
                    //Header Token
                    $header = [
                        'typ' => 'JWT',
                        'alg' => 'HS256'
                    ];
            
                    //Payload - Content
                    $payload = [
                        'id' => $resultado[1],
                        'name' => $_POST['user']
                    ];
            
                    //JSON
                    $header = json_encode($header);
                    $payload = json_encode($payload);
            
                    //Base 64
                    $header = base64_encode($header);
                    $payload = base64_encode($payload);
            
                    //Sign
                    $sign = hash_hmac('sha256', $header . "." . $payload, $key, true);
                    $sign = base64_encode($sign);
            
                    //Token
                    $token = $header . '.' . $payload . '.' . $sign;
                    return array($token, $resultado[2], $resultado[3]);  
                }
                else{
                    return 'Usuário não encontrado';
                }    
            }
            else{
                return 'Operação inválida';
            }
        }
        public function registro(){
            if(isset($_POST['user_nome']) && isset($_POST['user_email']) && isset($_POST['password']) && isset($_POST['password_confirm'])){
                $nome = $_POST['user_nome'];
                $email = $_POST['nomeuser_email'];
                $password = $_POST['password'];
                $password_confirm = $_POST['password_confirm'];
                $endereco = $_POST['endereco'];
                $resultado = Check_user_email($email);
                if($resultado[0] >0){
                    return "Já existe";
                }
                else{
                    $sql= "INSERT INTO `users_info` (`id`, `nome`, `email`, `telefone`, `ip`, `plano`, `valor-plano`, `data_vencimento`, `data-contratacao`, `situacao`, `senha`) VALUES
                    (1, 'Loja teste', 'failcreator0.0@gmail.com', '(88) 981393182', '192.168.0.116', 'Normal', '20', '06-08-2022', '12-03-2022', 'Aberto', 'e8d95a51f3af4a3b134bf6bb680a213a');
                    "
                }

            }
            else{
                return 'Operação inválida';
            }
        }
        public static function checkAuth(){
            $http_header = apache_request_headers();
            if(isset($http_header[$GLOBALS['a']]) && $http_header[$GLOBALS['a']] != null){
                $bearer = explode(' ', $http_header[$GLOBALS['a']]);
                $token = explode('.', $bearer[1]);
                $header = $token[0];
                $payload = $token[1];
                $sign = $token[2];

                $valid = hash_hmac('sha256', $header . '.' . $payload, 'KILLLAKILLERUIM', true);
                $valid = base64_encode($valid);
                if($sign === $valid ){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        public static function dados_de_sql(){
            $http_header = apache_request_headers();
            $bearer = explode(' ', $http_header[$GLOBALS['a']]);
            $decode = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $bearer[1])[1]))));
            return $decode;
        }
        public function pesquisa_nome(){
            if(AuthController::checkAuth()){
                include_once("login_conect.php");
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $sql = "SELECT nome from users_info WHERE id=1";
                $pesquisa = $conexao->query($sql);
                $resultado = $pesquisa->fetchAll();
                $nome = '';
                $tema = '';
                $array = array();
                $conexao = null;
                foreach($resultado as $row){
                    $nome = $row['nome'];
                    $tema = $row['tema'];
                }
                array_push($array, $nome, $tema);
                return $array;            
            }
            else{
                return 'Usuário não autenticado';              
            }
        }
    }
?>