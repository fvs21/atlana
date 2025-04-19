import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import locale_es from 'dayjs/locale/es';

export const formatTimeSinceUploaded = (date: string) => {
    dayjs.extend(relativeTime);

    dayjs.locale(locale_es);

    const dateTime = dayjs(date);
    console.log(dateTime.fromNow());
    
    return dateTime.fromNow();
}