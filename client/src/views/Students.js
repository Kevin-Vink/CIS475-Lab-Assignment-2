import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import {toast} from "react-toastify";

function Students() {
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)
    const [showEditStudentModal, setShowEditStudentModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [students, setStudents] = useState([])

    const fetchStudents = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/students`)
        const data = await response.json()
        setStudents(data)
    }

    useEffect(() => {
        fetchStudents().catch((err) => toast.error('Failed to fetch students'))
    }, []);


    const handleOpenEditModal = (student) => {
        setShowEditStudentModal(true)
        setSelectedStudent(student)
    }

    const handleDelete = (buNetId) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/students/${buNetId}`, {
            method: 'DELETE'
        }).then(() => {
            toast.success(`Deleted student successfully!`)
            fetchStudents().catch(() => toast.error('Failed to fetch students'))
        }).catch(() => toast.error('Failed to delete student!'))
    }

    const handleCloseCreateModal = () => {
        setShowAddStudentModal(false)
        fetchStudents().catch(() => toast.error('Failed to fetch students'))
    }

    const handleCloseEditModal = () => {
        setShowEditStudentModal(false)
        fetchStudents().catch(() => toast.error('Failed to fetch students'))
    }

    return (
        <div className="bg-neutral-800 p-4 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-xl font-bold text-white">Students</h1>
                <button type="button" onClick={() => setShowAddStudentModal(!showAddStudentModal)}
                        className="rounded-full text-base font-normal px-4 py-px bg-blue-400/25 text-blue-400 hover:bg-blue-500/25 transition-all">
                    Add Student
                </button>
            </div>
            {students.length > 0 ? (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400 rounded-md overflow-hidden">
                        <thead className="text-xs text-gray-300 uppercase bg-neutral-900">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                BuNetID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                First Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                GPA
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((student) => (
                            <tr key={student.bunet_id} className="even:bg-neutral-900 odd:bg-neutral-900/50">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {student.bunet_id}
                                </th>
                                <td className="px-6 py-4 capitalize">
                                    {student.firstname}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {student.lastname}
                                </td>
                                <td className="px-6 py-4 text-blue-400">
                                    <a href={`mailto:${student.email}`}>{student.email}</a>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-green-500/25 text-green-500 rounded-full">{student.GPA}</span>
                                </td>
                                <td className="px-6 py-4 flex gap-x-6 w-full">
                                    <Link
                                        to={`/${student.bunet_id}`}
                                        className="rounded-full px-4 py-px bg-gray-300/25 text-gray-300 hover:bg-gray-400/25 transition-all">
                                        View Details
                                    </Link>
                                    <button type="button" onClick={() => handleOpenEditModal(student)}
                                            className="rounded-full px-4 py-px bg-blue-400/25 text-blue-400 hover:bg-blue-500/25 transition-all">
                                        Edit
                                    </button>
                                    <button type="button"
                                            className="rounded-full px-4 py-px bg-red-400/25 text-red-500 hover:bg-red-500/25 transition-all"
                                            onClick={() => handleDelete(student.bunet_id)}>Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-white">No students found</p>
            )}
            {showAddStudentModal && <AddStudentModal handleClose={handleCloseCreateModal}/>}
            {showEditStudentModal && <EditStudentModal student={selectedStudent} handleClose={handleCloseEditModal}/>}
        </div>
    );
}

export default Students;