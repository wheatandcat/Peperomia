import { useAuth } from 'containers/Auth';
import {
  CalendarQueryHookResult,
  useCalendarQuery,
  CalendarQueryVariables,
} from 'queries/api/index';
import { WatchQueryFetchPolicy } from '@apollo/client';
import useCalendarDB from 'hooks/db/useCalendarDB';
import { isLogin } from 'lib/auth';

type UseCalendar = Pick<
  CalendarQueryHookResult,
  'data' | 'loading' | 'error' | 'refetch'
>;

type Props = {
  variables: CalendarQueryVariables;
  fetchPolicy?: WatchQueryFetchPolicy;
};

type UseHooks = (props: Props) => UseCalendar;

const useCalendar = (props: Props): UseCalendar => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useCalendarQuery;
  } else {
    useHooks = useCalendarDB as any;
  }

  const { data, loading, error, refetch } = useHooks(props);

  return { data, loading, error, refetch };
};

export default useCalendar;
