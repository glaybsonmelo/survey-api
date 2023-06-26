import { httpResponse, httpRequest } from '../protocols/http';
import { MissinParamError } from '../erros/missing-param-error';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';

export class SignUpController implements Controller {
  handle(httpRequest: httpRequest): httpResponse {
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
    return { statusCode: 200, body: null };
  }
}
