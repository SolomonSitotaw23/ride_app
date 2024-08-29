import { View, Text, ScrollView, Image, Alert } from 'react-native';
import {} from 'react-native-safe-area-context';
import { icons, images } from '@/constants';
import InputField from '@/components/InputFIeld';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import { useSignUp } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerfication] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setVerfication({
        ...verification,
        state: 'pending',
      });
    } catch (err: any) {
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === 'complete') {
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });

        await setActive({ session: completeSignUp.createdSessionId });
        setVerfication({ ...verification, state: 'success' });
      } else {
        setVerfication({
          ...verification,
          state: 'failed',
          error: 'verification failed',
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      setVerfication({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage,
      });
    }
  };

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
      <ReactNativeModal
        isVisible={verification.state === 'pending'}
        onModalHide={() => {
          if (verification.state === 'success') setShowSuccessModal(true);
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verification
          </Text>
          <Text className=" font-Jakarta mb-5">
            We've sent a verification code to {form.email}
          </Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="12345"
            keyboardType="numeric"
            onChangeText={(code) => setVerfication({ ...verification, code })}
          />
          {verification.error && (
            <Text className="text-sm text-red-500 mt-1">
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onPressVerify}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-1"
          />
          <Text className="text-3xl text-center font-Jakarta">Verified</Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            you have success fully verified your account
          </Text>
          <CustomButton
            title="browse home"
            onPress={() => {
              setShowSuccessModal(false);
              router.replace('/(root)/(tabs)/home');
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
