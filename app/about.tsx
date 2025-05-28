import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


function Index() {
    return (
        <SafeAreaView style={styles.backgrond}>
            <Text style={styles.text}>This is a app intendent to anyalize images created by Jameer</Text>

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
});

export default Index;
