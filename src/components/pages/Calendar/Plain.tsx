import alertDialog from 'lib/alertDialog';
import ErrorPage from 'components/organisms/Error/Error';
import React from 'react';
import { CalendarQueryResult } from 'queries/api/index';
import Loading from 'components/atoms/Loading';
import { ConnectedType } from './Connected';
import Page from './Page';

export type QueryProps = Pick<
  CalendarQueryResult,
  'data' | 'loading' | 'error'
>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (alertDialog(props)) return <ErrorPage {...props} />;
  if (props.loading) return <Loading loading />;

  const calendar = props.data?.calendar!;

  console.log(calendar);

  return <Page calendar={calendar} onDismiss={props.onDismiss} />;
};

export default Plain;
