import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { checkHasError } from './validator/formValidator';

export const CustomFormHelperText = errors => ({attr}) => {
  return checkHasError(errors)(attr)
    ? (
      <FormHelperText>
        {errors[attr]}
      </FormHelperText>
    )
    : null;
};

