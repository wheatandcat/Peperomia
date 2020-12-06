import { useAuth } from 'containers/Auth';
import {
  ItemDetailQueryHookResult,
  useItemDetailQuery,
  ItemDetailQueryVariables,
} from 'queries/api/index';
import { WatchQueryFetchPolicy } from '@apollo/client';
import useItemDetailDB from 'hooks/db/useItemDetailDB';
import { isLogin } from 'lib/auth';

type UseItemDetail = Pick<
  ItemDetailQueryHookResult,
  'data' | 'loading' | 'error' | 'refetch'
>;

type Props = {
  variables: ItemDetailQueryVariables;
  fetchPolicy?: WatchQueryFetchPolicy;
};

type UseHooks = (props: Props) => UseItemDetail;

const useItemDetail = (props: Props): UseItemDetail => {
  const { uid } = useAuth();
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useItemDetailQuery;
  } else {
    useHooks = useItemDetailDB as any;
  }

  const { data, loading, error, refetch } = useHooks(props);

  return { data, loading, error, refetch };
};

export default useItemDetail;
