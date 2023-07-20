import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, storage } from "../../Utils/firebase.ts";
import { User, userConverter } from "../../classes/User";
import { NavLink, Navigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, list, ref } from "firebase/storage";
import {Mercatino, ProduttoreSemplice} from "@/Models/Mercatino";
import Link from "next/link";
import {getProduttoriIscritti} from "@/FirebaseUtils/CRUDmercatini";

export function MercatinoCard({ mercatino }: { mercatino: Mercatino }) {
	const [navigateToSignIn, setNavigateToSignIn] = useState(false);
	const [imageURLs, setImageURLs] = useState([]);
	const produttoriIscritti: ProduttoreSemplice[] = await getProduttoriIscritti(mercatino.id) as ProduttoreSemplice[];
	console.log(produttoriIscritti);
		return (
			// Container
			<div className='flex flex-col border-white relative w-64 h-56 bg-transparent rounded-3xl mx-4 mt-2 mb-4 shadow-2xl shadow-zinc-950'>
				<Link
					href={`/mercatini/${mercatino.id}`}
					className={"flex-1"}
				>
					<div className='rounded-3xl bg-gray-800 text-center basis-1/2'>
						{imageURLs && (
							<div className='bg-transparent'>
								{imageURLs.map((url) => (
									<img
										src={url}
										className='h-28 w-full brightness-[.8] object-contain rounded-t-3xl mb-1 hover:brightness-100 transition duration-500 ease-in-out'
										alt={mercatino.nome}
										key={v4()}
									/>
								))}
							</div>
						)}
						<div className='flex flex-col bg-slate-700 justify-around items-center'>
							<p className='text-white font-semibold text-xl bg-inherit px-2'>
								{mercatino.nome}
							</p>

						</div>
					</div>
				</Link>

				{/** USER ICON */}
				<div
					className='absolute -top-3 -left-3 flex-none flex justify-center items-center w-12 h-12 rounded-full 
      bg-gradient-to-tr from-yellow-400 to-red-700 transform hover:scale-150 transition ease-in-out duration-200
      '
				>
					{publisher && (
						<NavLink
							to={`/accounts/${product.publisherId}`}
							className='flex-none'
						>
							<img
								src={publisher.image}
								alt={publisher.displayName}
								className='h-10 w-10 rounded-full border-4 border-gray-900 transform transition duration-200 ease-in-out hover:rotate-12'
							/>
						</NavLink>
					)}
				</div>

				{/* --- SIDE PANEL ---
				 */}
				<div className='flex-1 flex bg-slate-600 justify-around items-center py-1 rounded-b-xl'>
					<div className='flex flex-col justify-center items-center bg-inherit'>
						<input
							type='number'
							step={product.quantityType === "kg" ? "0.01" : "1"}
							className='border rounded text-center w-16 text-white shadow-xl font-bold mx-2 bg-transparent lg:w-40'
							placeholder={`${selectedQuantity}`}
							onChange={(e) => {
								if (
									Number(e.target.value) <= product.quantity &&
									Number(e.target.value) >= 0
								)
									setSelectedQuantity(Number(e.target.value));
							}}
						/>
						<label
							htmlFor='input'
							className='text-xs text-slate-400 bg-transparent'
						>
							Quantità desiderata
						</label>
					</div>
					<button
						className='flex border border-slate-400 shadow rounded-full text-white justify-center items-center hover:bg-sky-500 hover:shadow-xl p-1 transition ease-in-out duration-200  hover:drop-shadow-2xl hover:ring-2 hover:ring-sky-700 hover:ring-offset-2 hover:ring-opacity-50'
						onClick={addToCart}
					>
						<ShoppingCartIcon className='w-5 h-5 bg-transparent' />
					</button>
				</div>
				{/* <div className='flex-1 bg-transparent'>
      {showMessage && (
        <p className="text-white">Elemento aggiunto al carrello.</p>
      )}
      {navigateToSignIn && <Navigate to="/" />}
      </div> */}
				{navigateToSignIn && <Navigate to='/' />}
			</div>
		);
	}
}
