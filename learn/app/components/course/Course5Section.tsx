// app/components/course/Course5Section.tsx
import React from 'react';
import InteractiveWorkflow from './course5/InteractiveWorkflow';
import PhasesTimeline from './course5/PhasesTimeline';
import BiasExplorer from './course5/BiasExplorer';
import TrialTypeSelector from './course5/TrialTypeSelector';
import EvidencePyramid from './course5/EvidencePyramid';
import DefinitionTooltip from '../ui/DefinitionTooltip';
import Quiz from '../quiz/Quiz';
import course5Questions from './course5/course5Questions';

const scientificMethodWorkflow = [
  { title: 'Observation', description: 'The process of gathering information about events or processes in a careful, orderly way.' },
  { title: 'Hypothesis', description: 'A proposed scientific explanation for a set of observations.' },
  { title: 'Experimentation', description: 'The testing of a hypothesis by performing a controlled experiment.' },
  { title: 'Data Analysis', description: 'The process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information.' },
  { title: 'Conclusion', description: 'A statement that sums up what you have learned from an experiment.' },
];

const clinicalTrialWorkflow = [
  { title: 'Protocol & SAP writing', description: 'Designing the trial and planning the statistical analysis.' },
  { title: 'Health Authorities approval', description: 'Getting approval from regulatory bodies to conduct the trial.' },
  { title: 'Randomization & Blinding', description: 'Assigning participants to groups and concealing the treatment allocation.' },
  { title: 'Conduct of the trial', description: 'Running the trial according to the protocol.' },
  { title: 'Database freeze', description: 'Locking the database to prevent further changes.' },
  { title: 'Statistical analysis', description: 'Analyzing the collected data.' },
  { title: 'Unblinding & Clinical Study Report', description: 'Revealing the treatment allocation and writing the final report.' },
  { title: 'Submission to Health Authorities', description: 'Submitting the results to regulatory bodies for approval.' },
  { title: 'Publication & Marketing', description: 'Publishing the results and marketing the new treatment.' },
];

