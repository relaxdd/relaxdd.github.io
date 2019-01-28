<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
// $email = $_POST['user_email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';                                               // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'awenn2019@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'awennty2020modern2'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('awenn2019@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('awenn2015@gmail.com');     // Кому будет уходить письмо dimles@list.ru
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта Мир Дров';
$mail->Body    = '' .$name . ' оставил заявку, вот его телефон ' .$phone ; 
// '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
  if($name == ''){
  	// header('Location: /index.html');
    ?>
         <script>
            alert("Введите имя!");
            window.location.href = '/index.html';

        </script>
    <?php
    
  } else{
    if($phone == ''){

    ?>
         <script type="text/javascript">
            alert("Введите номер телефона!");
            window.location.href = '/index.html';
        </script>
    <?php


    } else{
       ?>
         <script type="text/javascript">
            alert("Спасибо за заявку, мы вам скоро перезвоним!");
            window.location.href = '/index.html';
        </script>
        <?php
    }
  }
   
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Обратная связь</title>
</head>
<body>
	
</body>
</html>