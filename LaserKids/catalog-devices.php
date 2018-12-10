<!DOCTYPE html>
<html lang=ru_RU>
<head>
	<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  
	<title>Лазеркидс Каталог - Девайсы</title>

	 <link rel="stylesheet" href="css/katalog.css">
   <link rel="stylesheet" href="css/mediakatalog.css">
   <link rel="stylesheet" href="css/media.css">
	 <link rel="stylesheet" href="css/header(learn).css">
	 <link rel="stylesheet" href="css/sitebar.css">
	 <link rel="stylesheet" href="css/footer(learn).css">
   <link rel="stylesheet" href="css/style.css">
	 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">

	 <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Roboto+Mono" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Mali|Raleway|Slabo+27px" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:200i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300i" rel="stylesheet">
</head>

<body>
    
<?php require_once "header.php"; ?>

<main>
  <article>

    <?php require_once "catalog-header.php"; ?>
    	
    <div class="price" id="pr1" >
      <div class="priceleft">

        <div class="pricebox">
          <div class="imgbox img1"><img src="images/price/Device/img3.jpg" alt="">   
          </div>
          <h3 style="padding-top: 23px">Электронный флаг LaserKids<hr style="margin-top: 19px; "/></h3>
          <p class="textbox">

До сих пор мы привыкли к девайсам точка, бомба, аномалия. И вот, наконец, на рынок лазертага вышел девайс электронный флаг.
Теперь с функционалом данного девайса уже нельзя будет принести украденный флаг с базы
соперника мертвому игроку, потому как теперь для поддержания жизнеспособности флага игрок
должен будет отдавать свои боезаряды. Другими словами после того как игрок взял с базы
соперника флаг, девайс переходит режим уменьшенного энергозаряда и в течение времени
(устанавливается пользователем по умолчанию 7 секунд) обладатель флага для пролонгации
энергозапаса должен будет выстрелить в фотоприемник флага. Если игрок не успел выстрелить, то
флаг за 5 секунд до дезактивации начинает сигнализировать о критическом уровне энергозапаса и
далее долгим звуковым сигналом обозначается дезактивация флага. После дезактивации - флаг
должен быть возвращен на базу активации флага, которая обычно располагается возле базы.
          </p>

          <span class="btn buton">Комплектация:</span>
           <div  class="pricetag">
            <div class="div">
              <div class="div3">Standtart:
              </div>
              <p>Идет в стандартной комплектации, так же при заказе обговаривается цвет девайса и прочии пожелания</p>
            </div>
          </div>
          <p class="textprice">Цена: 3 600р</p>
        </div> 

        

         <div class="pricebox">
          <div class="imgbox img1"> 
          <img src="images/price/Device/img2.jpg" alt="">   
          </div>
          <h3>Laserkids Аптечка<hr/></h3>
          <p class="textbox">
            Электронная аптечка для игры в Lasertag, служит для воскрешения команды
          </p>

          <span class="btn buton">Комплектация:</span>
           <div  class="pricetag">
            <div class="div">
              <div class="div3">Standtart:
              </div>
              <p>Идет в стандартной комплектации: Дизайн модели обговаривается отдельно при заказе</p>
            </div>
            
          </div>
          <p class="textprice">Цена: 8 600р</p>
        </div> 

      </div>

       <div class="priceright">
        <div  class="pricebox">
          <div class="imgbox img1"><img src="images/price/Device/img5.jpg" alt="">  
          </div>
          <h3>Повязка с датчиком поражения LaserKids<hr/></h3>
          <p class="textbox">
            Повязка с датчиком поражения LaserKids
          </p>

          <span class="btn buton">Комплектация:</span>
           <div class="pricetag">
            <div class="div">
              <div class="div3">Standtart:
              </div>
              <p>Идет в стандартная комплектация: Повязка Laserkids с датчиком поражения (Цвет провода обговаривается отдельно)</p>
            </div>
            
          </div>
          <p class="textprice">Цена: 800р</p>
        </div> 

         <div class="pricebox">
          <div class="imgbox img1"> 
          <img src="images/price/Device/img7.jpg" alt="">   
          </div>
          <h3>Элетроная база Laserkids<hr/></h3>
          <p class="textbox">
            Электронная база для игры в Lasertag
          </p>

          <span class="btn buton">Комплектация:</span>
           <div  class="pricetag">
            <div class="div">
              <div class="div3">Standtart:
              </div>
              <p>Стандартная комплектация: Элетронная база для игры в Lasertag (Дизайн модели обговаривается отдельно при заказе)</p>
            </div>
          </div>
          <p class="textprice">Цена: 8 600р</p>
        </div> 
      </div>
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