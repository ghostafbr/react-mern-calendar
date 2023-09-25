import {
    calendarSlice,
    onAddNewEvent,
    onDeleteEvent, onLoadEvents, onLogoutCalendar,
    onSetActiveEvent,
    onUpdatedEvent
} from "../../../src/store/index.js";
import {
    calendarWithActiveEventState,
    calendarWithEventState,
    events,
    initialState
} from "../../fixtures/calendarStates.js";

describe('Test calendarSlice', () => {

    test('Should return initial state', () => {
        const state = calendarSlice.getInitialState();
        expect(state).toEqual(initialState);
    });

    test('Should activate an event', () => {
        const state = calendarSlice.reducer(calendarWithEventState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('onAddNewEvent should add a new event', () => {
        const newEvent = {
            id: '3',
            title: 'Cumpleaños',
            notes: 'Una nota',
            start: new Date('2023-09-28 13:00:00'),
            end: new Date('2023-09-28 15:00:00'),
        }
        const state = calendarSlice.reducer(calendarWithEventState, onAddNewEvent(newEvent));
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent should update an event', () => {
        const updatedEvent = {
            id: '2',
            title: 'Cumpleaños de Andrés',
            notes: 'Una nota actualizada',
            start: new Date('2023-09-28 13:00:00'),
            end: new Date('2023-09-28 15:00:00'),
        }
        const state = calendarSlice.reducer(calendarWithEventState, onUpdatedEvent(updatedEvent));
        expect(state.events).toContain(updatedEvent);
    });

    test('onDeleteEvent should delete an active event', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBeNull();
        expect(state.events).not.toContain(events[0]);
    });

    test('onLoadEvents should set the events', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.isLoadingEvents).toBeFalsy();
        expect(state.events).toEqual(events);

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(newState.events.length).toBe(events.length);
    });

    test('onLogOutCalendar should clean the state', () => {
        const state = calendarSlice.reducer(calendarWithEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    });

});
