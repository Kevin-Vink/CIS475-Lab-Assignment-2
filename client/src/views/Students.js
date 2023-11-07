import {Link} from "react-router-dom";
import {useState} from "react";
import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";
import {toast} from "react-toastify";

const students = [
    {
        buNetId: 'kvink',
        firstName: 'kevin',
        lastName: 'vink',
        email: 'kvink@mail.bradley.edu'
    },
    {
        buNetId: 'mengel',
        firstName: 'martijn',
        lastName: 'engel',
        email: 'mengel@mail.bradley.edu'
    }
]

function Students() {
    const [showAddStudentModal, setShowAddStudentModal] = useState(false)
    const [showEditStudentModal, setShowEditStudentModal] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState(null)

    const handleOpenEditModal = (student) => {
        setShowEditStudentModal(true)
        setSelectedStudent(student)
    }

    const handleDelete = (buNetId) => {
        toast.success(`Deleted student successfully!`)
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
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => (
                        <tr className="even:bg-neutral-900 odd:bg-neutral-900/50">
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {student.buNetId}
                            </th>
                            <td className="px-6 py-4 capitalize">
                                {student.firstName}
                            </td>
                            <td className="px-6 py-4 capitalize">
                                {student.lastName}
                            </td>
                            <td className="px-6 py-4 text-blue-400">
                                <a href={`mailto:${student.email}`}>{student.email}</a>
                            </td>
                            <td className="px-6 py-4 flex gap-x-6">
                                <Link
                                    to={`/students/${student.buNetId}`}
                                    className="rounded-full px-4 py-px bg-gray-300/25 text-gray-300 hover:bg-gray-400/25 transition-all">
                                    View Details
                                </Link>
                                <button type="button" onClick={() => handleOpenEditModal(student)}
                                        className="rounded-full px-4 py-px bg-blue-400/25 text-blue-400 hover:bg-blue-500/25 transition-all">
                                    Edit
                                </button>
                                <button type="button" className="rounded-full px-4 py-px bg-red-400/25 text-red-500 hover:bg-red-500/25 transition-all"
                                        onClick={() => handleDelete(student.buNetId)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showAddStudentModal && <AddStudentModal handleClose={() => setShowAddStudentModal(false)}/>}
            {showEditStudentModal &&
                <EditStudentModal firstName={selectedStudent.firstName} lastName={selectedStudent.lastName}
                                  handleClose={() => setShowEditStudentModal(false)}/>}
        </div>
    );
}

export default Students;