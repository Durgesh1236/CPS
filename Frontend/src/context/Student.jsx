import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const StudentProvider  = ({ children }) => {
  
    const [studentData, setStudentData] = useState([]);
    const [studentLoading, setLoading] = useState(false);
    const [StudentAuth, setStudentAuth] = useState(false);
    const [feeshistory, setFeesHistory] = useState([]);
    const ledgerId = studentData?.ledgerId;
    const studentclass = studentData?.studentClass;
    
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

    
    async function studentLogout(navigate) {
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

    async function feesHistory(ledgerId, studentclass){
        console.log(ledgerId, studentclass);
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/student-data/student/fee-history/${ledgerId}`, { studentclass });
            if(data.success){
                // if(data.studentClass == studentclass){
                setFeesHistory(data.feeHistory);
            //  }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
    if (ledgerId) {
        feesHistory(ledgerId, studentclass);
    }
   }, [ledgerId, studentclass]);

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