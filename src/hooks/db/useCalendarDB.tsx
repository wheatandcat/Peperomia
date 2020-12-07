import * as SQLite from 'expo-sqlite';
import { useState, useEffect, useCallback } from 'react';
import equal from 'fast-deep-equal';
import { ApolloError, WatchQueryFetchPolicy } from '@apollo/client';
import useIsFirstRender from 'hooks/useIsFirstRender';
import {
  CalendarQuery,
  CalendarQueryVariables,
  CalendarQueryHookResult,
} from 'queries/api/index';
import { SelectCalendar } from 'domain/calendar';
import { SelectItemDetail } from 'domain/itemDetail';
import { findDate } from 'lib/db/calendar';
import { selectByItemId } from 'lib/db/itemDetail';
import usePrevious from 'hooks/usePrevious';
import { db } from 'lib/db';

type State = {
  data: CalendarQuery;
  loading: boolean;
  error: ApolloError | null;
  refetch: CalendarQueryHookResult['refetch'];
};

const initialState = (): State => {
  return {
    data: {
      calendar: null,
    },
    loading: true,
    error: null,
    refetch: () => null as any,
  };
};

type Props = {
  variables: CalendarQueryVariables;
  fetchPolicy: WatchQueryFetchPolicy;
};

const useCalendarDB = ({ variables }: Props) => {
  const prevVariables = usePrevious(variables);
  const [state, setState] = useState<State>(initialState());
  const isFirstRender = useIsFirstRender();

  const fetchItem = useCallback(async (): Promise<SelectCalendar> => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        findDate(tx, variables.date, (data, err) => {
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

  const fetchItemDetails = useCallback(async (itemID: string): Promise<
    SelectItemDetail[]
  > => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        selectByItemId(tx, itemID, (data, err) => {
          if (err) {
            reject(null as any);
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }, []);

  const setItem = useCallback(async () => {
    setState((s) => ({
      ...s,
      loading: true,
    }));

    const result: SelectCalendar = await fetchItem();
    const itemDetails = await fetchItemDetails(String(result.itemId));

    setState((s) => ({
      ...s,
      data: {
        calendar: {
          id: result.id,
          date: result.date,
          public: false,
          item: {
            id: result.itemId,
            title: result.title,
            kind: result.kind,
            itemDetails: [
              ...itemDetails.map((v) => ({
                ...v,
                priority: v.priority,
              })),
            ],
          },
        },
      } as any,
      loading: false,
    }));
  }, [fetchItem, fetchItemDetails]);

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
