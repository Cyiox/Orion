import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Alert, Button } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImages } from '/Users/jameer/Documents/Coding/COSI-153/Orion/context/imageContext.js';



function Index() {
    const router = useRouter();
    const previousPics = [ ]
    const { images, clearImages } = useImages();

    const handleClearAll = () => {
    Alert.alert(
      "Delete All Photos",
      "Are you sure you want to delete all saved photos?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: clearImages }
      ]
    );
  };


    return (
            <SafeAreaView style={styles.backgrond}>
                <Text style={styles.text}>Previously Taken Pictures</Text>
                <Button title = "Delete all Photos" color = '#ff4444' onPress ={handleClearAll}/>
                <ScrollView contentContainerStyle={styles.gallery}>
                  {images.map((uri, idx) => (
                    <TouchableOpacity
                        key={idx}
                        onPress={() =>
                        router.push({
                            pathname: '/photoview',
                             params: { uri },
                        })
                 }
             >
                        <Image source={{ uri }} style={styles.image} />
                    </TouchableOpacity>
                ))}
                </ScrollView>
             </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgrond: {
        backgroundColor: "#860F44",
        padding: 0,
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "#fff",
    },
    gallery: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },
});

export default Index;
