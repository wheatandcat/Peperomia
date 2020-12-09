import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  CreateCalendarMutation,
  CreateCalendarMutationVariables,
  CreateCalendarMutationResult,
} from 'queries/api/index';
import { SelectCalendar } from 'domain/calendar';
import { Item } from 'domain/item';
import { insert as insertCalendar } from 'lib/db/calendar';
import { insert as insertItem } from 'lib/db/item';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  CreateCalendarMutation,
  CreateCalendarMutationVariables
>;

type MutationProps = {
  variables: CreateCalendarMutationVariables;
};

type State = CreateCalendarMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useCreateCalendarDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const fetchItem = useCallback(async (item: Item) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v: any = {
          ...item,
        };

        insertItem(tx, v, (insertId, err) => {
          if (err) {
            reject(false);
            return;
          }

          resolve(insertId);
          return;
        });
      });
    });
  }, []);

  const fetchCalendar = useCallback(async (calendar: SelectCalendar) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v: any = {
          ...calendar,
        };

        insertCalendar(tx, v, (_, err) => {
          if (err) {
            reject(false);
            return;
          }

          resolve(true);
          return;
        });
      });
    });
  }, []);

  const mutation = useCallback(
    async (mutationProps: MutationProps) => {
      setState((s) => ({
        ...s,
        loading: true,
      }));

      const item: Item = {
        ...mutationProps.variables.calendar.item,
      };
      const insertId = await fetchItem(item);

      if (insertId) {
        const calendar: any = {
          date: mutationProps.variables.calendar.date,
          itemId: Number(insertId),
        };

        const ok = await fetchCalendar(calendar);
        if (ok) {
          const result = {
            createCalendar: {
              date: calendar.date,
              item: {
                id: insertId,
                ...item,
              },
            },
          };

          props.onCompleted?.(result as any);
        }

        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      } else {
        props.onError?.(
          new ApolloError({
            networkError: new Error('error: useCreateCalendarDB'),
          })
        );
        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      }
    },
    [fetchItem, fetchCalendar, props]
  );

  return [mutation, state];
};

export default useCreateCalendarDB;
