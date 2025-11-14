export default function UsefulPackagesSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Useful Packages</h2>
      <ul className="list-disc list-inside text-gray-900 mb-4">
        <li><strong>dplyr:</strong> Data manipulation (mutate, select, filter, arrange, summarise, group_by)</li>
        <li><strong>stringr:</strong> String processing (detect, locate, extract, replace)</li>
        <li><strong>lubridate:</strong> Date/time processing</li>
        <li><strong>ggplot2:</strong> Static plots</li>
        <li><strong>plotly:</strong> Interactive plots</li>
        <li><strong>rmarkdown:</strong> Customizable documents</li>
        <li><strong>shiny:</strong> Web-apps</li>
      </ul>
      <p className="text-gray-900">Cheatsheets available in Documents folder.</p>
    </section>
  );
}