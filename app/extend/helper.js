
/**
 * 格式化日期
 */

exports.formatDate = (format, curDate) => {
  if (format === undefined) return curDate;
  curDate = new Date(curDate);
  format = format.replace(/Y/i, curDate.getFullYear());
  format = format.replace(/m/i, fix2number(curDate.getMonth() + 1));
  format = format.replace(/d/i, fix2number(curDate.getDate()));
  format = format.replace(/H/i, fix2number(curDate.getHours()));
  format = format.replace(/i/i, fix2number(curDate.getMinutes()));
  format = format.replace(/s/i, fix2number(curDate.getSeconds()));
  format = format.replace(/ms/i, curDate.getMilliseconds());
  return format;
};

