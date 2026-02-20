<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

  $to = "jpimentelmonrroy@gmail.com";
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $subject = htmlspecialchars($_POST['subject']);
  $message = htmlspecialchars($_POST['message']);

  $body = "Nombre: $name\n";
  $body .= "Email: $email\n\n";
  $body .= "Mensaje:\n$message";

  $headers = "From: $email";

  if (mail($to, $subject, $body, $headers)) {
    echo "Mensaje enviado correctamente.";
  } else {
    echo "Error al enviar el mensaje.";
  }

}
?>