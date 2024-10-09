import axios from "axios";
import { HOST_NAME } from "../../../utils";
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAllUsers = (token) => {
    const [message, setMessage] = useState("");
  
    const fetchUsers = async () => {
        const response = await axios.get(`${HOST_NAME}/api/users/`, {
            headers: {
                "Authorization": `Bearer ${token || localStorage.getItem("token")}`,
            },
        });
        return response.data;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const updateUserStatus = async (userId) => {
        const response = await axios.put(`${HOST_NAME}/api/user/status/${userId}`, {}, {
            headers: {
                "Authorization": `Bearer ${token || localStorage.getItem("token")}`,
            },
        });
        return response.data;
    };

    const { mutate: changeUserStatus, isLoading: isStatusUpdating } = useMutation({
        mutationFn: ({ userId }) => updateUserStatus(userId),
        onSuccess: () => {
            setMessage('User status updated successfully');
        },
        onError: (error) => {
            toast.error('Failed to update user status');
        }
    });

    const handleResetMessage = () => {
        setMessage("");
    };

    useEffect(() => {
        refetch();
    }, [token]);

    const users = data;
  
    return { users, isLoading, changeUserStatus, isStatusUpdating, message, handleResetMessage };
};
