import {useDispatch, useSelector} from "react-redux";
import {onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdatedEvent} from "../store/index.js";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = ( calendarEvent ) => {
        // TODO: call backend

        // All is ok
        if ( calendarEvent._id ) {
            // Update
            dispatch(onUpdatedEvent({...calendarEvent}));
        } else {
            // Create
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}));
        }

    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        // Properties
        events,
        activeEvent,
        hasEventsSelected: !!activeEvent,

        // Mehods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent

    };
};

export default useCalendarStore;
