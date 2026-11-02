/**
 * Academic Study & Assignment Guidance Engine
 * Provides structured educational frameworks, problem-solving methodologies,
 * code templates, and study advice when offline or as an immediate helper.
 */

export interface StudyGuidance {
  topic: string;
  solution: string;
  suggestions: string[];
}

export function getStudyAssignmentGuidance(query: string): string | null {
  const q = query.toLowerCase();

  // 1. Programming & Data Structures (Python, C++, Java, JS, Web)
  if (q.includes('python') || q.includes('code') || q.includes('programming') || q.includes('algorithm') || q.includes('data structure') || q.includes('javascript') || q.includes('c++') || q.includes('java') || q.includes('html') || q.includes('css') || q.includes('react') || q.includes('sql') || q.includes('database')) {
    return `### 💻 Programming & Computer Science Assignment Helper

Here is a structured, production-grade guide to help you complete your programming task:

1. **Problem Analysis & Requirements**:
   - Clearly identify expected inputs, data types, constraints, and desired output.
   - Consider boundary conditions: empty collections, duplicate entries, negative indices, or zero division.

2. **Algorithm & Complexity**:
   - Choose the data structure that minimizes time/space complexity (e.g. Hash Map for $O(1)$ lookups, Two Pointers for sorted arrays, Dynamic Programming for overlapping subproblems).

3. **Clean Code Solution Template**:
\`\`\`python
# Optimized Python solution template with error handling and docstrings
def process_data(items: list) -> list:
    """
    Processes the input items and returns the transformed result.
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    if not items:
        return []

    # Use hash set for O(1) membership lookups
    seen = set()
    result = []
    
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
            
    return result

# Verification / Test Cases
if __name__ == "__main__":
    sample_input = [10, 20, 10, 30, 40, 20, 50]
    output = process_data(sample_input)
    print("Deduplicated Result:", output)
\`\`\`

4. **Testing & Edge Cases**:
   - Run tests with null/empty input, single element, all duplicates, and large inputs.
   - For database tasks, verify primary keys, foreign key constraints, and normalized forms (3NF).`;
  }

  // 2. Mathematics, Calculus, Linear Algebra & Statistics
  if (q.includes('calculus') || q.includes('derivative') || q.includes('integral') || q.includes('algebra') || q.includes('matrix') || q.includes('math') || q.includes('equation') || q.includes('statistics') || q.includes('probability')) {
    return `### 📐 Mathematics & Problem-Solving Guidance

Follow this rigorous step-by-step mathematical framework:

1. **Define Variables & Objectives**:
   - State the given parameters, known constants, and the unknown variable to solve.
   
2. **Fundamental Formulas**:
   - **Power Rule for Derivatives**: $\\frac{d}{dx}[x^n] = n x^{n-1}$
   - **Product Rule**: $\\frac{d}{dx}[u \\cdot v] = u'v + uv'$
   - **Quotient Rule**: $\\frac{d}{dx}\\left[\\frac{u}{v}\\right] = \\frac{u'v - uv'}{v^2}$
   - **Chain Rule**: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$
   - **Fundamental Theorem of Calculus**: $\\int_{a}^{b} f(x)\\,dx = F(b) - F(a)$ where $F'(x) = f(x)$
   - **Matrix Multiplication**: $C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}$ (columns of A must equal rows of B)

3. **Step-by-Step Solution Procedure**:
   - **Step 1**: Simplify the algebraic expression before performing differentiation or integration.
   - **Step 2**: If solving an optimization problem, find the first derivative $f'(x) = 0$ for critical points, then test concavity using $f''(x)$.
   - **Step 3**: For indefinite integrals, always remember to add the constant of integration $+ C$.

4. **Verification**:
   - Plug your critical value back into the original system to confirm numerical consistency.`;
  }

  // 3. Natural Sciences (Physics, Chemistry, Biology)
  if (q.includes('physics') || q.includes('chemistry') || q.includes('biology') || q.includes('biotechnology') || q.includes('science') || q.includes('quantum') || q.includes('newton')) {
    return `### 🔬 Scientific Concept & Assignment Helper

Here is the scientific breakdown and analytical methodology:

1. **Fundamental Laws & Governing Principles**:
   - **Physics**: Newton's laws of motion ($F = ma$, $p = mv$), conservation of energy ($E_k + E_p = \\text{const}$), Maxwell's equations, and thermodynamics ($\Delta U = Q - W$).
   - **Chemistry**: Le Chatelier's principle, Gibbs free energy ($\Delta G = \Delta H - T\Delta S$), ideal gas law ($PV = nRT$), and balancing chemical stoichiometry.
   - **Biology & Life Sciences**: Central dogma of molecular biology ($\\text{DNA} \\rightarrow \\text{RNA} \\rightarrow \\text{Protein}$), enzyme kinetics, cellular respiration, and Mendelian inheritance.

2. **Standard Problem-Solving Flow**:
   - Convert all physical values into standard **SI units** before calculation ($m$, $kg$, $s$, $N$, $J$, $K$).
   - Draw free-body diagrams (FBD) for mechanics and identify all acting vector forces.
   - In chemistry, always verify mole ratios and limiting reagents first.

3. **Interpretation**:
   - Connect numerical findings back to physical intuition and real-world industrial or clinical applications.`;
  }

  // 4. Academic Writing, Reports & Essays
  if (q.includes('essay') || q.includes('assignment') || q.includes('report') || q.includes('paper') || q.includes('thesis') || q.includes('write')) {
    return `### 📝 Academic Essay & Research Assignment Structure

Use this high-scoring university format:

1. **Introduction**:
   - **Hook**: Compelling opening statement or relevant statistical context.
   - **Background Information**: Brief overview of the topic and scholarly debate.
   - **Thesis Statement**: A definitive, debatable claim that outlines your key arguments.

2. **Body Paragraphs (PEEL Framework)**:
   - **P (Point)**: State the topic sentence clearly.
   - **E (Explanation)**: Unpack the theoretical mechanism or analytical logic.
   - **E (Evidence)**: Provide citations, empirical data, or peer-reviewed examples.
   - **L (Link)**: Summarize how this point directly proves your central thesis.

3. **Critical Counter-Argument**:
   - Present the strongest counterpoint and respectfully rebut it with evidence.

4. **Conclusion**:
   - Restate thesis in new words, synthesize major findings, and offer forward-looking implications without adding new evidence.`;
  }

  // 5. Business, Accounting & Finance
  if (q.includes('accounting') || q.includes('finance') || q.includes('business') || q.includes('marketing') || q.includes('management') || q.includes('economics')) {
    return `### 💼 Business & Financial Analysis Guidance

Here is the structured framework for business and finance assignments:

1. **Core Financial & Accounting Principles**:
   - **Fundamental Accounting Equation**: $\\text{Assets} = \\text{Liabilities} + \\text{Owner's Equity}$
   - **Double-Entry Bookkeeping**: Every debit must have an equal corresponding credit entry.
   - **Key Ratios**:
     - *Current Ratio*: $\\frac{\\text{Current Assets}}{\\text{Current Liabilities}}$ (Liquidity target $> 1.5$)
     - *Net Profit Margin*: $\\frac{\\text{Net Income}}{\\text{Revenue}} \\times 100\\%$
     - *Return on Equity (ROE)*: $\\frac{\\text{Net Income}}{\\text{Shareholder Equity}}$

2. **Strategic Business Frameworks**:
   - **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats.
   - **Porter's 5 Forces**: Industry rivalry, threat of new entrants, supplier power, buyer power, and substitutes.
   - **4 Ps of Marketing**: Product, Price, Place, Promotion.

3. **Actionable Recommendations**:
   - Support recommendations with cost-benefit analysis and risk mitigation plans.`;
  }

  return null;
}
