const config = {
  type: "service_account",
  project_id: "fomo-crypto-calculator",
  private_key_id: process.env.FOMO_KEY_ID,
  private_key: process.env.FOMO_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_id: process.env.FOMO_CLIENT_ID,
  client_email:
    "firebase-adminsdk-qupwm@fomo-crypto-calculator.iam.gserviceaccount.com",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qupwm%40fomo-crypto-calculator.iam.gserviceaccount.com"
}

export default config
