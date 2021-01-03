declare module 'expo-image-picker';
declare module 'react-native-svg';
declare module 'react-native-svg-animated-linear-gradient';

declare type QueryData<T1, T2> = NonNullable<NonNullable<T1['data']>[T2]>;
declare type ArrayType<T> = T extends Array<infer V> ? V : never;

declare module 'storyBookUtils';
