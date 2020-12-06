import * as SQLite from 'expo-sqlite';
import { useState, useEffect, useCallback } from 'react';
import equal from 'fast-deep-equal';
import { ApolloError, WatchQueryFetchPolicy } from '@apollo/client';
import useIsFirstRender from 'hooks/useIsFirstRender';
import {
  ItemDetailQuery,
  ItemDetailQueryVariables,
  ItemDetailQueryHookResult,
} from 'queries/api/index';
import { SelectItemDetail } from 'domain/itemDetail';
import { select1st } from 'lib/db/itemDetail';
import usePrevious from 'hooks/usePrevious';
import { db } from 'lib/db';

type State = {
  data: ItemDetailQuery;
  loading: boolean;
  error: ApolloError | null;
  refetch: ItemDetailQueryHookResult['refetch'];
};

const initialState = (): State => {
  return {
    data: {
      itemDetail: null,
    },
    loading: true,
    error: null,
    refetch: () => null as any,
  };
};

type Props = {
  variables: ItemDetailQueryVariables;
  fetchPolicy: WatchQueryFetchPolicy;
};

const useCalendarDB = ({ variables }: Props) => {
  const prevVariables = usePrevious(variables);
  const [state, setState] = useState<State>(initialState());
  const isFirstRender = useIsFirstRender();

  const fetchItem = useCallback(async (): Promise<SelectItemDetail> => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select1st(tx, variables.itemDetailId, (data, err) => {
          if (err) {
            reject(null as any);
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }, [variables]);

  const setItem = useCallback(async () => {
    setState((s) => ({
      ...s,
      loading: true,
    }));

    const result: SelectItemDetail = await fetchItem();

    setState((s) => ({
      ...s,
      data: {
        itemDetail: {
          ...result,
        },
      } as any,
      loading: false,
    }));
  }, [fetchItem]);

  useEffect(() => {
    if (!isFirstRender) return;

    setItem();
  }, [isFirstRender, setItem]);

  useEffect(() => {
    if (!equal(variables, prevVariables)) {
      setItem();
    }
  }, [variables, prevVariables, setItem]);

  return {
    ...state,
    refetch: setItem,
  };
};

export default useCalendarDB;
