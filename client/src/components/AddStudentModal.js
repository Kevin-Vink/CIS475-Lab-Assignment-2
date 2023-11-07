import {useEffect, useState} from "react";
import {toast} from "react-toastify";

const AddStudentModal = ({ handleClose }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [department, setDepartment] = useState('')
    const [semester, setSemester] = useState('')
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
        const student = {
            firstname: firstName,
            lastname: lastName,
            GPA: (Math.random() * (4.0)).toFixed(2),
            department_code: department,
            last_enrolled_semester: semester,
            email: generateBuNetID() + '@mail.bradley.edu'
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        }).then(() => {
            toast.success('Student created successfully!')
            handleClose();
        }).catch(() => toast.error('Failed to create student!'))
    }

    const generateBuNetID = () => {
        if (firstName !== '' && lastName !== '') return firstName[0].toLowerCase() + lastName.toLowerCase();
        return '';
    }

    return (
        <div className="w-full text-white h-screen z-50 bg-black/80 fixed top-0 left-0 flex items-center justify-center">
            <div className="w-1/3 bg-slate-800 flex flex-col gap-4 px-8 py-6 rounded-md">
                <h2 className="text-lg font-bold">Create a new student</h2>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="firstname">First Name <span
                        className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required/>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm" htmlFor="department">Department <span
                        className="text-red-500">*</span></label>
                    <select
                        id='department'
                        name='department'
                        className="bg-slate-900 rounded-md px-4 py-2 border-2 border-slate-900 capitalize"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
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
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
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
                        className="rounded-full px-4 py-px bg-green-400/25 text-green-400 hover:bg-green-500/25 transition-all disabled:bg-gray-300/25 disabled:text-gray-400"
                        onClick={handleSubmit}
                        disabled={firstName === '' || lastName === '' || department === '' || semester === ''}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddStudentModal;