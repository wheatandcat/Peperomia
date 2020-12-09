import { useAuth } from 'containers/Auth';
import { MutationHookOptions } from '@apollo/client';
import {
  useCreateItemDetailMutation,
  CreateItemDetailMutation,
  CreateItemDetailMutationVariables,
  CreateItemDetailMutationHookResult,
} from 'queries/api/index';
import useCreateItemDetailDB from 'hooks/db/useCreateItemDetailDB';
import { isLogin } from 'lib/auth';

type UseCreateItemDetail = CreateItemDetailMutationHookResult;

type Props = MutationHookOptions<
  CreateItemDetailMutation,
  CreateItemDetailMutationVariables
>;

type UseHooks = (props: Props) => UseCreateItemDetail;

const useCreateItemDetail = (props: Props): UseCreateItemDetail => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useCreateItemDetailMutation;
  } else {
    useHooks = useCreateItemDetailDB as any;
  }

  const [createItemDetailMutation, createItemDetailMutationData] = useHooks(
    props
  );

  return [createItemDetailMutation, createItemDetailMutationData];
};

export default useCreateItemDetail;
