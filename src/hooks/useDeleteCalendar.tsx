import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useDeleteCalendarMutation,
  DeleteCalendarMutation,
  DeleteCalendarMutationVariables,
  DeleteCalendarMutationHookResult,
} from 'queries/api/index';
import useDeleteCalendarDB from 'hooks/db/useDeleteCalendarDB';
import { isLogin } from 'lib/auth';

type UseDeleteCalendar = DeleteCalendarMutationHookResult;

type Props = MutationHookOptions<
  DeleteCalendarMutation,
  DeleteCalendarMutationVariables
>;

type UseHooks = (props: Props) => UseDeleteCalendar;

const useDeleteCalendar = (props: Props): UseDeleteCalendar => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useDeleteCalendarMutation;
  } else {
    useHooks = useDeleteCalendarDB as any;
  }

  const [deleteCalendarMutation, deleteCalendarMutationData] = useHooks(props);

  return [deleteCalendarMutation, deleteCalendarMutationData];
};

export default useDeleteCalendar;
