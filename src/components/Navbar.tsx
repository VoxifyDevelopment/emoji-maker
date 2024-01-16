/**
 * Copyright (c) 2023 - present | sanguine6660 <sanguine6660@gmail.com>
 * Copyright (c) 2023 - present | voxify.dev <contact@voxify.dev>
 * Copyright (c) 2023 - present | voxify.dev team and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, createRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

import Logo from '../assets/logo-nb.svg';

const style_link_active =
    'relative hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium after:absolute after:h-[3px] after:w-[70%] after:bottom-[1px] after:left-[0] after:bg-[var(--main-color)]';
const style_link = 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium';

const style_dd_link_active =
    'relative  hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium after:absolute after:h-[3px] after:w-[70%] after:bottom-[1px] after:left-[0] after:bg-[var(--main-color)]';
const style_dd_link = 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <nav className="h-[var(--nav-height)] w-screen bg-slate-950 shadow-lg shadow-[var(--main-color)]">
            <div className="mx-auto min-w-[90vw] px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 min-w-[90vw] items-center justify-between">
                    <div ref={createRef()} className="flex min-w-[60vw] items-center justify-between md:min-w-[90vw]">
                        <Link
                            to="/"
                            className="flex flex-shrink-0 flex-row items-center justify-around p-2 font-bold text-[var(--white-color)] hover:text-[var(--main-color)]"
                        >
                            <img className="h-8 w-8" src={Logo} alt="Logo" />
                            <p className="ml-2 font-extrabold tracking-tight">Voxify Emoji Maker</p>
                        </Link>
                        <div className="hidden md:block">
                            <div ref={createRef()} className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className={currentPath === '/' ? style_link_active : style_link}>
                                    Home
                                </Link>

                                <Link to="/create" className={currentPath === '/create' ? style_dd_link_active : style_dd_link}>
                                    ➕ Emoji
                                </Link>

                                <Link to="https://wiki.voxify.dev" className={style_link}>
                                    Wiki
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {() => (
                    <div className="md:hidden" id="mobile-menu">
                        <div ref={createRef()} className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            <Link to="/" className={currentPath === '/' ? style_dd_link_active : style_dd_link}>
                                Home
                            </Link>
                            <Link to="/create" className={currentPath === '/create' ? style_dd_link_active : style_dd_link}>
                                ➕ Emoji
                            </Link>
                            <Link to="https://wiki.voxify.dev" className={style_dd_link}>
                                Wiki
                            </Link>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
}
