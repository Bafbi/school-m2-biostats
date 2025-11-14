// app/components/course/Course5Section.tsx
import React from 'react';

const Course5Section: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Course #5: Clinical Trials</h1>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          This course provides a comprehensive overview of clinical trials,
          from the foundational scientific method to the intricacies of trial design,
          essential documentation, and the process of scientific publication.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Scientific Method</h2>
        <h3 className="text-xl font-medium mb-2">Definition</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Empirical method for acquiring knowledge in science fields</li>
          <li>Emerged in the 17th century</li>
          <li>Involves careful observations with rigorous skepticism</li>
          <li>Can be biased by cognitive assumptions</li>
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
        <p className="mb-4">
          The scientific method involves a systematic workflow, typically including observation,
          hypothesis formulation, experimentation, data analysis, and conclusion.
          (Further interactive elements or diagrams can be added here later).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Clinical Trials</h2>
        <h3 className="text-xl font-medium mb-2">Definition</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li>Prospective biomedical or behavioral research study on human participants designed to answer specific questions about biomedical or behavioral interventions.</li>
          <li>Application domains: treatments (vaccines, drugs, surgery…), dietary supplements, medical devices.</li>
          <li>Strictly controlled, monitored, and evaluated by international (FDA, EMEA) and national health authorities (ANSM).</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Brief History</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>1747:</strong> First clinical trial by James LIND on scurvy.</li>
          <li><strong>John HAYGARTH:</strong> Demonstrated importance of control groups for placebo effect.</li>
          <li><strong>Ronald A. FISHER:</strong> Proved benefits of randomization, replication, and blocks.</li>
          <li><strong>Austin BRADFORD HILL:</strong> Pioneered randomized clinical trials (RCTs).</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Bias in Clinical Trials</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>Selection bias:</strong> Systematic differences between baseline characteristics of compared groups. Controlled by randomization.</li>
          <li><strong>Performance bias:</strong> Systematic differences in care or exposure to factors other than interventions. Controlled by blinding.</li>
          <li><strong>Attrition bias:</strong> Systematic differences in withdrawals from a study (missing values).</li>
          <li><strong>Reporting bias:</strong> Systematic differences between reported and unreported findings.</li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Phases of Clinical Trials</h3>
        <p className="mb-4">
          Clinical trials typically progress through several phases, each designed to answer different questions and gather specific data. This process involves significant time and cost, with many drugs evaluated.
          (Interactive visualization of phases can be added here).
        </p>

        <h3 className="text-xl font-medium mb-2">Types of Clinical Trials</h3>
        <ul className="list-disc list-inside ml-4 mb-4">
          <li><strong>Cohort Study:</strong> Exposure → Outcome</li>
          <li><strong>Case-Control Study:</strong> Exposure ← Outcome</li>
          <li><strong>Cross-Sectional Study:</strong> Exposure & Outcome at a single point in time.</li>
          <li><strong>Randomized Clinical Trial (RCT):</strong>
            <ul className="list-circle list-inside ml-6">
              <li>Highest level of evidence (&quot;Gold Standard&quot;).</li>
              <li>Often two-parallel groups studied longitudinally.</li>
              <li>Patients randomly allocated to groups for balanced characteristics.</li>
              <li>Typically two groups: &quot;Controlled&quot; (placebo or standard of care) and New treatment.</li>
              <li>Variations: Parallel Trial, Cross-Over Trial, Matched-Pair Trial.</li>
            </ul>
          </li>
        </ul>

        <h3 className="text-xl font-medium mb-2">Pyramid of Evidence</h3>
        <p className="mb-4">
          The pyramid of evidence illustrates the hierarchy of different study designs based on their strength of evidence. RCTs are at the top.
          (Diagram or interactive element can be added here).
        </p>

        <h3 className="text-xl font-medium mb-2">Clinical Trial Workflow</h3>
        <p className="mb-4">
          The workflow of a clinical trial involves several key stages, from protocol writing to publication and marketing.
          (Interactive flowchart can be added here).
        </p>
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
          <li>Part of the "package" sent to Health Authorities.</li>
          <li>Statistical analyses often validated by independent statisticians.</li>
          <li>Should respect ICH guidelines.</li>
        </ul>
      </section>

      <section>
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
          <li>Ranked according to "impact factor" (yearly mean number of citations).</li>
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
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Questions</h2>
        <p>
          Feel free to review the material and prepare any questions you may have.
        </p>
      </section>
    </div>
  );
};

export default Course5Section;
