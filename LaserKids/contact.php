<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">

	<title>Лазеркидс - Наши Контакты</title>

	
    <link rel="stylesheet" href="css/footer(learn).css">
    <link rel="stylesheet" href="css/header(learn).css">
    <link rel="stylesheet" href="css/font-awesome.css"> 
    <link rel="stylesheet" href="css/about.css">
    <link rel="stylesheet" href="css/sitebar.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/katalog.css">

   
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Roboto+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Mali|Raleway|Slabo+27px" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200i" rel="stylesheet">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:300i" rel="stylesheet">

</head>
<body>
<?php require_once "header.php"; ?>
    <main>
    	<article >
        <div class="about aboutheader">
          <h2>Контакты</h2>
        </div>

      <div class="about">
      <p>
       Главный офис "Релакс" LaserKids находится по адресу: Уляновская область г. Димитровград ул. Гвардейская д. 44 (Вход с левого торца здания - С противоположной стороны от магазина "Магнит")<br><br>
       Номер телефона Директора: Чурбанов Павел  +7 (960) 362 15 43<br><br>
       Наш Skype: laserkids73<br><br>

       Электроная почта: Laserkid@yandex.ru
     </p>
       <div class="social_about">

        <div class="social_about_inner">
        <a href="https://vk.com/kidlaser" target="_blank">
          <i id="vk2" class="fa fa-vk"></i>Вконтакте
        </a>
        </div>

        <div class="social_about_inner">
          <a href="https://www.facebook.com/LaserkidsRU" target="_blank"><i id="facebook2" class="fa fa-facebook"></i>Facebook
        </a>
        </div>

        <div class="social_about_inner">
          <a href="https://www.youtube.com/channel/UCw8mC65Cvtyq6nyV0xSI0Mg/videos" target="_blank"><i id="you-tube2" class="fa fa-youtube-play"></i>Youtube</a>
        </div>

       <div class="social_about_inner">
        <a href="https://vk.com/kidlaser" target="_blank"><i id="instagram2" class="fa fa-instagram"></i>Instagram
       </a>
       </div>

       <div class="social_about_inner">
        <a href="https://twitter.com/laserkidsru" target="_blank"><i id="twitter2" class="fa fa-twitter"></i>Twitter
       </a>
       </div>

     </div>
     
   </div>

   <div class="about aboutheader">
     <h2>Юридическая информация: </h2>
     <p>                                         
       ИНН 7329004900<br><br>
       КПП 732901001 <br><br>
       ОГРН 1117329002471 <br><br>
       ОКПО 87798357 <br><br>
       Счет № 40702810820000001408<br><br>
       Ульяновский филиал ЗАО АКБ "ГАЗБАНК" г. Ульяновск<br><br>
       Кор/счет 30101810500000000856 <br><br>
       БИК 047308856<br><br> 
       Юридический адрес: Ульяновская обл, г. Димитровград, ул. Куйбышева, дом.291
       </p>    
   </div>

</article>

 <?php require_once "sitebar.php"; ?>

    </main>

   <?php require_once "footer.php"; ?>

    <script>

    var btn = document.getElementsByClassName('btn');
     
  for(let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function() {
  
    if(!(this.classList.contains('active'))){
      for(let i = 0; i < btn.length; i++){
         btn[i].classList.remove('active');
       }
      btn[i].classList.add('active');
      } else {
        btn[i].classList.remove('active');
        }
    })
   } 
  </script>
</body>
</html>