import {
  httpResponse,
  httpRequest,
  Controller,
  EmailValidator,
} from '../protocols';

import { MissinParamError, InvalidParamError } from '../erros';
import { badRequest, serverError } from '../helpers/http-helper';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}
  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissinParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }
      return { statusCode: 200, body: null };
    } catch (error) {
      return serverError();
    }
  }
}
