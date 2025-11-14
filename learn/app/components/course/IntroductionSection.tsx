export default function IntroductionSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-black mb-4">Introduction</h2>
      <p className="text-gray-800 mb-4">
        <strong>Teacher:</strong> François Machuron, engineer in Statistics and Biostatistics with 12 years experience.
      </p>
      <p className="text-gray-800 mb-4">
        <strong>Course Structure:</strong> 7 sessions covering introduction, statistical modeling, biostatistics topics, and exam.
      </p>
      <ul className="list-disc list-inside text-gray-800">
        <li>1) Introduction to the course, R and descriptive statistics</li>
        <li>2) Statistical modeling #1</li>
        <li>3) Statistical modeling #2</li>
        <li>4) Statistical modeling #3</li>
        <li>5) Biostatistics #1</li>
        <li>6) Biostatistics #2</li>
        <li>7) Exam</li>
      </ul>
    </section>
  );
}