// AuthentificationSlice.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

import AuthentificationSlice, {
  loginUser,
  registerUser,
  fetchUser,
  updateUser,
  getLibraryCard,
  resetRegisterSuccess,
  resetUser,
} from './AuthentificationSlice';
const apiUrl = import.meta.env.VITE_API_URL_PRODUCTION

import type {
  User,
  
} from '../../models/User';

// ------------------------------------------------------------
//   MOCK AXIOS (идеальная конфигурация для Vitest)
// ------------------------------------------------------------
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
  },
}));

const mockedAxios = vi.mocked(axios, { deep: true });

// ------------------------------------------------------------
// Helper Store
// ------------------------------------------------------------
const createTestStore = () =>
  configureStore({
    reducer: {
      auth: AuthentificationSlice,
    },
  });

type AppStore = ReturnType<typeof createTestStore>;
type AppDispatch = AppStore['dispatch'];

// ------------------------------------------------------------
// MOCK USER
// ------------------------------------------------------------
const mockUser: User = {
  _id: 'user123',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  password: 'password',
  type: 'PATRON',
};

// ------------------------------------------------------------
// TEST SUITE
// ------------------------------------------------------------
describe('AuthentificationSlice', () => {
  let store: AppStore;
  let dispatch: AppDispatch;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createTestStore();
    dispatch = store.dispatch;
  });

  // ------------------------------------------------------------
  // INITIAL STATE
  // ------------------------------------------------------------
  describe('Initial State', () => {
    it('should match default state', () => {
      expect(store.getState().auth).toEqual({
        loggedInUser: undefined,
        profileUser: undefined,
        libraryCard: '',
        loading: false,
        error: false,
        registerSuccess: false,
      });
    });
  });

  // ------------------------------------------------------------
  // SYNC ACTIONS
  // ------------------------------------------------------------
  describe('Synchronous Actions', () => {
    it('resetRegisterSuccess should reset flag', () => {
      store.dispatch({ type: registerUser.fulfilled.type });
      expect(store.getState().auth.registerSuccess).toBe(true);

      store.dispatch(resetRegisterSuccess());
      expect(store.getState().auth.registerSuccess).toBe(false);
    });

    it('resetUser should reset loggedInUser', () => {
      store.dispatch({ type: loginUser.fulfilled.type, payload: mockUser });
      expect(store.getState().auth.loggedInUser).toEqual(mockUser);

      store.dispatch(resetUser('loggedInUser'));
      expect(store.getState().auth.loggedInUser).toBeUndefined();
    });
  });

  // ------------------------------------------------------------
  // loginUser
  // ------------------------------------------------------------
  describe('loginUser Thunk', () => {
    it('pending state', () => {
      mockedAxios.post.mockImplementation(() => new Promise(() => {}));

      dispatch(loginUser({ email: 'x', password: 'y' }));

      expect(store.getState().auth.loading).toBe(true);
      expect(store.getState().auth.error).toBe(false);
    });

    it('success', async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: { user: mockUser } });

      await dispatch(loginUser({ email: 'test@example.com', password: 'password' }));

      const state = store.getState().auth;

      expect(state.loggedInUser).toEqual(mockUser);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(false);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${apiUrl}/auth/login`,
        { email: 'test@example.com', password: 'password' }
      );
    });

    it('failure', async () => {
      mockedAxios.post.mockRejectedValueOnce('Login failed');

      await dispatch(loginUser({ email: 'wrong', password: 'wrong' }));

      const state = store.getState().auth;

      expect(state.error).toBe(true);
      expect(state.loggedInUser).toBeUndefined();
      expect(state.loading).toBe(false);
    });
  });

  // ------------------------------------------------------------
  // registerUser
  // ------------------------------------------------------------
  describe('registerUser Thunk', () => {
    it('success', async () => {
      mockedAxios.post.mockResolvedValueOnce({ data: { user: mockUser } });

      await dispatch(
        registerUser({
          email: mockUser.email,
          password: mockUser.password,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          type: mockUser.type,
        })
      );

      const state = store.getState().auth;

      expect(state.registerSuccess).toBe(true);
      expect(state.loading).toBe(false);

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  // ------------------------------------------------------------
  // fetchUser
  // ------------------------------------------------------------
  describe('fetchUser Thunk', () => {
    it('success (profileUser)', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { user: mockUser } });

      await dispatch(fetchUser({ userId: 'user123', property: 'profileUser' }));

      expect(store.getState().auth.profileUser).toEqual(mockUser);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${apiUrl}/users/user123`);
    });

    it('failure', async () => {
      mockedAxios.get.mockRejectedValueOnce('Failed');

      await dispatch(fetchUser({ userId: 'user123', property: 'profileUser' }));

      expect(store.getState().auth.error).toBe(true);
    });
  });

  // ------------------------------------------------------------
  // updateUser
  // ------------------------------------------------------------
  describe('updateUser Thunk', () => {
    it('success', async () => {
      const update = { ...mockUser, firstName: 'Updated' };

      mockedAxios.put.mockResolvedValueOnce({ data: { user: update } });

      await dispatch(updateUser(update));

      const state = store.getState().auth;

      expect(state.loggedInUser).toEqual(update);
      expect(state.profileUser).toEqual(update);
      expect(state.error).toBe(false);
    });
  });

  // ------------------------------------------------------------
  // getLibraryCard
  // ------------------------------------------------------------
  describe('getLibraryCard Thunk', () => {
    it('success', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { libraryCard: { _id: 'card123' } },
      });

      await dispatch(getLibraryCard('user123'));

      expect(store.getState().auth.libraryCard).toBe('card123');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        `${apiUrl}/card/`,
        { user: 'user123' }
      );
    });
  });

  // ------------------------------------------------------------
  // Combined actions
  // ------------------------------------------------------------
  describe('Multiple actions', () => {
    it('login + getLibraryCard', async () => {
      mockedAxios.post
        .mockResolvedValueOnce({ data: { user: mockUser } })
        .mockResolvedValueOnce({ data: { libraryCard: { _id: 'card123' } } });

      await dispatch(loginUser({ email: mockUser.email, password: mockUser.password }));
      await dispatch(getLibraryCard(mockUser._id));

      const state = store.getState().auth;

      expect(state.loggedInUser).toEqual(mockUser);
      expect(state.libraryCard).toBe('card123');
    });
  });
});
