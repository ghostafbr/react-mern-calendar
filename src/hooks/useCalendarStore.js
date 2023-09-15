import {useDispatch, useSelector} from "react-redux";
import {onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdatedEvent} from "../store/index.js";
import {calendarApi} from "../api/index.js";
import {convertEventsToDateEvents} from "../helpers/index.js";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const {events, activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            // All is ok
            if (calendarEvent.id) {
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdatedEvent({...calendarEvent, user}));
                return;
            }
            // Create
            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.event.id, user}));

        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }


    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {

        try {
            const {data} = await calendarApi.get('/events');
            data.events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(data.events));
        } catch (error) {
            console.error(error);
        }

    }

    return {
        // Properties
        events,
        activeEvent,
        hasEventsSelected: !!activeEvent,

        // Mehods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents

    };
};

export default useCalendarStore;
