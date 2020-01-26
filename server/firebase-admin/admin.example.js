const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
      type: "TYPE HERE",
      project_id: "PROJECT ID HERE",
      private_key_id: "PRIVATE KEY ID HERE",
      private_key:
        "PRIVATE_KEY HERE"
        .replace(/\\n/g,'\n'),
      client_email: "CLIENT_EMAIL HERE",
      client_id: "CLIENT_ID HERE",
      auth_uri: "AUTH_URI HERE",
      token_uri: "TOKEN_URI HERE",
      auth_provider_x509_cert_url:
        "AUTH_PROVIDER_X509_CERT_URL HERE",
      client_x509_cert_url: "CLIENT_X509_CERT_URL HERE",
    }),
    databaseURL: "DATABASE URL HERE"
  });
  
module.exports = admin;