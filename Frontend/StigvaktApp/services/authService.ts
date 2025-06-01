import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const AuthService = {
  /**
   * Register a new user with email and password
   */
  registerUser: async (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  /**
   * Sign in an existing user with email and password
   */
  loginUser: async (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * Sign out the current user
   */
  logoutUser: async (): Promise<void> => {
    return signOut(auth);
  },

  /**
   * Send password reset email
   */
  sendPasswordReset: async (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (user: User, profile: { displayName?: string, photoURL?: string }): Promise<void> => {
    return updateProfile(user, profile);
  },

  /**
   * Get the current authenticated user
   */
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};
