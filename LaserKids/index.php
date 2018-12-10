<!doctype html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    
    <title>Лазеркидс - Главная</title>
   
    <!-- <link rel="stylesheet" href="css/swiper.min.css"> -->
    <link rel="stylesheet" href="css/footer(learn).css">
    <link rel="stylesheet" href="css/header(learn).css">
    <link rel="stylesheet" href="css/font-awesome.css"> 
    <link rel="stylesheet" href="css/article.css">
    <link rel="stylesheet" href="css/sitebar.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/about.css">
   
    <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Roboto+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Mali|Raleway|Slabo+27px" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200i" rel="stylesheet">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:300i" rel="stylesheet">

     <!-- <script src="js/swiper.min.js"></script> -->
</head>

<body>

    <?php 
     require_once "header.php";
    ?>

<main class="clearfix">

  <article class="contetn">
      <div class="inercontent1">
          <div class="inercontener">
            <div class="minibox">
              <h2 id="h2">Laserkids - Российский производитель розничного лазертаг-оборудования</h2><hr width="200px"/>
              <p class="text">
                Наши бюджетные девайсы прекрасно подойдут для вашего ребенка.
                Стоимость в 5 раз меньше аналога!<br/><br/>
                Перед использованием нашей продукции внимательно ознакомьтесь с инструкцией<br/><br/><strong id="endminibox">
                Сохраните инструкцию для дальнейших обращений к ней.</strong>
              </p>
            </div>
          </div>
      </div>

      <div class="content2">
        <div class="inercontent2">
          <hr width="550px"/>
          <h2>LaserKids</h2>
          <hr width="550px"/>

          <p class="textinercontent" >Приветствую тебя на сайте LaserKids, у нас ты можешь найти девайсы на любой вкус, начиная от выбора оружия, его цвета и заканчивая комплектацией, перейди на страницу <a href="katalog-gun.html">каталога</a>  для просмотра нашего ассортимента, также для консультации можно позвонить по номеру<br> +7 (960) 362 1543 и уточнить все возникшие вопросы, смотри и советуй друзьям, ведь у нас самое доступное лазертаг-оборудование которое подходит как для аренного так и для внеаренного лазертага,  не забудь подписаться на нас в <a href="https://vk.com/kidlaser" target="_blank">cоцсетях</a>, удачи тебе в покупках и на полях сражений Лазертага!
          </p>
          <div class="imgstart">
            <img class="imginercontent2" src="images/img6.jpg" alt="img6" style="height: 380px; width: 590px;">
          </div>
           
        </div>

        <div class="inercontent2">
          <hr width="550px"/>
          <h2>Что мы предлагаем?</h2>
          <hr width="550px"/>
          
          <p class="textinercontent">Наша продукция продается как для частного пользования так и для розничной тогровли, для сотрудничества звоните по указанному телефону, мы продаем свое лазертаг-оборудование школам, спортивным секциям, и другим заведениям по специальным предложениям, игровые наборы для командного лазертага и многое другое, наш каталог постоянно обновляется, так что не пропусти новые предложения!</p>
    
          <iframe width="550" height="310" src="https://www.youtube.com/embed/q8MetPRkIdk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
  </article>

 <?php require_once "sitebar.php";
 ?>

</main>
    
<?php require_once "footer.php";
?>

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
