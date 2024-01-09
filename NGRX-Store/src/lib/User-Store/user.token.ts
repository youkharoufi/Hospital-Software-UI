import { InjectionToken } from '@angular/core';

/**
 * @const USER_API_ENDPOINT
 * Injection token for the bookmark API URL interface to be provided by the applications.
 */
export const USER_API_ENDPOINT: InjectionToken<string> = new InjectionToken(
  'USER_API_ENDPOINT'
);
