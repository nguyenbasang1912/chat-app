import {View, Text, ViewStyle} from 'react-native';
import React, {memo, useMemo} from 'react';

type SpacerProps = {
  size: Pick<ViewStyle, 'width' | 'height'>;
  style?: ViewStyle;
};

export default memo(function Spacer(props: SpacerProps) {
  const {size, style} = props;
  const spacerStyle = useMemo<ViewStyle>(() => {
    return {
      width: size.width || 'auto',
      height: size.height || 'auto',
    };
  }, [size]);

  return <View style={[style, spacerStyle]} />;
});
