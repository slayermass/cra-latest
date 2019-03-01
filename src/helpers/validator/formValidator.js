// преобразование в структуру для state
export const toState = (structure: any) => Object.entries(structure).reduce((a, [key, data]) => {
  a[key] = data.value;
  return a;
}, {});


const numberValidator = (data: string, value) => {
  if (typeof value !== 'number') {
    return ['Не числовое значение'];
  }
  
  const errors = [];
  
  if (data.maxValue && value > data.maxValue) {
    errors.push(`Максимальное значение: ${data.maxValue}`);
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

const emailValidator = (value) => {
  if (typeof value !== 'string') {
    return ['Не строковое значение'];
  }
  
  const errors = [];
  
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(value.toLowerCase())) {
    errors.push('Невалидный email');
  }
  
  return errors;
};


export const validate = structure => (state) => {
  // { name: [], ... }
  const errors = Object.keys(state).reduce((a, s) => {
    a[s] = [];
    return a;
  }, {});
  
  Object.entries(structure).forEach(([name, data]) => {
    const value = state[name];
    
    switch (data.type) {
      case Number:
        numberValidator(data, value).forEach(e => errors[name].push(e));
        break;
      
      case String:
        stringValidator(data, value).forEach(e => errors[name].push(e));
        break;
  
      case 'email':
        emailValidator(value).forEach(e => errors[name].push(e));
        break;
        
      default:
        break;
    }
  });
  
  return errors;
};
