import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import locale_es from 'dayjs/locale/es';
import { PropertyTimeUnit } from '~/types/listings';

export const formatTimeSinceUploaded = (date: string) => {
    dayjs.extend(relativeTime);

    dayjs.locale(locale_es);

    const dateTime = dayjs(date);
    
    return dateTime.fromNow();
}

export const formatPropertyListingPriceTimeUnit = (unit: PropertyTimeUnit) => {
    switch (unit) {
        case "day":
            return "/día";
        case "week":
            return "/semana";
        case "month":
            return "/mes";
    }
}