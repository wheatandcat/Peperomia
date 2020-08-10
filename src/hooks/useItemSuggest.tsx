import { useCallback, useState } from 'react';
import { useItems } from 'containers/Items';
import { SuggestItem, uniqueSuggests } from 'lib/suggest';

const useItemSuggest = () => {
  const { items, itemDetails } = useItems();
  const [suggestList, setSuggest] = useState<SuggestItem[]>([]);

  const getSuggestList = useCallback((): SuggestItem[] => {
    const suggestList1 = (items || []).map((item) => ({
      title: item.title,
      kind: item.kind,
    }));
    const suggestList2 = (itemDetails || []).map((itemDetail) => ({
      title: itemDetail.title,
      kind: itemDetail.kind,
    }));

    const r = [...suggestList1, ...suggestList2];
    return r;
  }, [items, itemDetails]);

  const setSuggestList = useCallback(
    (title: string) => {
      const r = uniqueSuggests(getSuggestList())
        .filter((item) => {
          if (!title) {
            return false;
          }
          return item.title.includes(title);
        })
        .slice(0, 8);

      setSuggest(r);
    },
    [getSuggestList]
  );

  return {
    setSuggestList,
    suggestList,
  };
};

export default useItemSuggest;
