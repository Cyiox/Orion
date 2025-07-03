import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const ImageContext = createContext();
const STORAGE_KEY = '@saved_images';

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setImages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load images:", e);
      }
    };
    loadImages();
  }, []);
  useEffect(() => {
    const saveImages = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(images));
      } catch (e) {
        console.error("Failed to save images:", e);
      }
    };
    saveImages();
  }, [images]);

  const addImage = (uri) => {
    setImages(prev => [...prev, uri]);
  };

  const removeImage = async (uri) => {
    const updated = images.filter(img => img !== uri);
    setImages(updated);
    await AsyncStorage.setItem('images', JSON.stringify(updated));
  };

  const clearImages = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setImages([]);
    } catch (e) {
      console.error("Failed to clear images:", e);
    }
  };

  return (
    <ImageContext.Provider value={{ images, addImage, clearImages, removeImage}}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => useContext(ImageContext);
