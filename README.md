# [useFormReducer](https://reactjs.org/) &nbsp; ![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

`useFormReducer` is a custom hook that provides the ability to have controlled-forms without the hassle. It implements a reducer via react's `useReducer` hook.

It abstracts several patterns involving controlled-forms:

- **handle change:** pass a "state setter" to your form input `onChange` attribute and it updates the state without going through destructuring the event key + value with the state.
- **validation:** validate an email field by default or pass custom validators to provide support for different field-type validation.
- **error state:** pass an error state setter to capture validation errors.

## use

```bash
$ npm install use-form-reducer
```

## use

Within the component that holds the form:

```jsx
// import the package
import useFormReducer from 'use-form-reducer';

// set the form state hook
const [form, setForm] = useFormReducer();

// within the form element
<form>
  ...
  <input
    type="email"
    value={form.email}
    name="email"
    onChange={setForm}
    onBlur={setForm}
  />
  ...
</form>;
```

\* Setting `onBlur` provides specific validation when leaving the input field. An example of this logic is available within the included validator for reference. When using a validator, a passing the `errorSetter` argument is recommended.

## More info

- This may be obvioys but just-in-case, you can use the `form` state object to pass it in the body of your request.

## Special thanks:

Shoutout to [@stevekinney](https://github.com/stevekinney) for sharing the cool trick of using reducers to simplify state management in a form, and avoid the use of the `setState` hook. [State Management in Pure React, v2](https://frontendmasters.com/courses/pure-react-state/)

### License

React is [MIT licensed](./LICENSE).
