import {renderHook} from "@testing-library/react";
import {useUiStore} from "../../../src/hooks/index.js";
import {Provider} from "react-redux";
import {store, uiSlice} from "../../../src/store/index.js";
import {configureStore} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    });
}

describe('Test UiStore', () => {

    test('Should return default values', () => {
        const mockStore = getMockStore({ isDateModalOpen: false});
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );
        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        })
    });

    test('openDateModal should set isDateModalOpen to true', () => {
        const mockStore = getMockStore({ isDateModalOpen: false});
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        const { isDateModalOpen, openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();

    });

    test('closeDateModal should set isDateModalOpen to false', () => {
        const mockStore = getMockStore({ isDateModalOpen: true});
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        const { isDateModalOpen, closeDateModal } = result.current;

        act(() => {
            closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();
    });

    test('toggleDateModal should change the state', () => {
        const mockStore = getMockStore({ isDateModalOpen: true});
        const {result} = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        } );

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();
    });

});
