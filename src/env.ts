interface IENV {
  REACT_APP_API_URL: string;
  REACT_APP_TOKEN_URL: string;
  REACT_APP_CLIENT_ID?: string;
  REACT_APP_CLIENT_SECRET?: string;
  REACT_APP_SCOPE?: string;
  REACT_APP_FILE_UPLOAD_URL: string;
}

export const ENV: IENV = (window as any).ENV || process.env;

const keysOfENV = [
  'REACT_APP_API_URL',
  'REACT_APP_TOKEN_URL',
  'REACT_APP_CLIENT_ID',
  'REACT_APP_CLIENT_SECRET',
  'REACT_APP_FILE_UPLOAD_URL'
];
for (const k of keysOfENV) {
  if (!ENV[k]) {
    throw new Error(`${k} is not specified`);
  }
}
