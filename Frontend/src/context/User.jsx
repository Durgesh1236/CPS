import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAuth, setisAuth] = useState(false);
    const [teacherList, setTeacherList] = useState([]);
    const [FeesSubmitList, setFeeSubmitList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState([]);
    const [results, setResults] = useState([]); 
    const [spendlist, setSpendList] = useState([]);
    // axios.defaults.withCredentials = true;
    async function registerTeacher(name, email, password, mobileNo, role, setForm) {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", { name, email, password, mobileNo, role });
            if (data.success) {
                toast.success(data.message);
                setLoading(false);
                setForm([])
            } else {
                toast.error(data.message);
                setLoading(false);
                setisAuth(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function loginTeacher(email, password, navigate) {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            if (data.success) {
                toast.success(data.message);
                setUser(data.user);
                setisAuth(true);
                setLoading(false);
                navigate('/teacher-home');
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function fetchUser() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setisAuth(true);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function logoutTeacher(navigate) {
        try {
            const { data } = await axios.get("/api/user/logout");
            toast.success(data.message);
            setisAuth(false);
            setUser([]);
            navigate('/teacher-login');
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllTeachers() {
        try {
            const { data } = await axios.get("/api/user/all-teachers");
            setTeacherList(data);
            setisAuth(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function FeesSubmit( formData, setImagePreview ) {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/user/fee-submit", formData);
            if (data.success) {
                toast.success(data.message);
                await getAllFeesSubmit();
                setImagePreview(null);
                setLoading(false)
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    async function getAllFeesSubmit() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/user/get-all-fees-submits");
            setFeeSubmitList(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function spendForm( name, date, totalReceived, paymentMethod ,setName, setTotal, setDate ) {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/user/spend-record", { name, date, totalReceived, paymentMethod });
            if(data.success) {
                toast.success(data.message);
                await spendRecord();
                setName('');
                setTotal();
                setDate(new Date().toISOString().slice(0,10));
                setLoading(false);
            } else {
                toast.success(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function StudentDataInput(ledgerId, studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport, monthDetails, setForm) {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/user/add-student", {ledgerId, studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport, monthDetails });
            if(data.success){
            setForm([]);
            toast.success(data.message);
            setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

     async function SaveEdit(ledgerId, year, month, backDues, paid){
        setLoading(true);
        try {
            const payload = { year, month, backdues: Number(backDues || 0), paid: Number(paid || 0) };
            const { data } = await axios.post(`/api/user/student/${encodeURIComponent(ledgerId)}/fee`, payload);
            if(data?.success){
                toast.success(data.message || 'Saved');
                setLoading(false);
                setSelected(data.student || null)
                return data;
            } else {
                toast.error(data?.message || 'Save failed');
                setLoading(false);
                return data;
            }
        } catch (error) {
            console.log(error?.message || error);
            toast.error('Failed to save');
            setLoading(false);
            throw error;
        }
     }

    async function getStudentCount(){
        try{
            const { data } = await axios.get('/api/user/student-count');
            return data?.count || 0;
        } catch (err) {
            console.error('Failed to fetch student count', err);
            return 0;
        }
    }

    async function getAllStudents(){
        setLoading(true);
        try{
            const { data } = await axios.get('/api/user/students');
            setResults(data.students);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch all students', err);
            setLoading(false);
        }
    }

    async function deleteStudentFee(ledgerId) {
        setLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/fee-submit/${ledgerId}`);
            if(data.success){
                await getAllFeesSubmit();
                toast.success(data.message);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    async function studentEditDetail(ledgerId, studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport) {
        console.log(ledgerId);
        
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/user/student-profile-edit/${ledgerId}`, { studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport });
            if(data.success){
                toast.success(data.message);
                setLoading(false);
                getAllStudents();
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function editFeeDetails(id, studentName, studentClass, date) {
        setLoading(true);
    
        try {
            const { data } = await axios.post(`/api/user/student-fee-edit/${id}`, { studentName, studentClass, date });
            if(data.success){
                toast.success(data.message);
                setLoading(false);
                getAllFeesSubmit();
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function spendRecord() {
        setLoading(true);
        try {
            const { data } = await axios.get("/api/user/get-all-spend");
                setSpendList(data.reverse());
                setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        } 
    }
    
    async function editSpendRecord(id, name, date, totalReceived, paymentMethod) {
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/user/edit-spend-record/${id}`, {name, date, totalReceived, paymentMethod});
            if(data.success){
                await spendRecord();
                toast.success(data.message);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false)
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    async function deleteSpendRecord(id) {
        setLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/delete-spend-record/${id}`);
            if(data.success) {
                await spendRecord();
                toast.success(data.message);
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    async function deleteTeacher(id) {
        setLoading(true);
        try {
            const { data } = await axios.delete(`/api/user/delete-teacher-data/${id}`);
            if(data.success){
                toast.success(data.message);
                await getAllTeachers();
                setLoading(false);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    async function editTeacherProfile(id, name, email, mobileNo, role) {
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/user/edit-teacher-profile/${id}`, { name, email, mobileNo, role });
            if(data.success){
                toast.success(data.message);
                await getAllTeachers();
                setLoading(false);                
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.log(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
        getAllTeachers();
        getAllFeesSubmit();
        getAllStudents();
        spendRecord();
    }, []);

    return <UserContext.Provider value={{
        loginTeacher,
        user,
        isAuth,
        logoutTeacher,
        loading,
        registerTeacher,
        teacherList,
        FeesSubmit,
        FeesSubmitList ,
        getAllFeesSubmit,
        spendForm,
        StudentDataInput,
        selected,
        setSelected,
        setEditing,
        editing,
        SaveEdit,
        getStudentCount,
        results,
        setResults,
        deleteStudentFee,
        editFeeDetails,
        studentEditDetail,
        spendlist,
        editSpendRecord,
        setSpendList,
        spendRecord,
        deleteSpendRecord,
        deleteTeacher,
        editTeacherProfile
    }}>{children}</UserContext.Provider>
}

export const UserData = () => useContext(UserContext);