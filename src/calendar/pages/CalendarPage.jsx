import {useEffect, useState} from "react";
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {addHours} from 'date-fns'
import {Navbar, CalendarEvent, CalendarModal, FabDelete} from "../";

import {localizer, getMessagesES} from "../../helpers/";
import {useUiStore, useCalendarStore, useAuthStore} from "../../hooks";
import FabAddNew from "../components/FabAddNew.jsx";

const events = [{
  title: 'My event',
  notes: 'notes',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgcolor: '#fafafa',
  user: {
    _id: '123',
    name: 'Andrés'
  }
}]

export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const isMyEvent = ( user.uid === event.user._id ) || (user.uid === event.user.uid);

        const style = {
            backgroundColor: isMyEvent ?  '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        openDateModal();
    }

    const onSelectEvent = (e) => {
        setActiveEvent(e);
    }

    const onViewChanged = (e) => {
        localStorage.setItem('lastView', e);
        setLastView(e);
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);

  return (
      <>

        <Navbar />
        <Calendar
            culture='es'
            localizer={localizer}
            events={ events }
            defaultView={ lastView }
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc( 100vh - 80px )' }}
            messages={ getMessagesES() }
            eventPropGetter={ eventStyleGetter }
            components={{
                event: CalendarEvent
            }}
            onDoubleClickEvent={ onDoubleClick }
            onSelectEvent={ onSelectEvent }
            onView={ onViewChanged }
        />

          <CalendarModal />
          <FabAddNew />
          <FabDelete />
      </>
  )
};
