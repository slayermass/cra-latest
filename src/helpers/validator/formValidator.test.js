import { toState, validate } from './formValidator';

let structure;
let validator;

beforeEach(() => {
  // исходная структура
  // обязательны только value
  structure = {
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
      minValue: 0,
    },
    email: {
      type: 'email',
      value: '',
    }
  };
  
  validator = validate(structure);
});

describe('--- test formValidator ---', () => {
  it('should return correct state', () => {
    // проверка выходящих данных, только key: value
    expect(toState(structure)).toEqual({
      name: '',
      count: 0,
      email: '',
    });
  });
  
  it('should return no erros', () => {
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
  });
  
  it('should return all errors', () => {
    // ошибки по всем полям
    const stateWithErrors = toState(structure);
    stateWithErrors.name = new Array(21).fill('8').join('');
    stateWithErrors.count = 667;
    stateWithErrors.email = 'y#y.tetra';
  
    const validatedValue = validator(stateWithErrors);
    expect(validatedValue.name.length).toBeGreaterThanOrEqual(1);
    expect(validatedValue.count.length).toBeGreaterThanOrEqual(1);
    expect(validatedValue.email.length).toBeGreaterThanOrEqual(1);
  });
  
  it('should return all errors, empty values', () => {
    // пустые значения
    const stateEmpty = toState(structure);
    stateEmpty.name = new Array(20).fill(' ').join('');
    stateEmpty.count = '66';
    stateEmpty.email = '    ';
  
    const validatedValueEmpty = validator(stateEmpty);
    expect(validatedValueEmpty.name.length).toBeGreaterThanOrEqual(1);
    expect(validatedValueEmpty.count.length).toBeGreaterThanOrEqual(1);
    expect(validatedValueEmpty.email.length).toBeGreaterThanOrEqual(1);
  });
});
