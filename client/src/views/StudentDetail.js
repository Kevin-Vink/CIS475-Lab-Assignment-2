import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import AddCourseModal from "../components/AddCourseModal";

const StudentDetail = () => {
    const { id } = useParams();
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [retrievedStudent, setRetrievedStudent] = useState({});

    useEffect(() => {
        fetchStudent().catch(() => toast.error("Failed to fetch student"));
    }, []);

    const fetchStudent = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/students/${id}`);
        const data = await response.json();
        setRetrievedStudent(data)
    }

    const handleDropCourse = (courseId) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/students/${id}/courses/${courseId}`, {
            method: 'DELETE'
        }).then(() => {
            toast.success(`Dropped course successfully!`)
            fetchStudent().catch(() => toast.error('Failed to fetch student'))
        }).catch(() => toast.error('Failed to drop course!'))
    }

    const handleCloseAddCourseModal = () => {
        setShowAddCourseModal(false);
        fetchStudent().catch(() => toast.error('Failed to fetch student'))
    }

    console.log(retrievedStudent.courses)

    return (
        <div className="p-4 flex flex-col gap-4">
            <Link to='/students' className="text-white hover:text-slate-300">Back to Students</Link>
            <h1 className="text-2xl font-bold text-white capitalize">{retrievedStudent.firstname} {retrievedStudent.lastname} Details</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-white text-lg">{retrievedStudent.department} Courses</h2>
                    <button type="button"
                            onClick={() => setShowAddCourseModal(true)}
                            className="rounded-full text-base font-normal px-4 py-px bg-blue-400/25 text-blue-400 hover:bg-blue-500/25 transition-all">
                        Add Course
                    </button>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400 rounded-md overflow-hidden">
                        <thead className="text-xs text-gray-300 uppercase bg-neutral-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Semester
                            </th>
                            <th scope="col" className="px-6 py-3">
                                name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                credit hours
                            </th>
                            <th scope="col" className="px-6 py-3">
                                professor
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {retrievedStudent.courses && retrievedStudent.courses.map((course) => (
                            <tr key={course.code} className="even:bg-neutral-900 odd:bg-neutral-900/50">
                                <th className="px-6 py-4">
                                    <div className="text-sm text-white">{course.code}</div>
                                </th>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-white">{course.semester}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-white">{course.name}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className="rounded-full px-2 py-px bg-blue-400/25 text-blue-500 hover:bg-blue-500/25 transition-all">
                                        {course.creditHours}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-white"><span className="text-neutral-400">Prof.</span> {course.professor}</div>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleDropCourse(course.code)}
                                            className="rounded-full px-4 py-px bg-red-400/25 text-red-400 hover:bg-red-500/25 transition-all">
                                        Drop
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showAddCourseModal && <AddCourseModal currentCourses={retrievedStudent.courses} semester={retrievedStudent.semester} handleClose={handleCloseAddCourseModal} />}
        </div>
    );
}

export default StudentDetail;