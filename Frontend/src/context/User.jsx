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
                setFeeSubmitList(data);
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

    useEffect(() => {
        fetchUser();
        getAllTeachers();
        getAllFeesSubmit();
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
        FeesSubmitList
    }}>{children}</UserContext.Provider>
}

export const UserData = () => useContext(UserContext);