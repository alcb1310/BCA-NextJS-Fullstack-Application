import Link from 'next/link';

export default function NavBar() {
	return (
		<header className='mt-0 bg-indigo-700 text-indigo-200'>
			<nav className='p-4'>
				<Link href='/'>Home</Link>
			</nav>
		</header>
	);
}
