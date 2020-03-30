const constants = require('./constants');

var dateUtil = {
    
    /**
     * Converts UTC date into custom format.
     * Supports only (YYYY)year, (MM)month, (DD)date, (hh)hour, (mm)minutes and (ss)seconds
     * @param dateTime The date to be formatted.
     * @param format The format of the date.
     */
    formatDate:(dateTime,format)=>{

        if(format.includes('YYYY')){
            var year =  dateTime.getUTCFullYear().toString();
            format = format.replace('YYYY',year);    
        }

        if(format.includes('MM')){
            var month = dateTime.getUTCMonth() + 1;
                month = (month < 10)? '0'+ month.toString(): month.toString();
                format = format.replace('MM',month);
        }

        if(format.includes('DD')){
            var date = dateTime.getUTCDate();
                date = (date < 10)? '0'+ date.toString(): date.toString();
                format = format.replace('DD',date);
        }

        if(format.includes('hh')){
            var hour = dateTime.getUTCHours();
                hour = (hour < 10)? '0'+ hour.toString(): hour.toString();
                format = format.replace('hh',hour);
        }

        if(format.includes('mm')){
            var minutes = dateTime.getUTCMinutes();
                minutes = (minutes < 10)? '0'+minutes.toString(): minutes.toString();
                format = format.replace('mm',minutes);
        }
        
        if(format.includes('ss')){
            var seconds = dateTime.getUTCSeconds();
                seconds = (seconds < 10)? '0'+seconds.toString(): seconds.toString();
                format = format.replace('ss',seconds);
        }
        
      return format;
    },

    /**
     * Reset UTC time to 00:00:00
     * @param date The UTC date 
     */
    resetTime:(date) =>{
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        return date;
    },

    /**
     * Checks if string date is valid
     * ISO format YYYY-MM-DDThh:mm:ssZ
     * @param date The date to be validated.
     */
    isValidDate:(date) =>{
        if(date.trim().match(constants.ISO_DATE_REGEX)){
            return true;
        } else {
            return false;
        }
    }

};

module.exports = dateUtil;