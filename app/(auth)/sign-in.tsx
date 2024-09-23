import { View, Text, ScrollView, Image } from 'react-native';

import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import { useCallback, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form.email, form.password]);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white relative">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
        <Text className="text-black text-2xl font-JakartaSemiBold absolute bottom-5 left-5">
          Welcome back
        </Text>
      </View>
      <View className="p-5">
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
        <CustomButton
          title="sign In"
          onPress={onSignInPress}
          className="mt-6"
        />

        {/* OAuth  */}
        <OAuth />

        <Link
          href="/sign-up"
          className="text-lg text-center text-general-200 mt-10"
        >
          <Text>Don't have an account?</Text>
          <Text className="text-primary-500">signup</Text>
        </Link>
        {/* Verification Modal  */}
      </View>
    </ScrollView>
  );
};

export default SignIn;
