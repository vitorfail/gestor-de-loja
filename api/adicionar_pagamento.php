<?php
      namespace Map\Http\Controllers;
      header("Access-Control-Allow-Origin: *");
      header("Access-Control-Allow-Credentials: true");
      header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
      header("Access-Control-Allow-Headers: *");

      class AdicionarpagamentoController{
          public function pesquisa(){
            if(AuthController::checkAuth()){
              try{
                $dados_de_usuario_sql = AuthController::dados_de_sql(); 
                $_POST  = json_decode(file_get_contents("php://input"), true);
                include_once('conexao.php');
                $sql = "INSERT INTO pagamentos_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id."(id_cliente, nome ,valor, data, tipo, procedimento) VALUES(:idcliente, :nome, :valor, :data, :tipo, :procedimento)";
                $inserir = $conexao->prepare($sql);
                $inserir->bindValue(':idcliente', $_POST['id']);
                $inserir->bindValue(':nome', $_POST['nome']);
                $inserir->bindValue(':valor', $_POST['valor']);
                $inserir->bindValue(':data', $_POST['data']);
                $inserir->bindValue(':tipo', $_POST['tipo']);
                $inserir->bindValue(':procedimento', $_POST['procedimento']);
                $inserir->execute();
          
          
                $sql2 = "SELECT * FROM acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." WHERE id= :id";
                $upar = $conexao->prepare($sql2);
                $upar->bindValue(':id', $_POST['id']);
                $upar->execute();
                $resultado = $upar->fetchAll();
          
                if($resultado == null){
                    $inserir = "INSERT INTO acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." (id, nome, valor, visitas) VALUES (:id, :nome, :valor, 1)";
                    $inserir_novo = $conexao->prepare($inserir);
                    $inserir_novo->bindValue(':id', $_POST['id']);
                    $inserir_novo->bindValue(':nome', $_POST['nome']);
                    $inserir_novo->bindValue(':valor', $_POST['valor']);
                    $inserir_novo->execute();
                }
                else{
                    $sql3 = "UPDATE acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." SET valor = valor + :valor, visitas=visitas+1 WHERE id = :id";
                    $upar1 = $conexao->prepare($sql3);
                    $upar1->bindValue(':id', $_POST['id']);
                    $upar1->bindValue(':valor', $_POST['valor']);
                    $upar1->execute();
                } 
                $conexao = null;
                return '1';
          
              }
              catch(Exception $ex){
                return '2';
              }
            }
            else{
              return 'Usuário não autenticado';
            }
          }
      }
?>