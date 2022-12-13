<script>
    import emailjs from '@emailjs/browser';
  
    function sendEmail(e) {
      emailjs.sendForm('nextcloud_email', 'template_a4kvakl', e.target, 'pYAFgEMR9CybRdwAz')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    }
  </script>
  
  <form on:submit|preventDefault={sendEmail}>
    <label>Name</label>
    <input type="text" name="to_name">
    <label>Email</label>
    <input type="email" name="user_email">
    <label>Message</label>
    <textarea name="message"></textarea>
    <input type="submit" value="Send">
  </form>