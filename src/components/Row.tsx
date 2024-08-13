import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';

type RowProps = {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  style?: ViewStyle;
  children: React.ReactNode;
  padding?: ViewStyle['padding'];
  margin?: ViewStyle['margin'];
};

export default memo(function Row(props: RowProps) {
  const {children, margin, padding, style, justify, align} = props;

  const rowStyle: ViewStyle = {
    justifyContent: justify || 'flex-start',
    margin,
    padding,
    alignItems: align || 'center',
  };

  return <View style={[styles.row, rowStyle, style]}>{children}</View>;
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
