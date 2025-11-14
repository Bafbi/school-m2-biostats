"use client";

import Quiz from '@/components/quiz/Quiz';
import IntroductionSection from '@/components/course/IntroductionSection';
import BiostatisticsSection from '@/components/course/BiostatisticsSection';
import ClinicalTrialSection from '@/components/course/ClinicalTrialSection';
import RStudioSection from '@/components/course/RStudioSection';
import UsefulPackagesSection from '@/components/course/UsefulPackagesSection';
import DescriptiveStatisticsSection from '@/components/course/DescriptiveStatisticsSection';
import ResourcesSection from '@/components/course/ResourcesSection';

const questions = [
  {
    question: "What is biostatistics?",
    options: ["Study of biological systems", "Application of statistics to biological and medical data", "Analysis of big data", "Programming in R"],
    answer: 1
  },
  {
    question: "Which package is used for data manipulation in R?",
    options: ["ggplot2", "dplyr", "shiny", "lubridate"],
    answer: 1
  },
  {
    question: "What does R² represent in descriptive statistics?",
    options: ["Mean value", "Proportion of variability explained", "Standard deviation", "Median"],
    answer: 1
  }
];

export default function Course1() {

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Course 1: Introduction to Biostatistics</h1>

        <IntroductionSection />

        <BiostatisticsSection />

        <ClinicalTrialSection />

        <RStudioSection />

        <UsefulPackagesSection />

        <DescriptiveStatisticsSection />

        <Quiz questions={questions} />

        <ResourcesSection />
      </div>
    </div>
  );
}