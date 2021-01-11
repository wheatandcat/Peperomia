import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useUpdateMainItemDetailMutation,
  UpdateMainItemDetailMutation,
  UpdateMainItemDetailMutationVariables,
  UpdateMainItemDetailMutationHookResult,
} from 'queries/api/index';
import useUpdateMainItemDetailDB from 'hooks/db/useUpdateMainItemDetailDB';
import { isLogin } from 'lib/auth';

type UseUpdateMainItemDetail = UpdateMainItemDetailMutationHookResult;

type Props = MutationHookOptions<
  UpdateMainItemDetailMutation,
  UpdateMainItemDetailMutationVariables
>;

type UseHooks = (props: Props) => UseUpdateMainItemDetail;

const useUpdateMainItemDetail = (props: Props): UseUpdateMainItemDetail => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useUpdateMainItemDetailMutation;
  } else {
    useHooks = useUpdateMainItemDetailDB as any;
  }

  const [updateItemDetailMutation, updateItemDetailMutationData] = useHooks(
    props
  );

  return [updateItemDetailMutation, updateItemDetailMutationData];
};

export default useUpdateMainItemDetail;
