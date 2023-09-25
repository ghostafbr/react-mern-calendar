import {configureStore} from '@reduxjs/toolkit';
import {authSlice, uiSlice} from '../../../src/store/index.js';
import {initialState, notAuthenticatedState} from '../../fixtures/authStates.js';
import {renderHook, waitFor} from '@testing-library/react';
import {useAuthStore} from '../../../src/hooks/index.js';
import {Provider} from 'react-redux';
import {act} from 'react-dom/test-utils';
import {testUserCredentials} from '../../fixtures/testUser.js';
import {calendarApi} from '../../../src/api/index.js';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: {...initialState}
        }
    });
}

describe('Test AuthStore', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    test('Should return default values', () => {
        const mockStore = getMockStore({...initialState});

        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        })
    });

    test('StartLogin must do the login correctly', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const {errorMessage, status, user} = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {name: 'Andrés', uid: '650061d49791bcd6b5ab6d25',},
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    });

    test('startLogin must fail the authentication', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({email: 'test@gmail.com', password: '123456'});
        });

        const {errorMessage, status, user} = result.current;
        expect(localStorage.getItem('token')).toBeNull();
        expect({errorMessage, status, user}).toEqual({
            errorMessage: 'Invalid credentials',
            status: 'not-authenticated',
            user: {},
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBeUndefined()
        );

    });

    test('startRegister must do the register correctly', async () => {
        const newUser = {email: 'test@gmail.com', password: '123456', name: 'Test User'}
        const mockStore = getMockStore({...notAuthenticatedState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '123',
                name: 'Test User',
                token: '123456',
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const {errorMessage, status, user} = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {name: 'Test User', uid: '123',},
        });

        spy.mockRestore();

    });

    test('startRegister must fail the register', async () => {
        const mockStore = getMockStore({...notAuthenticatedState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const {errorMessage, status, user} = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: 'The email already exists',
            status: 'not-authenticated',
            user: {},
        });

    });

    test('CheckAuthToken must fail is there is no token', async () => {
        const mockStore = getMockStore({...initialState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const {errorMessage, status, user} = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {},
        });

    });

    test('CheckAuthToken must fail if the token is invalid', async () => {
        const {token} = await calendarApi.post('auth/login', testUserCredentials).then(res => res.data);
        localStorage.setItem('token', token);

        const mockStore = getMockStore({...initialState});
        const {result} = renderHook(() => useAuthStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const {errorMessage, status, user} = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {name: 'Andrés', uid: '650061d49791bcd6b5ab6d25',},
        });

    });

});
