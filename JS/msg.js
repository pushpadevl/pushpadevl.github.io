(function() {
      emailjs.init("TxU9KchOcbajkf0uR");
})();

document.getElementById('contact-form').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent the default form submit behavior
emailjs.sendForm('service_lzvzrwi', 'template_2ce6mkq', this)
  .then(function() {
    alert('Email sent successfully!');
    document.getElementById('contact-form').reset(); // Clear the form after success
  }, function(error) {
    alert('Failed to send email. Please try again later.');
    console.error('EmailJS error:', error);
  });
});
