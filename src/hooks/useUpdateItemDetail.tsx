import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useUpdateItemDetailMutation,
  UpdateItemDetailMutation,
  UpdateItemDetailMutationVariables,
  UpdateItemDetailMutationHookResult,
} from 'queries/api/index';
import useUpdateItemDetailDB from 'hooks/db/useUpdateItemDetailDB';
import { isLogin } from 'lib/auth';

type UseUpdateItemDetail = UpdateItemDetailMutationHookResult;

type Props = MutationHookOptions<
  UpdateItemDetailMutation,
  UpdateItemDetailMutationVariables
>;

type UseHooks = (props: Props) => UseUpdateItemDetail;

const useUpdateItemDetail = (props: Props): UseUpdateItemDetail => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useUpdateItemDetailMutation;
  } else {
    useHooks = useUpdateItemDetailDB as any;
  }

  const [updateItemDetailMutation, updateItemDetailMutationData] = useHooks(
    props
  );

  return [updateItemDetailMutation, updateItemDetailMutationData];
};

export default useUpdateItemDetail;
