import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Chat = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="bg-red-500">Chat</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
