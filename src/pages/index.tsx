import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<div className={`m-4 ${inter.className}`}>
			<h1 className='text-5xl text-indigo-700 font-bold'>My New NextJS</h1>
			<p className='text-indigo-700'>creating my first NextJs app</p>
		</div>
	);
}
