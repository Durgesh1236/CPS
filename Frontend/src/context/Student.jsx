import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const StudentProvider  = ({ children }) => {
  
    const [studentData, setStudentData] = useState([]);
    const [studentLoading, setLoading] = useState(false);
    const [StudentAuth, setStudentAuth] = useState(false);
// console.log(studentData.ledgerId);

    // async function StudentRegister(ledgerId, name, password){
    //     setLoading(true);
    //     try {
    //         const { data } = await axios.post("/api/student-data/student/register", { ledgerId, name, password });
    //         if(data.success){
    //             toast.success(data.message);
    //             setLoading(false);
    //             setStudentData(data);
    //         } else {
    //             toast.warning(data.message);
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         setLoading(false);
    //     }
    // }
    
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
                setStudentAuth(false)
                setLoading(false);
            }
        } catch (error) {
            // console.log(error);
            setStudentAuth(false);
            setLoading(false);
        }
    }

    async function fetchStudentData(){
        setLoading(true);
        try {
            const { data } = await axios.post("/api/student-data/student/profile");
            // if(data.success){
                setStudentData(data.user);
                setStudentAuth(true);
                setLoading(false);
            // } 
        } catch (error) {
            setLoading(false);
            setStudentAuth(false);
        }
    }

    
    async function studentLogout() {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/student-data/student/logout");
            if(data.success) {
                toast.success(data.message);
                setStudentAuth(false);
                setStudentData(null);
                setLoading(false);
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            setStudentAuth(true);
        }
    }
    useEffect(() => {
        fetchStudentData();
    },[])

    return <UserContext.Provider value={{
        StudentLogin,
        studentLoading,
        studentData,
        // StudentRegister,
        StudentAuth,
        studentLogout
    }}>{children}</UserContext.Provider>;
}

export const StudentData = () => useContext(UserContext);