import React, { useState, useEffect } from 'react';
import LayoutStu from '../Components/LayoutStu';

// Mock subjects and questions
const subjects = [
	{
		name: 'Mathematics',
		questions: [
			{ q: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: 1 },
			{ q: 'What is 5 x 3?', options: ['8', '15', '10', '12'], answer: 1 },
			{ q: 'Square root of 16?', options: ['2', '4', '8', '6'], answer: 1 },
		],
	},
	{
		name: 'Science',
		questions: [
			{ q: 'Water boils at?', options: ['90°C', '100°C', '80°C', '120°C'], answer: 1 },
			{ q: 'Sun is a?', options: ['Planet', 'Star', 'Comet', 'Asteroid'], answer: 1 },
			{ q: 'H2O is?', options: ['Oxygen', 'Hydrogen', 'Water', 'Helium'], answer: 2 },
		],
	},
];

const TIMER_DURATION = 5 * 60; // 5 minutes in seconds

function StudentTest() {
	const [selectedSubject, setSelectedSubject] = useState(null);
	const [testStarted, setTestStarted] = useState(false);
	const [timer, setTimer] = useState(TIMER_DURATION);
	const [currentQ, setCurrentQ] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [reviewMode, setReviewMode] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	// Timer effect
	useEffect(() => {
		if (testStarted && !reviewMode && !submitted && timer > 0) {
			const interval = setInterval(() => setTimer(t => t - 1), 1000);
			return () => clearInterval(interval);
		}
		if (timer === 0 && testStarted && !submitted) {
			handleReview();
		}
	}, [testStarted, timer, reviewMode, submitted]);

	const handleStart = () => {
		setTestStarted(true);
		setTimer(TIMER_DURATION);
		setAnswers(Array(selectedSubject.questions.length).fill(null));
		setCurrentQ(0);
		setReviewMode(false);
		setSubmitted(false);
	};

	const handleOption = idx => {
		if (reviewMode || submitted) return;
		setAnswers(ans => {
			const copy = [...ans];
			copy[currentQ] = idx;
			return copy;
		});
	};

	const handleNext = () => {
		if (currentQ < selectedSubject.questions.length - 1) setCurrentQ(q => q + 1);
	};
	const handlePrev = () => {
		if (currentQ > 0) setCurrentQ(q => q - 1);
	};

	const handleReview = () => {
		setReviewMode(true);
		setTestStarted(false);
	};

	const handleFinalSubmit = () => {
		setSubmitted(true);
		setReviewMode(false);
	};

	const getResult = () => {
		let correct = 0;
		selectedSubject.questions.forEach((q, i) => {
			if (answers[i] === q.answer) correct++;
		});
		return { correct, total: selectedSubject.questions.length };
	};

	// Timer display
	const min = String(Math.floor(timer / 60)).padStart(2, '0');
	const sec = String(timer % 60).padStart(2, '0');

	return (
		<LayoutStu>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-2 animate-fade-in">
				<div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 mt-8">
					<h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Student Test</h2>

					{/* Subject Selection */}
					{!selectedSubject && (
						<div className="flex flex-col gap-4">
							<h3 className="text-lg font-semibold text-gray-700 mb-2">Select Subject:</h3>
							{subjects.map((subj, idx) => (
								<button
									key={subj.name}
									className="w-full py-3 rounded-xl bg-blue-100 hover:bg-blue-300 text-blue-800 font-bold shadow transition"
									onClick={() => setSelectedSubject(subjects[idx])}
								>
									{subj.name}
								</button>
							))}
						</div>
					)}

					{/* Start Test Button */}
					{selectedSubject && !testStarted && !reviewMode && !submitted && (
						<div className="flex flex-col items-center gap-4 mt-6">
							<h3 className="text-lg font-semibold text-gray-700">Subject: <span className="text-blue-600">{selectedSubject.name}</span></h3>
							<button
								className="px-8 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-lg shadow-lg transition"
								onClick={handleStart}
							>
								Start Test
							</button>
						</div>
					)}

					{/* Test Section */}
					{testStarted && selectedSubject && !reviewMode && !submitted && (
						<div className="flex flex-col gap-4 mt-4">
							<div className="flex justify-between items-center mb-2">
								<span className="font-semibold text-purple-700">Time Left: <span className="font-mono text-lg">{min}:{sec}</span></span>
								<span className="font-semibold text-gray-600">Q {currentQ + 1} / {selectedSubject.questions.length}</span>
							</div>
							<div className="bg-blue-50 rounded-xl p-4 shadow">
								<h4 className="font-bold text-lg mb-2">{selectedSubject.questions[currentQ].q}</h4>
								<div className="flex flex-col gap-2">
									{selectedSubject.questions[currentQ].options.map((opt, idx) => (
										<button
											key={idx}
											className={`w-full py-2 rounded-lg border ${answers[currentQ] === idx ? 'bg-blue-400 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300'} font-semibold shadow-sm transition`}
											onClick={() => handleOption(idx)}
										>
											{opt}
										</button>
									))}
								</div>
							</div>
							<div className="flex justify-between mt-2">
								<button
									className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
									onClick={handlePrev}
									disabled={currentQ === 0}
								>Previous</button>
								<button
									className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
									onClick={handleNext}
									disabled={currentQ === selectedSubject.questions.length - 1}
								>Next</button>
							</div>
							<button
								className="w-full mt-4 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg shadow-lg transition"
								onClick={handleReview}
							>
								Review & Submit
							</button>
						</div>
					)}

					{/* Review Section */}
					{reviewMode && selectedSubject && !submitted && (
						<div className="flex flex-col gap-4 mt-4">
							<h3 className="text-lg font-bold text-blue-700 mb-2 text-center">Review Your Answers</h3>
							<div className="flex flex-col gap-2">
								{selectedSubject.questions.map((q, idx) => (
									<div key={idx} className="bg-gray-100 rounded-xl p-3 flex flex-col md:flex-row md:items-center md:justify-between">
										<div className="font-semibold text-gray-700">Q{idx + 1}: {q.q}</div>
										<div className={
											answers[idx] === null
												? 'text-red-500 font-bold'
												: 'text-green-700 font-bold'
										}>
											{answers[idx] === null ? 'Not Answered' : q.options[answers[idx]]}
										</div>
									</div>
								))}
							</div>
							<button
								className="w-full mt-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transition"
								onClick={handleFinalSubmit}
							>
								Final Submit
							</button>
						</div>
					)}

					{/* Result Section */}
					{submitted && selectedSubject && (
						<div className="flex flex-col gap-4 mt-4 items-center">
							<h3 className="text-2xl font-bold text-green-700 mb-2">Test Submitted!</h3>
							<div className="text-lg font-semibold text-gray-700">Subject: <span className="text-blue-600">{selectedSubject.name}</span></div>
							<div className="text-xl font-bold text-purple-700">Result: {getResult().correct} / {getResult().total} correct</div>
							<button
								className="w-full mt-4 py-3 rounded-xl bg-gray-400 text-white font-bold text-lg shadow-lg cursor-not-allowed opacity-60"
								disabled
							>Test Locked</button>
							<button
								className="w-full mt-2 py-2 rounded-xl bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold shadow"
								onClick={() => {
									setSelectedSubject(null);
									setTestStarted(false);
									setReviewMode(false);
									setSubmitted(false);
									setAnswers([]);
									setCurrentQ(0);
									setTimer(TIMER_DURATION);
								}}
							>Take Another Test</button>
						</div>
					)}
				</div>
			</div>
		</LayoutStu>
	);
}

export default StudentTest;
