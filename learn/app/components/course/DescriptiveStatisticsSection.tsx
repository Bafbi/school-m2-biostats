export default function DescriptiveStatisticsSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Descriptive Statistics</h2>
      <p className="text-gray-900 mb-4">
        <strong>Continuous Variables:</strong> Mean, SD, median, mode, min/max, quartiles, correlation, covariance.
      </p>
      <p className="text-gray-900 mb-4">
        <strong>Categorical Variables:</strong> Mode, contingency tables, percentages.
      </p>
      <p className="text-gray-900">Descriptive table: Mean±SD or median(Q1;Q3) for continuous; count(%) for categorical.</p>
    </section>
  );
}