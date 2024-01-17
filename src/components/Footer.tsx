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

import { Link } from 'react-router-dom';
import Logo from '../assets/logo-nb.svg';
import { FaGithub, FaDiscord, FaRobot, FaReact } from 'react-icons/fa';

const iconLinkStyle = 'p-2 text-[var(--main-color)] hover:text-[var(--white-color)] flex flex-row items-center justify-center';

export default function Footer() {
    return (
        <footer className="mt-4 flex min-h-[120px] w-screen flex-row items-center justify-center border-t-2 border-t-[var(--main-color)] bg-slate-950 p-3">
            <div className="items-left flex min-w-[30vw] flex-col justify-start bg-slate-950 p-3">
                <div className="flex flex-col items-center justify-start md:flex-row">
                    <Link to="/" className="flex flex-shrink-0 flex-row items-center p-2 font-bold text-[var(--white-color)] hover:text-[var(--main-color)]">
                        <img className="h-[70px] w-[70px]" src={Logo} alt="Workflow" />
                        <p className="ml-2 text-xl font-extrabold tracking-tight">Voxify Emoji Maker</p>
                    </Link>
                </div>

                <hr />

                <div className="items-left mb-2 flex flex-row justify-start">
                    <Link target="_blank" to="https://discord.voxify.dev" className={iconLinkStyle}>
                        <FaDiscord className="mr-1" size="2rem" />
                    </Link>
                    <Link target="_blank" to="https://github.com/VoxifyDevelopment/emoji-maker" className={iconLinkStyle}>
                        <FaGithub className="mr-1" size="2rem" />
                    </Link>
                    <Link target="_blank" to="https://voxifybot.com/" className={iconLinkStyle}>
                        <FaRobot className="mr-1" size="2rem" />
                    </Link>
                    <Link target="_blank" to="https://react-icons.github.io/react-icons/" className={iconLinkStyle}>
                        <FaReact className="mr-1" size="2rem" />
                    </Link>
                </div>

                <p className="mt-2 pt-2 text-sm font-semibold text-[var(--description-color)]">
                    Copyright © 2023 »{' '}
                    <Link target="_blank" to="https://voxify.dev" className="hover:text-[var(--main-color)]">
                        voxify.dev
                    </Link>{' '}
                    team and contributors
                </p>

                <p className="pt-2 text-sm font-thin text-[var(--description-color)]">
                    Made with ❤ by{' '}
                    <Link target="_blank" to="https://github.com/sanguine6660" className="hover:text-[var(--main-color)]">
                        sanguine6660
                    </Link>
                </p>
            </div>
        </footer>
    );
}
