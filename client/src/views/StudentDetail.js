import {Link, useParams} from "react-router-dom";

const retrievedStudent = {
    buNetID: "jdoe",
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@mail.bradley.edu",
    courses: [
        {

        }
    ]
}

const StudentDetail = () => {
    const { id } = useParams();

    return (
        <div className="p-4 flex flex-col gap-4">
            <Link to='/students' className="text-white hover:text-slate-300">Back to Students</Link>
            <h1 className="text-2xl font-bold text-white capitalize">{retrievedStudent.firstName} {retrievedStudent.lastName}'s Details</h1>
            <div className="flex flex-col gap-4">
                <h2 className="text-white text-lg">Courses</h2>
            </div>
        </div>
    );
}

export default StudentDetail;