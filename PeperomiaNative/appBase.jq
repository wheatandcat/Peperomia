{
  "expo": {
    "name": "ペペロミア",
    "slug": "peperomia",
    "privacy": "public",
    "sdkVersion": "36.0.0",
    "packagerOpts": {
      "sourceExts": ["js", "ts", "tsx"],
      "transformer": "node_modules/react-native-typescript-transformer/index.js"
    },
    "platforms": ["ios", "android"],
    "version": "2.0.2",
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
    "assetBundlePatterns": ["src/**/*"],
    "ios": {
      "supportsTablet": true,
      "buildNumber": "13",
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
      "package": "com.wheatandcat.peperomia",
      "googleServicesFile": "./android/google-services.json",
      "versionCode": 13,
      "adaptiveIcon": {
        "backgroundColor": "#006835",
        "foregroundImage": "./assets/icon-fg.png"
      }
    },
    "description": "ペペロミアは予定管理アプリです。",
    "githubUrl": "https://github.com/wheatandcat/Peperomia"
  },
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
