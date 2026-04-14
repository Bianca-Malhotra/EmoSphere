/**
 * Authentication Service
 * Handles user credentials and authentication logic
 * Note: In production, use secure backend with bcrypt/Argon2 hashing
 */

export interface UserCredentials {
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

/**
 * Simple password hashing (base64 encoding)
 * WARNING: This is NOT production-safe. Use bcrypt on the backend in production.
 */
const hashPassword = (password: string): string => {
  return btoa(password);
};

/**
 * Verify password against stored hash
 */
const verifyPassword = (password: string, hash: string): boolean => {
  return hashPassword(password) === hash;
};

/**
 * Register a new user
 */
export const registerUser = (email: string, password: string, name: string): boolean => {
  try {
    // Check if user already exists
    if (localStorage.getItem(`emosphere_user_${email}`)) {
      console.warn('User already registered with this email');
      return false;
    }

    // Validate inputs
    if (!email || !password || password.length < 6) {
      console.warn('Invalid input for registration');
      return false;
    }

    const credentials: UserCredentials = {
      email,
      passwordHash: hashPassword(password),
      name: name || email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(`emosphere_user_${email}`, JSON.stringify(credentials));
    console.log(`User registered: ${email}`);
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

/**
 * Authenticate user with email and password
 */
export const authenticateUser = (email: string, password: string): UserCredentials | null => {
  try {
    const storedUser = localStorage.getItem(`emosphere_user_${email}`);
    
    if (!storedUser) {
      console.warn('User not found');
      return null;
    }

    const credentials: UserCredentials = JSON.parse(storedUser);
    
    if (!verifyPassword(password, credentials.passwordHash)) {
      console.warn('Invalid password');
      return null;
    }

    return credentials;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

/**
 * Get user by email
 */
export const getUserByEmail = (email: string): UserCredentials | null => {
  try {
    const storedUser = localStorage.getItem(`emosphere_user_${email}`);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = (email: string, updates: Partial<Omit<UserCredentials, 'passwordHash' | 'createdAt'>>): boolean => {
  try {
    const user = getUserByEmail(email);
    if (!user) return false;

    const updated: UserCredentials = {
      ...user,
      ...updates
    };

    localStorage.setItem(`emosphere_user_${email}`, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
};

/**
 * Delete user account
 */
export const deleteUserAccount = (email: string): boolean => {
  try {
    localStorage.removeItem(`emosphere_user_${email}`);
    localStorage.removeItem(`emosphere_premium_${email}`);
    console.log(`Account deleted: ${email}`);
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
};

/**
 * Change password
 */
export const changePassword = (email: string, oldPassword: string, newPassword: string): boolean => {
  try {
    const credentials = authenticateUser(email, oldPassword);
    if (!credentials) {
      console.warn('Invalid credentials for password change');
      return false;
    }

    const updated: UserCredentials = {
      ...credentials,
      passwordHash: hashPassword(newPassword)
    };

    localStorage.setItem(`emosphere_user_${email}`, JSON.stringify(updated));
    console.log(`Password updated for: ${email}`);
    return true;
  } catch (error) {
    console.error('Error changing password:', error);
    return false;
  }
};
