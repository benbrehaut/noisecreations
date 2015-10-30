<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
	<title>Thanks for the message! | noisecreations</title>
   		 		<link rel="icon" href="imgs/favicon.ico" type="image/png"/>
   		 				<link rel="stylesheet" href="styles.css">
   		 				<link rel="stylesheet" href="headhesive.css">
   		 						<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
</head>
<body>
<div id="simple_content">
	<div id="cookies_text">
        <h2>Thank You</h2>
<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$formcontent="From: $name \n Message: $message";
	$recipient = "info@noisecreations.co.uk";
	$subject = "Contact Form";
	$mailheader = "From: $email \r\n";
	mail($recipient, $subject, $formcontent, $mailheader) or die("Whoops, we appear to have an error! Please try again.");
	echo "<p>Thank You for your message! </p><p>We aim to respond within 24 hours of every email, but if you do not hear from us, then feel free to give us an email or tweet!</p>";
?>
	<p><a href="index.html">Return to noisecreations</a>
	</p></div>
</div>				<!-- end of content div -->
</body>
</html>
