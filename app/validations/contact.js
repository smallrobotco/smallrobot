import { validator, buildValidations } from 'ember-cp-validations';

export default buildValidations({
  fullName: validator('presence', true),
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ],
  phone: [
    validator('presence', true),
    validator('format', { type: 'phone' })
  ],
  message: validator('presence', true)
});
