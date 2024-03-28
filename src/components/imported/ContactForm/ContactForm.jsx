import s from './ContactForm.module.css';
import React, { 
  //useEffect, 
  useState } from 'react';

// Функция для валидации адреса электронной почты
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Функция для валидации номера телефона
const validatePhone = (phone) => {
  return /^\+380\d{9}$/.test(phone);
};

const labelMap = {
  name: 'Ім\'я*',
  email: 'Пошта*',
  phone: 'Телефон*',
  message: 'Коментар',
  // Добавьте другие соответствия по мере необходимости
};

const ContactForm = ({ servicesList, selectedService = null }) => {
  const defaultSelectedValue = 'contactMe';
  const initialFields = {
    name: { value: '', class: '' },
    email: { value: '', class: '' },
    phone: { value: '', class: '' },
    topic: { value: selectedService || defaultSelectedValue, class: '' },
    message: { value: '', class: '' }
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFields);

  const handleChange = (name, value) => {
    // Очищаем ошибку для поля phone и email при их изменении
    if (name === 'phone' || name === 'email') {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: '',
        email: ''
      }));
    } else if (errors[name]) {
      // Очищаем ошибку для текущего поля при его изменении
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }

    setFormData(prevFields => ({
      ...prevFields,
      [name]: {
        ...prevFields[name],
        value: value,
        class: value.trim() === '' ? '' : s.filled
      }
    }));
  };

  // useEffect(() => {
  //   console.log(errors)
  // }, [errors])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;

    if (!formData.name.value) {
      setErrors(prevErrors => ({ ...prevErrors, name: 'Please provide your name' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.name !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, name: '' })));
    }

    if (!formData.email.value && !formData.phone.value) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Please provide either email or phone number',
        phone: 'Please provide either email or phone number'
      }));
      formValid = false;
    } else {
      setErrors(prevErrors => ( (prevErrors.email !== '' || prevErrors.email !== '') ? ({ ...prevErrors }) : ({ ...prevErrors, email: '', phone: '' })));
    }

    if (formData.email.value && !validateEmail(formData.email.value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Please enter a valid email address' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.email !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, email: '' })));
    }

    if (formData.phone.value && !validatePhone(formData.phone.value)) {
      setErrors(prevErrors => ({ ...prevErrors, phone: 'Please enter a valid phone number starting with +380' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.phone !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, phone: '' })));
    }

    if (formValid) {
      try {
        const response = await fetch('API_CODE/API_LINK', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
            topic: selectedService || defaultSelectedValue
          });
          setErrors({});
        } else {
          alert('There was a problem sending your message. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('There was a problem sending your message. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.fields}>
        {Object.entries(formData).map(([fieldName, field]) => (
          <div key={fieldName} className={`${s.formGroup}`}>
            {fieldName === 'topic' ? (
              <>
                <label 
                  htmlFor={fieldName}
                  className={`${s.topicLabel}`}
                >
                    Оберіть тему
                </label>
                <select
                  id={fieldName}
                  name={fieldName}
                  value={field.value}
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                >
                  <option value="contactMe">Зв'яжіться зі мною</option>
                  <option value="question">Задати питання</option>
                  {servicesList.map(service => ( 
                    <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <input
                  type={'text'}
                  id={fieldName}
                  name={fieldName}
                  value={field.value}
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                  className={`${s.inputField} ${field.class}`}
                />
                <label className={s.textFieldLable} htmlFor={fieldName}>
                {labelMap[fieldName] || (fieldName.charAt(0).toUpperCase() + fieldName.slice(1))}
                </label>
              </>
            )}
            {/* Отображение ошибок */}
            {errors[fieldName] !== '' && <span style={{ color: 'red' }}>{errors[fieldName]}</span>}
          </div>
        ))}
      </div>
      <div className={`${s.formGroup} ${s.submitBox}`}>
        <input type="submit" value="Відправити" />
      </div>
    </form>
  );

}


export default ContactForm;