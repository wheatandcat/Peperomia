import * as SQLite from 'expo-sqlite';
import { useState, useCallback } from 'react';
import { ApolloError, MutationHookOptions } from '@apollo/client';
import {
  UpdateMainItemDetailMutation,
  UpdateMainItemDetailMutationVariables,
  UpdateMainItemDetailMutationResult,
} from 'queries/api/index';
import {
  update as updateItemDetail,
  selectByItemId as selectItemDetailByItemId,
} from 'lib/db/itemDetail';
import { SelectItemDetail } from 'domain/itemDetail';
import { db } from 'lib/db';

type Props = MutationHookOptions<
  UpdateMainItemDetailMutation,
  UpdateMainItemDetailMutationVariables
>;

type MutationProps = {
  variables: UpdateMainItemDetailMutationVariables;
};

type State = UpdateMainItemDetailMutationResult;

const initialState = (): State => {
  return {
    loading: false,
    called: false,
    client: null as any,
  };
};

const useUpdateMainItemDetailDB = (props: Props) => {
  const [state, setState] = useState<State>(initialState());

  const fetchItemDetail = useCallback(async (itemId: string): Promise<
    SelectItemDetail[]
  > => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        selectItemDetailByItemId(tx, itemId, (data, err) => {
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

  const fetchUpdateItemDetail = useCallback(async (itemDetail, priority) => {
    return new Promise(function (resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v: any = {
          ...itemDetail,
          id: Number(itemDetail.id),
          itemId: Number(itemDetail.itemId),
          priority,
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

  const mutation = useCallback(
    async (mutationProps: MutationProps) => {
      setState((s) => ({
        ...s,
        loading: true,
      }));

      const itemDetail = mutationProps.variables.itemDetail;

      const itemDetails = await fetchItemDetail(itemDetail.itemId);

      const itemDetail1 = itemDetails.find((v) => v.priority === 1);
      const itemDetail2 = itemDetails.find((v) => v.id === itemDetail.id);

      const ok1 = await fetchUpdateItemDetail(
        itemDetail1,
        itemDetail1?.priority
      );
      const ok2 = await fetchUpdateItemDetail(itemDetail2, 1);

      if (ok1 && ok2) {
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
            networkError: new Error('error: useUpdateMainItemDetailDB'),
          })
        );
        setState((s) => ({
          ...s,
          loading: false,
          called: true,
        }));
      }
    },
    [fetchUpdateItemDetail, fetchItemDetail, props]
  );

  return [mutation, state];
};

export default useUpdateMainItemDetailDB;
