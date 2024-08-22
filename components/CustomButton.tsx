import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ButtonProps } from '@/types/type';

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return 'bg-gray-500';
    case 'danger':
      return 'bg-red-500';
    case 'success':
      return 'bg-green-500';
    case 'outline':
      return 'bg-transparent border-neutral-300 border-[0.5px]';
    default:
      return 'bg-[#0286FF]';
  }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return 'text-black';
    case 'secondary':
      return 'text-gray-100';
    case 'danger':
      return 'text-red-100';
    case 'success':
      return 'text-green-100';
    default:
      return 'text-white';
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  IconLeft,
  IconRight,
  className = '', // Ensure a default value
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${className} w-full rounded-full flex flex-row items-center justify-center shadow-md shadow-neutral-400/70 p-5 ${getBgVariantStyle(
        bgVariant
      )}`}
      accessible={true}
      accessibilityLabel={title}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text
        className={`text-lg font-bold capitalize ${getTextVariantStyle(
          textVariant
        )}`}
      >
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
