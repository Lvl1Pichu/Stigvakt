import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import axios from 'axios';

// Firebase configuration
// Replace with your own Firebase project details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Backend API URL
const API_URL = 'http://localhost:5104/api';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Example function to get data from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      // Get ID token if user is logged in
      const idToken = user ? await user.getIdToken() : null;
      
      // Call the backend API
      const response = await axios.get(`${API_URL}/trails`, {
        headers: idToken ? { Authorization: `Bearer ${idToken}` } : {}
      });
      
      setMessage(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stigvakt</Text>
      
      <Text style={styles.subtitle}>
        {user ? `Welcome, ${user.email}` : 'Welcome, Guest'}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Fetch Trail Data" onPress={fetchData} />
      </View>
      
      {message ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : null}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 15,
  },
  messageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '90%',
    maxHeight: 300,
  },
  message: {
    fontSize: 14,
  },
});
