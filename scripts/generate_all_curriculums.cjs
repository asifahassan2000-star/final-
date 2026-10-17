const fs = require('fs');

const rawPrograms = JSON.parse(fs.readFileSync('scripts/extracted_official_programs.json', 'utf8'));

// Slug / ID mapping
const appIds = {
  'bba': 'bba',
  'bs-computer-science': 'bs-computer-science',
  'bs-accounting-finance': 'bs-accounting-finance',
  'bs-analytics': 'bs-business-analytics',
  'bs-economics': 'bs-economics',
  'bs-english': 'bs-english',
  'bs-psyschology': 'bs-psychology',
  'bs-mathematics': 'bs-mathematics',
  'bs-physics': 'bs-physics',
  'bs-chemistry': 'bs-chemistry',
  'bs-biochemistry': 'bs-biochemistry',
  'bs-biotechnology': 'bs-biotechnology',
  'bs-zoology': 'bs-zoology',
  'adp-business-administration': 'adp-business-administration',
  'adp-accounting-finance': 'adp-accounting-finance',
  'adp-computer-science': 'adp-computer-science',
  'adp-artificial-intelligence': 'adp-artificial-intelligence',
  'adp-data-science': 'adp-data-science',
  'adp-cyber-security': 'adp-cyber-security',
  'adp-software-engineering': 'adp-software-engineering',
  'adp-business-analytics': 'adp-business-analytics',
  'adp-psychology': 'adp-psychology',
  'adp-english-language-and-literature': 'adp-english',
  'adp-biochemistry': 'adp-biochemistry',
  'adp-biotechnology': 'adp-biotechnology',
  'ads-i-botany-chemistry-zoology': 'ads-zoology-botany-chemistry',
  'ads-ii-doble-math_s-_-physics': 'ads-math-physics'
};

const degreePrefixes = {
  'bba': 'MGT',
  'bs-computer-science': 'CS',
  'bs-accounting-finance': 'AF',
  'bs-business-analytics': 'BA',
  'bs-economics': 'ECO',
  'bs-english': 'ENG',
  'bs-psychology': 'PSY',
  'bs-mathematics': 'MATH',
  'bs-physics': 'PHY',
  'bs-chemistry': 'CHEM',
  'bs-biochemistry': 'BCH',
  'bs-biotechnology': 'BTEC',
  'bs-zoology': 'ZOO',
  'adp-business-administration': 'BA',
  'adp-accounting-finance': 'AF',
  'adp-computer-science': 'CS',
  'adp-artificial-intelligence': 'AI',
  'adp-data-science': 'DS',
  'adp-cyber-security': 'CYB',
  'adp-software-engineering': 'SE',
  'adp-business-analytics': 'BAN',
  'adp-psychology': 'PSY',
  'adp-english': 'ENG',
  'adp-biochemistry': 'BCH',
  'adp-biotechnology': 'BTEC',
  'ads-zoology-botany-chemistry': 'SC',
  'ads-math-physics': 'MP'
};

function determineType(title) {
  const t = title.toLowerCase();
  if (t.includes('lab')) return 'Lab';
  if (t.includes('project') || t.includes('capstone') || t.includes('internship') || t.includes('thesis')) return 'Project';
  if (t.includes('elective') || t.includes('minor') || t.includes('specialization')) return 'Elective';
  if (t.includes('major') || t.includes('domain core')) return 'Major';
  if (t.includes('english') || t.includes('islamic') || t.includes('pakistan') || t.includes('civics') || t.includes('sociology') || t.includes('anthropology') || t.includes('ideology') || t.includes('quantitative reasoning') || t.includes('expository writing')) return 'General';
  return 'Core';
}

function generateCode(progId, semIndex, courseIndex, title) {
  const t = title.toLowerCase();
  const isLab = t.includes('lab');
  
  if (t.includes('english') || t.includes('functional english')) return isLab ? 'ENG101L' : 'ENG101';
  if (t.includes('expository writing')) return 'ENG102';
  if (t.includes('islamic')) return 'ISL101';
  if (t.includes('pakistan') || t.includes('ideology')) return 'PAK101';
  if (t.includes('civics')) return 'CIV101';
  if (t.includes('sociology')) return 'SOC101';
  if (t.includes('anthropology')) return 'ANT101';
  if (t.includes('calculus')) return isLab ? 'MATH101L' : 'MATH101';
  if (t.includes('linear algebra')) return 'MATH201';
  if (t.includes('discrete')) return 'CS104';
  if (t.includes('programming fundamental')) return isLab ? 'CS102L' : 'CS102';
  if (t.includes('object oriented')) return isLab ? 'CS103L' : 'CS103';
  if (t.includes('data structure')) return isLab ? 'CS201L' : 'CS201';
  if (t.includes('database')) return isLab ? 'CS202L' : 'CS202';
  if (t.includes('operating system')) return isLab ? 'CS204L' : 'CS204';
  if (t.includes('computer network')) return isLab ? 'CS206L' : 'CS206';
  if (t.includes('software engineering')) return 'CS205';
  if (t.includes('artificial intelligence')) return isLab ? 'AI201L' : 'AI201';
  if (t.includes('machine learning')) return isLab ? 'AI301L' : 'AI301';

  const prefix = degreePrefixes[progId] || 'CRS';
  const num = (semIndex * 100) + ((courseIndex + 1) * 10);
  return isLab ? `${prefix}${num}L` : `${prefix}${num}`;
}

