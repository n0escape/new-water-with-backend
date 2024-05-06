import s from './ContactForm.module.css';
import axios from 'axios';
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
  message: 'Коментар'
};

const ContactForm = ({ servicesList, selectedService = null }) => {
  const defaultSelectedValue = 'contactMe';
  const initialFields = {
    name: { value: '', filled: false },
    email: { value: '', filled: false },
    phone: { value: '', filled: false },
    topic: { value: selectedService || defaultSelectedValue, filled: false },
    message: { value: '', filled: false }
  };

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialFields);

  const handleChange = (name, value) => {
    if (name === 'phone' || name === 'email') {
      // Очищаем ошибку для поля phone и email при их изменении
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
        filled: value.trim() !== '' // Установите filled в true, если значение не пустое
      }
    }));
  };

  // useEffect(() => {
  //   console.log(errors)
  // }, [errors])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formValid = true;
    
    // Новый объект для отправки на сервер
    const formDataToSend = {};

    // Деструктуризация объекта на основе формы
    // и заполнения нового объекта для отправки на сервер
    // также изменяем значение select на текст выбраного значения
    Object.entries(formData).forEach(([fieldName, field]) => {
      fieldName === 'topic'
      ? formDataToSend[fieldName] = servicesList.find(service => service.serviceId === field.value)?.serviceName
      : formDataToSend[fieldName] = field.value;
    });

    if (!formData.name.value) {
      setErrors(prevErrors => ({ ...prevErrors, name: 'Введіть будьласка ім\'я' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.name !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, name: '' })));
    }

    if (!formData.email.value && !formData.phone.value) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Будь ласка, введіть або пошту або номер телефону, для зворотнього контакту',
        phone: 'Будь ласка, введіть або пошту або номер телефону, для зворотнього контакту'
      }));
      formValid = false;
    } else {
      setErrors(prevErrors => ( (prevErrors.email !== '' || prevErrors.email !== '') ? ({ ...prevErrors }) : ({ ...prevErrors, email: '', phone: '' })));
    }

    if (formData.email.value && !validateEmail(formData.email.value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Будь ласка, введіть валідну пошту, наприклад: example@gmail.com' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.email !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, email: '' })));
    }

    if (formData.phone.value && !validatePhone(formData.phone.value)) {
      setErrors(prevErrors => ({ ...prevErrors, phone: 'Будь ласка, введіть валідний номер телефону, який починається з +380' }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.phone !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, phone: '' })));
    }

    if (formValid) {
      try {
        const response = await axios.post('/api/send-message', formDataToSend);
    
        if (response.data.ok) {
          alert('Ваш запит відправлено! Ми зв\'яжемось з вами якомога раніше.');
          setFormData(initialFields);
          setErrors({});
        } 
      } catch (error) {
        alert(error.response?.data?.error || 'Сервер повернув помилку. Спробуйте пізніше');
      }
    }
  };

  // Изменеие высоты поля textarea на основе содержимого
  // Отслеживание ивента, когда текст вылазит:
  // textarea.scrollHeight > textarea.clientHeight
  const handleChangeTextarea = (event) => {
    if (event.target.scrollHeight > event.target.clientHeight) {
      event.target.style.height = "1px";
      event.target.style.height = (25+event.target.scrollHeight)+"px";
    }
  }

  return (
    <form onSubmit={handleSubmit} className={s.container}>
      <div className={s.fields}>
        {Object.entries(formData).map(([fieldName, field]) => (
          <div key={fieldName} className={`${s.formGroup}`}>
            {
            fieldName === 'topic' ? (
              <>
                <label htmlFor={fieldName} className={`${s.topicLabel}`}>
                    Оберіть тему
                </label>
                <select
                  id={fieldName}
                  name={fieldName}
                  value={field.value}
                  onChange={(e) => handleChange(fieldName, e.target.value)}
                >
                  {servicesList.map(service => ( 
                    <option key={service.serviceId} value={service.serviceId}>{service.serviceName}</option>
                  ))}
                </select>
              </>
            ) : (
              fieldName === 'message' ? (
                <>
                  <label htmlFor={fieldName} className={`${s.messageLabel}`}>
                    Коментар
                  </label>
                  <textarea
                    type={'text'}
                    id={fieldName}
                    name={fieldName}
                    value={field.value}
                    onChange={(e) => {handleChange(fieldName, e.target.value); handleChangeTextarea(e) }}
                    className={`${field.filled ? s.filled : ''}`} // Применяем класс filled, если поле заполнено
                  />
                </>
              ) : (
                <>
                  <input
                    type={'text'}
                    id={fieldName}
                    name={fieldName}
                    value={field.value}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    className={`${s.inputField} ${field.filled ? s.filled : ''}`} // Применяем класс filled, если поле заполнено
                  />
                  <label htmlFor={fieldName} className={s.textFieldLable}>
                    {labelMap[fieldName] || (fieldName.charAt(0).toUpperCase() + fieldName.slice(1))}
                  </label>
                </>
              )
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