import { toState, validate } from './formValidator';

describe('--- test formValidator ---', () => {
  it('full spec', () => {
    // исходная структура
    // обязательны только value
    const structure = {
      name: {
        type: String,
        value: '',
        maxLength: 20,
        minLength: 1,
      },
      count: {
        type: Number,
        value: 0,
        maxValue: 666,
      },
      email: {
        type: 'email',
        value: '',
      }
    };
    
    // проверка выходящих данных, только key: value
    expect(toState(structure)).toEqual({
      name: '',
      count: 0,
      email: '',
    });
  
    const validator = validate(structure);
    
  
    // без ошибок
    const stateWithoutErrors = toState(structure);
    stateWithoutErrors.name = new Array(20).fill('8').join('');
    stateWithoutErrors.count = 666;
    stateWithoutErrors.email = 'y@y.ru';

    expect(validator(stateWithoutErrors)).toEqual({
      name: [],
      count: [],
      email: [],
    });


    // ошибки по всем полям
    const stateWithErrors = toState(structure);
    stateWithErrors.name = new Array(21).fill('8').join('');
    stateWithErrors.count = 667;
    stateWithErrors.email = 'y#y.tetra';

    const validatedValue = validator(stateWithErrors);
    expect(validatedValue.name.length).toBeGreaterThanOrEqual(1);
    expect(validatedValue.count.length).toBeGreaterThanOrEqual(1);
    expect(validatedValue.email.length).toBeGreaterThanOrEqual(1);
  
    // необычное использование
    const stateUnusual = toState(structure);
    stateUnusual.name = new Array(20).fill(' ').join('');
    stateUnusual.count = '66';
    stateUnusual.email = 242424;
  
    const validatedValueUnusual = validator(stateUnusual);
    expect(validatedValueUnusual.name.length).toBeGreaterThanOrEqual(1);
    expect(validatedValueUnusual.count.length).toBeGreaterThanOrEqual(1);
    expect(validatedValueUnusual.email.length).toBeGreaterThanOrEqual(1);
  });
});
