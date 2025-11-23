export const course5Questions = [
  {
    question: 'Which feature distinguishes a clinical trial from an observational cohort study?',
    options: [
      'It follows participants over time',
      'Intervention is assigned by the investigator',
      'It is always randomized',
      'It cannot use a control group',
    ],
    answer: 1,
    explanation: 'In a clinical trial, the investigator actively assigns the intervention (e.g., drug vs placebo), whereas in observational studies, exposure is observed but not controlled.',
  },
  {
    question: 'What phenomenon causes patients to improve because they believe they received an effective treatment?',
    options: ['Regression to the mean', 'Placebo effect', 'Selection bias', 'Attrition bias'],
    answer: 1,
    explanation: 'The placebo effect occurs when a patient\'s condition improves due to their expectation of treatment, rather than the treatment itself.',
  },
  {
    question: 'Order these steps of the scientific method correctly',
    options: [
      'Hypothesis → Experimentation → Observation',
      'Observation → Hypothesis → Experimentation',
      'Experimentation → Observation → Hypothesis',
      'Observation → Experimentation → Hypothesis',
    ],
    answer: 1,
    explanation: 'The scientific method typically starts with Observation, leading to a Hypothesis, which is then tested through Experimentation.',
  },
  {
    question: 'Which of the following is a mitigation for attrition bias?',
    options: ['Per-protocol analysis', 'Intention-to-treat analysis', 'Excluding missing data', 'Blinding'],
    answer: 1,
    explanation: 'Intention-to-treat (ITT) analysis includes all randomized participants regardless of whether they completed the study, mitigating bias from dropouts (attrition).',
  },
  {
    question: 'Which phase primarily assesses safety and dosage in a small group of volunteers?',
    options: ['Phase I', 'Phase II', 'Phase III', 'Phase IV'],
    answer: 0,
    explanation: 'Phase I trials focus on safety, tolerability, and pharmacokinetics in a small group of healthy volunteers or patients.',
  },
  {
    question: 'Which trial type assigns treatment to participants randomly?',
    options: ['Cohort study', 'Cross-sectional study', 'Randomized clinical trial (RCT)', 'Case-control study'],
    answer: 2,
    explanation: 'Randomized Clinical Trials (RCTs) use randomization to assign participants to treatment or control groups, minimizing selection bias.',
  },
  {
    question: 'A cross-over randomized trial requires which of the following?',
    options: ['Washout period', 'No control group', 'Large sample sizes only', 'No ethical approval'],
    answer: 0,
    explanation: 'A washout period is essential in cross-over trials to ensure the effects of the first treatment have cleared before the second treatment begins.',
  },
  {
    question: 'What does the Statistical Analysis Plan (SAP) primarily specify?',
    options: ['Ethics approvals', 'Marketing strategy', 'The planned statistical analyses and endpoints', 'Recruitment targets'],
    answer: 2,
    explanation: 'The SAP details the statistical methods, endpoints, and analyses to be performed, preventing data dredging and ensuring transparency.',
  },
  {
    question: 'Which level of the evidence pyramid is considered highest quality?',
    options: ['Case-Control Studies', 'Systematic Reviews & Meta-Analyses', 'Expert Opinion', 'Cross-Sectional Studies'],
    answer: 1,
    explanation: 'Systematic Reviews and Meta-Analyses of RCTs sit at the top of the evidence pyramid as they synthesize data from multiple high-quality studies.',
  },
  {
    question: 'Which item is commonly part of the Clinical Study Report (CSR)?',
    options: ['Detailed statistical analysis, final results and conclusions', 'The trial brochure for participants', 'Marketing plan', 'Only the protocol without results'],
    answer: 0,
    explanation: 'The CSR is a comprehensive document summarizing the trial\'s methodology, statistical analysis, and final results for regulatory submission.',
  },
];

export default course5Questions;
