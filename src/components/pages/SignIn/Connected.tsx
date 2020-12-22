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

type ConnectedState = {
  loading: boolean;
};

const SignInConnected = memo((props: Props) => {
  const [state, setState] = useState<ConnectedState>({ loading: false });

  const onAppleLogin = useCallback(async () => {
    if (!props.onAppleLogin) {
      return;
    }
    try {
      const uid = await props.onAppleLogin();

      if (uid) {
        setState({
          loading: true,
        });
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [props]);

  const onGoogleLogin = useCallback(async () => {
    if (!props.onGoogleLogin) {
      return;
    }

    try {
      const uid = await props.onGoogleLogin();
      if (uid) {
        setState({
          loading: true,
        });
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
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
