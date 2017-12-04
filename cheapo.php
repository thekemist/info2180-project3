<?php

//Start session

session_start();

$servername = getenv('IP');

$username = "jinyus";

$password = '';

$dbname = 'cheapomail';

try{

    $conn = new PDO("$mysql:servername=$servername;dbname=$dbname", $username, $password);

}

catch(PDOException $e){

    echo $e;

}

if($_SERVER['REQUEST_METHOD'] === 'POST'){

//user to be added

    $f_name = $_POST["firstname"];
    
    $l_name = $_POST["lastname"];
    
    $u_name = $_POST["username"];
    
    $pword = md5($_POST["password"]);
    
    $loginusername = $_POST["loginname"];
    
    $loginpassword = sha1($_POST['loginpassword']);
    
    //indicate logout
    
    $logout = $_POST["logout"];
    
    //indicate read messages
    
    $readID = $_POST["read_id"];

    //logging out
    
    if ($lgout="true"){
    
    session_unset();
    
    session_destroy();
    
    }

//Sign up

if(isset($username) && isset($password) && isset($first_name) && ($last_name)){

    $sql = "INSERT INTO users(firstname, lastname, username, password) VALUES('$f_name', '$l_name', '$u_name', '$pword');";
    
    $connect->exec($sql);
    
    echo 'User added and can now use CheapoMail.';

}

//login

if(isset($username) && isset($password)){

    $sql = "SELECT * FROM Users WHERE username = '$loginusername' AND password = '$loginpasswordpword';";
    
    $stmt = $connect->query($sql);
    
    $res = $stmt->fetch();
    
    if($res != null){
    
    $_SESSION["username"] = $res["username"];
    
    $_SESSION["userID"] = $res["ID"];
    
    echo "User found";

}

else{

    echo "User not found. Search Again.";

}

}

//Messages read

if(isset($user_id)){

    c
    
    $sql = "INSERT INTO message_read(read_id,message_id) VALUES('$readID','')";
    
    $connect->exec($sql);

}

//send a message

if (isset($recps) && isset($subj) && isset($body)){

    //get id of sender
    
    $sid = $_SESSION["user_id"];
    
    $cdate = date("Y/m/d");
    
    $recps = explode(",", $recps);

foreach($recps as $recp){

    //get id of receiver
    
    $stmt2 = $conn->query("SELECT id FROM users WHERE username = '$recp'");
    
    $s = $stmt2->fetch();
    
    $rid = $s["id"];
    
    // query to be sent
    
    $q = "INSERT INTO message(recipients_id, user_id, subject, body, sentdate) VALUES('$rid', '$sid', '$subj', '$body', '$cdate');";
    
    $conn->exec($q);

}

    echo 'Message Sent';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // user id to recieve mail
    
    $rcvr = $_SESSION["user_id"];
    
    $getmail = strip_tags($_GET["getmail"]);

    if ($getmail == 'true'){
    
    $stmt = $conn->query("SELECT * FROM message WHERE recipients_id = '$rcvr' ORDER BY sentdate LIMIT 10;");
    
    $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $stmt2 = $conn->query("SELECT message_id FROM message_read;");
    
    $res2 = $stmt2->fetchAll(PDO::FETCH_COLUMN, 0);
    
    if(count($res) == 0){
    
    echo "<h2>No Mail Found</h2>";

}

else{

foreach($res as $mail){

$new = $conn->query("SELECT username FROM user WHERE id = '" . $mail["user_id"] . "';");

$sendr = $new->fetch();

if (in_array($mail["id"], $res2)){

echo '<div class="mail read">';

echo '<p>(Read)</p>';

}

else{

echo '<div class="mail unread">';

}

echo '<p>From: ' . $sendr["username"] . '</p>';

echo '<p>Subject: ' . $mail["subject"] . '</p>';

echo '<p class="recv">Message: ' . $mail["body"] . '</p>';

echo '<input type="submit" class="showbutton" value="Read"/>';

echo '<p class="hide">' . $mail["id"] . '</p>';

echo '</div> <br><br>';

}

}

}

}

?>