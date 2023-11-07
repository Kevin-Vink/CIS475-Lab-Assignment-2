import {useState} from "react";
import {toast} from "react-toastify";

const AddStudentModal = ({ handleClose }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = () => {
        const student = {
            firstName: firstName,
            lastName: lastName,
            buNetID: generateBuNetID(),
            email: generateBuNetID() + '@mail.bradley.edu'
        }

        console.log(student);
        toast.success('Student created successfully!')
        handleClose();
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
                    <label className="text-sm" htmlFor="bunetid">BuNetID <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="bunetid"
                        id="bunetid"
                        disabled
                        className="bg-slate-800 rounded-md px-4 py-2 border-2 border-slate-900"
                        placeholder="jdoe"
                        value={generateBuNetID()}
                        required/>
                </div>
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
                        disabled={firstName === '' || lastName === ''}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddStudentModal;