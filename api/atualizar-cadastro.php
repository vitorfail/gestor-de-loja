<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");


    class AtualizarcadastroController{
        public function pesquisa(){
          if(AuthController::checkAuth()){
            $_POST = json_decode(file_get_contents("php://input"), true);
            try{
                include_once("conexao.php");
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                //insere na BD
                $sql = "UPDATE clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." SET nome= :nome, data_nascimento= :data, cpf= :cpf, estado_civil= :estado_civil, genero= :genero, uf= :uf, endereco= :endereco, cidade =  :cidade, telefone= :telefone, email= :email, notific = :notific WHERE id= :id";
                $salvar = $conexao->prepare($sql);
                $salvar->bindValue(':id', $_POST['id']);
                $salvar->bindValue(':nome', $_POST['nome']);
                $salvar->bindValue(':data', strval($_POST['data']));
                $salvar->bindValue(':cpf', $_POST['cpf']);
                $salvar->bindValue(':estado_civil', $_POST['estado_civil']);
                $salvar->bindValue(':genero', $_POST['genero']);
                $salvar->bindValue(':uf', $_POST['uf']);
                $salvar->bindValue(':endereco', $_POST['endereco']);
                $salvar->bindValue(':cidade', $_POST['cidade']);
                $salvar->bindValue(':telefone', $_POST['telefone']);
                $salvar->bindValue(':email', $_POST['email']);
                $salvar->bindValue(':notific', $_POST['notific']);
                $salvar->execute();
                $conexao = null;    
                //retorna 1 para no sucesso do ajax saber que foi com inserido sucesso
                return "1";
            } 
            catch (Exception $ex){
                $conexao = null;
                //retorna 0 para no sucesso do ajax saber que foi um erro
                return "0";
            }
        
          }
          else{
            return 'Usuário não autenticado';
          }
        }
    }
?>