import { useAuth } from 'containers/Auth';
import { useCallback, useState } from 'react';
import {
  useSuggestionTitleQuery,
  SuggestionTitleQueryHookResult,
  SuggestionTitleQueryVariables,
} from 'queries/api/index';
import { WatchQueryFetchPolicy } from '@apollo/client';
import { isLogin } from 'lib/auth';

type UseSuggestionTitle = Pick<
  SuggestionTitleQueryHookResult,
  'data' | 'loading' | 'error' | 'refetch'
>;

type UseItemSuggest = {
  setSuggestList: (title: string) => void;
  suggestList: string[];
};

type Props = {
  variables: SuggestionTitleQueryVariables;
  fetchPolicy?: WatchQueryFetchPolicy;
};

type UseHooks = (props: Props) => UseSuggestionTitle;

const useItemSuggest = (): UseItemSuggest => {
  const { uid } = useAuth();
  const [text, setText] = useState('');
  let useHooks: UseHooks;

  if (uid && isLogin(uid)) {
    useHooks = useSuggestionTitleQuery;
  } else {
    useHooks = () =>
      ({
        data: null,
      } as any);
  }

  const { data, error } = useHooks({
    variables: {
      text,
    },
  });

  const setSuggestList = useCallback((title: string) => {
    setText(title);
  }, []);

  const suggestList = data?.suggestionTitle || [];

  if (error) {
    console.log('err:', error);
  }

  return {
    setSuggestList,
    suggestList,
  };
};

export default useItemSuggest;
