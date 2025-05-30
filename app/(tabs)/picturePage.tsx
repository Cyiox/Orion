import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useImages } from '/Users/jameer/Documents/Coding/COSI-153/Orion/context/imageContext.js';


export default function Index() {
    const { addImage } = useImages();
    const router = useRouter();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState(null);
    const cameraRef = useRef(null);

    if (!permission) {
        return <SafeAreaView />;
    }

    if (!permission.granted) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.text}>We require permission to use the camera.</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.button}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            router.push({
                pathname: '/preview',
                params: {uri: photo.uri},
            });
            console.log('Photo taken:', photo.uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {photoUri ? (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: photoUri }} style={styles.previewImage} />
                    <TouchableOpacity style={styles.button} onPress={() => setPhotoUri(null)}>
                        <Text style={styles.buttonText}>Retake</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                    enableZoomGesture
                >
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.buttonText}>Flip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={takePicture}>
                            <Text style={styles.buttonText}>Capture</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#860F44',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 30,
    },
    button: {
        backgroundColor: '#860F44',
        padding: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '90%',
        height: '70%',
        borderRadius: 10,
    },
});
