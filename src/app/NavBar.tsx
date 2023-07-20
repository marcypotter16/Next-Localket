import Link from "next/link";

export const NavBar = () => {
	return (
		<div className='flex space-x-3 py-1 px-2 w-screen bg-slate-700'>
			<Link href={'/'}>Home</Link>
			<Link href={'/mercatini'}>Mercatini</Link>
			<Link href={'/myaccount'}>Account</Link>
			<Link href={'/mercatini/pubblica'}>Pubblica mercatino</Link>
		</div>
	)
}