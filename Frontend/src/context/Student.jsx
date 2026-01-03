import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const StudentProvider  = ({ children }) => {
  
    const [studentData, setStudentData] = useState([]);
    const [studentLoading, setLoading] = useState(false);
    const [StudentAuth, setStudentAuth] = useState(false);

    async function StudentRegister(ledgerId, name, password){
        setLoading(true);
        try {
            const { data } = await axios.post("/api/student-data/student/register", { ledgerId, name, password });
            if(data.success){
                toast.success(data.message);
                setLoading(false);
                setStudentData(data);
            } else {
                toast.warning(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    
    async function StudentLogin(ledgerId, password, navigate) {
        setLoading(true);
        try {
            const {data} = await axios.post("/api/student-data/student/login", {ledgerId, password});
            if(data.success){
                setStudentData(data);
                toast.success(data.message);
                setStudentAuth(true);
                navigate('/student-home');
                setLoading(false);
            } else {
                toast.warning(data.message);
                // setStudentAuth(false)
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return <UserContext.Provider value={{
        StudentLogin,
        studentLoading,
        studentData,
        StudentRegister
    }}>{children}</UserContext.Provider>;
}

export const StudentData = () => useContext(UserContext);