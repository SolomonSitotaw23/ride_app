import CustomButton from '@/components/CustomButton';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();
  async function fetchHello() {
    const response = await fetch('/(api)/hello');
    const data = await response.json();
    alert('Hello ' + data.hello);
  }

  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <CustomButton title="Fetch Hello" onPress={() => fetchHello()} />
      </SignedIn>
    </SafeAreaView>
  );
}
