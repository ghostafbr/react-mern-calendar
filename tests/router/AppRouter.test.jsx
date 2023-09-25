import {useAuthStore} from '../../src/hooks/index.js';
import {render, screen} from '@testing-library/react';
import {AppRouter} from '../../src/router/index.js';
import {MemoryRouter} from 'react-router-dom';

jest.mock('../../src/hooks/useAuthStore');

describe('Test <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('Should render load screen and exec checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter/>)
        expect(screen.getByText('Checking...')).toBeTruthy()
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    /*test('Should render the login page if not authenticated', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />)

        expect(screen.getByText('Ingreso')).toBeTruthy();
        /!*expect(container).toMatchSnapshot();*!/
    });

    test('Should render the calendar page if authenticated', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <MemoryRouter>
                <AppRouter/>
            </MemoryRouter>
        );

        expect(screen.getByText('CalendarPage')).toBeTruthy();

    });*/

});
