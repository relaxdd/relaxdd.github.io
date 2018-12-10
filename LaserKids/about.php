<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">

	<title>Лазеркидс - О нас</title>

	
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
        <div class="about aboutheader"><h2>О Нас</h2></div>
      <div class="about"><p>Компания "Лазеркид" Является частью корпорации "Релакс". Главный офис компании "Лазеркид", расположен в Ульяновской области в г. Димитровграде. Наша цель - создание и реализации различных видов оборудования для лазертага, ориентированных на всех связанных с лазертагом:<br><br>Профессиональные клубы, спортсмены, силовые структуры, частные лица. <br><br>
Мы ориентированы на создание бюджетного оборудования доступного каждому, сотрудничество с нами это:<br><br>
1) Доступность: Мы стремимся создать бюджетные варианты оборудования доступные каждому.<br><br>
2) Совместимость: использование единого протокола, позволяет использовать наше оборудование совместно с оборудование других производителей.<br><br>
3) Уникальное оборудование: мы создаем уникальные системы тагеров, такие как: "Лазетаг-пулемет" или система "Боец".<br><br>
4) Техническая поддержка: мы оказываем бесплатную техническую помощь для всех пользователей, нашего оборудования для лазертага.<br><br>
5) Уникальные характеристики:<br><br>
5.1.Мы стремимся избавить конечного потребителя от лишних кнопок и настроек. Так, для настройки оружия не требуется использования дополнительного программного обеспечения, приложений, компьютеров, планшетов. Настраивать оборудование, можно через программу встроенную в само оружие.<br><br>
5.2. Отсутствие лишних кнопок и элементов дизайна: Отсутствует кнопка включения и перезарядки, эти процессы происходят автоматически при использование оружия.
Наше оборудование имеет все необходимые сертификаты и разрешения. Доступно для детей старше 5 лет. ООО"Релакс" Все права защищены. <br><br>Связаться с нами. 
Дополнительные ресурсы: 
Лазертаг оборудование для оптовых закупщиков и ретейлеров: www.лазерныебои.рф
Лазертаг оборудование для клубов: 
<a href="http://www.laserkids.ru/" targer="_blank">www.laserkids.ru</a> 
Лазертаг оборудование для игроков: www.lasertags.ru</p>

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