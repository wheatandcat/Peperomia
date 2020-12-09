import * as SQLite from 'expo-sqlite';
import { useState, useEffect, useCallback } from 'react';
import equal from 'fast-deep-equal';
import { ApolloError, WatchQueryFetchPolicy } from '@apollo/client';
import useIsFirstRender from 'hooks/useIsFirstRender';
import {
  CalendarsQuery,
  CalendarsQueryVariables,
  CalendarsQueryHookResult,
} from 'queries/api/index';
import { SelectCalendar } from 'domain/calendar';
import { findBetweenDate } from 'lib/db/calendar';
import usePrevious from 'hooks/usePrevious';
import { db } from 'lib/db';

type State = {
  data: CalendarsQuery;
  loading: boolean;
  error: ApolloError | null;
  refetch: CalendarsQueryHookResult['refetch'];
};

const initialState = (): State => {
  return {
    data: {
      calendars: [],
    },
    loading: false,
    error: null,
    refetch: () => null as any,
  };
};

type Props = {
  variables: CalendarsQueryVariables;
  fetchPolicy: WatchQueryFetchPolicy;
};

const useCalendarsDB = ({ variables }: Props) => {
  const prevVariables = usePrevious(variables);
  const [state, setState] = useState<State>(initialState());
  const isFirstRender = useIsFirstRender();

  const fetchItem = useCallback(async (): Promise<SelectCalendar[]> => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        findBetweenDate(
          tx,
          variables.startDate,
          variables.endDate,
          (data, err) => {
            if (err) {
              reject([] as SelectCalendar[]);
              return;
            }

            resolve(data as SelectCalendar[]);
            return;
          }
        );
      });
    });
  }, [variables]);

  const setItem = useCallback(async () => {
    setState((s) => ({
      ...s,
      loading: true,
    }));

    const result: SelectCalendar[] = await fetchItem();

    const calendars = (result || []).map((v) => ({
      id: v.id,
      date: v.date,
      item: {
        id: v.itemId,
        kind: v.kind,
        title: v.title,
      },
    }));

    setState((s) => ({
      ...s,
      data: {
        calendars,
      } as CalendarsQuery,
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

export default useCalendarsDB;
