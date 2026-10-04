// utils/storage.js
export const saveToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// User data persistence
export const saveUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
export const removeUser = () => localStorage.removeItem("user");