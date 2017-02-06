import { FirebaseAppConfig, AuthMethods, AuthProviders } from 'angularfire2';
import { AuthConfiguration } from 'angularfire2/auth';

export const appConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyDhUQeQ021xBMX-hK-R0kth92ExL33ztpU",
  authDomain: "game-of-giff.firebaseapp.com",
  databaseURL: "https://game-of-giff.firebaseio.com",
  storageBucket: "game-of-giff.appspot.com",
  messagingSenderId: "211117234885"
};

export const authConfig: AuthConfiguration = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};