import {useDispatch, useSelector} from "react-redux";
import calendarApi from "../api/calendarApi.js";
import {checkAuth, onLogin, onLogout, clearErrorMessage, onLogoutCalendar} from "../store/index.js";

export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({email, password}) => {

        dispatch( checkAuth() );
        try {
            const { data } = await calendarApi.post('/auth/login', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({name: data.name, uid: data.uid}) );
        } catch (error) {
            dispatch( onLogout('Invalid credentials') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const startRegister = async ({name, email, password}) => {
        dispatch( checkAuth() );
        try {
            const {data} = await calendarApi.post('/auth/signup', {name, email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({name: data.name, uid: data.uid}) );
        } catch (error) {
            console.log(error);
            dispatch( onLogout( error.response.data?.msg || '---') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return dispatch( onLogout() );
        }
        const initDate = localStorage.getItem('token-init-date');
        const now = new Date().getTime();
        if (now - initDate > 60 * 60 * 1000) {
            return dispatch( onLogout() );
        }
        try {
            const {data} = await calendarApi.get('/auth/renew-jwt');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch( onLogin({name: data.name, uid: data.uid}) );
        } catch (error) {
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init-date');
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        //* Properties
        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }

}
