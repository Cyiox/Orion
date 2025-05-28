import { StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Error 404' }} />
            <SafeAreaView style={styles.container}>
                <Link href="/" style={styles.link}>
                    Go back home
                </Link>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#fff',
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});
