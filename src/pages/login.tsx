import { ChangeEvent, FormEvent, useState } from 'react';
import { CredentialsInterface } from '../types';
import { useRouter } from 'next/router';

export default function LoginPage() {
	const [credentials, setCredentials] = useState<CredentialsInterface>({
		email: '',
		password: '',
	});
	const router = useRouter();

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[event.target.name]: event.target.value,
		}));
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!res.ok) return;

		const from = router.query.from;

		let urlToGo = '/';

		if (from !== undefined && typeof from === 'string') urlToGo = from;

		router.push(urlToGo);
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='email'
					name='email'
					id='email'
					onChange={handleChange}
					value={credentials.email}
				/>
				<input
					type='password'
					name='password'
					id='password'
					value={credentials.password}
					onChange={handleChange}
				/>
				<button>Login</button>
			</form>
		</div>
	);
}
