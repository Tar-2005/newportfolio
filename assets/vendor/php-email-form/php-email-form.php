<?php
class PHP_Email_Form {
  public $to;
  public $from_name;
  public $from_email;
  public $subject;
  public $ajax;
  public $smtp;
  private $messages = [];

  public function add_message($content, $label, $min_length = 0) {
    if (strlen(trim($content)) >= $min_length) {
      $this->messages[] = "$label: $content";
    }
  }

  public function send() {
    if (!isset($this->to, $this->from_email, $this->subject)) {
      return 'Missing required fields.';
    }

    $headers = "From: {$this->from_name} <{$this->from_email}>\r\n";
    $headers .= "Reply-To: {$this->from_email}\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $message = implode("\n", $this->messages);

    if (mail($this->to, $this->subject, $message, $headers)) {
      return $this->ajax ? 'OK' : 'Message sent successfully.';
    } else {
      return $this->ajax ? 'ERROR' : 'Failed to send email.';
    }
  }
}
?>
