import {onCloseDateModal, onOpenDateModal, uiSlice} from "../../../src/store/index.js";

describe('Test uiSlice', () => {
    test('should return default state', () => {
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
    });

    test('should open modal', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();

    });

});
