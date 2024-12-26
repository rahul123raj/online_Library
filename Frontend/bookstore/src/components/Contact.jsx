import { useState } from 'react';
import '../assets/style/contact.css'

function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "c2d85c16-59ef-40f0-a8b7-8cac7d7a8fdc");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>

      <div className="main-contact"></div>

      <div className='contact-form'>
        <h2>contact us:</h2>
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" required />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />
    </div>

    <div className="form-group">
      <label htmlFor="message">Message</label>
      <textarea name="message" required></textarea>
    </div>

    <button type="submit">Submit Form</button>
  </form>
  <span>{result}</span>
</div>

    </>

  );
}

export default Contact;