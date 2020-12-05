import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';

type Props = {
  backgroundColor: string;
};

const CalendarWrap: React.FC<Props> = (props) => {
  return (
    <ScrollView
      style={[
        styles.scroll,
        {
          backgroundColor: props.backgroundColor,
        },
      ]}
    >
      <FocusAwareStatusBar
        backgroundColor={props.backgroundColor}
        barStyle={'dark-content'}
      />
      {props.children}
    </ScrollView>
  );
};

export default CalendarWrap;

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    width: '100%',
  },
});
