import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-500">Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
