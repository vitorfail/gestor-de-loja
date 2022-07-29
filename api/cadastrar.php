<?php
    namespace Map\Http\Controllers;
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

    class CadastrarController{
        public function pesquisa(){
            if(AuthController::checkAuth()){
                try{
                  include_once("conexao.php");
                  $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                  $_POST = json_decode(file_get_contents("php://input"), true);
                  //insere na BD
                  $sql = "INSERT INTO clientes_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." (nome, data_nascimento, cpf, estado_civil, genero, uf, endereco, cidade, telefone, email, notific) 
                  VALUES (:nome, :data, :cpf, :estado_civil, :genero, :uf, :endereco, :cidade, :telefone, :email, :notific)";
                  $inserir = $conexao->prepare($sql);
                  $inserir->bindValue(':nome', $_POST['nome_input']);
                  $inserir->bindValue(':data', strval($_POST['data_input']));
                  $inserir->bindValue(':cpf', $_POST['cpf_input']);
                  $inserir->bindValue(':estado_civil', $_POST['estado_civil_input']);
                  $inserir->bindValue(':genero', $_POST['genero_input']);
                  $inserir->bindValue(':uf', $_POST['uf_input']);
                  $inserir->bindValue(':endereco', $_POST['endereco_input']);
                  $inserir->bindValue(':cidade', $_POST['cidade_input']);
                  $inserir->bindValue(':telefone', $_POST['telefone_input']);
                  $inserir->bindValue(':email', $_POST['email_input']);
                  $inserir->bindValue(':notific', $_POST['notific_input']);
                  $inserir->execute();
          
                  $conexao = null;    
                  //retorna 1 para no sucesso do ajax saber que foi com inserido sucesso
                  return "1";
                } 
                catch (Exception $ex)
                {
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