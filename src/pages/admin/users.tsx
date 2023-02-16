import { getUserByEmail, validateCookie } from '@/helpers/users';
import prisma from '../../../prisma/client';

interface UserQueryInterface {
	uuid: string;
	name: string;
	email: string;
	company: CompanyQueryInterface | null | string;
}

interface CompanyQueryInterface {
	uuid: string;
	ruc: string;
	name: string;
	isActive: boolean;
}

type Data = {
	users: string;
};

export default function Users({ users }: Data) {
	const usersList = JSON.parse(users) as UserQueryInterface[];

	return (
		<div className='m-4'>
			<h1 className='text-2xl text-indigo-700'>Protected Page</h1>
			<p className='text-green-400'>
				This is a protected page and should show only after login
			</p>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>email</th>
						<th>company</th>
						<th>active</th>
					</tr>
				</thead>
				<tbody>
					{usersList.map((user) => {
						let company: string;
						let active: string;

						if (user.company === null) {
							company = '';
							active = '';
						} else if (typeof user.company === 'string') {
							company = user.company;
							active = '';
						} else {
							company = user.company.name;
							active = user.company.isActive ? 'YES' : 'NO';
						}

						return (
							<tr key={user.uuid}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{company}</td>
								<td>{active}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export async function getServerSideProps(
	context: any
): Promise<{ props: Data }> {
	const email = validateCookie(context.req) as string;
	const loggedInUser = await getUserByEmail(email);

	const users: UserQueryInterface[] = await prisma.user.findMany({
		where: {
			companyUuid: loggedInUser?.companyUuid,
		},
		select: {
			uuid: true,
			name: true,
			email: true,
			company: {
				select: {
					uuid: true,
					ruc: true,
					name: true,
					isActive: true,
				},
			},
		},
	});

	return {
		props: {
			users: JSON.stringify(users),
		},
	};
}
