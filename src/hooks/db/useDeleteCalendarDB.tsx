import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  DeleteCalendarMutation,
  DeleteCalendarMutationVariables,
  DeleteCalendarMutationResult,
} from 'queries/api/index';
import { delete1st } from 'lib/db/item';
import { deleteByItemId as deleteItenDetailByItemId } from 'lib/db/itemDetail';
import { deleteByItemId as deleteCalendarByItemId } from 'lib/db/calendar';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  DeleteCalendarMutation,
  DeleteCalendarMutationVariables
>;

type MutationProps = {
  variables: DeleteCalendarMutationVariables;
};

type State = DeleteCalendarMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useDeleteCalendarDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const deleteCalendar = useCallback(async (id: string) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        deleteCalendarByItemId(tx, id, (_, err) => {
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

  const deleteItem = useCallback(async (id: string) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        delete1st(tx, id, (_, err) => {
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

  const deleteItemDetail = useCallback(async (id: string) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        deleteItenDetailByItemId(tx, id, (_, err) => {
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

      const calendar: any = {
        ...mutationProps.variables.calendar,
      };

      Promise.all([
        deleteItem(String(calendar.itemId)),
        deleteItemDetail(String(calendar.itemId)),
        deleteCalendar(String(calendar.itemId)),
      ])
        .then(function () {
          const result = {
            deleteCalendar: {
              date: calendar.date,
            },
          };
          setState((s) => ({
            ...s,
            loading: false,
            called: true,
          }));

          props.onCompleted?.(result as any);
        })
        .catch(() => {
          props.onError?.(
            new ApolloError({
              networkError: new Error('error: useDeleteCalendarDB'),
            })
          );
          setState((s) => ({
            ...s,
            loading: false,
            called: true,
          }));
        });
    },
    [deleteItem, deleteItemDetail, deleteCalendar, props]
  );

  return [mutation, state];
};

export default useDeleteCalendarDB;
