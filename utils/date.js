export default function dateToTimestamp(date) {
               //方法一
        var newDate = new Date();
        newDate.setFullYear(date.substring(0,4));
        newDate.setMonth(date.substring(5,7)-1);
        console.log('3--' + date.substring(8,10));
        newDate.setDate(date.substring(8,10));
        newDate.setHours(date.substring(11,13));
        newDate.setMinutes(date.substring(14,16));
        newDate.setSeconds(date.substring(17,19));
        console.log('date',newDate);
        return Date.parse(newDate)/1000;
    }