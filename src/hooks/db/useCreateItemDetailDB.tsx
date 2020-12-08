import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  CreateItemDetailMutation,
  CreateItemDetailMutationVariables,
  CreateItemDetailMutationResult,
} from 'queries/api/index';
import { SelectItemDetail } from 'domain/itemDetail';
import { insert } from 'lib/db/itemDetail';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  CreateItemDetailMutation,
  CreateItemDetailMutationVariables
>;

type MutationProps = {
  variables: CreateItemDetailMutationVariables;
};

type State = CreateItemDetailMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useCreateItemDetailDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const fetchItem = useCallback(async (itemDetail: SelectItemDetail) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v: any = {
          ...itemDetail,
          itemId: Number(itemDetail.itemId),
        };

        insert(tx, v, (insertId, err) => {
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

  const mutation = useCallback(
    async (mutationProps: MutationProps) => {
      setState((s) => ({
        ...s,
        loading: true,
      }));

      const itemDetail = mutationProps.variables.itemDetail as any;
      const insertId = await fetchItem(itemDetail);

      if (insertId) {
        props.onCompleted?.({
          ...itemDetail,
          id: insertId,
        } as any);

        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      } else {
        props.onError?.(
          new ApolloError({
            networkError: new Error('error: useCreateItemDetailDB'),
          })
        );
        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      }
    },
    [fetchItem, props]
  );

  return [mutation, state];
};

export default useCreateItemDetailDB;
