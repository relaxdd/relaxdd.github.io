<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">

	<title>Лазеркидс - Предложения школам</title>

	
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
        <div class="about aboutheader"><h2>Предложения школам и другим образовательным учереждениям</h2></div>
      <div class="about">
      <p>
        В школах часто используют наше оборудование, преподователи ОБЖ,  ОВС/НВП, учителя физкультуры. Для проведения развелкательно-массовых и воспитательно-патриотических мероприятий. Зарницы, эстафеты, курс молодого бойца и.т.д. <br><br> 

        Отличительная особенность нашего оборудование, его доступность и разнообразие функционала, позволяют проводить интересные и запоминающиеся мероприятия. Благодаря специальному макету оборудования, в нем отсутствуют агрессивные элементы, что является важным фактором и позволяет использовать для мероприятий среди детей младшего возраста.<br><br>

        Мы устанавливаем минимальные цены в сотрудничестве со общеобразовательными учреждениями, подробнее можно уточнить у наших менеджеров воспользовавшись контактной формой внизу страницы.<br><br>

        ОСОБЕННОСТЬ РАБОТЫ С ОБЩЕОБРАЗОВАТЕЛЬНЫМИ УЧРЕЖДЕНИЯМИ: МИНИМАЛЬНЫЕ ЦЕНЫ, ПО ВОЗМОЖНОСТИ, ПРОВЕДЕНИЕ БЕСПЛАТНЫХ МЕРОПРИЯТИЙ В ШКОЛАХ, ТЕХНИКУМАХ И.Т.Д. (школы могут оставлять заявки в контактной форме, расположенной внизу страницы, на проведение бесплатных мероприятий).
      </p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/H45X7Lg4jJM?start=10" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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