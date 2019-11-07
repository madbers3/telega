import * as jwt from 'jsonwebtoken';
import secrets from '../config/secrets';

export function Authenticate(target: object, propertyKey: string, descriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function() {
    const originalArguments = arguments;

    jwt.verify(arguments[0], async function(err, decoded) {

      if (err) {
        return;
      }

      originalArguments[0] = decoded;

      originalMethod.apply(this, originalArguments);
    }.bind(this));
  };

  return descriptor;
}

export function OnSuccess(eventName, errorEventName?, needThrowErrorInEvent?: boolean) {
  return (target: object, propertyKey: string, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function() {
      try {
        this.socket.emit(eventName, await originalMethod.apply(this, arguments));
      } catch (e) {
        if (errorEventName) {
          this.socket.emit(errorEventName, needThrowErrorInEvent ? e : undefined);
        }
      }
    };

    return descriptor;
  };
}
