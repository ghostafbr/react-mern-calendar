import {authSlice, clearErrorMessage, onLogin, onLogout} from "../../../src/store/index.js";
import {authenticatedState, initialState} from "../../fixtures/authStates.js";
import {testUser, testUserCredentials} from "../../fixtures/testUser.js";

describe('Test authSlice', () => {

    test('should return the initial state', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('should login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('should logout', () => {
        const state = authSlice.reducer(authenticatedState, onLogout());
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('should logout', () => {
        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });

    test('should clear the errorMessage', () => {
        const errorMessage = 'Invalid credentials';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newState = authSlice.reducer(state, clearErrorMessage());
        expect(newState.errorMessage).toBe(undefined);
    });

});
