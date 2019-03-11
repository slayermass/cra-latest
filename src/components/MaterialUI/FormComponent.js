import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import './styles.scss';
import Button from '@material-ui/core/Button';
import { checkHasError, toState, validate } from '../../helpers/validator/formValidator';
import FormHelperText from '@material-ui/core/FormHelperText';

const block = 'form-component';

export class FormComponent extends PureComponent {
  // начальная структура
  stateStructure = {
    email: {
      type: 'email',
      value: '',
    },
  };
  
  // стейт как он есть
  state = {
    ...toState(this.stateStructure), // email: ''
    errors: [],
  };
  
  onChangeState = attr => ({ target: { value } }) => {
    this.setState({
      ...this.state,
      [attr]: value
    }, this.onSubmit);
  };
  
  onSubmit = (e) => {
    const errors = validate(this.stateStructure)(this.state);
    
    if (errors) {
      this.setState({
        errors,
      });
    }
    
    if (e) { // вызов императивно
      e.preventDefault();
    }
  };
  
  render() {
    const { email, errors } = this.state;
    const hasError = checkHasError(errors);
    
    return (
      <Paper className={block}>
        <Typography component="h1" variant="h5">
          Тест формы
        </Typography>
        <form onSubmit={this.onSubmit}>
          <FormControl margin="normal" required fullWidth error={hasError('email')}>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input value={email} name="email" autoComplete="off" onChange={this.onChangeState('email')} />
            {
              hasError('email')
              && (
                <FormHelperText>
                  {errors['email']}
                </FormHelperText>
              )
            }
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
