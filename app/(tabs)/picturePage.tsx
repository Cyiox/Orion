import { Text, StyleSheet,  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router'


function Index() {
    return (
        <SafeAreaView style={styles.backgrond}>
            <Text style={styles.text}>Previously Taken Pictures</Text>
            <Link href = '../about'> What is the app for?</Link>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgrond: {
        backgroundColor: "#860F44", // needs a '#' for hex color
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
});

export default Index;
