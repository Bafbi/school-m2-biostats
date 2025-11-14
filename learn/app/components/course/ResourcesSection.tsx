export default function ResourcesSection() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resources</h2>
      <p className="text-gray-900 mb-4">
        <strong>Documents:</strong>
      </p>
      <ul className="list-disc list-inside text-gray-900 mb-4">
        <li><a href="/documents/Article_Malaria.pdf" className="text-blue-600 hover:underline" target="_blank">Article on Malaria</a></li>
        <li><a href="/documents/cheatsheet_rmarkdown.pdf" className="text-blue-600 hover:underline" target="_blank">RMarkdown Cheatsheet</a></li>
        <li><a href="/documents/dplyr_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">dplyr Cheatsheet</a></li>
        <li><a href="/documents/ggplot2_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">ggplot2 Cheatsheet</a></li>
        <li><a href="/documents/lubridate_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">lubridate Cheatsheet</a></li>
        <li><a href="/documents/plotly_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">plotly Cheatsheet</a></li>
        <li><a href="/documents/shiny_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">Shiny Cheatsheet</a></li>
        <li><a href="/documents/stringr_cheatsheet.pdf" className="text-blue-600 hover:underline" target="_blank">stringr Cheatsheet</a></li>
      </ul>
      <p className="text-gray-900">
        <strong>Code:</strong> R scripts for descriptive statistics, dplyr, ggplot2, etc. in Code R & Data folder.
      </p>
    </section>
  );
}