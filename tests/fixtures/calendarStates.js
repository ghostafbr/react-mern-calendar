
export const events = [
    {
        id: '1',
        title: 'Cumpleaños de Juli',
        notes: 'Una nota',
        start: new Date('2023-09-27 13:00:00'),
        end: new Date('2023-09-27 15:00:00'),
    },
    {
        id: '2',
        title: 'Cumpleaños de Andrés',
        notes: 'Otra nota',
        start: new Date('2023-10-21 13:00:00'),
        end: new Date('2023-10-21 15:00:00'),
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [ ],
    activeEvent: null,
}

export const calendarWithEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: {...events[0]},
} 
