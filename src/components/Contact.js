import UiButton from './UiButton';
import contact from '../assets/contact.png';
import {useState} from 'react';
import thumb from '../assets/thumb.svg';

const Contact = () => {
  const [status, setStatus] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    page: window.location.href,
  });
  const [errors, setErrors] = useState({});

  const setField = (field, e) => {
    handleErrors(field, false);
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleErrors = (fieldName, isError) => {
    setErrors((state) => ({
      ...state,
        [fieldName]: isError,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let isError = false;

    Object.keys(formData).forEach((fieldName) => {
      if (!formData[fieldName]) {
        handleErrors(fieldName, true);
        isError = true
      }
    })

    if (isError) return;

    const res = await fetch(
      'https://hooks.zapier.com/hooks/catch/11186117/bdbj4w9',
      {
        method: 'POST',
        body: JSON.stringify(formData),
      },
    ).then((res) => res.status);

    if(res < 400) {
      setFormData({
        name: '',
        email: '',
        message: '',
        page: '',
      });
      setStatus(true);
    }
  }

  const closeSuccess = () => setStatus(false);

  return (
    <section id="contact" className="contact">
      {status ? (
        <div className="contact__success contact-content">
          <img src={thumb} alt="thumb up"/>
          <h3>Message sent</h3>
          <p>Thank you, we will get back to you</p>
          <UiButton
            withBorder
            onClick={closeSuccess}
          >
            Send one more message
          </UiButton>
        </div>
      ) : (
        <div className="contact-content">
          <h3>Contact us</h3>
          <p>
            The future is ours to build, together. If you would like to be a part
            of the AirDAO community, don't hesitate to reach out today
          </p>
          <form onSubmit={onSubmit}>
            <div style={{position: 'relative', margin: '20px 0'}}>
              <input
                className={`contact-content__input${errors.name ? ' contact-content__input_error' : ''}`}
                type="text"
                placeholder="Your name"
                onChange={setField.bind(this, 'name')}
                value={formData.name}
              />
              {errors.name && <p className="error-message">Please fill out the field</p>}
            </div>
            <div style={{position: 'relative'}}>
              <input
                className={`contact-content__input${errors.email ? ' contact-content__input_error' : ''}`}
                type="email"
                placeholder="Email"
                onChange={setField.bind(this, 'email')}
                value={formData.email}
              />
              {errors.email && <p className="error-message">Please fill out the field</p>}
            </div>
            <div style={{position: 'relative'}}>
              <textarea
                className={`contact-content__input contact-content__input_third${errors.message ? ' contact-content__input_error' : ''}`}
                placeholder="Your message"
                onChange={setField.bind(this, 'message')}
                value={formData.message}
              />
              {errors.message && <p className="error-message">Please fill out the field</p>}
            </div>
            <UiButton
              type="submit"
              withBorder
              className="contact-content__btn"
            >
              Submit
            </UiButton>
          </form>
        </div>
      )}
      <div className="contact__img">
        <img src={contact} alt="contact"/>
      </div>
    </section>
  );
};

export default Contact;
