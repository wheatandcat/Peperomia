import { useCallback, useState } from 'react';
import { useSuggestionTitleQuery } from 'queries/api/index';

type UseItemSuggest = {
  setSuggestList: (title: string) => void;
  suggestList: string[];
};

const useItemSuggest = (): UseItemSuggest => {
  const [text, setText] = useState('');

  const { data, error } = useSuggestionTitleQuery({
    variables: {
      text,
    },
  });

  const setSuggestList = useCallback((title: string) => {
    console.log(title);

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
