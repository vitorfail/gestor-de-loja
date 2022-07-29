<?php
  namespace Map\Http\Controllers;
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
  header("Access-Control-Allow-Headers: *");
  $_POST = json_decode(file_get_contents("php://input"),true);

  class RankingsController{
    public function pesquisa(){
        if(AuthController::checkAuth()){
            include('conexao.php');

            $dados_de_usuario_sql = AuthController::dados_de_sql();
            if( $_POST['passe'] == 'visita'){
              try{
                    $sql = "SELECT id, nome, visitas from acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." order by visitas DESC";
                    $pesquisa_id = $conexao->query($sql);
                    $visitantes = $pesquisa_id->fetchAll();
                    $array= array();
                    $nome = array();
                    $visitas = array();
                    $conexao = null;
                    if(count($visitantes) > 0){
                      foreach($visitantes as $row){
                        array_push($nome, $row['nome']);
                        array_push($visitas, $row['visitas']);
                      }
                      array_push($array, $nome, $visitas);
                      return $array;
                    }
                    else{
                        return '1';
                    }
                }
                catch(Exception $ex){
                  return '2';
                } 
            }
            if( $_POST['passe'] == 'pagamento'){
              try{
                  $dados_de_usuario_sql = AuthController::dados_de_sql();
                  $sql = "SELECT * from acumulado_".$dados_de_usuario_sql->name."_".$dados_de_usuario_sql->id." order by valor DESC";
                  $pesquisa = $conexao->query($sql);
                  $resultado = $pesquisa->fetchAll();
                  $nome = array();
                  $valor = array();
                  $array = array();
                  $conexao = null;
                  if(count($resultado) > 0){
                    foreach ($resultado as $row){
                      array_push($nome, $row['nome']);
                      array_push($valor, $row['valor']);
                    }
                    array_push($array, $nome, $valor);
                    return $array;
                  }
                  else{
                      return '1';
                  }
                }
                catch(Exception $e){
                    return '2';
                }
            }
        }
        else{
          return 'Usuário não autenticado';
        }
    }
  }
?>