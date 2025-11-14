// app/course5/page.tsx
import Course5Section from '../components/course/Course5Section';

export default function Course5Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Course5Section />
      </div>
    </main>
  );
}
