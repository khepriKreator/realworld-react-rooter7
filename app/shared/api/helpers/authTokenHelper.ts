import { isClient } from '../../utils/isClient';
import { AUTH_TOKEN_HEADER } from '../constants/headers';
import Cookies from 'js-cookie';
import type { BaseHeadersHelpers } from './types';

/**
 * Вычисляет значение для Max-Age заголовка куки на основе даты истечения
 * @param {string | Date | null | undefined} expires_at - Дата истечения в формате ISO (например, "2025-04-25T17:55:01+04:00")
 * @param {number} defaultMaxAge - Стандартное время жизни в секундах (по умолчанию 1 день)
 * @returns {number} - Значение для Max-Age в секундах
 */
function calculateCookieMaxAge(
  expires_at?: string | Date | null,
  defaultMaxAge: number = 86400
): number {
  // Если expires_at не определен или пуст, используем стандартное время жизни
  if (!expires_at) {
    return defaultMaxAge; // 86400 секунд = 1 день
  }

  try {
    // Преобразуем строку с датой в объект Date
    const expiresDate = new Date(expires_at);

    // Проверяем, валидна ли дата
    if (isNaN(expiresDate.getTime())) {
      console.warn(
        'Невалидная дата истечения, используется стандартное время жизни'
      );
      return defaultMaxAge;
    }

    // Получаем текущее время
    const now = new Date();

    // Вычисляем разницу в секундах
    const maxAge = Math.floor((expiresDate.getTime() - now.getTime()) / 1000);

    // Если значение отрицательное или нулевое, используем минимальное значение
    if (maxAge <= 0) {
      console.warn(
        'Дата истечения уже прошла, используется минимальное значение'
      );
      return 1; // Используем минимальное значение в 1 секунду
    }

    return maxAge;
  } catch (error) {
    console.error('Ошибка при вычислении Max-Age:', error);
    return defaultMaxAge;
  }
}

const createExpires = (expires_at?: string) => {
  return expires_at
    ? new Date(expires_at)
    : new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
};

export const AuthTokenHelper: BaseHeadersHelpers<
  {
    token: string;
    expires_at?: string;
  },
  string
> & {
  createExpires: (expires_at?: string) => Date;
} = {
  createExpires,
  createHeader(value) {
    if (!value) {
      return {};
    }
    return {
      [AUTH_TOKEN_HEADER]: value,
    };
  },
  /**
   * @desc вернет название заголовка для запроса
   * */
  getHeaderName(): typeof AUTH_TOKEN_HEADER {
    return AUTH_TOKEN_HEADER;
  },
  /**
   * @desc вернет название куки в браузере
   * */
  getCookieName(): typeof AUTH_TOKEN_HEADER {
    return AUTH_TOKEN_HEADER;
  },
  /**
   * @desc получит значение куки из запроса. Использовать только в loader на сервере
   * */
  getFromRequestServer(headers) {
    const cookies = (
      headers.get('Cookie') ||
      headers.get('Set-Cookie') ||
      ''
    ).replace(', ', '; ');
    const cookieMap = new Map(
      cookies
        .split(';')
        .map((cookie) => cookie.trim().split('=') as [string, string])
        .filter((pair) => pair.length === 2)
    );

    const token = cookieMap.get(AuthTokenHelper.getCookieName());

    return token ? token : null;
  },

  /**
   * @desc получит значение куки. Использовать только в браузере
   * */
  getFromCookieBrowser() {
    if (!isClient) {
      return null;
    }
    const token = Cookies.get(AuthTokenHelper.getCookieName());
    console.log('token: ', token);
    return token ? token : null;
  },
  /**
   * @desc запишет токен в куки. Использовать только в браузере
   * */
  setToCookieBrowser({
    token,
    expires_at,
  }: {
    token: string;
    expires_at?: string;
  }): void {
    if (!isClient) {
      return;
    }
    const _expires_at = createExpires(expires_at);

    Cookies.set(AuthTokenHelper.getCookieName(), token, {
      expires: _expires_at,
      secure: true,
    });
  },
  /**
   * @desc удалит токен из куки. Использовать только в браузере
   * */
  removeFromCookieBrowser(): void {
    if (!isClient) {
      return;
    }
    Cookies.remove(AuthTokenHelper.getCookieName());
  },

  setToHeaderAsCookie(value, headers, cookieName = 'Set-Cookie') {
    const _expires_at = createExpires(value.expires_at);
    const maxAge = calculateCookieMaxAge(_expires_at);

    headers.append(
      cookieName,
      `${AuthTokenHelper.getCookieName()}=${
        value.token
      }; Path=/; Max-Age=${maxAge}; Secure; SameSite=Lax`
    );
    return headers;
  },

  clearFromHeaderAsCookie(headers, cookieName = 'Set-Cookie') {
    headers.append(
      'Set-Cookie',
      `${AuthTokenHelper.getCookieName()}=; Path=/; Max-Age=0; Secure; SameSite=Lax`
    );
    return headers;
  },

  setToHeader(value, headers) {
    headers.append(AuthTokenHelper.getHeaderName(), value);
    return headers;
  },

  clearFromHeader(headers) {
    headers.delete(AuthTokenHelper.getHeaderName());
    return headers;
  },
  hasCookieInHeader(headers) {
    return (
      headers.has(AuthTokenHelper.getHeaderName()) ||
      AuthTokenHelper.getFromRequestServer(headers) !== null
    );
  },
};