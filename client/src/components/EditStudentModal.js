import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const EditStudentModal = ({ student, handleClose }) => {
    const [newFirstName, setNewFirstName] = useState(student.firstname)
    const [newLastName, setNewLastName] = useState(student.lastname)
    const [newGPA, setNewGPA] = useState(student.GPA)
    const [newDepartment, setNewDepartment] = useState(student.department_code)
    const [newSemester, setNewSemester] = useState(student.last_enrolled_semester)
    const [departments, setDepartments] = useState([])
    const [semesters, setSemesters] = useState([])

    const fetchDepartments = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/departments`);
        const data = await response.json();
        setDepartments(data);
    }

    const fetchSemesters = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/semesters`);
        const data = await response.json();
        setSemesters(data);
    }

    useEffect(() => {
        fetchDepartments().catch(() => toast.error('Failed to fetch departments'));
        fetchSemesters().catch(() => toast.error('Failed to fetch semesters'));
    }, []);

    const handleSubmit = () => {
        const newStudent = {
            firstname: newFirstName,
            lastname: newLastName,
            GPA: newGPA,
            department_code: newDepartment,
            last_enrolled_semester: newSemester,
            email: generateBuNetID() + '@mail.bradley.edu'
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/students/${student.bunet_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        }).then(() => {
            toast.success('Student updated successfully!')
            handleClose();
        }).catch(() => toast.error('Failed to update student!'))
    }

    const generateBuNetID = () => {
        if (newFirstName !== '' && newLastName !== '') return newFirstName[0].toLowerCase() + newLastName.toLowerCase();
        return '';
    }

    return (
        <div className="w-full h-screen text-white z-50 bg-black/80 fixed top-0 left-0 flex items-center justify-center">
            <div className="w-1/3 bg-slate-800 flex flex-col gap-4 px-8 py-6 rounded-md">
                <h2 className="text-lg font-bold capitalize">Edit {student.firstname} {student.lastname}</h2>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="firstname">First Name <span
                        className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        placeholder="John"
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="lastname">Last Name <span
                        className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        placeholder="Doe"
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                        required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="gpa">GPA <span
                        className="text-red-500">*</span></label>
                    <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        id="gpa"
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900"
                        placeholder="3.5"
                        value={newGPA}
                        onChange={(e) => setNewGPA(e.target.value)}
                        required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="department">Department <span
                        className="text-red-500">*</span></label>
                    <select
                        id='department'
                        name='department'
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                    >
                        <option disabled value=''>Select a department</option>
                        {departments.length > 0 && departments.map((department) => (
                            <option key={department.name} value={department.name}>{department.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="semester">Semester <span
                        className="text-red-500">*</span></label>
                    <select
                        id='semester'
                        name='semester'
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        value={newSemester}
                        onChange={(e) => setNewSemester(e.target.value)}
                    >
                        <option disabled value=''>Select a semester</option>
                        {semesters.length > 0 && semesters.map((semester) => (
                            <option key={semester.code} value={semester.code}>{semester.code}</option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="email">Email <span className="text-red-500">*</span></label>
                    <div className="relative w-full rounded-md overflow-hidden border-2 border-slate-900">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder={'jdoe'}
                            disabled
                            className="bg-slate-800 px-4 py-2 w-full pr-44"
                            value={generateBuNetID()}
                            required/>
                        <span
                            className="h-full rounded-md px-4 inline-flex items-center w-44 absolute right-0">@mail.bradley.edu</span>
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <button
                        className="rounded-full px-4 py-px bg-gray-300/25 text-gray-300 hover:bg-gray-400/25 transition-all"
                        onClick={handleClose}>
                        Cancel
                    </button>
                    <button
                        className="rounded-full px-4 py-px bg-blue-400/25 text-blue-400 hover:bg-blue-500/25 transition-all disabled:bg-gray-300/25 disabled:text-gray-400"
                        onClick={handleSubmit}
                        disabled={newFirstName === '' || newLastName === '' || newGPA === 0 || newDepartment === '' || newSemester === '' || newFirstName === student.firstname && newLastName === student.lastname && newGPA === student.GPA && newDepartment === student.department_code && newSemester === student.last_enrolled_semester}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditStudentModal;