<?php 
$host = "sql106.infinityfree.com";
$username = "if0_38979202";
$password ='TOLtzTmzLKWDGMf';
$db = "if0_38979202_portfolio";

$conn = new mysqli($host, $username, $password, $db);

if ($conn->connect_error) {
   dir("db connect errer " . $conn->connect_error);
}

if(isset($_POST) &&!empty($_POST['name']) &&!empty($_POST['email']) &&!empty($_POST['message']) &&!empty($_POST['phone'])){

 $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $phone = $_POST['phone'];

  $setdata = $conn->prepare("INSERT Into contect_us(`name`,`email`,`phone`,`message`) VALUES('$name','$email','$phone','$message')");
  $res = $setdata->execute();
  if($res){
    echo " <script>
     
        window.location.href = 'https://hariom.ct.ws/';
    </script>";
  }
}
?>