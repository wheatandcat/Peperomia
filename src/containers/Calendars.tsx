import React, { createContext, useState, useCallback, useContext } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { CalendarsQueryResult, CalendarsQuery } from 'queries/api/index';
import useCalendarsHooks from 'hooks/useCalendars';

dayjs.extend(advancedFormat);

export const Context = createContext<ContextProps>({
  loadingCalendars: false,
  calendars: [],
  refetchCalendars: undefined,
  errorCalendars: undefined,
  setDate: (_1: string, _2: string) => null,
});
const { Provider } = Context;

export type Calendars = NonNullable<CalendarsQuery['calendars']>;

type Props = {};

type State = {
  startDate: string;
  endDate: string;
};

const initialState = () => {
  return {
    startDate: dayjs().startOf('month').format('YYYY-MM-DDT00:00:00'),
    endDate: dayjs().endOf('month').format('YYYY-MM-DDT23:59:59'),
  };
};

export type ContextProps = {
  loadingCalendars: boolean;
  calendars: Calendars;
  refetchCalendars: CalendarsQueryResult['refetch'] | undefined;
  errorCalendars: CalendarsQueryResult['error'];
  setDate: (startDate: string, endDate: string) => void;
};

const Calendar: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const { data, loading, error, refetch } = useCalendarsHooks({
    startDate: state.startDate,
    endDate: state.endDate,
  });

  const setDate = useCallback((startDate: string, endDate: string) => {
    setState((s) => ({
      ...s,
      startDate,
      endDate,
    }));
  }, []);

  return (
    <Provider
      value={{
        loadingCalendars: loading,
        refetchCalendars: refetch,
        calendars: data?.calendars || [],
        errorCalendars: error,
        setDate,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default Calendar;

export const useCalendars = () => useContext(Context);
export const Consumer = Context.Consumer;
