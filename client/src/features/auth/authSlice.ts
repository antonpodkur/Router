import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/user';
import { RootState } from '../../app/store';

interface AuthState {
  user: User | null;
  isLoggedIn: boolean
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = true
    },
    logOut: (state, action) => {
      state.user = null
      state.isLoggedIn = false
    }
  },
});

export const { setUser, setLoggedIn, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
