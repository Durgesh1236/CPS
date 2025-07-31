import { useEffect, useRef, useState } from 'react';
import Layout from '../Components/Layout';
import { assets } from '../assets/assets';

const images = [
  assets.cps1,
  assets.cps4,
  assets.cps3
  // '/images/school4.jpg',
];

const totalStudents = 600;
const totalTeachers = 25;

const director = {
  name: 'Mr. Pawan Kumar Jha Pankaj',
  contact: '+91 9801496128',
  image: assets.director,
};

const principal = {
  name: 'Mrs. Shadhana Kumari',
  contact: '+91 9006664115',
  image: assets.principal,
};

const schoolDescription = `Established in 2009, Central Public School is a trusted name in quality education, offering classes from Nursery to Class 8. We are more than just a school — we are a nurturing family where every child is valued, encouraged, and guided to achieve their full potential.
Our safe and welcoming campus, experienced faculty, and student-focused environment make learning a joyful journey. Along with strong academics, we focus on character-building, creativity, discipline, and values that prepare your child not just for exams, but for life.
Join us in shaping bright futures with love, care, and excellence — because your child's growth is our greatest reward.`;

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const studentInterval = useRef();
  const teacherInterval = useRef();

  // Image carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animated student count
  useEffect(() => {
    studentInterval.current = setInterval(() => {
      setStudentCount((prev) => {
        if (prev < totalStudents) return prev + 10;
        clearInterval(studentInterval.current);
        return totalStudents;
      });
    }, 20);
    return () => clearInterval(studentInterval.current);
  }, []);

  // Animated teacher count
  useEffect(() => {
    teacherInterval.current = setInterval(() => {
      setTeacherCount((prev) => {
        if (prev < totalTeachers) return prev + 1;
        clearInterval(teacherInterval.current);
        return totalTeachers;
      });
    }, 40);
    return () => clearInterval(teacherInterval.current);
  }, []);

  return (
    <Layout>
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      {/* Carousel */}
      <div className="w-full max-w-5xl mx-auto mt-6 rounded-lg overflow-hidden shadow-lg">
        <img
          src={images[current]}
          alt={`School ${current + 1}`}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] object-cover transition-all duration-700"
        />
        <div className="flex justify-center gap-2 py-2 bg-white">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${current === idx ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center w-64">
          <span className="text-4xl font-bold text-blue-600">{studentCount} +</span>
          <span className="text-lg text-gray-700 mt-2">Total Students</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center w-64">
          <span className="text-4xl font-bold text-green-600">{teacherCount} +</span>
          <span className="text-lg text-gray-700 mt-2">Total Teachers</span>
        </div>
      </div>

      {/* School Description */}
      <div className="flex flex-col md:flex-row items-center max-w-5xl mx-auto my-8 bg-white rounded shadow p-6 gap-6">
        <img
          src={assets.cps3}
          alt="Central Public School"
          className="w-full md:w-1/3 h-48 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-700">About Central Public School</h2>
          <p className="text-gray-700">{schoolDescription}</p>
        </div>
      </div>

      {/* Director & Principal */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-8">
        <div className="bg-white rounded shadow p-6 flex flex-col items-center w-80">
          <img src={director.image} alt="Director" className="w-24 h-24 rounded-full mb-4 object-cover" />
          <span className="text-xl font-semibold">{director.name}</span>
          <span className="text-gray-600">Director</span>
          <span className="text-blue-600 mt-2">{director.contact}</span>
        </div>
        <div className="bg-white rounded shadow p-6 flex flex-col items-center w-80">
          <img src={principal.image} alt="Principal" className="w-24 h-24 rounded-full mb-4 object-cover" />
          <span className="text-xl font-semibold">{principal.name}</span>
          <span className="text-gray-600">Principal</span>
          <span className="text-blue-600 mt-2">{principal.contact}</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 bg-gray-800 text-center text-white mt-auto">
        &copy; {new Date().getFullYear()} Central Public School. All rights reserved.
      </footer>
    </div>
    </Layout>
  );
};

export default HomePage