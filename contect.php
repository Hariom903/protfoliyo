<?php 
$host = "localhost";
$username = "root";
$password = null;
$db = "portfolio";

$conn = new mysqli($host, $username, $password, $db);

if ($conn->connect_error) {
   dir("db connect errer " . $conn->connect_error);
}

if(isset($_POST)){
 $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $phone = $_POST['phone'];

  $setdata = $conn->prepare("INSERT Into contect_us(`name`,`email`,`phone`,`message`) VALUES('$name','$email','$phone','$message')");
  $res = $setdata->execute();
  if($res){
    echo " <script>
     
       alert('  From submit successfluy ');
        window.location.href = '/Portfolio-Website';
    </script>";
  }
}
?>