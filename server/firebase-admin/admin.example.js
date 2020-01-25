const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert({
    type: "",
    project_id: "",
    private_key_id: "",
    private_key:
      ""
      .replace(/\\n/g,'\n'),
    client_email: "",
    client_id: "",
    auth_uri: "",
    token_uri: "",
    auth_provider_x509_cert_url:
      "",
    client_x509_cert_url: "",
    }),
  });
  
module.exports = admin;