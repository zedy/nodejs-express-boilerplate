import crypto from 'crypto';

/**
 * Pass the function a string (such as a password) and it will return an object with a salt and hash.
 *
 * @param str string
 * @param salt string | undefined
 * @returns RETURNS { salt: string, hash: string }
 */
export const hashString = (str: string, salt?: string) => {
  const saltVal = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(str, saltVal, 1000, 64, 'sha512').toString('hex');

  return {
    salt: saltVal,
    hash,
  };
};

/**
 * Pass the function a password, salt, and the user's password. It will return a boolean.
 *
 * @param password string (hash)
 * @param salt string
 * @param userPass string
 * @returns RETURNS boolean
 */
export const checkHashEquality = (password: string, salt: string, userPass: string) => {
  const testHash = hashString(userPass, salt);

  return testHash.hash.toString() === password.toString();
};
