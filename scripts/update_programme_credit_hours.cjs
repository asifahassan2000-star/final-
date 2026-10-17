const fs = require('fs');

const chMap = {
  "bba": 132,
  "bs-computer-science": 132,
  "bs-accounting-finance": 126,
  "bs-business-analytics": 133,
  "bs-economics": 129,
  "bs-english": 132,
  "bs-psychology": 132,
  "bs-mathematics": 126,
  "bs-physics": 127,
  "bs-chemistry": 128,
  "bs-biochemistry": 128,
  "bs-biotechnology": 128,
  "bs-zoology": 126,
  "adp-business-administration": 66,
  "adp-accounting-finance": 66,
  "adp-computer-science": 75,
  "adp-artificial-intelligence": 75,
  "adp-data-science": 78,
  "adp-cyber-security": 75,
  "adp-software-engineering": 74,
  "adp-business-analytics": 64,
  "adp-psychology": 63,
  "adp-english": 66,
  "adp-biochemistry": 70,
  "adp-biotechnology": 70,
  "ads-zoology-botany-chemistry": 71,
  "ads-math-physics": 70
};

// 1. Update bahawalpurProgrammesData.ts
let content = fs.readFileSync('src/data/bahawalpurProgrammesData.ts', 'utf8');

for (const [id, officialCh] of Object.entries(chMap)) {
  const blockRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?creditHours:\\s*)(\\d+)([\\s\\S]*?feePerCreditHour:\\s*)(\\d+)([\\s\\S]*?totalFee:\\s*)(\\d+)([\\s\\S]*?yearlyAverage:\\s*)(\\d+)`, 'g');
  content = content.replace(blockRegex, (match, p1, oldCh, p3, feePerChStr, p5, oldTotFee, p7, oldYearly) => {
    const feePerCh = parseInt(feePerChStr, 10);
    // Determine admission & reg fee
    const regFee = 2500;
    const admFee = 9000;
    const newTotalFee = regFee + admFee + (officialCh * feePerCh);
    const years = (id.startsWith('adp-') || id.startsWith('ads-')) ? 2 : 4;
    const newYearly = Math.round(newTotalFee / years);
    console.log(`Updated ${id}: ${oldCh} -> ${officialCh} CH (Total Fee: ${newTotalFee})`);
    return `${p1}${officialCh}${p3}${feePerChStr}${p5}${newTotalFee}${p7}${newYearly}`;
  });
}

fs.writeFileSync('src/data/bahawalpurProgrammesData.ts', content);
console.log('Saved updated src/data/bahawalpurProgrammesData.ts');

// 2. Update ucpData.ts
let ucpContent = fs.readFileSync('src/data/ucpData.ts', 'utf8');

const ucpIdMap = {
  ...chMap,
  'adp-ai': 75,
  'adp-cs': 75,
  'adp-se': 74,
  'adp-ds': 78,
  'adp-bba': 66,
  'adp-af': 66,
  'bs-cs': 132,
  'bs-af': 126,
  'bs-ba': 133
};

for (const [id, officialCh] of Object.entries(ucpIdMap)) {
  const ucpRegex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?creditHours:\\s*)(\\d+)`, 'g');
  ucpContent = ucpContent.replace(ucpRegex, (match, p1, oldCh) => {
    if (oldCh !== String(officialCh)) {
      console.log(`Updated ucpData for ${id}: ${oldCh} -> ${officialCh} CH`);
    }
    return `${p1}${officialCh}`;
  });
}

fs.writeFileSync('src/data/ucpData.ts', ucpContent);
console.log('Saved updated src/data/ucpData.ts');
