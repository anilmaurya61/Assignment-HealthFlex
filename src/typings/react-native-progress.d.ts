declare module 'react-native-progress' {
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface ProgressBarProps {
      progress: number;
      width: number;
      height: number;
      borderWidth: number;
      borderColor: string;
      color: string;
      unfilledColor: string;
      style?: ViewStyle;
      textStyle?: TextStyle;
      animated?: boolean;
    }
  
    export const Bar: React.FC<ProgressBarProps>;
  }
  