const oktaConfig = {
    clientId: '0oa9tr9smuh0Y3V2j5d7',
    issuer: 'https://dev-01811862.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
};

export default oktaConfig;
