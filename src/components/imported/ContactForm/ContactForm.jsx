import s from './ContactForm.module.css';
import fonts from '../../../generalStyles/Fonts.module.css'
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { CommonTranslationsContext } from '../../../App';

// Функция для валидации адреса электронной почты
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Функция для валидации номера телефона
const validatePhone = (phone) => {
  let tmpNumb = phone.replace(/[\s()]/g, "") // удаление пробелов и круглых скобок с введенного номера
  return /(?:\+380|\b0)\d{2}\d{7}$/.test(tmpNumb);
};

const ContactForm = ({ servicesList, selectedService = null }) => {
  
  const commonTranslations = useContext(CommonTranslationsContext);

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
      setErrors(prevErrors => ({ ...prevErrors, name: commonTranslations.form.errors.blankName }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.name !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, name: '' })));
    }

    if (!formData.email.value && !formData.phone.value) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: commonTranslations.form.errors.blankPhoneOrEmail,
        phone: commonTranslations.form.errors.blankPhoneOrEmail
      }));
      formValid = false;
    } else {
      setErrors(prevErrors => ( (prevErrors.email !== '' || prevErrors.email !== '') ? ({ ...prevErrors }) : ({ ...prevErrors, email: '', phone: '' })));
    }

    if (formData.email.value && !validateEmail(formData.email.value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: commonTranslations.form.errors.invalidEmail }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.email !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, email: '' })));
    }

    if (formData.phone.value && !validatePhone(formData.phone.value)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: commonTranslations.form.errors.invalidPhone
      }));
      formValid = false;
    } else {
      setErrors(prevErrors => (prevErrors.phone !== '' ? ({ ...prevErrors }) : ({ ...prevErrors, phone: '' })));
    }

    if (formValid) {
      try {
        const response = await axios.post('/api/v1/send-message', formDataToSend);
    
        if (response.data.ok) {
          alert(commonTranslations.form.sendingForm.successed);
          setFormData(initialFields);
          setErrors({});
        } 
      } catch (error) {
        alert(error.response?.data?.error || commonTranslations.form.sendingForm.failed);
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
            <div className={`${s.formGroupItem}`}>
              {
                fieldName === 'topic' ? (
                  <>
                    <label htmlFor={fieldName} className={`${fonts.labelS} ${s.topicLabel}`}>
                      {commonTranslations.form.labels[fieldName]}
                    </label>
                    <select
                      id={fieldName}
                      name={fieldName}
                      value={field.value}
                      className={fonts.labelS}
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
                      <label htmlFor={fieldName} className={`${fonts.labelS} ${s.messageLabel}`}>
                        {commonTranslations.form.labels[fieldName]}
                      </label>
                      <textarea
                        type={'text'}
                        id={fieldName}
                        name={fieldName}
                        value={field.value}
                        onChange={(e) => {handleChange(fieldName, e.target.value); handleChangeTextarea(e) }}
                        className={`${fonts.labelS} ${field.filled ? s.filled : ''}`} // Применяем класс filled, если поле заполнено
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
                        className={`${fonts.labelS} ${s.inputField} ${field.filled ? s.filled : ''}`} // Применяем класс filled, если поле заполнено
                      />
                      <label htmlFor={fieldName} className={`${fonts.labelS} ${s.textFieldLable}`}>
                        {commonTranslations.form.labels[fieldName] || (fieldName.charAt(0).toUpperCase() + fieldName.slice(1))}
                      </label>
                    </>
                  )
                )
              }
            </div>
            {/* Отображение ошибок */}
            {errors[fieldName] !== '' && <span className={fonts.labelS} style={{ color: 'red' }}>{errors[fieldName]}</span>}
          </div>
        ))}
      </div>
      <div className={`${s.formGroupItem} ${s.submitBox}`}>
        <input className={fonts.labelLSemiBold} type="submit" value={commonTranslations.buttons.buttonSubmit} />
      </div>
    </form>
  );

}


export default ContactForm;