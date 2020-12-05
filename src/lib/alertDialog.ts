import { Alert } from 'react-native';
import { ApolloError } from '@apollo/client';

const throughErrorMessages = [
  // - `Network request failed`: offline のとき
  'Network request failed',
  'GraphQL error: sql: database is closed',
  'Error: Network error: Error writing result to store for query',
] as const;

type Props = {
  error?: ApolloError;
};

export default (props: Props) => {
  if (props.error) {
    if (isErrorShow(props as { error: ApolloError })) {
      return false;
    }

    return true;
  }

  return false;
};

// 未入力は一旦これを表示
export const inputEmptyAlert = () => {
  Alert.alert('エラー', '入力されていない項目があります。');
};

export const isErrorShow = ({ error }: { error?: ApolloError }) => {
  const item = throughErrorMessages.find((message) =>
    error?.message.includes(message)
  );

  if (typeof item !== 'undefined') {
    console.log(`through error: ${error?.message}`);
    return false;
  }

  return true;
};
