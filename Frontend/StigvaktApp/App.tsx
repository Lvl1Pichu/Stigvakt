import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
// Comment out Firebase imports until authentication is implemented
// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import axios from 'axios';
import { Login } from './components/Login';

// Firebase configuration commented out for now
/*
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
*/
// Backend API URL for Web
const API_URL = 'http://localhost:5104/api';
// Backend API URL App
// const API_URL = 'http://10.0.2.2:5104/api';

export default function App() {
  // Changed User type to any since we're not using Firebase User type
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simplified fetch data function without authentication
  const fetchData = async () => {
    try {
      setLoading(true);
      // Removed authentication token logic
      
      // Call the backend API without auth headers
      const response = await axios.get(`${API_URL}/trails`);
      
      setMessage(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    // For now, just simulate successful login
    // In the future, this will connect to your backend/Firebase
    console.log(`Login attempt with: ${email}`);
    setIsAuthenticated(true);
    setUser({ email });
  };

  const handleRegister = async (email: string, password: string, confirmPassword: string) => {
    // For now, just simulate successful registration
    // In the future, this will connect to your backend/Firebase
    console.log(`Registration attempt with: ${email}`);
    setIsAuthenticated(true);
    setUser({ email });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  // If not authenticated, show the login screen
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Login onLogin={handleLogin} onRegister={handleRegister} />
        <StatusBar style="auto" />
      </View>
    );
  }
  
  // If authenticated, show the main app screen
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stigvakt</Text>
      
      <Text style={styles.subtitle}>
        Welcome to Stigvakt, {user?.email}
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Fetch Trail Data" onPress={fetchData} />
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Logout" 
          onPress={() => setIsAuthenticated(false)} 
          color="#FF6347"
        />
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