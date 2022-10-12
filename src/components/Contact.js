import UiButton from './UiButton';
import contact from '../assets/contact.png';
import { useState } from 'react';
import thumb from '../assets/thumb.svg';
import { PrismicText } from '@prismicio/react';
import SmallArrowUp from '../assets/images/Arrows/SmallArrowUp';
import SmallArrowDown from '../assets/images/Arrows/SmallArrowDown';
import { useRef } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const Contact = ({ heading, leadText }) => {
  const [status, setStatus] = useState(false);
  const [isDropDawn, setIsDropDawn] = useState(false);

  const menuRef = useRef(null);
  useOnClickOutside(menuRef, () => setIsDropDawn(false));

  const contactCategory = [
    'Tech support',
    'Business development',
    'Marketing and Press',
    'Other',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Tech support',
    message: '',
    page: window.location.href,
  });
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    handleErrors(field, false);
    setFormData({
      ...formData,
      [field]: value,
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
        isError = true;
      }
    });

    if (isError) return;

    const res = await fetch(
      'https://hooks.zapier.com/hooks/catch/11186117/bdbj4w9',
      {
        method: 'POST',
        body: JSON.stringify(formData),
      }
    ).then((res) => res.status);

    if (res < 400) {
      setFormData({
        name: '',
        email: '',
        message: '',
        category: 'Tech support',
        page: '',
      });
      setStatus(true);
    }
  };

  const closeSuccess = () => setStatus(false);

  return (
    <section id='contact' className='contact'>
      {status ? (
        <div className='contact__success contact-content'>
          <img src={thumb} alt='thumb up' />
          <h3>Message sent</h3>
          <p>Thank you, we will get back to you</p>
          <UiButton withBorder onClick={closeSuccess}>
            Send one more message
          </UiButton>
        </div>
      ) : (
        <div className='contact-content'>
          <h3>
            <PrismicText field={heading} />
          </h3>
          <p>
            <PrismicText field={leadText} />
          </p>
          <form onSubmit={onSubmit}>
            <div style={{ position: 'relative', margin: '20px 0' }}>
              <input
                className={`contact-content__input${
                  errors.name ? ' contact-content__input_error' : ''
                }`}
                type='text'
                placeholder='Your name'
                onChange={(e) => setField('name', e.target.value)}
                value={formData.name}
              />
              {errors.name && (
                <p className='error-message'>Please fill out the field</p>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                className={`contact-content__input${
                  errors.email ? ' contact-content__input_error' : ''
                }`}
                type='email'
                placeholder='Email'
                onChange={(e) => setField('email', e.target.value)}
                value={formData.email}
              />
              {errors.email && (
                <p className='error-message'>Please fill out the field</p>
              )}
            </div>
            <div className='contact-content__topic'>
              <div
                style={{
                  display: 'flex',

                  flexGrow: 1,
                  justifyContent: 'space-between',
                }}
                onClick={() => setIsDropDawn((prev) => !prev)}
              >
                <span>{`Category: ${formData.category}`}</span>
                <span>
                  {isDropDawn ? <SmallArrowUp /> : <SmallArrowDown />}
                </span>
              </div>
              {isDropDawn && (
                <div className='contact-content__topic-select'>
                  <ul ref={menuRef}>
                    {contactCategory.map((item) => (
                      <li
                        key={item}
                        onClick={() => {
                          setField('category', item);
                          setIsDropDawn(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <textarea
                rows={4}
                className={`contact-content__input contact-content__input_third${
                  errors.message ? ' contact-content__input_error' : ''
                }`}
                placeholder='Your message'
                onChange={(e) => setField('message', e.target.value)}
                value={formData.message}
                style={{ marginTop: 30 }}
              />
              {errors.message && (
                <p className='error-message'>Please fill out the field</p>
              )}
            </div>
            <UiButton type='submit' withBorder className='contact-content__btn'>
              Send
            </UiButton>
          </form>
        </div>
      )}
      <div className='contact__img'>
        <img src={contact} alt='contact' />
      </div>
    </section>
  );
};

export default Contact;
