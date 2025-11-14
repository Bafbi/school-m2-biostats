import Link from "next/link";

const courses = [
  { id: 1, title: "Introduction to Biostatistics", description: "Overview, R, descriptive stats" },
  { id: 2, title: "Statistical Modeling #1", description: "Tests, univariate/multivariate models" },
  { id: 3, title: "Statistical Modeling #2", description: "ANOVA, non-linear, GLM" },
  { id: 4, title: "Statistical Modeling #3", description: "PCA, clustering, classification" },
  { id: 5, title: "Clinical Trials", description: "Trials, documents, publications" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Biostatistics Learning App
        </h1>
        <p className="text-lg text-center text-gray-900 mb-12">
          Interactive learning platform for M2 Biostatistics courses
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/course${course.id}`}>
              <div className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200">
                <h2 className="text-xl font-semibold text-black mb-2">
                  Course {course.id}: {course.title}
                </h2>
                <p className="text-gray-800">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
