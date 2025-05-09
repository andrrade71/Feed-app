import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image, 
  Dimensions, 
} from 'react-native';

const API_URL = 'https://picsum.photos/v2/list?limit=10';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e); 
        setError(e.message); 
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.download_url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.authorText}>👤 {item.author}</Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Feed de Fotos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#38bdf8" />
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Ops! Algo deu errado:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9', 
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#0f172a', 
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden', 
  },
  image: {
    width: '100%',
    height: 250, 
  },
  cardContent: {
    padding: 16, 
  },
  authorText: { 
    fontSize: 18,
    fontWeight: '600', 
    color: '#1e293b', 
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 5,
  },
});