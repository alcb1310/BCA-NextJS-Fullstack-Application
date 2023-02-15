import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
    const [user, setUser] = useState<string>('')
    const router = useRouter()

	async function getProfile() {
        setUser('')
		const res = await fetch('/api/profile');

		const data = await res.json();
		if (res.ok) setUser(data.user)
	}

    async function logout() {
        setUser('')
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        })
        const data = await res.json();

        if (typeof(data) === 'string') router.push("/")
        
    }

	return (
		<div>
			<h1>Dashboard</h1>

			<button className="bg-green-500 text-green-900 rounded-lg mr-3 px-4 py-2" onClick={() => getProfile()}>Get Profile</button>
            <button className="bg-green-500 text-green-900 rounded-lg mr-3 px-4 py-2" onClick={() => logout()}>Log out</button>
            <p>{user}</p>
		</div>
	);
}
