import { useAuth } from 'containers/Auth';
import {
  CalendarsQueryHookResult,
  useCalendarsQuery,
  CalendarsQueryVariables,
} from 'queries/api/index';
import { WatchQueryFetchPolicy } from '@apollo/client';
import useCalendarsDB from 'hooks/db/useCalendarsDB';
import { isLogin } from 'lib/auth';

type UseCalendars = Pick<
  CalendarsQueryHookResult,
  'data' | 'loading' | 'error' | 'refetch'
>;

type Props = {
  variables: CalendarsQueryVariables;
  fetchPolicy?: WatchQueryFetchPolicy;
};

type UseHooks = (props: Props) => UseCalendars;

const useCalendars = (props: Props): UseCalendars => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useCalendarsQuery;
  } else {
    useHooks = useCalendarsDB as any;
  }

  const { data, loading, error, refetch } = useHooks(props);

  return { data, loading, error, refetch };
};

export default useCalendars;
