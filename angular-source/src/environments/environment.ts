// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_BASE_URL: 'http://127.0.0.1:3000',
  API_SECRET: {
    clientId: '5425e5ae4e52',
    clientSecret: '65f35242d392cc32a695e2ba98e575fee7079cd3',
  },
  redirectUri: 'http://127.0.0.1:4200/login',
};
