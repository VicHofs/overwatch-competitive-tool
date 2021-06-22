interface CookieObject {
  [key: string]: string;
}

/* function that returns an object with cookie key-value pairs */
export const getCookies: () => CookieObject = () =>
  document.cookie
    .split(';')
    .map((cookie: string) => cookie.split('='))
    .reduce(
      (obj: CookieObject, [key, val]: string[]) => ({
        ...obj,
        [key.trim()]: decodeURIComponent(val),
      }),
      {},
    );

/* function that sets a new cookie from key and value */
export const setCookie: (
  key: string,
  value: string,
  domain?: string,
  expiryDate?: string,
) => void = (
  key: string,
  value: string,
  domain?: string,
  expiryDate?: string,
) => {
  document.cookie = `${key}=${value}${
    typeof domain !== 'undefined' ? `;domain=${domain};path=/` : ''
  }${typeof expiryDate !== 'undefined' ? `;expires=${expiryDate}` : ''}`;
};

/* function that removes an existing cookie from key */
export const removeCookie: (key: string, domain?: string) => void = (
  key: string,
  domain?: string,
) => {
  // if (getCookies()[key])
  document.cookie = `${key}=_${
    typeof domain !== 'undefined' ? `;domain=${domain};path=/` : ''
  };expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};
