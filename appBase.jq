{
  "expo": {
    "name": "ペペロミア",
    "slug": "peperomia",
    "scheme": "peperomia",
    "privacy": "public",
    "packagerOpts": {
      "sourceExts": ["js", "ts", "tsx"],
      "transformer": "node_modules/react-native-typescript-transformer/index.js"
    },
    "platforms": ["ios", "android"],
    "version": "3.0.1",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#006835"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "notification": {
      "icon": "./assets/notificationicon.png",
      "color": "#00c2ad",
      "iosDisplayInForeground": true
    },
    "assetBundlePatterns": ["src/**/*"],
    "userInterfaceStyle": "automatic",
    "ios": {
      "googleServicesFile": "./ios/GoogleService-Info.plist",
      "userInterfaceStyle": "automatic",
      "usesAppleSignIn": true,
      "supportsTablet": true,
      "buildNumber": "37",
      "bundleIdentifier": "com.wheatandcat.peperomia",
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "予定作成のために使用します。",
        "NSCameraUsageDescription": "予定作成のためにカメラを使用します。",
        "CFBundleDevelopmentRegion": "ja_JP"
      },
      "config": {
        "googleSignIn": {
          "reservedClientId": $iosGoogleSignInClientId
        }
      }
    },
    "android": {
      "userInterfaceStyle": "automatic",
      "package": "com.wheatandcat.peperomia",
      "googleServicesFile": "./android/google-services.json",
      "versionCode": 37,
      "adaptiveIcon": {
        "backgroundColor": "#006835",
        "foregroundImage": "./assets/icon-fg.png"
      },
      "useNextNotificationsApi": true
    },
    "web": {
      "config": {
        "firebase": {
          "apiKey": $firebaseApiKey,
          "measurementId": $measurementId
        }
      }
    },
    "description": "ペペロミアは予定管理アプリです。",
    "githubUrl": "https://github.com/wheatandcat/Peperomia",
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps",
          "config": {
            "organization": "freelance-km",
            "project": "peperomia",
            "authToken": $sentryAuthToken
          }
        }
      ]
    }
  }
}
