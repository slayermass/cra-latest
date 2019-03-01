// преобразование в структуру для state
export const toState = structure => Object.entries(structure).reduce((a, [key, data]) => {
  a[key] = data.value;
  return a;
}, {});

// принимает на вход только числа
const numberValidator = (data, value) => {
  if (typeof value !== 'number') {
    return ['Не числовое значение'];
  }
  
  const errors = [];
  
  if (data.maxValue && value > data.maxValue) {
    errors.push(`Максимальное значение: ${data.maxValue}`);
  }
  
  if (data.minValue && value < data.minValue) {
    errors.push(`Минимальное значение: ${data.minValue}`);
  }
  
  return errors;
};

const stringValidator = (data, value) => {
  if (typeof value !== 'string') {
    return ['Не строковое значение'];
  }
  
  const errors = [];
  const trimmedValue = value.trim();
  
  if (data.maxLength && trimmedValue.length > data.maxLength) {
    errors.push(`Максимальная длина строки: ${data.maxLength}, сейчас ${trimmedValue.length}`);
  }
  
  if (data.minLength && trimmedValue.length < data.minLength) {
    errors.push(`Минимальная длина строки: ${data.minLength}, сейчас ${trimmedValue.length}`);
  }
  
  return errors;
};

// parent - stringValidator
const emailValidator = (value) => {
  if (typeof value !== 'string') {
    return ['Не строковое значение'];
  }
  
  const errors = [];
  const trimmedValue = value.trim();
  
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regExp.test(trimmedValue.toLowerCase())) {
    errors.push('Невалидный email');
  }
  
  return errors;
};


export const validate = structure => (state) => {
  // вида { key: [], ... }
  const errors = Object.keys(state).reduce((a, s) => {
    a[s] = [];
    return a;
  }, {});
  
  Object.entries(structure).forEach(([name, data]) => {
    const value = state[name];
    const pushErrors = e => errors[name].push(e);
    
    switch (data.type) {
      case Number:
        numberValidator(data, value).forEach(pushErrors);
        break;
      
      case String:
        stringValidator(data, value).forEach(pushErrors);
        break;
  
      case 'email':
        emailValidator(value).forEach(pushErrors);
        break;
        
      default:
        break;
    }
  });
  
  return errors;
};
