import { useState } from "react";

import classes from "./contact-form.module.css";

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  function sendMessageHandler(event) {
    event.preventDefault();

    if (
      !enteredEmail ||
      enteredEmail.trim() === "" ||
      !enteredEmail.includes("@") ||
      !enteredName ||
      enteredName.trim() === "" ||
      !enteredMessage ||
      enteredMessage.trim() === ""
    ) {
      setIsInvalid(true);
      return;
    }

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        {isInvalid && (
          <p>Please enter a valid email or not empty name/message!</p>
        )}
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
