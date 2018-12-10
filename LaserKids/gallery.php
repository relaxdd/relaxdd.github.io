<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">

	<title>Лазеркидс - Галерея</title>

	
    <link rel="stylesheet" href="css/footer(learn).css">
    <link rel="stylesheet" href="css/header(learn).css">
    <link rel="stylesheet" href="css/font-awesome.css"> 
    <link rel="stylesheet" href="css/about.css">
    <link rel="stylesheet" href="css/sitebar.css">
    <link rel="stylesheet" href="css/media.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/katalog.css">
    <link rel="stylesheet" href="css/gallery.css">


   
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
        <hr>
        <section class="galleryheader">
          <h2>Галерея Laserkids</h2>
        </section>
        <hr>

        <section class="grid_gallery">

          <div class="grid-item-a galleryphoto"></div>                  <div class="grid-item-b galleryphoto"></div>                  <div class="grid-item-c galleryphoto"></div>          <div class="grid-item-d galleryphoto"></div>          <div class="grid-item-e galleryphoto"></div>                     <div class="grid-item-f galleryphoto"></div>
          <div class="grid-item-j galleryphoto"></div>
          <div class="grid-item-k galleryphoto"></div> 
          <div class="grid-item-aa galleryphoto"></div>        
          <div class="grid-item-bb galleryphoto"></div>        
          <div class="grid-item-cc galleryphoto"></div>
          <div class="grid-item-dd galleryphoto"></div>
          <div class="grid-item-ee galleryphoto"></div>          
          <div class="grid-item-ff galleryphoto"></div>
          <div class="grid-item-kk galleryphoto"></div> 
          
        </section>

        <div class="next-page">
        <a class="next-page-text" href="#">Следуйщая страница</a>
        <div class="next-page-item">
          <a class="next-page-number number-active" href="gallery.html">1</a>
          <a class="next-page-number number-noactive" href="#">2</a>
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