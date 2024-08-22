import { View, Text, ScrollView, Image } from 'react-native';
import {} from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import InputField from '@/components/InputFIeld';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignUpPress = async () => {};
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white relative">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
        <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
          Create Your Account
        </Text>
      </View>
      <View className="p-5">
        <InputField
          label="Name"
          placeholder="Enter Name"
          icon={icons.person}
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
        />
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.lock}
          secureTextEntry={true}
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />
        <CustomButton title="signUp" onPress={onSignUpPress} className="mt-6" />

        {/* OAuth  */}
        <OAuth />

        <Link
          href="/sign-in"
          className="text-lg text-center text-general-200 mt-10"
        >
          <Text>Already have an account?</Text>
          <Text className="text-primary-500">Login</Text>
        </Link>
        {/* Verification Modal  */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
