export type SuggestItem = {
  title: string;
  kind: string;
};

export const uniqueSuggests = (suggests: SuggestItem[]) => {
  return suggests.filter((v1, i1, a1) => {
    return (
      a1.findIndex(v2 => {
        return v1.title === v2.title;
      }) === i1
    );
  });
};
