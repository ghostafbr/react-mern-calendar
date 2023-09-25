import {fireEvent, render, screen} from '@testing-library/react';
import {FabDelete} from '../../../src/calendar/index.js'
import {useCalendarStore} from '../../../src/hooks/useCalendarStore';

jest.mock('../../../src/hooks/useCalendarStore');


describe('Test <FabDelete/>', () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('should render the component', () => {

        useCalendarStore.mockReturnValue({
            hasEventsSelected: false,
        });

        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect(btn.classList).toContain('btn');
        expect(btn.classList).toContain('btn-danger');
        expect(btn.classList).toContain('fab-danger');
        expect(btn.style.display).toBe('none');

    });

    test('should show the button if there are a selected event', () => {
        useCalendarStore.mockReturnValue({
            hasEventsSelected: true
        });

        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        expect(btn.style.display).toBe('');
    });

    test('should call startDeleteEvent if there is an active event', () => {
        useCalendarStore.mockReturnValue({
            hasEventsSelected: true,
            startDeletingEvent: mockStartDeletingEvent
        });

        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);

        expect(mockStartDeletingEvent).toHaveBeenCalledWith();
    });
});
