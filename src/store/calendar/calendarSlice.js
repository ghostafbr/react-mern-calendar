import {createSlice} from "@reduxjs/toolkit";
import {addHours} from "date-fns";

const tempEvents = {
    _id: new Date().getTime(),
    title: 'My eventooooo',
    notes: 'notes',
    start: new Date(),
    end: addHours( new Date(), 2),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Andrés'
    }
}


export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        events: [ tempEvents ],
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
                event => event._id === payload._id ? payload : event
            );
        },
        onDeleteEvent: (state) => {
            if ( !state.activeEvent ) return;
            state.events = state.events.filter(event => event._id !== state.activeEvent._id);
            state.activeEvent = null;
        }
    }
});

export const {onSetActiveEvent, onAddNewEvent, onUpdatedEvent, onDeleteEvent} = calendarSlice.actions;
