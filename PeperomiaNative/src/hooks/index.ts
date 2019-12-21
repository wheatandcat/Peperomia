import { useEffect } from 'react';

export const useDidMount = (handler: Function) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handler(), []);
