import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-500">Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
