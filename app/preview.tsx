import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImages } from '../context/imageContext'; // adjust if path differs

export default function Preview() {
  const router = useRouter();
  const { uri } = useLocalSearchParams();
  const { addImage } = useImages();

  const confirm = () => {
    addImage(uri);
    router.push('/'); // go back to gallery or home
  };

  const retake = () => {
    router.back(); // or push to camera screen if needed
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={confirm} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={retake} style={styles.button}>
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '70%',
    borderRadius: 10,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  button: {
    backgroundColor: '#860F44',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
