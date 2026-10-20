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
                setStudentData(data.user);
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
            toast.error(error.response?.data?.message || 'Unable to sign in. Please try again.');
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
        try {
            const { data } = await axios.post(`/api/student-data/student/fee-history/${ledgerId}`, { studentclass });
            if(data.success){
                setFeesHistory(data.feeHistory);
            } else {
                setFeesHistory([]);
            }
        } catch (error) {
            setFeesHistory([]);
        }
    }

    async function getStudentAttendance(ledgerId, date){
        try{
            const { data } = await axios.get(`/api/student-data/student-attendance/${ledgerId}`, {
                params: { date },
            });
            return data.studentAttendence?.[0] || null;
        } catch (error) {
            throw error;
        } 
    }

    async function getStudentTests(className){
        try {
            const { data } = await axios.get('/api/student-data/student/test-questions', {
                params: { className },
            });
            return data.tests || [];
        } catch (error) {
            throw error;
        }
    }

    async function submitStudentTest(testId, answers){
        try {
            const { data } = await axios.post('/api/student-data/student/test-submit', { testId, answers });
            if (!data.success) throw new Error(data.message || 'Test submission failed');
            return data.submission;
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Unable to submit test');
            throw error;
        }
    }
    useEffect(() => {
    if (ledgerId) {
        feesHistory(ledgerId, studentclass, studentData?.studentName);
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
        studentLogout,
        feeshistory,
        getStudentAttendance,
        getStudentTests,
        submitStudentTest,
    }}>{children}</UserContext.Provider>;
}

export const StudentData = () => useContext(UserContext);