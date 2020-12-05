import { useAuth } from 'containers/Auth';
import {
  CalendarsQueryHookResult,
  useCalendarsQuery,
  CalendarsQueryVariables,
} from 'queries/api/index';
import useCalendarsDB from 'hooks/db/useCalendarsDB';
import { isLogin } from 'lib/auth';

type UseCalendars = Pick<
  CalendarsQueryHookResult,
  'data' | 'loading' | 'error' | 'refetch'
>;

const useCalendars = (variables: CalendarsQueryVariables): UseCalendars => {
  const { uid } = useAuth();
  let useHooks: any;

  if (uid && isLogin(uid)) {
    useHooks = useCalendarsQuery;
  } else {
    useHooks = useCalendarsDB;
  }

  const { data, loading, error, refetch } = useHooks({
    variables: variables,
    fetchPolicy: 'network-only',
  });

  return { data, loading, error, refetch };
};

export default useCalendars;
