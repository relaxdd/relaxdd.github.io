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