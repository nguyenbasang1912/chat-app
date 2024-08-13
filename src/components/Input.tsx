import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import React, {memo, ReactNode} from 'react';
import {colors} from '../contants/colors';

type InputProps = {
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
  leftNode?: ReactNode;
  rightNode?: ReactNode;
  style?: ViewStyle;
};

export default memo(function Input(props: InputProps & TextInputProps) {
  const {
    onChangeText,
    value,
    placeholder,
    style,
    leftNode,
    rightNode,
    ...rest
  } = props;

  return (
    <View style={[styles.wrapper, style]}>
      {leftNode && leftNode}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[styles.input]}
        {...rest}
      />
      {rightNode && rightNode}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    padding: 0,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
