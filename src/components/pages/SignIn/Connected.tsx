import React, { memo, useState, useCallback } from 'react';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { ContextProps as FetchContextProps } from 'containers/Fetch';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import CommonStatusBar from 'components/organisms/CommonStatusBar';

import { Props as IndexProps } from './';
import Page from './Page';

type Props = IndexProps &
  Pick<CalendarsContextProps, 'refetchCalendars'> &
  Pick<AuthContextProps, 'onGoogleLogin' | 'onAppleLogin' | 'logout' | 'uid'> &
  Pick<FetchContextProps, 'post'>;

type State = {
  loading: boolean;
};

const SignInConnected = memo((props: Props) => {
  const [state, setState] = useState<State>({ loading: false });

  const onAppleLogin = useCallback(async () => {
    if (!props.onAppleLogin) {
      return;
    }
    setState((s) => ({
      ...s,
      loading: true,
    }));

    try {
      await props.onAppleLogin();
    } catch (err) {
      console.log('err:', err);
    }
    setState((s) => ({
      ...s,
      loading: false,
    }));
  }, [props]);

  const onGoogleLogin = useCallback(async () => {
    if (!props.onGoogleLogin) {
      return;
    }
    setState((s) => ({
      ...s,
      loading: true,
    }));

    try {
      await props.onGoogleLogin();
    } catch (err) {
      console.log('err:', err);
    }

    setState((s) => ({
      ...s,
      loading: false,
    }));
  }, [props]);

  return (
    <>
      <CommonStatusBar />
      <Page
        loading={state.loading}
        onGoogleLogin={onGoogleLogin}
        onAppleLogin={onAppleLogin}
      />
    </>
  );
});

export default SignInConnected;
