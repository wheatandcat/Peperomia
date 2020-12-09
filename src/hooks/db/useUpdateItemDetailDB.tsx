import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  UpdateItemDetailMutation,
  UpdateItemDetailMutationVariables,
  UpdateItemDetailMutationResult,
} from 'queries/api/index';
import { SelectItemDetail } from 'domain/itemDetail';
import { SelectItem } from 'domain/item';
import { update as updateItemDetail } from 'lib/db/itemDetail';
import { update as updateItem } from 'lib/db/item';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  UpdateItemDetailMutation,
  UpdateItemDetailMutationVariables
>;

type MutationProps = {
  variables: UpdateItemDetailMutationVariables;
};

type State = UpdateItemDetailMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useUpdateItemDetailDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const fetchItemDetail = useCallback(async (itemDetail: SelectItemDetail) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v: any = {
          ...itemDetail,
          id: Number(itemDetail.id),
          itemId: Number(itemDetail.itemId),
        };

        updateItemDetail(tx, v, (_, err) => {
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

  const fetchItem = useCallback(async (item: SelectItem) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        updateItem(tx, { ...item, id: Number(item.id) }, (_, err) => {
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

      const itemDetail = mutationProps.variables.itemDetail as any;
      const ok1 = await fetchItemDetail(itemDetail);

      if (ok1) {
        if (itemDetail.priority === 1) {
          const item: SelectItem = {
            id: mutationProps.variables.itemDetail.itemId,
            title: itemDetail.title,
            kind: itemDetail.kind,
          };
          const ok2 = await fetchItem(item);
          if (!ok2) {
            props.onError?.(
              new ApolloError({
                networkError: new Error('error: useUpdateItemDetailDB'),
              })
            );
            return;
          }
        }
        props.onCompleted?.({
          ...itemDetail,
        } as any);

        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      } else {
        props.onError?.(
          new ApolloError({
            networkError: new Error('error: useUpdateItemDetailDB'),
          })
        );
        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      }
    },
    [fetchItemDetail, fetchItem, props]
  );

  return [mutation, state];
};

export default useUpdateItemDetailDB;
