<?php
require "PHPMailer/PHPMailerAutoload.php";
?> <div id="after-form-submit">
	<span id="after-form-text"> <?php
if ($_SERVER["REQUEST_METHOD"] === "GET"){
	if (isset($_GET["name"]) && isset($_GET["email"]) && isset($_GET["message"])) {
		$name = htmlspecialchars($_GET["name"]);
		$email = htmlspecialchars($_GET["email"]);
		$message = htmlspecialchars($_GET["message"]);

		if (!empty($name) && !empty($email) && !empty($message)){
			// Email:

			$mail = new PHPMailer;

			//$mail->SMTPDebug = 3;                               // Enable verbose debug output

			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'mail.jnolander.com';  // Specify main and backup SMTP servers
			$mail->SMTPAuth = true;                               // Enable SMTP authentication
			$mail->Username = 'no-reply@jnolander.com';                 // SMTP username
			$mail->Password = 'noreply';                           // SMTP password
			$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
			$mail->Port = 587;                                    // TCP port to connect to

			$mail->setFrom('no-reply@example.com', 'jnolander.com');
			$mail->addAddress('jonas.nolander@gmail.com', 'Jonas Nolander');     // Add a recipient

			$mail->isHTML(true);                                  // Set email format to HTML

			$mail->Subject = "TEST!";
			$mail->Body    = "Name:" . $name . "<br/>Email: " . $email . "<br/> Message: " . $message;
			$mail->AltBody = "Looks like you don't want email in HTML!";

			if(!$mail->send()) {
				echo 'Message could not be sent.';
				echo 'Mailer Error: ' . $mail->ErrorInfo;
			} else {
				echo "Thank you!";
			}

		} else {
			echo "not all fields where filled in!";
		}
	} else { // !isset
		?><p>all variables not set</p><?php
	}
} else { // !REQUEST_METHOD
	?><p>Not correct http request...</p><?php
}
?></div>
</div>
