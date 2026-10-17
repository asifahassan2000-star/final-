export interface CourseItem {
  code: string;
  name: string;
  creditHours: number;
  type?: 'Core' | 'General' | 'Major' | 'Elective' | 'Lab' | 'Project';
}

export interface SemesterData {
  semester: number;
  title: string;
  courses: CourseItem[];
  totalCredits: number;
}

export interface ProgramCurriculum {
  programId: string;
  programName: string;
  totalSemesters: number;
  totalCreditHours: number;
  degreeType: string;
  semesters: SemesterData[];
}

export const PROGRAMMES_CURRICULUM: Record<string, ProgramCurriculum> = {
  'bba': {
    "programId": "bba",
    "programName": "BBA",
    "totalSemesters": 9,
    "totalCreditHours": 132,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MGT110",
                    "name": "Business & Ethics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT120",
                    "name": "Quantitate Reasoning - I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Sociology",
                    "creditHours": 2,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "MGT210",
                    "name": "Quantitate Reasoning-II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT220",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MGT240",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT250",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT260",
                    "name": "Applications of Information and Communication Tech",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "MGT310",
                    "name": "Business Communication",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT320",
                    "name": "Business Finance",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT330",
                    "name": "Information Systems & Modern World",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MGT350",
                    "name": "Modern Muslim World",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MGT360",
                    "name": "Environmental Sciences",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 14,
            "courses": [
                {
                    "code": "MGT410",
                    "name": "Microeconomics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT420",
                    "name": "Marketing Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT430",
                    "name": "HRM",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT440",
                    "name": "Financial Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT450",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "MGT510",
                    "name": "Cost & Managerial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT520",
                    "name": "Fundamentals of Operations Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT530",
                    "name": "Macroeconomics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT540",
                    "name": "Business Law, Politics & Society",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT550",
                    "name": "SME Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Pakistan Today",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "MGT610",
                    "name": "Organizational Behaviour",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT620",
                    "name": "Supply Chain Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT630",
                    "name": "Digital Economy",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT640",
                    "name": "International Business",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT650",
                    "name": "Minor 1",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "MGT660",
                    "name": "Major 1",
                    "creditHours": 3,
                    "type": "Major"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester-Summer after Semester 6",
            "totalCredits": 3,
            "courses": [
                {
                    "code": "MGT710",
                    "name": "Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MGT810",
                    "name": "Quantitative Analysis/Fundamentals of Business Analytics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT820",
                    "name": "Strategic Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT830",
                    "name": "Minor 2",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "MGT840",
                    "name": "Minor 3",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "MGT850",
                    "name": "Major 2",
                    "creditHours": 3,
                    "type": "Major"
                }
            ]
        },
        {
            "semester": 9,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MGT910",
                    "name": "Research Methods in Social Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MGT920",
                    "name": "Minor 4",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "MGT930",
                    "name": "Major 3",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "MGT940",
                    "name": "Major 4",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "MGT950",
                    "name": "Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-computer-science': {
    "programId": "bs-computer-science",
    "programName": "BS Computer Science",
    "totalSemesters": 8,
    "totalCreditHours": 132,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester I",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "CS110",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS120L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS140",
                    "name": "Basic Electronics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS150L",
                    "name": "Basic Electronics - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Pre-Calculus (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester II",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS230",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS240L",
                    "name": "Digital Logic Design - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytic Geometry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS280",
                    "name": "Elementary Algebra (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester III",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS330",
                    "name": "Computer Organization & Assembly Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS340L",
                    "name": "Computer Organization & Assembly Language - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS350",
                    "name": "Probability & Statistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS360",
                    "name": "Arts & Humanities (Professional Practices)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Multivariable Calculus",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS380",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS450",
                    "name": "Social Sciences (GE-XI)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester V",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "AI201",
                    "name": "Artificial Intelligence",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI201L",
                    "name": "Artificial Intelligence - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS530",
                    "name": "Information Security",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS540L",
                    "name": "Information Security - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS204",
                    "name": "Operating Systems",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS204L",
                    "name": "Operating Systems - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS570",
                    "name": "Technical & Business Writing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS580",
                    "name": "Domain Elective 1",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CS590",
                    "name": "Domain Elective 2",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "CS610",
                    "name": "Domain Core 1 (Theory of Automata)",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "CS206",
                    "name": "Computer Networks",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS206L",
                    "name": "Computer Networks - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS640",
                    "name": "Analysis of Algorithms",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS650",
                    "name": "Domain Elective 3",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CS660",
                    "name": "Domain Core 2 (Advance DBMS)",
                    "creditHours": 2,
                    "type": "Major"
                },
                {
                    "code": "CS670L",
                    "name": "Domain Core 2 (Advance DBMS) - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS680",
                    "name": "Domain Elective 4",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester VII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "CS710",
                    "name": "Domain Core 3 (Compiler Construction)",
                    "creditHours": 2,
                    "type": "Major"
                },
                {
                    "code": "CS720L",
                    "name": "Domain Core 3 (Compiler Construction) - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS730",
                    "name": "Final Year Project - I",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "CS740",
                    "name": "Domain Core 4 (Computer Architecture)",
                    "creditHours": 2,
                    "type": "Major"
                },
                {
                    "code": "CS750L",
                    "name": "Domain Core 4 (Computer Architecture) - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS760",
                    "name": "Domain Core 5 (HCI & Computer Graphics)",
                    "creditHours": 2,
                    "type": "Major"
                },
                {
                    "code": "CS770L",
                    "name": "Domain Core 5 (HCI & Computer Graphics) - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS780",
                    "name": "Domain Elective 5",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "CS810",
                    "name": "Domain Core 6 (Parallel & Distributed Computing)",
                    "creditHours": 2,
                    "type": "Major"
                },
                {
                    "code": "CS820L",
                    "name": "Domain Core 6 (Parallel & Distributed Computing) - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS830",
                    "name": "Final Year Project - II",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "CS840",
                    "name": "Domain Elective 6",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CS850",
                    "name": "Domain Elective 7",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CS860",
                    "name": "Elective Supporting Course",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        }
    ]
},

  'bs-accounting-finance': {
    "programId": "bs-accounting-finance",
    "programName": "BS Accounting & Finance",
    "totalSemesters": 8,
    "totalCreditHours": 126,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF110",
                    "name": "Quantitative Reasoning – I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Sociology",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "AF160",
                    "name": "Fundamentals of Accounting and Finance",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "AF210",
                    "name": "Quantitative Reasoning – II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "AF230",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF240",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF250",
                    "name": "Business Law",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF260",
                    "name": "Application of Information & Communication Technologies (ICT)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "AF310",
                    "name": "Fundamentals of Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF320",
                    "name": "Cost & Managerial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF330",
                    "name": "Financial Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "AF350",
                    "name": "Foreign Language (Chinese)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AF360",
                    "name": "Environmental Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF370",
                    "name": "Quranic Translation (only for Muslim students)",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "AF410",
                    "name": "Financial Reporting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF420",
                    "name": "Investment Appraisal",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF430",
                    "name": "Performance Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF440",
                    "name": "Human Resource Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF450",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AF460",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF510",
                    "name": "Corporate Law",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF520",
                    "name": "Corporate Reporting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF530",
                    "name": "Governance Risk and Ethics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF540",
                    "name": "Business Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF550",
                    "name": "Strategic Planning",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF610",
                    "name": "Banking Laws and Practices",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF620",
                    "name": "Financial Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF630",
                    "name": "Advanced Corporate Reporting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF640",
                    "name": "Computerized Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF650",
                    "name": "Audit & Assurance",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF710",
                    "name": "Taxation Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF720",
                    "name": "Research Methods in Business",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF730",
                    "name": "Investment and Portfolio Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF740",
                    "name": "Performance Strategy",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF750",
                    "name": "Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF810",
                    "name": "Enterprise Resource Planning",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF820",
                    "name": "Taxation Laws & Practices",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF830",
                    "name": "Advanced Audit & Assurance",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF840",
                    "name": "Organizational Behaviour",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF850",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-business-analytics': {
    "programId": "bs-business-analytics",
    "programName": "BS Business Analytics",
    "totalSemesters": 9,
    "totalCreditHours": 133,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BA110",
                    "name": "Business & Ethics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BA130",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Sociology",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BA210",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BA230",
                    "name": "Applications of Information & Communication Technologies",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BA240",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA250",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA260",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BA310",
                    "name": "Principle of Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA320",
                    "name": "Fundamentals of Business Analytics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA330",
                    "name": "Information System and Modern World",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BA350",
                    "name": "Arts and Humanities",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BA360",
                    "name": "Natural Sciences",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BA410",
                    "name": "Quantitative Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA420",
                    "name": "Fundamentals of Operations Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA430",
                    "name": "HRM",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BA510",
                    "name": "Social Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202",
                    "name": "Business Database Strategy",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA530",
                    "name": "Financial Modeling",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA540",
                    "name": "Research Methods in Social Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA550",
                    "name": "Socio/Psycho Metrics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BA610",
                    "name": "Marketing Analytics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA620",
                    "name": "Machine Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA630",
                    "name": "Project Management",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "BA640",
                    "name": "Enterprise Resource Planning",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA650",
                    "name": "Elective-1",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BA660",
                    "name": "Elective-2",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester-Summer after Semester VI",
            "totalCredits": 3,
            "courses": [
                {
                    "code": "BA710",
                    "name": "Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VII",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BA810",
                    "name": "Business Performance Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA820",
                    "name": "Project -1",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "BA830",
                    "name": "Tools & Techniques for Data Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA840",
                    "name": "Exploratory Data Analysis & Visualization",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA850",
                    "name": "Elective-3",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BA860",
                    "name": "Elective-4",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 9,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BA910",
                    "name": "Data Warehouse Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA920",
                    "name": "Supply Chain Analytics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA930",
                    "name": "Project -2",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "BA940",
                    "name": "Elective-5",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BA950",
                    "name": "Elective-6",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        }
    ]
},

  'bs-economics': {
    "programId": "bs-economics",
    "programName": "BS Economics",
    "totalSemesters": 8,
    "totalCreditHours": 129,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "English I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ECO120",
                    "name": "Microeconomics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO130",
                    "name": "Mathematics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO140",
                    "name": "Introduction to Computer",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO150",
                    "name": "Introduction to Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO160",
                    "name": "Fundamentals of Entrepreneurship",
                    "creditHours": 1,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "English II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ECO220",
                    "name": "Mathematical Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO230",
                    "name": "Macroeconomics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO240",
                    "name": "Statistics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO250",
                    "name": "Introduction to Pol Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Pakistan Studies",
                    "creditHours": 2,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "English III",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ECO320",
                    "name": "Statistics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO330",
                    "name": "Microeconomics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ECO350",
                    "name": "Business Administration",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO360",
                    "name": "Introduction to Management",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ECO410",
                    "name": "Macroeconomics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO420",
                    "name": "Introduction to Philosophy",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO430",
                    "name": "World Economic History",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO440",
                    "name": "Introduction to Mass Comm",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Economics",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Introduction to Sociology",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ECO510",
                    "name": "Econometric I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO520",
                    "name": "International Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO530",
                    "name": "Development Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO540",
                    "name": "Issues in Pak Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO550",
                    "name": "WTO, Globalization & Econ. Integ.",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ECO610",
                    "name": "Econometrics II",
                    "creditHours": 4,
                    "type": "Core"
                },
                {
                    "code": "ECO620",
                    "name": "Monetary Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO630",
                    "name": "Introduction to Game Theory",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO640",
                    "name": "Elective I",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO650",
                    "name": "Elective II",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ECO710",
                    "name": "Public Sector Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO720",
                    "name": "Research Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ECO730",
                    "name": "Elective III",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO740",
                    "name": "Elective IV",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO750",
                    "name": "Elective V",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ECO810",
                    "name": "Elective VI",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO820",
                    "name": "Elective VII",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO830",
                    "name": "Elective VIII",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO840",
                    "name": "Elective IX",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "ECO850",
                    "name": "Elective X",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        }
    ]
},

  'bs-english': {
    "programId": "bs-english",
    "programName": "BS English",
    "totalSemesters": 8,
    "totalCreditHours": 132,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG110",
                    "name": "Environmental Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG120",
                    "name": "Introduction to Economics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG150",
                    "name": "Introduction to Literary Studies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG160",
                    "name": "Introduction to Language Studies",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG210",
                    "name": "Quantitative Reasoning 1",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG240",
                    "name": "Applications of Information and Communication",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG250",
                    "name": "Introduction to Phonetics & Phonology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG260",
                    "name": "Literary Forms and Movements",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG310",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG320",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ENG330",
                    "name": "Fundamentals of Philosophy",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "English-III",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG350",
                    "name": "Short Story",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG360",
                    "name": "Introduction to Morphology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG370",
                    "name": "Quranic Translation (only for Muslim students)",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG420",
                    "name": "Rise of the Novel (18th to 19th Century)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG430",
                    "name": "Forensic Linguistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG440",
                    "name": "Classical and Renaissance Drama",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG450",
                    "name": "Classical Poetry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG460",
                    "name": "Semantics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG510",
                    "name": "Romantic and Victorian Poetry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG520",
                    "name": "Foreign language Chinese",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG530",
                    "name": "Psycholinguistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG540",
                    "name": "Foundations of Literary Theory & Criticism",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG550",
                    "name": "Bilingualism",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG560",
                    "name": "Sociolinguistics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "World Englishes",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG620",
                    "name": "Screen Literature",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG630",
                    "name": "Modern Novel",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG640",
                    "name": "Translation Studies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG650",
                    "name": "Grammar & Syntax",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG660",
                    "name": "Discourse Studies",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ENG710",
                    "name": "Field Experience/ Internship",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "ENG720",
                    "name": "Introduction to Applied Linguistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG730",
                    "name": "Stylistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG740",
                    "name": "Literary Theory and Practice",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG750",
                    "name": "Children Literature",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ENG810",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "ENG820",
                    "name": "Postcolonial Literature",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG830",
                    "name": "Pedagogical Grammar",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG840",
                    "name": "Women’s Writing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG850",
                    "name": "Language Assessment",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'bs-psychology': {
    "programId": "bs-psychology",
    "programName": "BS Psychology",
    "totalSemesters": 8,
    "totalCreditHours": 132,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY120",
                    "name": "Introduction to Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY130L",
                    "name": "Introduction to Psychology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PSY140",
                    "name": "History and Schools of Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY150",
                    "name": "Introduction to Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ANT101",
                    "name": "Introduction to Anthropology",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/ Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PSY240",
                    "name": "Fundamental of Philosophy (Arts and Humanities)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY250",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY260",
                    "name": "Developmental Psychology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "PSY310",
                    "name": "Civic & Community Engagement",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY320",
                    "name": "Experimental Psychology",
                    "creditHours": 4,
                    "type": "Core"
                },
                {
                    "code": "PSY330",
                    "name": "Applications of ICT",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY340",
                    "name": "Intro to Political Science (Social Science)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY350",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY360",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY370",
                    "name": "Quranic Translation (Muslim students only)",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "PSY410",
                    "name": "Human Resource Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY420",
                    "name": "Social Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY430",
                    "name": "Theories of Personality I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY440",
                    "name": "Positive Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SOC101",
                    "name": "Introduction to Sociology",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "PSY510",
                    "name": "Theories of Personality II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY520",
                    "name": "Mental Health and Psychopathology I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY530",
                    "name": "Quantitative Research Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY540",
                    "name": "Neurological Basis of Behaviour",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY550",
                    "name": "Ethics in Psychology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "PSY610",
                    "name": "Mental Health and Psychopathology II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY620",
                    "name": "Qualitative Research Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY630",
                    "name": "Cognitive Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY640",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "PSY650",
                    "name": "Statistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY660",
                    "name": "Elective I",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PSY670",
                    "name": "Community Service",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "PSY710",
                    "name": "Applied Statistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY720",
                    "name": "Psychological Assessment I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY730",
                    "name": "Technical Writing in Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY740",
                    "name": "Elective II",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PSY750",
                    "name": "Elective III",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PSY760",
                    "name": "Field Experience/Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "PSY810",
                    "name": "Psychological Assessment II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY820",
                    "name": "Cross Cultural Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY830",
                    "name": "Organizational Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY840",
                    "name": "Elective IV",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PSY850",
                    "name": "Elective V",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PSY860",
                    "name": "Elective VI",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        }
    ]
},

  'bs-mathematics': {
    "programId": "bs-mathematics",
    "programName": "BS Mathematics",
    "totalSemesters": 8,
    "totalCreditHours": 126,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "MATH101",
                    "name": "Calculus I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH120",
                    "name": "Introduction to Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MATH140",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH150",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MATH160",
                    "name": "Introduction to Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester II",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "MATH101",
                    "name": "Calculus II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH220",
                    "name": "Analytic Geometry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH230",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH260",
                    "name": "Foreign Chinese Language",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "MATH101",
                    "name": "Calculus III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH320",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH340",
                    "name": "Computer Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH350",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MATH360",
                    "name": "Civic and Community Engagement",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Mathematics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH380",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH420",
                    "name": "Ordinary Differential Equations",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH430",
                    "name": "Vector and Tensor Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH440",
                    "name": "Data Analysis Techniques",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI301",
                    "name": "Introduction to Machine Learning",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MATH510",
                    "name": "Topology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH520",
                    "name": "Partial Differential Equations",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH530",
                    "name": "Group Theory",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH540",
                    "name": "Real Analysis I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH550",
                    "name": "Differential Geometry",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester VI",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "MATH610",
                    "name": "Complex Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH620",
                    "name": "Real Analysis II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH630",
                    "name": "Integral Equations",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH640",
                    "name": "Classical Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH650",
                    "name": "Probability Theory",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester VII",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "MATH710",
                    "name": "Number Theory",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH720",
                    "name": "Functional Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH730",
                    "name": "Mathematical Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH740",
                    "name": "Graph Theory",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH750",
                    "name": "Major 1",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "MATH760",
                    "name": "Field Experience/ Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester VIII",
            "totalCredits": 12,
            "courses": [
                {
                    "code": "MATH810",
                    "name": "Numerical Analysis",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH820",
                    "name": "Major 2",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "MATH830",
                    "name": "Major 3",
                    "creditHours": 3,
                    "type": "Major"
                },
                {
                    "code": "MATH840",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-physics': {
    "programId": "bs-physics",
    "programName": "BS Physics",
    "totalSemesters": 8,
    "totalCreditHours": 127,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PHY120",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PHY130",
                    "name": "Introduction to Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY150",
                    "name": "Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY160L",
                    "name": "Mechanics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PHY220",
                    "name": "Foreign Chinese Language",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PHY230",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/ Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PHY250",
                    "name": "Introduction to Psychology/ International Relations",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PHY260",
                    "name": "Electricity and Magnetism",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY270L",
                    "name": "Electricity and Magnetism Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PHY280",
                    "name": "Differential Equations",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PHY320",
                    "name": "Applications of Information and Communication Technologies (ICT)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY330",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PHY350",
                    "name": "Waves and Oscillation",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY360",
                    "name": "Heat & Thermodynamics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY370L",
                    "name": "Heat, Waves & Sound Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PHY380",
                    "name": "Quranic translation",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "PHY410",
                    "name": "Electrodynamics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY420",
                    "name": "Modern Physics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY430",
                    "name": "Statistical Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY440",
                    "name": "Classical Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY450",
                    "name": "Optics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY460L",
                    "name": "Optics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "PHY510",
                    "name": "Mathematical Methods of Physics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY520",
                    "name": "Quantum Mechanics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY530",
                    "name": "Introduction to Forensic Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY540",
                    "name": "Electronics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY550L",
                    "name": "Electronics I Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PHY560",
                    "name": "Electrodynamics II",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "PHY610",
                    "name": "Quantum Mechanics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY620",
                    "name": "Atomic and Molecular Physics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY630",
                    "name": "Solid State Physics I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY640",
                    "name": "Electronics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY650",
                    "name": "Mathematical Methods of Physics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY660L",
                    "name": "Modern Physics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "PHY710",
                    "name": "Nuclear Physics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY720",
                    "name": "Solid State Physics II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY730L",
                    "name": "Advanced Physics Experiments Simulation Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PHY740",
                    "name": "Field Experience/ Internship",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "PHY750",
                    "name": "Elective I",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PHY760",
                    "name": "Elective II",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 12,
            "courses": [
                {
                    "code": "AI301",
                    "name": "Introduction to Machine Learning",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PHY820",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                },
                {
                    "code": "PHY830",
                    "name": "Elective III",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "PHY840",
                    "name": "Elective IV",
                    "creditHours": 3,
                    "type": "Elective"
                }
            ]
        }
    ]
},

  'bs-chemistry': {
    "programId": "bs-chemistry",
    "programName": "BS Chemistry",
    "totalSemesters": 8,
    "totalCreditHours": 128,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester I",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CHEM120",
                    "name": "Biophysics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM130",
                    "name": "Quantitative Reasoning 1",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CHEM140",
                    "name": "Inorganic Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM150L",
                    "name": "Inorganic Chemistry – Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM160",
                    "name": "Diversity of Plants",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM170",
                    "name": "Applications of ICT",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester II",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CHEM220",
                    "name": "Diversity of Animals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM230",
                    "name": "Foreign Chinese Language",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM240",
                    "name": "Quantitative Reasoning 2",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CHEM260",
                    "name": "Physical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM270L",
                    "name": "Physical Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "CHEM310",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM320",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                },
                {
                    "code": "CHEM330",
                    "name": "Introduction to Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM340",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CHEM370",
                    "name": "Organic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM380L",
                    "name": "Organic Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM390",
                    "name": "Essentials of Biochemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM400L",
                    "name": "Essentials of Biochemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "CHEM410",
                    "name": "Introduction to Nanoscience",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM420",
                    "name": "Analytical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM430L",
                    "name": "Analytical Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM440",
                    "name": "Basic Pharmaceutical and Forensic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CHEM450L",
                    "name": "Basic Pharmaceutical and Forensic Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM460",
                    "name": "Instrumental Analysis and Analytical Techniques",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM470",
                    "name": "Applied Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester V",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "CHEM510",
                    "name": "Inorganic Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM520L",
                    "name": "Inorganic Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM530",
                    "name": "Organic Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM540L",
                    "name": "Organic Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM550",
                    "name": "Physical Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM560L",
                    "name": "Physical Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM570",
                    "name": "Analytical Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM580L",
                    "name": "Analytical Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester VI",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "CHEM610",
                    "name": "Inorganic Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM620L",
                    "name": "Inorganic Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM630",
                    "name": "Organic Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM640L",
                    "name": "Organic Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM650",
                    "name": "Physical Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM660L",
                    "name": "Physical Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM670",
                    "name": "Analytical Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM680L",
                    "name": "Analytical Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester VII",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "CHEM710",
                    "name": "Specialization I (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM720",
                    "name": "Specialization II (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM730",
                    "name": "Specialization III (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM740L",
                    "name": "Specialization Lab I",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM750",
                    "name": "Environmental Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CHEM760",
                    "name": "Field Experience/Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester VIII",
            "totalCredits": 13,
            "courses": [
                {
                    "code": "CHEM810",
                    "name": "Specialization IV (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM820",
                    "name": "Specialization V (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM830",
                    "name": "Specialization VI (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "CHEM840L",
                    "name": "Specialization Lab II",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CHEM850",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-biochemistry': {
    "programId": "bs-biochemistry",
    "programName": "BS Biochemistry",
    "totalSemesters": 8,
    "totalCreditHours": 128,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH120",
                    "name": "Biophysics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH130",
                    "name": "Quantitative Reasoning 1",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH140",
                    "name": "Inorganic Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH150L",
                    "name": "Inorganic Chemistry – Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH160",
                    "name": "Diversity of Plants",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH170",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH220",
                    "name": "Diversity of Animals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH230",
                    "name": "Foreign Chinese Language",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH240",
                    "name": "Quantitative Reasoning 2",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BCH260",
                    "name": "Physical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH270L",
                    "name": "Physical Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BCH310",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH320",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                },
                {
                    "code": "BCH330",
                    "name": "Introduction to Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH340",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BCH370",
                    "name": "Organic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH380L",
                    "name": "Organic Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH390",
                    "name": "Essentials of Biochemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH400L",
                    "name": "Essentials of Biochemistry- Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BCH410",
                    "name": "Introduction to Nanoscience",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH420",
                    "name": "Analytical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH430L",
                    "name": "Analytical Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH440",
                    "name": "Basic Pharmaceutical and Forensic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH450L",
                    "name": "Basic Pharmaceutical and Forensic Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH460",
                    "name": "Instrumental Analysis and Analytical Techniques",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH470",
                    "name": "Applied Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BCH510",
                    "name": "Inorganic Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH520L",
                    "name": "Inorganic Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH530",
                    "name": "Organic Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH540L",
                    "name": "Organic Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH550",
                    "name": "Physical Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH560L",
                    "name": "Physical Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH570",
                    "name": "Analytical Chemistry II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH580L",
                    "name": "Analytical Chemistry II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BCH610",
                    "name": "Inorganic Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH620L",
                    "name": "Inorganic Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH630",
                    "name": "Organic Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH640L",
                    "name": "Organic Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH650",
                    "name": "Physical Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH660L",
                    "name": "Physical Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH670",
                    "name": "Analytical Chemistry III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH680L",
                    "name": "Analytical Chemistry III Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BCH710",
                    "name": "Specialization I (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH720",
                    "name": "Specialization II (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH730",
                    "name": "Specialization III (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH740L",
                    "name": "Specialization Lab I",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH750",
                    "name": "Environmental Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH760",
                    "name": "Field Experience/Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 13,
            "courses": [
                {
                    "code": "BCH810",
                    "name": "Specialization IV (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH820",
                    "name": "Specialization V (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH830",
                    "name": "Specialization VI (Organic/Inorganic/Analytical/Physical/Biochemistry)",
                    "creditHours": 3,
                    "type": "Elective"
                },
                {
                    "code": "BCH840L",
                    "name": "Specialization Lab II",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH850",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-biotechnology': {
    "programId": "bs-biotechnology",
    "programName": "BS Biotechnology",
    "totalSemesters": 8,
    "totalCreditHours": 128,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BTEC110",
                    "name": "Introduction to Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC120",
                    "name": "Principles of Biochemical Engineering",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC130L",
                    "name": "Principles of Biochemical Engineering-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC140",
                    "name": "Environmental Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC150",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC170",
                    "name": "Quantitative Reasoning-1",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "BTEC210",
                    "name": "Agriculture Biotechnology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC220L",
                    "name": "Agriculture Biotechnology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC230",
                    "name": "Ecology, Biodiversity & Evolution-I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC250",
                    "name": "Foreign Chinese Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC270",
                    "name": "Quantitative Reasoning-2",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC280",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BTEC310",
                    "name": "Ecology, Biodiversity & Evolution II",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC320L",
                    "name": "Ecology, Biodiversity & Evolution II-LAB",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC340",
                    "name": "Classical Genetics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC350",
                    "name": "Environmental Biotechnology and Climate Change",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC370",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BTEC410",
                    "name": "Molecular Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC420",
                    "name": "Microbiology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC430",
                    "name": "Cell Biology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC440L",
                    "name": "Cell Biology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC450",
                    "name": "Analytical Chemistry and Instrumentation",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC460L",
                    "name": "Analytical Chemistry and Instrumentation Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC470",
                    "name": "General Immunology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC480",
                    "name": "Industrial Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BTEC510",
                    "name": "Organic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC520L",
                    "name": "Organic Chemistry-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC530",
                    "name": "Recombinant DNA Technology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC540",
                    "name": "Methods in Molecular Biology",
                    "creditHours": 1,
                    "type": "Core"
                },
                {
                    "code": "BTEC550L",
                    "name": "Methods in Molecular Biology Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "BTEC560",
                    "name": "Genetic Resources and Conservation",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC570",
                    "name": "Microbial Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BTEC610",
                    "name": "Nanobiotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC620",
                    "name": "Health Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC630",
                    "name": "Introduction to Forensic Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC640",
                    "name": "Food Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC650",
                    "name": "Essentials of Biochemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC660L",
                    "name": "Essentials of Biochemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC670",
                    "name": "Pharmaceutical Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BTEC710",
                    "name": "Genomics & Proteomics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC720",
                    "name": "Entrepreneurship in Biotechnology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC730",
                    "name": "Bioinformatics",
                    "creditHours": 1,
                    "type": "Core"
                },
                {
                    "code": "BTEC740L",
                    "name": "Bioinformatics Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "BTEC750",
                    "name": "Introduction to Nano Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC760",
                    "name": "Cell and Tissue Culture",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC770",
                    "name": "Field Experience/Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 8,
            "courses": [
                {
                    "code": "BTEC810",
                    "name": "Research Methodology & Skill Enhancement",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC820",
                    "name": "Sustainable Biosafety & Bioethics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC830",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'bs-zoology': {
    "programId": "bs-zoology",
    "programName": "BS Zoology",
    "totalSemesters": 8,
    "totalCreditHours": 126,
    "degreeType": "Bachelors (4 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ZOO120",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO130",
                    "name": "Quantitative Reasoning-1",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ZOO140",
                    "name": "Diversity of Plants",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO150",
                    "name": "Animal Diversity-I (Invertebrates)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO160L",
                    "name": "Animal Diversity-I (Invertebrates) Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO170",
                    "name": "Fundamentals of Microbiology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO180L",
                    "name": "Fundamentals of Microbiology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ZOO220",
                    "name": "Quantitative Reasoning-2",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ZOO240",
                    "name": "Foreign Chinese Language",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO250",
                    "name": "Introduction to Forensic Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO260",
                    "name": "Animal Diversity-II (Chordates)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO270L",
                    "name": "Animal Diversity-II (Chordates) Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ZOO320",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ZOO340",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                },
                {
                    "code": "ZOO350",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO360",
                    "name": "Introduction to Nanoscience",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO370",
                    "name": "Animal Form & Function-I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO380L",
                    "name": "Animal Form & Function-I Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ZOO410",
                    "name": "Fundamentals of Human Nutrition",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO420",
                    "name": "Animal Form & Function-II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO430L",
                    "name": "Animal Form & Function-II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO440",
                    "name": "Cell Biology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO450L",
                    "name": "Cell Biology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO460",
                    "name": "Animal Behaviour",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO470",
                    "name": "Economic Zoology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO480L",
                    "name": "Economic Zoology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 5,
            "title": "Semester - V",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ZOO510",
                    "name": "Biosafety and Bioethics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO520",
                    "name": "Evolution and Principles of Systematics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO530L",
                    "name": "Evolution and Principles of Systematics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO540",
                    "name": "Biochemistry-I",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO550L",
                    "name": "Biochemistry-I Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO560",
                    "name": "Biological Techniques",
                    "creditHours": 1,
                    "type": "Core"
                },
                {
                    "code": "ZOO570L",
                    "name": "Biological Techniques Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "ZOO580",
                    "name": "Environmental Issues and Sustainability",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 6,
            "title": "Semester - VI",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ZOO610",
                    "name": "Biochemistry-II",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO620L",
                    "name": "Biochemistry-II Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO630",
                    "name": "Genetics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO640L",
                    "name": "Genetics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO650",
                    "name": "Research Design and Methodology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO660",
                    "name": "Molecular Biology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO670L",
                    "name": "Molecular Biology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO680",
                    "name": "Field Experience/Internship",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        },
        {
            "semester": 7,
            "title": "Semester - VII",
            "totalCredits": 14,
            "courses": [
                {
                    "code": "ZOO710",
                    "name": "Bioinformatics",
                    "creditHours": 1,
                    "type": "Core"
                },
                {
                    "code": "ZOO720L",
                    "name": "Bioinformatics Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "ZOO730",
                    "name": "Physiology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO740L",
                    "name": "Physiology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO750",
                    "name": "Aquaculture",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO760L",
                    "name": "Aquaculture Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO770",
                    "name": "Zoogeography & Palaeontology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO780L",
                    "name": "Zoogeography & Palaeontology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 8,
            "title": "Semester - VIII",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ZOO810",
                    "name": "Developmental Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO820L",
                    "name": "Developmental Biology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO830",
                    "name": "Wildlife",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO840",
                    "name": "Medical Entomology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ZOO850",
                    "name": "Taxidermy",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ZOO860L",
                    "name": "Taxidermy Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ZOO870",
                    "name": "Capstone Project",
                    "creditHours": 3,
                    "type": "Project"
                }
            ]
        }
    ]
},

  'adp-business-administration': {
    "programId": "adp-business-administration",
    "programName": "ADP Business Administration",
    "totalSemesters": 4,
    "totalCreditHours": 66,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BA110",
                    "name": "Business & Ethics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA120",
                    "name": "Quantitative Reasoning - I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Sociology",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BA170",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BA210",
                    "name": "Quantitative Reasoning - II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BA220",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BA240",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA250",
                    "name": "Applications of Information and Communication Tech",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BA310",
                    "name": "Business Communication",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA320",
                    "name": "Business Finance",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA330",
                    "name": "Information Systems & Modern World",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BA350",
                    "name": "Modern Muslim World",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BA360",
                    "name": "Microeconomics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BA410",
                    "name": "Environmental Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA420",
                    "name": "Marketing Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA430",
                    "name": "HRM",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA440",
                    "name": "Financial Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BA450",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BA460",
                    "name": "Macroeconomics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-accounting-finance': {
    "programId": "adp-accounting-finance",
    "programName": "ADP Accounting & Finance",
    "totalSemesters": 4,
    "totalCreditHours": 66,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "AF110",
                    "name": "Quantitative Reasoning – I (GEDxx1)",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan (GEDxx2)",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement (GEDxx6)",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Social Science* Sociology",
                    "creditHours": 4,
                    "type": "General"
                },
                {
                    "code": "AF160",
                    "name": "Fundamentals of Accounting and Finance",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "AF210",
                    "name": "Quantitative Reasoning – II (GEDxx4)",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing (GEDxx5)",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "AF230",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF240",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF250",
                    "name": "Business Law",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF260",
                    "name": "Application of Information & Communication Technologies (ICT) (GEDxx3)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "AF310",
                    "name": "Fundamentals of Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF320",
                    "name": "Cost & Managerial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF330",
                    "name": "Financial Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies (GEDxx7)",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "AF350",
                    "name": "Arts & Humanities **",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AF360",
                    "name": "Natural Sciences***",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "AF410",
                    "name": "Financial Reporting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF420",
                    "name": "Investment Appraisal",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF430",
                    "name": "Performance Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF440",
                    "name": "Human Resource Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AF450",
                    "name": "Entrepreneurship (GEDxx8)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AF460",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-computer-science': {
    "programId": "adp-computer-science",
    "programName": "ADP Computer Science",
    "totalSemesters": 4,
    "totalCreditHours": 75,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "CS110",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS120L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS140",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS150L",
                    "name": "Digital Logic Design - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS180",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Pre-Calculus (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS206",
                    "name": "Computer Networks",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS206L",
                    "name": "Computer Networks - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytic Geometry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS270",
                    "name": "Computer Organization & Assembly Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS280L",
                    "name": "Computer Organization & Assembly Language - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS290",
                    "name": "Elementary Algebra (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 20,
            "courses": [
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS330",
                    "name": "Information Security",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS340L",
                    "name": "Information Security - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI201",
                    "name": "Artificial Intelligence",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI201L",
                    "name": "Artificial Intelligence - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS390",
                    "name": "Elective-I",
                    "creditHours": 2,
                    "type": "Elective"
                },
                {
                    "code": "CS400L",
                    "name": "Elective-I - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 21,
            "courses": [
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS420",
                    "name": "Elective-II",
                    "creditHours": 2,
                    "type": "Elective"
                },
                {
                    "code": "CS430L",
                    "name": "Elective-II - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS440",
                    "name": "Elective-III",
                    "creditHours": 2,
                    "type": "Elective"
                },
                {
                    "code": "CS450L",
                    "name": "Elective-III - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS490",
                    "name": "Elective-IV",
                    "creditHours": 2,
                    "type": "Elective"
                },
                {
                    "code": "CS500L",
                    "name": "Elective-IV - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS510",
                    "name": "Elective-V",
                    "creditHours": 2,
                    "type": "Elective"
                },
                {
                    "code": "CS520L",
                    "name": "Elective-V - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        }
    ]
},

  'adp-artificial-intelligence': {
    "programId": "adp-artificial-intelligence",
    "programName": "ADP Artificial Intelligence",
    "totalSemesters": 4,
    "totalCreditHours": 75,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytical Geometry (QR1)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI140",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI150L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures (QR2)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI201",
                    "name": "Artificial Intelligence",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI201L",
                    "name": "Artificial Intelligence Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 20,
            "courses": [
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI350",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI360L",
                    "name": "Digital Logic Design Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS204",
                    "name": "Operating Systems",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS204L",
                    "name": "Operating Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI390",
                    "name": "Big Data Analytics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI400L",
                    "name": "Big Data Analytics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI410",
                    "name": "Evolutionary Computing",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 21,
            "courses": [
                {
                    "code": "AI410",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS206",
                    "name": "Computer Networks",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS206L",
                    "name": "Computer Networks Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI450",
                    "name": "Computer Organization & Assembly Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI460L",
                    "name": "Computer Organization & Assembly Language Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI301",
                    "name": "Machine Learning",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI301L",
                    "name": "Machine Learning Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI490",
                    "name": "Pattern Recognition",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "AI500",
                    "name": "Knowledge Based Systems",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-data-science': {
    "programId": "adp-data-science",
    "programName": "ADP Data Science",
    "totalSemesters": 4,
    "totalCreditHours": 78,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytical Geometry (QR1)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "DS140",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "DS150L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Pre-Calculus (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures (QR2)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "DS230",
                    "name": "Probability and Statistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS204",
                    "name": "Operating Systems",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS204L",
                    "name": "Operating Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI201",
                    "name": "Artificial Intelligence",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI201L",
                    "name": "Artificial Intelligence Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS300",
                    "name": "Elementary Algebra (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 20,
            "courses": [
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS206",
                    "name": "Computer Networks",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS206L",
                    "name": "Computer Networks Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS350",
                    "name": "Computer Organization and Assembly Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "DS360L",
                    "name": "Computer Organization and Assembly Language Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS370",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "DS380L",
                    "name": "Digital Logic Design Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS390",
                    "name": "Knowledge Based Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 21,
            "courses": [
                {
                    "code": "DS410",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "DS420",
                    "name": "Information Security",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "DS430L",
                    "name": "Information Security Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS460",
                    "name": "Programming for Big Data",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "DS470L",
                    "name": "Programming for Big Data Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS480",
                    "name": "Natural Language Processing",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "DS490L",
                    "name": "Natural Language Processing Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "DS500",
                    "name": "Topics in Data Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "DS510",
                    "name": "Theory of Automata",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-cyber-security': {
    "programId": "adp-cyber-security",
    "programName": "ADP Cyber Security",
    "totalSemesters": 4,
    "totalCreditHours": 75,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytical Geometry (QR1)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB140",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB150L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Pre-Calculus (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures (QR2)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB240",
                    "name": "Information Security",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CYB250L",
                    "name": "Information Security Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CYB280",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CYB290L",
                    "name": "Digital Logic Design - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CYB300",
                    "name": "Elementary Algebra (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS206",
                    "name": "Computer Networks",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS206L",
                    "name": "Computer Networks Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS204",
                    "name": "Operating Systems",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CS204L",
                    "name": "Operating Systems Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "AI301",
                    "name": "Machine Learning",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "AI301L",
                    "name": "Machine Learning Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CYB410",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "CYB410",
                    "name": "Information System Security",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB420",
                    "name": "Security Architecture and Design",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB430",
                    "name": "Cloud Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB440",
                    "name": "Wireless and Mobile Security",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB450",
                    "name": "Computer Organization & Assembly Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CYB460L",
                    "name": "Computer Organization & Assembly Language - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-software-engineering': {
    "programId": "adp-software-engineering",
    "programName": "ADP Software Engineering",
    "totalSemesters": 4,
    "totalCreditHours": 74,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "SE110",
                    "name": "Introduction to Computing",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SE120L",
                    "name": "Introduction to Computing - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CS205",
                    "name": "Software Engineering",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SE170",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MATH101",
                    "name": "Pre-Calculus (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 20,
            "courses": [
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102L",
                    "name": "Programming Fundamentals - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SE230",
                    "name": "Digital Logic Design",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SE240L",
                    "name": "Digital Logic Design - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus and Analytic Geometry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SE270",
                    "name": "Software Requirement Engineering",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SE280L",
                    "name": "Software Requirement Engineering – Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS202",
                    "name": "Database Systems",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS202L",
                    "name": "Database Systems - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SE310",
                    "name": "Elementary Algebra (For Pre-Medical)",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "CS103",
                    "name": "Object Oriented Programming",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS103L",
                    "name": "Object Oriented Programming - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SE330",
                    "name": "Software Design & Architecture",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SE340L",
                    "name": "Software Design & Architecture - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SE350",
                    "name": "Software Project Management",
                    "creditHours": 2,
                    "type": "Project"
                },
                {
                    "code": "SE360L",
                    "name": "Software Project Management - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SE370",
                    "name": "Elective-I",
                    "creditHours": 1,
                    "type": "Elective"
                },
                {
                    "code": "SE380L",
                    "name": "Elective-I - Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "SE390",
                    "name": "Elective-II",
                    "creditHours": 1,
                    "type": "Elective"
                },
                {
                    "code": "SE400L",
                    "name": "Elective-II - Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "SE410",
                    "name": "Elective-III",
                    "creditHours": 1,
                    "type": "Elective"
                },
                {
                    "code": "SE420L",
                    "name": "Elective-III - Lab",
                    "creditHours": 2,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "SE410",
                    "name": "Software Construction & Development",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SE420L",
                    "name": "Software Construction & Development - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201L",
                    "name": "Data Structures - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SE460",
                    "name": "Elective IV",
                    "creditHours": 1,
                    "type": "Elective"
                },
                {
                    "code": "SE470L",
                    "name": "Elective IV - Lab",
                    "creditHours": 2,
                    "type": "Lab"
                },
                {
                    "code": "SE480",
                    "name": "Elective V",
                    "creditHours": 1,
                    "type": "Elective"
                },
                {
                    "code": "SE490L",
                    "name": "Elective V - Lab",
                    "creditHours": 2,
                    "type": "Lab"
                }
            ]
        }
    ]
},

  'adp-business-analytics': {
    "programId": "adp-business-analytics",
    "programName": "ADP Business Analytics",
    "totalSemesters": 4,
    "totalCreditHours": 64,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BAN110",
                    "name": "Business & Ethics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BAN130",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "SOC101",
                    "name": "Sociology",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BAN210",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BAN230",
                    "name": "Applications of Information & Communication Technologies",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BAN240",
                    "name": "Fundamentals of Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN250",
                    "name": "Financial Accounting",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN260",
                    "name": "Fundamentals of Marketing",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "BAN310",
                    "name": "Principle of Economics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN320",
                    "name": "Fundamentals of Business Analytics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN330",
                    "name": "Information System and Modern World",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BAN350",
                    "name": "Arts and Humanities**",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BAN360",
                    "name": "Natural Sciences",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BAN410",
                    "name": "Quantitative Methods",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN420",
                    "name": "Fundamentals of Operations Management",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BAN430",
                    "name": "HRM",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS201",
                    "name": "Data Structures",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS102",
                    "name": "Programming Fundamentals",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-psychology': {
    "programId": "adp-psychology",
    "programName": "ADP Psychology",
    "totalSemesters": 4,
    "totalCreditHours": 63,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY120",
                    "name": "Introduction to Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY130L",
                    "name": "Introduction to Psychology Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PSY140",
                    "name": "History and Schools of Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY150",
                    "name": "Introduction to Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY160",
                    "name": "Cognitive Psychology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "PSY240",
                    "name": "Fundamental of Philosophy",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY250",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY260",
                    "name": "Developmental Psychology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "PSY310",
                    "name": "Civic & Community Engagement",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY320",
                    "name": "Experimental Psychology",
                    "creditHours": 4,
                    "type": "Core"
                },
                {
                    "code": "PSY330",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY340",
                    "name": "Introduction to Political Science (Social Science)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY350",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "PSY360",
                    "name": "Mental Health and Psychopathology I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY370",
                    "name": "Quranic Translation (only for Muslim students)",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 14,
            "courses": [
                {
                    "code": "PSY410",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PSY420",
                    "name": "Social Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY430",
                    "name": "Neurological Basis of Behaviour",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY440",
                    "name": "Positive Psychology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PSY450",
                    "name": "Mental Health and Psychopathology II",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-english': {
    "programId": "adp-english",
    "programName": "ADP English",
    "totalSemesters": 4,
    "totalCreditHours": 66,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG110",
                    "name": "Environmental Science",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG120",
                    "name": "Introduction to Economics",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG150",
                    "name": "Introduction to Literary Studies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG160",
                    "name": "Introduction to Language Studies",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG210",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG240",
                    "name": "Applications of Information and Communication Technology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG250",
                    "name": "Introduction to Phonetics & Phonology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG260",
                    "name": "Literary Forms and Movements",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "ENG310",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG320",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ENG330",
                    "name": "Fundamentals of Philosophy",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "English-III",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "ENG350",
                    "name": "Short Story",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG360",
                    "name": "Introduction to Morphology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG370",
                    "name": "Quranic Translation (Only for Muslim Students)",
                    "creditHours": 0,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "ENG420",
                    "name": "Rise of the Novel (18th to 19th Century)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG430",
                    "name": "Forensic Linguistics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG440",
                    "name": "Classical and Renaissance Drama",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG450",
                    "name": "Classical Poetry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG460",
                    "name": "Semantics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-biochemistry': {
    "programId": "adp-biochemistry",
    "programName": "ADP Biochemistry",
    "totalSemesters": 4,
    "totalCreditHours": 70,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH120",
                    "name": "Biophysics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH130",
                    "name": "Quantitative Reasoning I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH140",
                    "name": "Inorganic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH150L",
                    "name": "Inorganic Chemistry – Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH160",
                    "name": "Essentials of Biochemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH170L",
                    "name": "Essentials of Biochemistry - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH180",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH220",
                    "name": "Physical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH230L",
                    "name": "Physical Chemistry Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BCH250",
                    "name": "Carbohydrates and Lipids",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH260",
                    "name": "Quantitative Reasoning II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BCH270",
                    "name": "Sign Language",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "BCH310",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BCH330",
                    "name": "Organic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH340L",
                    "name": "Organic Chemistry - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BCH360",
                    "name": "Human Physiology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH370",
                    "name": "Amino Acids and Proteins",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH380L",
                    "name": "Amino Acids and Proteins - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH390",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BCH410",
                    "name": "Enzymes",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH420L",
                    "name": "Enzymes - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH430",
                    "name": "Introduction to Nanoscience",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH440",
                    "name": "Plant Biochemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BCH450L",
                    "name": "Plant Biochemistry - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BCH460",
                    "name": "Molecular Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH470",
                    "name": "Genetics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BCH480",
                    "name": "Metabolism",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'adp-biotechnology': {
    "programId": "adp-biotechnology",
    "programName": "ADP Biotechnology",
    "totalSemesters": 4,
    "totalCreditHours": 70,
    "degreeType": "ADP (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BTEC110",
                    "name": "Introduction to Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC120",
                    "name": "Principles of Biochemical Engineering",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC130L",
                    "name": "Principles of Biochemical Engineering - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC140",
                    "name": "Environmental Sciences",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC150",
                    "name": "Applications of Information and Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC170",
                    "name": "Quantitative Reasoning-I",
                    "creditHours": 3,
                    "type": "General"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "BTEC210",
                    "name": "Agriculture Biotechnology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC220L",
                    "name": "Agriculture Biotechnology - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC230",
                    "name": "Ecology, Biodiversity & Evolution-I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC250",
                    "name": "Sign Language",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC270",
                    "name": "Quantitative Reasoning-II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "BTEC280",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 15,
            "courses": [
                {
                    "code": "BTEC310",
                    "name": "Ecology, Biodiversity & Evolution II",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC320L",
                    "name": "Ecology, Biodiversity & Evolution II - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology and Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC340",
                    "name": "Classical Genetics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC350",
                    "name": "Environmental Biotechnology and Climate Change",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics and Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "BTEC370",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "BTEC410",
                    "name": "Molecular Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC420",
                    "name": "Microbiology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC430",
                    "name": "Cell Biology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC440L",
                    "name": "Cell Biology - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC450",
                    "name": "Analytical Chemistry and Instrumentation",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "BTEC460L",
                    "name": "Analytical Chemistry and Instrumentation - Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "BTEC470",
                    "name": "General Immunology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "BTEC480",
                    "name": "Industrial Biotechnology",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

  'ads-zoology-botany-chemistry': {
    "programId": "ads-zoology-botany-chemistry",
    "programName": "ADS Botany, Chemistry, Zoology",
    "totalSemesters": 4,
    "totalCreditHours": 71,
    "degreeType": "ADS (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "CIV101",
                    "name": "Civics & Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "SC130",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies/Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "SC150",
                    "name": "Inorganic Chemistry",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC160L",
                    "name": "Inorganic Chemistry-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC170",
                    "name": "Animal Diversity-I (Invertebrates)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC180L",
                    "name": "Animal Diversity-I Lab (Invertebrates)",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SC220",
                    "name": "Quantitative Reasoning-I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SC230",
                    "name": "Application of Information & Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "SC250",
                    "name": "Physical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC260L",
                    "name": "Physical Chemistry-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC270",
                    "name": "Animal Diversity-II (Chordates)",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC280L",
                    "name": "Animal Diversity-II (Chordates)-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "SC310",
                    "name": "Quantitative Reasoning-II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "SC320",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                },
                {
                    "code": "SC330",
                    "name": "Diversity of Plants",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC340",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC350",
                    "name": "Organic Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC360L",
                    "name": "Organic Chemistry-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC370",
                    "name": "Animal Form & Function-I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC380L",
                    "name": "Animal Form & Function-I (Lab)",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC390",
                    "name": "Essentials of Bio-Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC400L",
                    "name": "Essentials of Bio-Chemistry-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "SC410",
                    "name": "Foreign Language (Chinese)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC420",
                    "name": "Animal Form & Function-II",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC430L",
                    "name": "Animal Form & Function-II (Lab)",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC440",
                    "name": "Economic Zoology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC450L",
                    "name": "Economic Zoology-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC460",
                    "name": "Analytical Chemistry",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC470L",
                    "name": "Analytical Chemistry-I (Lab)",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "SC480",
                    "name": "Instrumental Analysis and Analytical Techniques",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "SC490",
                    "name": "Cell Biology",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "SC500L",
                    "name": "Cell Biology-Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        }
    ]
},

  'ads-math-physics': {
    "programId": "ads-math-physics",
    "programName": "ADS Double Maths & Physics",
    "totalSemesters": 4,
    "totalCreditHours": 70,
    "degreeType": "ADS (2 Years)",
    "semesters": [
        {
            "semester": 1,
            "title": "Semester - I",
            "totalCredits": 17,
            "courses": [
                {
                    "code": "ENG101",
                    "name": "Functional English",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MP120",
                    "name": "Introduction to Biology",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus I",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "ISL101",
                    "name": "Islamic Studies / Ethics",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MP150",
                    "name": "Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP160L",
                    "name": "Mechanics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MP170",
                    "name": "Introduction to Psychology",
                    "creditHours": 2,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 2,
            "title": "Semester - II",
            "totalCredits": 18,
            "courses": [
                {
                    "code": "ENG102",
                    "name": "Expository Writing",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MP220",
                    "name": "Foreign Language (Chinese)",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MP230",
                    "name": "Quantitative Reasoning-I",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MP240",
                    "name": "Application of Information & Communication Technologies",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP250",
                    "name": "Electricity & Magnetism",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP260L",
                    "name": "Electricity & Magnetism Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus-II",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        },
        {
            "semester": 3,
            "title": "Semester - III",
            "totalCredits": 19,
            "courses": [
                {
                    "code": "PAK101",
                    "name": "Ideology & Constitution of Pakistan",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MP320",
                    "name": "Entrepreneurship",
                    "creditHours": 2,
                    "type": "Core"
                },
                {
                    "code": "MP330",
                    "name": "Quranic Translation",
                    "creditHours": 0,
                    "type": "Core"
                },
                {
                    "code": "CIV101",
                    "name": "Civics & Community Engagement",
                    "creditHours": 2,
                    "type": "General"
                },
                {
                    "code": "MP350",
                    "name": "Quantitative Reasoning-II",
                    "creditHours": 3,
                    "type": "General"
                },
                {
                    "code": "MP360",
                    "name": "Heat & Thermodynamics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MATH101",
                    "name": "Calculus-III",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP380",
                    "name": "Waves & Oscillation",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP390L",
                    "name": "Heat, Waves and Sound Lab",
                    "creditHours": 1,
                    "type": "Lab"
                }
            ]
        },
        {
            "semester": 4,
            "title": "Semester - IV",
            "totalCredits": 16,
            "courses": [
                {
                    "code": "MP410",
                    "name": "Optics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP420L",
                    "name": "Optics Lab",
                    "creditHours": 1,
                    "type": "Lab"
                },
                {
                    "code": "MATH201",
                    "name": "Linear Algebra",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP440",
                    "name": "Classical Mechanics",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "MP450",
                    "name": "Ordinary Differential Equation",
                    "creditHours": 3,
                    "type": "Core"
                },
                {
                    "code": "CS104",
                    "name": "Discrete Mathematics",
                    "creditHours": 3,
                    "type": "Core"
                }
            ]
        }
    ]
},

};

// Aliases for seamless routing and modal compatibility
PROGRAMMES_CURRICULUM['bba'] = PROGRAMMES_CURRICULUM['bba'];
PROGRAMMES_CURRICULUM['bs-analytics'] = PROGRAMMES_CURRICULUM['bs-business-analytics'];
PROGRAMMES_CURRICULUM['bs-psyschology'] = PROGRAMMES_CURRICULUM['bs-psychology'];
PROGRAMMES_CURRICULUM['adp-ai'] = PROGRAMMES_CURRICULUM['adp-artificial-intelligence'];
PROGRAMMES_CURRICULUM['adp-cs'] = PROGRAMMES_CURRICULUM['adp-computer-science'];
PROGRAMMES_CURRICULUM['adp-se'] = PROGRAMMES_CURRICULUM['adp-software-engineering'];
PROGRAMMES_CURRICULUM['adp-ds'] = PROGRAMMES_CURRICULUM['adp-data-science'];
PROGRAMMES_CURRICULUM['adp-bba'] = PROGRAMMES_CURRICULUM['adp-business-administration'];
PROGRAMMES_CURRICULUM['adp-af'] = PROGRAMMES_CURRICULUM['adp-accounting-finance'];
PROGRAMMES_CURRICULUM['adp-english-language-and-literature'] = PROGRAMMES_CURRICULUM['adp-english'];
PROGRAMMES_CURRICULUM['ads-i-botany-chemistry-zoology'] = PROGRAMMES_CURRICULUM['ads-zoology-botany-chemistry'];
PROGRAMMES_CURRICULUM['ads-ii-doble-math_s-_-physics'] = PROGRAMMES_CURRICULUM['ads-math-physics'];

export function getProgramCurriculum(programId: string, programName: string, level: string): ProgramCurriculum {
  if (PROGRAMMES_CURRICULUM[programId]) {
    return PROGRAMMES_CURRICULUM[programId];
  }
  
  // Try normalized aliases
  const normalized = programId.toLowerCase().trim();
  if (PROGRAMMES_CURRICULUM[normalized]) {
    return PROGRAMMES_CURRICULUM[normalized];
  }
  if (normalized === 'adp-ai' && PROGRAMMES_CURRICULUM['adp-artificial-intelligence']) {
    return PROGRAMMES_CURRICULUM['adp-artificial-intelligence'];
  }
  if (normalized === 'adp-cs' && PROGRAMMES_CURRICULUM['adp-computer-science']) {
    return PROGRAMMES_CURRICULUM['adp-computer-science'];
  }
  if (normalized === 'adp-se' && PROGRAMMES_CURRICULUM['adp-software-engineering']) {
    return PROGRAMMES_CURRICULUM['adp-software-engineering'];
  }
  if (normalized === 'bs-analytics' && PROGRAMMES_CURRICULUM['bs-business-analytics']) {
    return PROGRAMMES_CURRICULUM['bs-business-analytics'];
  }
  if (normalized === 'bs-cyber-security' && PROGRAMMES_CURRICULUM['bs-computer-science']) {
    // Return specialized computing curriculum
    const baseCs = PROGRAMMES_CURRICULUM['bs-computer-science'];
    return {
      ...baseCs,
      programId: 'bs-cyber-security',
      programName: 'BS Cyber Security'
    };
  }

  const isAdp = level === 'Associate Degree' || programId.startsWith('adp-') || programId.startsWith('ads-');
  const totalSemesters = isAdp ? 4 : 8;
  const totalCreditHours = isAdp ? 66 : 130;

  const semesters: SemesterData[] = [];
  for (let sem = 1; sem <= totalSemesters; sem++) {
    const semCredits = Math.round(totalCreditHours / totalSemesters);
    semesters.push({
      semester: sem,
      title: `Semester ${sem}`,
      totalCredits: semCredits,
      courses: [
        { code: `COURSE-${sem}01`, name: `${programName} Core Theory I`, creditHours: 3, type: 'Core' },
        { code: `COURSE-${sem}02`, name: `${programName} Practical Application Lab`, creditHours: 1, type: 'Lab' },
        { code: `COURSE-${sem}03`, name: `${programName} Departmental Major`, creditHours: 3, type: 'Major' },
        { code: `GEN-${sem}01`, name: 'Interdisciplinary Analytical Foundation', creditHours: 3, type: 'General' },
        { code: `ELEC-${sem}01`, name: 'Academic Elective / Project', creditHours: 3, type: 'Elective' }
      ]
    });
  }

  return {
    programId,
    programName,
    totalSemesters,
    totalCreditHours,
    degreeType: isAdp ? 'ADP (2 Years)' : 'BS (4 Years)',
    semesters
  };
}
