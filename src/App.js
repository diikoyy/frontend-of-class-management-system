import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Attendance} from './Attendance';
import { ExamRegis } from './ExamRegis';
import { Home } from './Home';
import {Module} from './Module';
import { Navigation } from './Navigation';
import { Student } from './Student';
import { StudentModule } from './StudentModule';
import logo from './logo.svg';

function App() {
  return (
		<BrowserRouter>
			<div className="container">
				<h3 className="m-3 d-flex justify-content-center">
					CLASS MANAGEMENT SYSTEM
				</h3>
				<Navigation />
				<Routes>
					<Route path="/" element={<Home />} exact />
					<Route path="/classroom_attendance" element={<Attendance />} />
					<Route path="/classroom_exam_regis" element={<ExamRegis />} />
					<Route path="/classroom_module" element={<Module />} />
					<Route path="/classroom_stu_modu" element={<StudentModule />} />
					<Route path="/classroom_student" element={<Student />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;