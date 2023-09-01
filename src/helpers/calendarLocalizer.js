import esES from 'date-fns/locale/es'
import {format, parse, getDay, startOfWeek} from 'date-fns'
import {dateFnsLocalizer} from "react-big-calendar";

const locales = {
    'es': esES,
}

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
