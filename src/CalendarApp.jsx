import { AppRouter } from './router';
import {Provider} from "react-redux";
import {store} from "./store/index.js";

export const CalendarApp = () => {
    return (
        <>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </>
    );
};
