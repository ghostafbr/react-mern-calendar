import {calendarApi} from "../../src/api/index.js";

describe('Test calendarApi', () => {

    test('should have default config', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    });

    test('should have x-token in all requests', async () => {
        const token = 'ABC123ABC123'
        localStorage.setItem('token', token);
        const resp = await calendarApi.get('/auth/login')
            .then((resp) => resp)
            .catch((err) => err);
        expect(resp.config.headers['x-token']).toBe(token);
    });


});
