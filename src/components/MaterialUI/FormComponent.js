// @flow

import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import './styles.scss';
import Button from '@material-ui/core/Button';
import { areErrors, checkHasError, toState, validate } from '../../helpers/validator/formValidator';
import { CustomFormHelperText } from '../../helpers/CustomFormHelperText';

const block = 'form-component';

type Props = {}

type State = {
  email: string,
  name: string,
  errors: {
    email?: Array<string>,
    name?: Array<string>,
  },
}

export class FormComponent extends PureComponent<Props, State> {
  // начальная структура
  stateStructure = {
    email: {
      type: 'email',
      value: '',
    },
    name: {
      type: String,
      value: '',
      maxLength: 20,
      minLength: 1,
    },
  };
  
  // можно хранить ссылку на валидатор
  validator = validate(this.stateStructure);
  
  // стейт как он есть
  state = {
    ...toState(this.stateStructure), // email: '', name: ''
    errors: {},
  };
  
  onChangeState = (attr: string) => ({ currentTarget: { value } }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      [attr]: value
    }, this.onValidate);
  };
  
  onSubmit = (e: SyntheticEvent<HTMLFormElement>): void => {
    if (this.onValidate() === 0) {
      console.log('form submited. state: ', this.state);
    }
    
    e.preventDefault();
  };
  
  onValidate = (): number => {
    const errors = this.validator(this.state);
    
    this.setState({
      errors,
    });

    return areErrors(errors);
  };
  
  render() {
    const { email, name, errors } = this.state;
    const hasError = checkHasError(errors);
    const FormHelperComponent = CustomFormHelperText(errors);
    
    return (
      <Paper className={block}>
        <Typography component="h1" variant="h5">
          Тест формы
        </Typography>
        <form onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth error={hasError('name')}>
            <InputLabel htmlFor="name">Строка от 1 до 20</InputLabel>
            <Input value={name} name="name" autoComplete="off" onChange={this.onChangeState('name')} />
            <FormHelperComponent attr="name" />
          </FormControl>
          <FormControl margin="normal" required fullWidth error={hasError('email')}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input value={email} name="email" autoComplete="off" onChange={this.onChangeState('email')} />
            <FormHelperComponent attr="email" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Подтвердить
          </Button>
        </form>
      </Paper>
    );
  }
}
