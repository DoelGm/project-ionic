import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'project-test-ionic-angular',
  webDir: 'www',

  plugins:{
    SplashScreen: {
      launchShowDuration: 0
    },
    PushNotification: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  },
  cordova: {}
};

export default config;
