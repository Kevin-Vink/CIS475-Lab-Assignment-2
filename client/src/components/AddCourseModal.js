import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

const AddCourseModal = ({ handleClose, currentCourses, semester }) => {
    const { id } = useParams();
    const [courses, setCourses] = useState([])

    const fetchSemesterCourses = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/semesters/${semester}/courses`);
        const data = await response.json();

        const filteredData = data.filter((course) => {
            return !currentCourses.some((currentCourse) => currentCourse.code === course.code);
        })

        setCourses(filteredData);
    }

    useEffect(() => {
        fetchSemesterCourses().catch(() => toast.error('Failed to fetch semester courses'));
    }, []);

    const handleAddCourse = (code) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/students/${id}/courses/${code}`, {
            method: 'POST'
        }).then(() => {
            toast.success(`Added ${code}!`)
            handleClose();
        }).catch(() => toast.error('Failed to add course!'))
    }

    return (
        <div
            className="w-full text-white h-screen z-50 bg-black/80 fixed top-0 left-0 flex items-center justify-center">
            <div className="w-3/4 bg-slate-800 flex flex-col gap-4 px-8 py-6 rounded-md">
                <h2 className="text-lg font-bold">Add a new course</h2>
                {courses.length === 0 ? <p className="text-sm text-gray-400">No courses available to add</p> : (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-7 pb-2">
                            <p className="font-bold capitalize">code</p>
                            <p className="col-span-2 capitalize">name</p>
                            <p className="capitalize">credits</p>
                            <p className="col-span-2 capitalize">professor</p>
                        </div>
                        <div className="rounded-md overflow-hidden border border-slate-900 divide-y divide-slate-900">
                            {courses.map((course) => {
                                    return (
                                        <div key={course.code} className="grid grid-cols-7 bg-black/10 p-2">
                                            <p className="font-bold">{course.code}</p>
                                            <p className="col-span-2 text-gray-400 overflow-ellipsis whitespace-nowrap overflow-hidden pr-2">{course.name}</p>
                                            <span
                                                className="rounded-full w-fit px-2 py-px bg-blue-500/25 text-blue-500">{course.credit_hours}</span>
                                            <p className="col-span-2 text-white"><span className="text-gray-400">Prof.</span> {course.firstname}</p>
                                            <button
                                                className="rounded-full w-fit px-4 justify-self-end text-sm py-px bg-green-400/25 text-green-400 hover:bg-green-500/25 transition-all"
                                                onClick={() => handleAddCourse(course.code)}>
                                                Add
                                            </button>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                )}
                <div className="flex gap-x-2">
                    <button
                        className="rounded-full px-4 py-px bg-gray-300/25 text-gray-300 hover:bg-gray-400/25 transition-all"
                        onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddCourseModal;