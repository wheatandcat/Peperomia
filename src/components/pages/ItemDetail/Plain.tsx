import alertDialog from 'lib/alertDialog';
import ErrorPage from 'components/organisms/Error/Error';
import React, { memo } from 'react';
import { ItemDetailQueryHookResult } from 'queries/api/index';
import Loading from 'components/atoms/Loading';
import { ConnectedType } from './Connected';
import Page from './Page';

export type QueryProps = Pick<
  ItemDetailQueryHookResult,
  'data' | 'loading' | 'error'
>;

type Props = QueryProps & ConnectedType;

const Plain: React.FC<Props> = (props) => {
  if (alertDialog(props)) return <ErrorPage {...props} />;
  if (props.loading) return <Loading loading />;

  const itemDetail = props.data?.itemDetail!;

  return (
    <Page
      itemDetail={itemDetail}
      date={props.date}
      onDismiss={props.onDismiss}
    />
  );
};

export default memo(Plain);
