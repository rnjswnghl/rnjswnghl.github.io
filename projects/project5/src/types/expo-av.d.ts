declare module 'expo-av' {
  export const Audio: any;
  export enum InterruptionModeIOS {
    MixWithOthers = 0,
    DoNotMix = 1,
    DuckOthers = 2,
  }
  export enum InterruptionModeAndroid {
    DoNotMix = 1,
    DuckOthers = 2,
  }
}
