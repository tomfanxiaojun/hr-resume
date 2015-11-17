module.exports = {
    getDateAsIntFromRange: function(dateRange) {
		if (dateRange.toLowerCase()==="all")
			return 0;
        var len = dateRange.length;
        var start = len - 1;
		var rangeNumber = dateRange.substr(0, len - 1);
		var rangeMeasure = dateRange.substr(start, 1);
		if (isNaN(rangeNumber))
			throw "Wrong date range. Need a combination of number and date measure unit like D, M, Y";
		if ("DMY".indexOf(rangeMeasure)<0)
			throw "Wrong date range measure:"  + rangeMeasure + "  Must be one of D, M, Y";
		
        var dateFrom = moment().subtract(rangeNumber, rangeMeasure);
        var dateFromAsInt = Number(dateFrom.format("YYYYMMDD"));
        return dateFromAsInt;
    },
    getCurrentDate:_getCurrentDate,	
    log: function(msg, type) {
        if (type == undefined || type == "" || type == null || type == "debug") { //默认日志记录,在部署环境不输出日志
            if (!(global.env == 'qa' || global.env == 'pro')) {
                console.log(_getCurrentDate("YYYY-MM-DD HH:mm:ss")+":"+msg);
            }

        } else if (type == "deploy") { //deploy 基本的日志，所有的环境都输出日志
            console.log(_getCurrentDate("YYYY-MM-DD HH:mm:ss")+":"+msg);
        }
    }



};
function _getCurrentDate(format){
    return moment().format(format); 
}

var moment = require('moment');
