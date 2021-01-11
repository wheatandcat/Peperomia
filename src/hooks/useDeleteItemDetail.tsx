import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useDeleteItemDetailMutation,
  DeleteItemDetailMutation,
  DeleteItemDetailMutationVariables,
  DeleteItemDetailMutationHookResult,
} from 'queries/api/index';
import useDeleteItemDetailDB from 'hooks/db/useDeleteItemDetailDB';
import { isLogin } from 'lib/auth';

type UseDeleteItemDetail = DeleteItemDetailMutationHookResult;

type Props = MutationHookOptions<
  DeleteItemDetailMutation,
  DeleteItemDetailMutationVariables
>;

type UseHooks = (props: Props) => UseDeleteItemDetail;

const useDeleteItemDetail = (props: Props): UseDeleteItemDetail => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useDeleteItemDetailMutation;
  } else {
    useHooks = useDeleteItemDetailDB as any;
  }

  const [deleteCalendarMutation, deleteCalendarMutationData] = useHooks(props);

  return [deleteCalendarMutation, deleteCalendarMutationData];
};

export default useDeleteItemDetail;
