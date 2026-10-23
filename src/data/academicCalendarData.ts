export interface CalendarEvent {
  id: string;
  activity: string;
  date: string;
  day: string;
  category: 'Registration & Enrollment' | 'Instruction & Classes' | 'Examinations' | 'Gazetted Holidays' | 'Grading & Results';
  isHoliday?: boolean;
  isExam?: boolean;
  isDeadline?: boolean;
  highlight?: boolean;
}

export interface WorkingDaysMonth {
  month: string;
  days: number;
  sundays: number;
  holidays: number;
  examResultDays: string;
  teachingDays: number;
}

export interface AcademicCalendarInfo {
  institution: string;
  title: string;
  term: string;
  academicYear: string;
  campusAffiliation: string;
  gazettedNote: string;
  events: CalendarEvent[];
  workingBreakdown: WorkingDaysMonth[];
  workingTotal: {
    days: number;
    sundays: number;
    holidays: number;
    examResultDays: string;
    teachingDays: number;
  };
  attendanceRules: string[];
  makeUpExamRules: string[];
  administrativeNotice: string;
  contactInfo: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

export const UCP_ACADEMIC_CALENDAR: AcademicCalendarInfo = {
  institution: 'Center for Professional Studies',
  title: 'Academic Calendar',
  term: 'Fall-2026',
  academicYear: 'Oct-2026 – Mar-2027',
  campusAffiliation: 'University of Central Punjab (UCP) — Bahawalpur Campus Network',
  gazettedNote: '*(Gazetted Holidays shall be observed as per the Government Announcements)',
  events: [
    {
      id: 'reg-fall-26',
      activity: 'Registration/Payment of Dues of Fall -26',
      date: '22nd Oct – 14th Nov',
      day: 'Thurs - Sat',
      category: 'Registration & Enrollment',
      isDeadline: true,
      highlight: true,
    },
    {
      id: 'commence-fall-26',
      activity: 'Commencement of Classes Fall -26',
      date: '16th Nov',
      day: 'Mon',
      category: 'Instruction & Classes',
      highlight: true,
    },
    {
      id: 'quaid-day',
      activity: 'Quaid-e-Azam Day *',
      date: '25th December',
      day: 'Fri',
      category: 'Gazetted Holidays',
      isHoliday: true,
    },
    {
      id: 'mid-term-exam',
      activity: 'Mid Term Examination',
      date: '11th Jan - 16th Jan',
      day: 'Mon- Sat',
      category: 'Examinations',
      isExam: true,
      highlight: true,
    },
    {
      id: 'kashmir-day',
      activity: 'Kashmir Day *',
      date: '5th Feb',
      day: 'Fri',
      category: 'Gazetted Holidays',
      isHoliday: true,
    },
    {
      id: 'withdraw-deadline',
      activity: 'Last Date for withdrawal of Courses',
      date: '20th Feb',
      day: 'Sat',
      category: 'Registration & Enrollment',
      isDeadline: true,
    },
    {
      id: 'last-day-classes',
      activity: 'Last day of Classes',
      date: '9th Mar',
      day: 'Tues',
      category: 'Instruction & Classes',
    },
    {
      id: 'eid-holidays',
      activity: 'Eid Holidays *',
      date: '10th Mar – 12th Mar',
      day: 'Wed-Fri',
      category: 'Gazetted Holidays',
      isHoliday: true,
    },
    {
      id: 'final-term-exam',
      activity: 'Final Term Examination',
      date: '15th Mar – 26th Mar',
      day: 'Mon – Fri',
      category: 'Examinations',
      isExam: true,
      highlight: true,
    },
    {
      id: 'pakistan-resolution-day',
      activity: 'Pakistan Resolution Day *',
      date: '23rd Mar',
      day: 'Tues',
      category: 'Gazetted Holidays',
      isHoliday: true,
    },
    {
      id: 'submission-result',
      activity: 'Submission of Result',
      date: '29th Mar',
      day: 'Mon',
      category: 'Grading & Results',
    },
    {
      id: 'grade-notification',
      activity: 'Grade Notification',
      date: '31st Mar',
      day: 'Wed',
      category: 'Grading & Results',
      highlight: true,
    },
    {
      id: 'reg-spring-27',
      activity: 'Registration and Payment of Dues for Spring-27',
      date: '1st April – 10th April',
      day: 'Thur-Sat',
      category: 'Registration & Enrollment',
      isDeadline: true,
    },
    {
      id: 'commence-spring-27',
      activity: 'Commencement of Classes Spring-27',
      date: '12th April',
      day: 'Mon',
      category: 'Instruction & Classes',
      highlight: true,
    },
  ],
  workingBreakdown: [
    {
      month: 'Nov - 2026',
      days: 15,
      sundays: 2,
      holidays: 0,
      examResultDays: '--',
      teachingDays: 13,
    },
    {
      month: 'Dec - 2026',
      days: 31,
      sundays: 4,
      holidays: 1,
      examResultDays: '--',
      teachingDays: 26,
    },
    {
      month: 'Jan - 2027',
      days: 31,
      sundays: 5,
      holidays: 0,
      examResultDays: '6-days',
      teachingDays: 20,
    },
    {
      month: 'Feb - 2027',
      days: 28,
      sundays: 4,
      holidays: 1,
      examResultDays: '--',
      teachingDays: 23,
    },
    {
      month: 'Mar-2027',
      days: 9,
      sundays: 1,
      holidays: 0,
      examResultDays: '10 days',
      teachingDays: 8,
    },
  ],
  workingTotal: {
    days: 114,
    sundays: 16,
    holidays: 2,
    examResultDays: '16',
    teachingDays: 90,
  },
  attendanceRules: [
    'Maintenance of a minimum 80% attendance is required',
    'Students are responsible for keeping track of their attendance.',
  ],
  makeUpExamRules: [
    'Make-up exams are not allowed.',
    'After 14th November 2026, no registration will be allowed.',
    'Students without registration are not allowed to attend classes.',
  ],
  administrativeNotice:
    'NOTE: - It is requested not to arrange student trips, extracurricular activities at the cost of classes during semester. If campuses arrange such activities, then the campus Principal will be responsible for completing the number of sessions through make-up classes. There will be no change in the calendar for any campus.',
  contactInfo: {
    address: '1-Khyaban-E-Jinnah, Johar Town, Lahore, Pakistan.',
    phone: '+92-42-35880007',
    email: 'info@cps.ucp.edu.pk',
    website: 'www.cps.ucp.edu.pk',
  },
};