// 1. Build TypeScript file for PROGRAMMES_CURRICULUM
let tsCode = `export interface CourseItem {
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
`;

// Also build bahawalpurPrograms.js
const bahawalpurProgramsData = [];

for (const prog of rawPrograms) {
  const appId = appIds[prog.slug] || prog.slug;
  const isAdp = prog.level === 'ADP' || prog.level === 'ADS';
  const degreeType = isAdp ? `${prog.level} (2 Years)` : `${prog.level} (4 Years)`;

  const semestersList = prog.semesters.map((s, semIdx) => {
    return {
      semester: semIdx + 1,
      title: s.name,
      totalCredits: s.total,
      courses: s.courses.map((c, cIdx) => ({
        code: generateCode(appId, semIdx + 1, cIdx, c.title),
        name: c.title,
        creditHours: c.cr,
        type: determineType(c.title)
      }))
    };
  });

  const progObj = {
    programId: appId,
    programName: prog.name,
    totalSemesters: prog.semesters.length,
    totalCreditHours: prog.total_ch,
    degreeType,
    semesters: semestersList
  };

  tsCode += `  '${appId}': ${JSON.stringify(progObj, null, 4)},\n\n`;

  bahawalpurProgramsData.push({
    slug: appId,
    name: prog.name,
    total_ch: prog.total_ch,
    semesters: prog.semesters.map(s => ({
      name: s.name,
      total: s.total,
      courses: s.courses.map(c => ({
        title: c.title,
        cr: c.cr
      }))
    }))
  });
}

// Close PROGRAMMES_CURRICULUM
tsCode += `};

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
      title: \`Semester \${sem}\`,
      totalCredits: semCredits,
      courses: [
        { code: \`COURSE-\${sem}01\`, name: \`\${programName} Core Theory I\`, creditHours: 3, type: 'Core' },
        { code: \`COURSE-\${sem}02\`, name: \`\${programName} Practical Application Lab\`, creditHours: 1, type: 'Lab' },
        { code: \`COURSE-\${sem}03\`, name: \`\${programName} Departmental Major\`, creditHours: 3, type: 'Major' },
        { code: \`GEN-\${sem}01\`, name: 'Interdisciplinary Analytical Foundation', creditHours: 3, type: 'General' },
        { code: \`ELEC-\${sem}01\`, name: 'Academic Elective / Project', creditHours: 3, type: 'Elective' }
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
`;

fs.writeFileSync('src/data/programmesCurriculumData.ts', tsCode);
console.log('Generated src/data/programmesCurriculumData.ts successfully!');

// Write src/data/bahawalpurPrograms.js
const jsCode = `export const BAHAWALPUR_PROGRAMS = ${JSON.stringify(bahawalpurProgramsData, null, 2)};\n\nexport default BAHAWALPUR_PROGRAMS;\n`;
fs.writeFileSync('src/data/bahawalpurPrograms.js', jsCode);
console.log('Generated src/data/bahawalpurPrograms.js successfully!');

// Write src/data/bahawalpurPrograms.ts
const tsProgramsCode = `export interface BahawalpurCourse {
  title: string;
  cr: number;
}

export interface BahawalpurSemester {
  name: string;
  total: number;
  courses: BahawalpurCourse[];
}

export interface BahawalpurProgram {
  slug: string;
  name: string;
  total_ch: number;
  semesters: BahawalpurSemester[];
}

export const BAHAWALPUR_PROGRAMS: BahawalpurProgram[] = ${JSON.stringify(bahawalpurProgramsData, null, 2)};

export default BAHAWALPUR_PROGRAMS;
`;
fs.writeFileSync('src/data/bahawalpurPrograms.ts', tsProgramsCode);
console.log('Generated src/data/bahawalpurPrograms.ts successfully!');
