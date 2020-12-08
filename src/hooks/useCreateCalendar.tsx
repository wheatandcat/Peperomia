import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useCreateCalendarMutation,
  CreateCalendarMutation,
  CreateCalendarMutationVariables,
  CreateCalendarMutationHookResult,
} from 'queries/api/index';
import useCreateCalendarDB from 'hooks/db/useCreateCalendarDB';
import { isLogin } from 'lib/auth';

type UseCreateCalendar = CreateCalendarMutationHookResult;

type Props = MutationHookOptions<
  CreateCalendarMutation,
  CreateCalendarMutationVariables
>;

type UseHooks = (props: Props) => UseCreateCalendar;

const useCreateCalendar = (props: Props): UseCreateCalendar => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useCreateCalendarMutation;
  } else {
    useHooks = useCreateCalendarDB as any;
  }

  const [createCalendarMutation, createCalendarMutationData] = useHooks(props);

  return [createCalendarMutation, createCalendarMutationData];
};

export default useCreateCalendar;
