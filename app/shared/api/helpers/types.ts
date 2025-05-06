type CookieNames = 'Cookie' | 'Set-Cookie';

export type BaseHeadersHelpers<
  SetToCookieData extends object,
  Value extends string | number
> = {
  /**
   * @desc создаст объект для заголовка
   * */
  createHeader: (value: Value | null) =>
    | {}
    | {
        [key in string]: Value;
      };
  /**
   * @desc вернет название заголовка для запроса
   * */
  getHeaderName: () => string;

  /**
   * @desc вернет название куки в браузере
   * */
  getCookieName: () => string;

  /**
   * @desc получит значение куки из запроса. Использовать только в loader на сервере
   * */
  getFromRequestServer: (headers: Headers) => Value | null;

  /**
   * @desc получит значение куки. Использовать только в браузере
   * */
  getFromCookieBrowser: () => Value | null;

  /**
   * @desc запишет токен в куки. Использовать только в браузере
   * */
  setToCookieBrowser: (data: SetToCookieData) => void;

  removeFromCookieBrowser: () => void;

  /**
   * @desc запишет токен в заголовок. Использовать только в заголовках
   * */
  setToHeaderAsCookie: (
    value: SetToCookieData,
    headers: Headers,
    cookieName?: CookieNames
  ) => Headers;

  /**
   * @desc удалит токен из заголовка. Использовать только в заголовках
   * */
  clearFromHeaderAsCookie: (
    headers: Headers,
    cookieName?: CookieNames
  ) => Headers;

  /**
   * @desc записать значение в заголовок
   * */
  setToHeader: (value: Value, headers: Headers) => Headers;

  /**
   * @desc удалить значение из заголовка
   * */
  clearFromHeader: (headers: Headers) => Headers;

  hasCookieInHeader: (headers: Headers) => boolean;
};
