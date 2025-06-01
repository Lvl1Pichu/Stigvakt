# Stigvakt

Stigvakt is an open source app that helps hikers in Sweden report trail issues, track maintenance needs, and organize volunteer events. Users can upload photos, pinpoint locations on a map, and support nature preservation by contributing to the upkeep of hiking trails nationwide.

## Project Structure

This project is a React Native mobile application with a .NET backend:

- **Frontend**: React Native app using Expo and TypeScript
- **Backend**: ASP.NET Core Web API
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [.NET SDK](https://dotnet.microsoft.com/download) (version 8.0 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase account](https://firebase.google.com/)

### Backend Setup

1. Navigate to the Backend folder:
   ```
   cd Backend/StigvaktAPI
   ```

2. Restore NuGet packages:
   ```
   dotnet restore
   ```

3. Update Firebase configuration in `appsettings.json`:
   - Replace `YOUR_FIREBASE_PROJECT_ID` with your actual Firebase project ID
   - Add other necessary Firebase configuration values

4. Run the API:
   ```
   dotnet run
   ```

The API will be available at https://localhost:7075 (or port specified in your settings).

### Frontend Setup

1. Navigate to the Frontend folder:
   ```
   cd Frontend/StigvaktApp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Open `config/firebase.ts` and update with your Firebase project details
   - Open `App.tsx` and update `firebaseConfig` with your Firebase project details

4. Update API endpoint:
   - Open `services/api.ts` and update `API_URL` to point to your .NET backend

5. Start the app:
   ```
   npx expo start
   ```

## Firebase Setup

1. Create a new Firebase project at https://console.firebase.google.com/
2. Enable Authentication (Email/Password at minimum)
3. Enable Firestore Database
4. Create a web app in your Firebase project to get the configuration
5. Copy the configuration to both frontend files that require it

## Connecting Frontend to Backend

The React Native app is set up to connect to the .NET backend using the following:

- Axios for API requests
- Firebase authentication tokens passed to backend
- JWT Bearer token validation in the backend

## Next Steps

- Replace the in-memory data service with a real database connection
- Implement proper error handling
- Add more features according to requirements
