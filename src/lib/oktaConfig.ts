const oktaConfig = {
    clientId: '0oa9ix9zf4Jh7E7895d7',
    issuer: 'https://dev-25284660.okta.com/oauth2/default',
    redirectUri: 'http://54.255.135.69:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
};

export default oktaConfig;
