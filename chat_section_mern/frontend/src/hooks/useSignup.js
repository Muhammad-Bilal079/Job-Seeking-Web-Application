import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	
	const signup = async ({ fullName, email, password, confirmPassword, gender }) => {

		// console.log(fullName, email, password, confirmPassword, gender);
		

		const success = handleInputErrors({ fullName, email, password, confirmPassword, gender });
		if (!success) return;

		const payload = { fullName, email, password, confirmPassword, gender };
	console.log(payload);

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, password, confirmPassword, gender }),
			});
			console.log(res);
			
			if (!res.ok) {
				const errorData = await res.json();
				console.error("Signup Error Data:", errorData); // Debugging ke liye
				throw new Error(errorData.error || "Something went wrong");
			}
			

			const data = await res.json();
			console.log('data ===>',data);
			
			sessionStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, email, password, confirmPassword, gender }) {
	if (!fullName || !email || !password || !confirmPassword || !gender) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}