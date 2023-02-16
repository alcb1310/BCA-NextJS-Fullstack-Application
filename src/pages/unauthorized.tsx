import Link from 'next/link';

export default function Unauthorized() {
	return (
		<div>
			<h1 className='text-red-700'>Unauthorized</h1>
			<p>
				You are not authorized to view this resource, please&nbsp;
				<Link href='/login' className='text-green-600 hover:text-green-800'>
					login
				</Link>
			</p>
		</div>
	);
}
