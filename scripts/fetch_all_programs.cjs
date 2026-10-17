const fs = require('fs');
const { execSync } = require('child_process');

const programPages = [
  { id: 244, slug: 'bba', name: 'BBA', level: 'Bachelors' },
  { id: 741, slug: 'bs-computer-science', name: 'BS Computer Science', level: 'Bachelors' },
  { id: 726, slug: 'bs-accounting-finance', name: 'BS Accounting & Finance', level: 'Bachelors' },
  { id: 3262, slug: 'bs-analytics', name: 'BS Business Analytics', level: 'Bachelors' },
  { id: 743, slug: 'bs-economics', name: 'BS Economics', level: 'Bachelors' },
  { id: 745, slug: 'bs-english', name: 'BS English', level: 'Bachelors' },
  { id: 751, slug: 'bs-psyschology', name: 'BS Psychology', level: 'Bachelors' },
  { id: 747, slug: 'bs-mathematics', name: 'BS Mathematics', level: 'Bachelors' },
  { id: 749, slug: 'bs-physics', name: 'BS Physics', level: 'Bachelors' },
  { id: 739, slug: 'bs-chemistry', name: 'BS Chemistry', level: 'Bachelors' },
  { id: 3323, slug: 'bs-biochemistry', name: 'BS Biochemistry', level: 'Bachelors' },
  { id: 3332, slug: 'bs-biotechnology', name: 'BS Biotechnology', level: 'Bachelors' },
  { id: 753, slug: 'bs-zoology', name: 'BS Zoology', level: 'Bachelors' },
  { id: 281, slug: 'adp-business-administration', name: 'ADP Business Administration', level: 'ADP' },
  { id: 1483, slug: 'adp-accounting-finance', name: 'ADP Accounting & Finance', level: 'ADP' },
  { id: 681, slug: 'adp-computer-science', name: 'ADP Computer Science', level: 'ADP' },
  { id: 3219, slug: 'adp-artificial-intelligence', name: 'ADP Artificial Intelligence', level: 'ADP' },
  { id: 3234, slug: 'adp-data-science', name: 'ADP Data Science', level: 'ADP' },
  { id: 3228, slug: 'adp-cyber-security', name: 'ADP Cyber Security', level: 'ADP' },
  { id: 3242, slug: 'adp-software-engineering', name: 'ADP Software Engineering', level: 'ADP' },
  { id: 3207, slug: 'adp-business-analytics', name: 'ADP Business Analytics', level: 'ADP' },
  { id: 3213, slug: 'adp-psychology', name: 'ADP Psychology', level: 'ADP' },
  { id: 3201, slug: 'adp-english-language-and-literature', name: 'ADP English', level: 'ADP' },
  { id: 3195, slug: 'adp-biochemistry', name: 'ADP Biochemistry', level: 'ADP' },
  { id: 3189, slug: 'adp-biotechnology', name: 'ADP Biotechnology', level: 'ADP' },
  { id: 702, slug: 'ads-i-botany-chemistry-zoology', name: 'ADS Botany, Chemistry, Zoology', level: 'ADS' },
  { id: 708, slug: 'ads-ii-doble-math_s-_-physics', name: 'ADS Double Maths & Physics', level: 'ADS' }
];

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseSemesters(html) {
  const semesters = [];
  let totalChFromPage = null;

  // Global search for Total Credit Hours
  const chGlobal = html.match(/Total Credit Hours?[\s\S]*?(\d+)\s*CH/i);
  if (chGlobal) {
    totalChFromPage = parseInt(chGlobal[1], 10);
  }

  // 1. Check for standard <table> structures
  const tableMatches = html.match(/<table[\s\S]*?<\/table>/gi) || [];
  if (tableMatches.length > 0) {
    for (const tableHtml of tableMatches) {
      const rawText = cleanText(tableHtml);

      // Check if it's a semester table
      const semNameMatch = rawText.match(/Semester\s*[-–—]?\s*(VIII|VII|VI|III|II|IV|IX|V|I|X|\d+|Summer[^C]*)/i);
      if (semNameMatch && (rawText.includes('Cr Hr') || rawText.includes('Credit Hours') || rawText.includes('Total'))) {
        const semTitle = semNameMatch[0].trim();
        
        // Parse rows
        const rowMatches = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
        const courses = [];
        let semTotal = 0;

        for (const row of rowMatches) {
          const cells = (row.match(/<t[dh][\s\S]*?<\/t[dh]>/gi) || []).map(c => cleanText(c));
          if (cells.length >= 2) {
            const col1 = cells[0];
            const col2 = cells[cells.length - 1]; // credit hour is usually last cell
            
            if (/semester/i.test(col1) || /cr hr/i.test(col2) || /credit hours/i.test(col2)) {
              continue;
            }

            if (/total/i.test(col1)) {
              const parsedTot = parseInt(col2, 10);
              if (!isNaN(parsedTot)) semTotal = parsedTot;
              continue;
            }

            const cr = parseInt(col2, 10);
            if (col1 && !isNaN(cr)) {
              courses.push({
                title: col1,
                cr: cr
              });
            }
          }
        }

        if (courses.length > 0) {
          const calculatedTotal = courses.reduce((acc, c) => acc + c.cr, 0);
          semesters.push({
            name: semTitle,
            total: semTotal || calculatedTotal,
            courses
          });
        }
      }
    }
  }

  // 2. If no table found, check for div.sem-table or div.main-semtable
  if (semesters.length === 0) {
    // Split by sem-table or search all h3 semester headings
    const semBlocks = html.split(/(?:<div[^>]*class=[\"'][^\"']*sem-table[^\"']*[\"']|<!--\s*Semester)/i);
    for (const block of semBlocks) {
      const rawBlockText = cleanText(block);
      const semHeadingMatch = block.match(/<h3>\s*(Semester\s*[-–—]?\s*(?:VIII|VII|VI|III|II|IV|IX|V|I|X|\d+|Summer[^\<]*))\s*<\/h3>/i)
        || rawBlockText.match(/Semester\s*[-–—]?\s*(VIII|VII|VI|III|II|IV|IX|V|I|X|\d+|Summer[^C]*)/i);
      
      if (semHeadingMatch) {
        const semTitle = (semHeadingMatch[1] || semHeadingMatch[0]).trim();
        const rowMatches = block.match(/<div class=\"sem-row[^\"]*\"[\s\S]*?<\/div>/gi) || [];
        const courses = [];
        let semTotal = 0;

        for (const row of rowMatches) {
          const pMatches = (row.match(/<p[\s\S]*?<\/p>/gi) || []).map(p => cleanText(p));
          if (pMatches.length >= 2) {
            const col1 = pMatches[0];
            const col2 = pMatches[pMatches.length - 1];

            if (/total/i.test(col1)) {
              const parsedTot = parseInt(col2, 10);
              if (!isNaN(parsedTot)) semTotal = parsedTot;
              continue;
            }

            const cr = parseInt(col2, 10);
            if (col1 && !isNaN(cr) && !/semester/i.test(col1) && !/credit/i.test(col1)) {
              courses.push({
                title: col1,
                cr: cr
              });
            }
          }
        }

        if (courses.length > 0) {
          const calculatedTotal = courses.reduce((acc, c) => acc + c.cr, 0);
          semesters.push({
            name: semTitle,
            total: semTotal || calculatedTotal,
            courses
          });
        }
      }
    }
  }

  return { totalCreditHours: totalChFromPage, semesters };
}

async function run() {
  const allResults = [];
  for (const prog of programPages) {
    console.log(`Fetching ${prog.name} (id: ${prog.id})...`);
    try {
      const curlCmd = `curl -sL -A "Mozilla/5.0" "https://ucpcolleges.pgc.edu/wp-json/wp/v2/pages/${prog.id}?_fields=id,slug,title,content"`;
      const jsonStr = execSync(curlCmd, { maxBuffer: 10 * 1024 * 1024 }).toString();
      const pageData = JSON.parse(jsonStr);
      const html = pageData.content ? pageData.content.rendered : '';
      
      const parsed = parseSemesters(html);
      const totalFromSemesters = parsed.semesters.reduce((acc, s) => acc + s.total, 0);
      const finalTotal = parsed.totalCreditHours || totalFromSemesters;

      console.log(`  -> Found ${parsed.semesters.length} semesters, Total CH: ${finalTotal}`);
      allResults.push({
        id: prog.id,
        slug: prog.slug,
        name: prog.name,
        level: prog.level,
        total_ch: finalTotal,
        semesters: parsed.semesters
      });
    } catch (e) {
      console.error(`  -> Failed for ${prog.name}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/extracted_official_programs.json', JSON.stringify(allResults, null, 2));
  console.log('Saved to scripts/extracted_official_programs.json');
}

run();
