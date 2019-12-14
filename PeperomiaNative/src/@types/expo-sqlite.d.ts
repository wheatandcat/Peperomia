declare module 'expo-sqlite' {
  /**
   * Expo SQLite
   */

  type Error = any;

  export interface Database {
    transaction(
      callback: (transaction: Transaction) => any,
      error?: (error: Error) => any, // TODO def of error
      success?: () => any
    ): void;
  }

  export interface Transaction {
    executeSql(
      sqlStatement: string,
      arguments?: Array<string | number>,
      success?: (transaction: Transaction, resultSet: ResultSet) => any,
      error?: (transaction: Transaction, error: Error) => any
    ): any;
  }

  export interface ResultSet {
    insertId: number;
    rowAffected: number;
    rows: {
      length: number;
      item: (index: number) => any;
      _array: Array<any>;
    };
  }

  export function openDatabase(
    name:
      | string
      | {
          name: string;
          version?: string;
          description?: string;
          size?: number;
          callback?: () => any;
        },
    version?: string,
    description?: string,
    size?: number,
    callback?: () => any
  ): any;
}
