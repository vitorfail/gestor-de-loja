<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
    header("Access-Control-Allow-Headers: *");

	require("mercadopago/vendor/autoload.php");


	MercadoPago\SDK::setAccessToken("APP_USR-4390047053471485-080610-8552e3de7962295c5375753a253cd0f5-517207508");

  $preference = new MercadoPago\Preference();

  $plano = ['Plano', 1, '30,00'];

# Building an item


  $item2 = new MercadoPago\Item();
  $item2->id = "00002";
  $item2->title = $plano[0]; 
  $item2->quantity = $plano[1];
  $item2->unit_price = str_replace(',', '.', $plano[2]);



  
  $preference->items = array($item2);
  $preference->external_reference = 4545;
  $preference->save(); # Save the preference and send the HTTP Request to create
  
  # Return the HTML code for button
  
  echo '$preference->init_point';

?>