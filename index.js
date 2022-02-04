import { useReducer } from 'react';
import PropTypes from 'prop-types';

function useFormReducer(
  errorSetter,
  customInitForm,
  customValidator,
  customReducer,
  actionDispatcher,
  actionCreators
) {
  const initForm = customInitForm || {
    email: '',
    password: '',
  };

  const formReducer =
    customReducer ||
    ((form, formInput) => {
      return { ...form, ...formInput };
    });

  const [state, dispatch] = useReducer(formReducer, initForm);

  /***************************************************************************************
   *    Title: validateEmail
   *    Author: Zaheer Paracha
   *    Date: 2008
   *    Code version: 1.0
   *    Availability: http://zparacha.com/validate-email-address-using-javascript-regular-expression
   ***************************************************************************************/
  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  const formValidation =
    // TODO: Have the validation use an app level dispatcher to decouple custom error setting
    customValidator ||
    (!!errorSetter
      ? (ev, errorSetter, actionDispatcher, actionCreators) => {
          if (
            ev.type === 'blur' &&
            ev.target.name === 'email' &&
            !validateEmail(state.email)
          ) {
            const errObj = ['email', 'must be a valid format'];
            errorSetter(err =>
              !!err ? [...err.filter(e => e[0] !== 'email'), errObj] : [errObj]
            );
          } else {
            errorSetter(err =>
              !!err ? err.filter(e => e[0] !== 'email') : null
            );
          }
        }
      : () => {});

  // TODO: Refactor formValidation to partial to require just ev
  const customDispatch = ev => {
    formValidation(ev, errorSetter, actionDispatcher, actionCreators);
    const { name, value } = ev.target;
    dispatch({ [name]: value });
  };

  return [state, customDispatch];
}

useFormReducer.propTypes = {
  errorSetter: PropTypes.func,
  customInitForm: PropTypes.objectOf(PropTypes.shape()),
  customValidator: PropTypes.func,
  customReducer: PropTypes.func,
  actionDispatcher: PropTypes.func,
  actionCreators: PropTypes.objectOf(PropTypes.shape()),
};

module.exports = useFormReducer;
