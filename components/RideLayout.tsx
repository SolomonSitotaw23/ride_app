import { icons, images } from '@/constants';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <TouchableOpacity onPress={() => router.back()}>
              <View>
                <Image source={icons.backArrow} resizeMode="contain" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