const Course5Section: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Course #5: Clinical Trials</h1>

  <div className="mt-2 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold">How to use this module</h3>
        <p className="text-sm text-gray-700 mt-2">Estimated time: 60–90 minutes. Start by reading the introduction, explore interactive widgets in Clinical Trials, then try the quiz at the end. Prerequisites: basic statistics and R familiarity.</p>
        <ul className="mt-2 text-sm list-disc list-inside">
          <li>Objectives: Learn clinical trial phases, bias types and mitigation, and the structure of clinical documents (Protocol, SAP, CSR).</li>
          <li>Activities: Interact with the bias and phases modules, preview sample documents, then test your knowledge with the quiz.</li>
        </ul>
      </div>

      <nav className="flex gap-4 mt-4 text-sm" aria-label="Course 5 contents">
        <a href="#introduction" className="text-blue-600 hover:underline">Introduction</a>
        <a href="#scientific-method" className="text-blue-600 hover:underline">Scientific Method</a>
        <a href="#clinical-trials" className="text-blue-600 hover:underline">Clinical Trials</a>
        <a href="#documents" className="text-blue-600 hover:underline">Documents</a>
        <a href="#publications" className="text-blue-600 hover:underline">Publications</a>
      </nav>

  <section id="introduction">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          This course provides a comprehensive overview of clinical trials,
          from the foundational scientific method to the intricacies of trial design,
          essential documentation, and the process of scientific publication.
        </p>
      </section>

  <section id="scientific-method">
        <h2 className="text-2xl font-semibold mb-4">Scientific Method</h2>
  <h3 className="text-xl font-medium mb-2">Definition</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Empirical method for acquiring knowledge in science fields</li>
          <li>Emerged in the 17th century</li>
          <li>Involves careful observations with rigorous skepticism</li>
          <li>Can be biased by cognitive assumptions — see <DefinitionTooltip term="Selection Bias" definition="When baseline characteristics differ; randomization mitigates this." /> and <DefinitionTooltip term="Reporting Bias" definition="When reported results differ from what was planned; preregistration helps." />.</li>
          <li>Formulation and test of hypotheses is key</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Brief History</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>Ancient Egypt:</strong> Edwin Smith papyrus (~1600 BCE) - first signs of empirical methodology.</li>
          <li><strong>Classical antiquity:</strong> Thales (natural explanations), Aristotle (deductive logic, analytic inductive method).</li>
          <li><strong>Middle Ages:</strong> Ibn AL-HAYTHAM (father of modern optics), Roger BACON (founder of modern scientific method).</li>
          <li><strong>Renaissance:</strong> Francis BACON (father of empiricism), René DESCARTES (father of modern philosophy and rationalism).</li>
          <li><strong>Scientific Revolution / Age of Enlightenment:</strong> Galileo GALILEI (father of observational astronomy and modern science), Isaac NEWTON (founder of modern scientific method).</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Workflow</h3>
  <InteractiveWorkflow steps={scientificMethodWorkflow} />
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-200">
          <h4 className="font-semibold">Key takeaways</h4>
          <ul className="list-inside list-disc text-sm">
            <li>The scientific method is hypothesis-driven and iterative.</li>
            <li>Randomization and replication reduce bias in experiments.</li>
            <li>Understanding biases helps design more robust trials.</li>
          </ul>
        </div>
      </section>

  <section id="clinical-trials">
        <h2 className="text-2xl font-semibold mb-4">Clinical Trials</h2>
  <h3 className="text-xl font-medium mb-2">Definition</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Prospective biomedical or behavioral research study on human participants designed to answer specific questions about biomedical or behavioral interventions. See <DefinitionTooltip term="Randomization" definition="The process of allocating participants into treatment groups using chance to avoid selection bias." />.</li>
          <li>Application domains: treatments (vaccines, drugs, surgery…), dietary supplements, medical devices.</li>
          <li>Strictly controlled, monitored, and evaluated by international (FDA, EMEA) and national health authorities (ANSM). See <DefinitionTooltip term="Good Clinical Practice" definition="An international quality standard that protects participants and ensures trial integrity." />.</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Brief History</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>1747:</strong> First clinical trial by James LIND on scurvy.</li>
          <li><strong>John HAYGARTH:</strong> Demonstrated importance of control groups for placebo effect.</li>
          <li><strong>Ronald A. FISHER:</strong> Proved benefits of randomization, replication, and blocks.</li>
          <li><strong>Austin BRADFORD HILL:</strong> Pioneered randomized clinical trials (RCTs).</li>
        </ul>

  <h3 className="text-xl font-medium mb-2">Bias in Clinical Trials</h3>
        <BiasExplorer />

        <h3 className="text-xl font-medium mb-2">Phases of Clinical Trials</h3>
        <PhasesTimeline />
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-200">
          <h4 className="font-semibold">Key takeaways</h4>
          <ul className="list-inside list-disc text-sm">
            <li>Each trial phase has distinct goals: safety, efficacy, confirmation, and surveillance.</li>
            <li>Bias mitigation (randomization, blinding) preserves trial validity.</li>
            <li>SAP and protocol are required before unblinding to protect integrity.</li>
          </ul>
        </div>

        <h3 className="text-xl font-medium mb-2">Types of Clinical Trials</h3>
        <TrialTypeSelector />

  <h3 className="text-xl font-medium mb-2">Pyramid of Evidence</h3>
        <EvidencePyramid />

        <h3 className="text-xl font-medium mb-2">Clinical Trial Workflow</h3>
        <InteractiveWorkflow steps={clinicalTrialWorkflow} />
      </section>

  <section>
        <h2 className="text-2xl font-semibold mb-4">Clinical Documents</h2>
        <h3 className="text-xl font-medium mb-2">Good Clinical Practice (GCP)</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Emerged after the Doctors&apos; trial in Nuremberg (1947) to standardize medical trials.</li>
          <li>The Declaration of Helsinki (1964) stated GCP, an international quality standard for &quot;clinical trials on humans&quot;.</li>
          <li>Aims to protect human rights for subjects and volunteers in a clinical trial.</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Clinical Trial Protocol</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>First document to write before launching the trial.</li>
          <li>Describes objectives, design, methodology, statistical considerations, and organization.</li>
          <li>Provides background and rationale, highlighting research questions and ethical issues.</li>
          <li>Mandatory for ethics approval by local Ethics Committees or Institutional Review Boards.</li>
          <li>Must adhere to GCP principles.</li>
          <li><strong>Structure:</strong> Title page, Background, Objectives, Study Design, Selection/Exclusion, Treatments, Assessment, Adverse Events, Discontinuation, Statistical methodology, Quality Control, Ethics, Data handling, Publication policy, Project timetable, References, Supplements.</li>
          <li><a href="/documents/nejmoa2110345_protocol.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Example Protocol (PDF)</a></li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Statistical Analysis Plan (SAP)</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Complementary document (appendix of protocol).</li>
          <li>Details the scope of planned analysis: primary/secondary endpoints, analysis methods, pre-defined comparisons, significance levels, exploratory analyses.</li>
          <li>Mandatory for regulatory agencies.</li>
          <li>Also provides sample size calculation method.</li>
          <li><a href="/documents/SAP.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Example SAP (PDF)</a></li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Clinical Study Report (CSR)</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Most important document, summarizing study data and outcomes.</li>
          <li>Provides detailed description of study design and methodology.</li>
          <li>Part of the &quot;package&quot; sent to Health Authorities.</li>
          <li>Statistical analyses often validated by independent statisticians.</li>
          <li>Should respect ICH guidelines.</li>
        </ul>
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-200">
          <h4 className="font-semibold">Key takeaways</h4>
          <ul className="list-inside list-disc text-sm">
            <li>GCP ensures participant safety, ethics, and data quality.</li>
            <li>The Protocol and SAP define what will be done and how it will be analyzed.</li>
            <li>CSR consolidates results and supports regulatory decisions.</li>
          </ul>
        </div>
      </section>

  <section id="documents">
        <h2 className="text-2xl font-semibold mb-4">Scientific Publications</h2>
        <h3 className="text-xl font-medium mb-2">Brief History</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>1665:</strong> &quot;Journal des sçavans&quot; (France) and &quot;Philosophical Transactions of the Royal Society&quot; (UK) - first scientific journals.</li>
          <li>Key publications include Ole RØMER&apos;s estimation of the speed of light (1676) and Isaac NEWTON&apos;s &quot;New theory about light and colors&quot; (1672).</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Overview</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Allows submission of clinical trial results to independent reviewers.</li>
          <li>Two types of journals: specialized or generalist.</li>
          <li>Several publication formats: Review article, Letter, Research note, Data papers.</li>
          <li>Ranked according to &quot;impact factor&quot; (yearly mean number of citations).</li>
          <li><a href="/documents/NEJMoa2110345_article.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Example Article (PDF)</a></li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Structure of a Scientific Article</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>Title:</strong> Summary of content in one short sentence.</li>
          <li><strong>Abstract:</strong> Summary (5-10 sentences) structured in 4 parts: Background/Objectives, Methods, Results, Conclusions.</li>
          <li><strong>Introduction:</strong> Explains context and background of the work.</li>
          <li><strong>Material & Methods:</strong> Outlines experiment design, describes materials/subjects, data collection, and statistical analysis.</li>
          <li><strong>Results:</strong> Describes study sample demographics and presents data.</li>
          <li><strong>Discussion:</strong> Relates findings to hypothesis, reviews literature, interprets results, discusses limitations, suggests future work.</li>
          <li><strong>References:</strong> Links to cited studies/works.</li>
        </ul>
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-200">
          <h4 className="font-semibold">Key takeaways</h4>
          <ul className="list-inside list-disc text-sm">
            <li>Strong abstracts and clear methods are essential for reproducibility.</li>
            <li>Publishing begins science validation; peer review helps improve quality.</li>
          </ul>
        </div>
      </section>

  <section id="publications">
        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        <p>
          Feel free to review the material and prepare any questions you may have.
        </p>
        </section>

        <section>
          <Quiz questions={course5Questions} />
      </section>
    </div>
  );
};

export default Course5Section;