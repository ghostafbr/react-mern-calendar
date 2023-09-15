import {createSlice} from "@reduxjs/toolkit";
// import {addHours} from "date-fns";
/*const tempEvents = {
    id: new Date().getTime(),
    title: 'My eventooooo',
    notes: 'notes',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        id: '123',
        name: 'Andrés'
    }
}*/


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [ ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdatedEvent: (state, {payload}) => {
            state.events = state.events.map(
                event => event.id === payload.id ? payload : event
            );
        },
        onDeleteEvent: (state) => {
            if ( !state.activeEvent ) return;
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        },
        onLoadEvents: (state, {payload = []}) => {
            state.isLoadingEvents = false;
            // state.events = [...payload];
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) state.events.push(event);
            });
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null;
        }
    }
});

export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdatedEvent,
    onDeleteEvent,
    onLoadEvents,
    onLogoutCalendar
} = calendarSlice.actions;
