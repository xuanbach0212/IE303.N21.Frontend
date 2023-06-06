const oktaConfig = {
    clientId: '0oa9tr9smuh0Y3V2j5d7',
    issuer: 'https://dev-01811862.okta.com/oauth2/default',
    redirectUri: 'http://54.179.229.192:80/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
};

export default oktaConfig;
