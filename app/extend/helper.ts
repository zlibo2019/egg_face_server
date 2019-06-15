import { IResult } from '../extend/helper';

/**
 * 格式化日期
 */
function fix2number(n) {
  return [0, n].join('').slice(-2);
}
exports.formatDate = (format: any, curDate: Date) => {
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



export interface IResult {
  code: string;
  message: string;
  result: any;
};

export const enumKeyHead = {
  GRADE: 'GRADE',
  SUBJECT: 'SUBJECT',
  CLASSFIED_SUBJECT: 'CLASSFIED_SUBJECT',
  CLASS: 'CLASS',
  CLASSROOM: 'CLASSROOM',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDNET',
  TIMETABLES: 'TIMETABLES',
  CLASSFIED_TIMETABLES: 'CLASSFIED_TIMETABLES',
  CLASSFIED_SUBJECT_STUDENT: 'CLASSFIED_SUBJECT_STUDENT',
  CLASSFIED_SUBJECT_TEACHER: 'CLASSFIED_SUBJECT_TEACHER',
  TEACHING: 'TEACHING',
  CLASSROOM_CLASS_REA: 'CLASSROOM_CLASS_REA',
  SECTION_NAME: 'SECTION_NAME',
  TIMETABLES_ERR: 'TIMETABLES_ERR',
  TEACHING_ERR: 'TEACHING_ERR',
  CLASSFIED_TIMETABLES_ERR: 'CLASSFIED_TIMETABLES_ERR',
  CLASSFIED_SUBJECT_STUDENT_ERR: 'CLASSFIED_SUBJECT_STUDENT_ERR',
  CLASSFIED_SUBJECT_ERR: 'CLASSFIED_SUBJECT_ERR',
  TIMETABLES_STUDENT: 'TIMETABLES_STUDENT',
  TIMETABLES_CLASS: 'TIMETABLES_CLASS',
  TIMETABLES_TEACHER: 'TIMETABLES_TEACHER',
  TIMETABLES_TEACHERCLASS: 'TIMETABLES_TEACHERCLASS',
  TIMETABLES_CLASSROOM: 'TIMETABLES_CLASSROOM',
};


