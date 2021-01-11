import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  DeleteItemDetailMutation,
  DeleteItemDetailMutationVariables,
  DeleteItemDetailMutationResult,
} from 'queries/api/index';
import { delete1st } from 'lib/db/itemDetail';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  DeleteItemDetailMutation,
  DeleteItemDetailMutationVariables
>;

type MutationProps = {
  variables: DeleteItemDetailMutationVariables;
};

type State = DeleteItemDetailMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useDeleteItemDetailDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const deleteItemDetail = useCallback(async (id: string) => {
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

  const mutation = useCallback(
    async (mutationProps: MutationProps) => {
      setState((s) => ({
        ...s,
        loading: true,
      }));

      const itemDetail: any = {
        ...mutationProps.variables.itemDetail,
      };

      Promise.all([deleteItemDetail(String(itemDetail.id))])
        .then(function () {
          const result = {
            deleteItemDetail: {
              id: itemDetail.id,
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
              networkError: new Error('error: useDeleteItemDetailDB'),
            })
          );
          setState((s) => ({
            ...s,
            loading: false,
            called: true,
          }));
        });
    },
    [deleteItemDetail, props]
  );

  return [mutation, state];
};

export default useDeleteItemDetailDB;
