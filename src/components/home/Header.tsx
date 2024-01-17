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

import { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const iconLinkStyle = 'p-2 text-[var(--main-color)] hover:text-[var(--white-color)] flex flex-row items-center justify-center';

export default function Header() {
    const [emojiPaths, setEmojiPaths] = useState<string[]>([]);

    useEffect(() => {
        const importAll = async () => {
            const files = import.meta.glob('./emojis/*.png');

            const paths = await Promise.all(
                Object.keys(files).map(async (path) => {
                    const imported = await files[path]();
                    if (imported && typeof imported === 'object' && 'default' in imported) {
                        return (imported as { default: string }).default;
                    }
                    return '';
                })
            );

            setEmojiPaths(paths);
        };

        importAll();
    }, []);

    return (
        <header className="my-10 flex h-full flex-col items-center justify-center shadow-lg shadow-[var(--main-color)]">
            <section className="flex h-full w-screen flex-col-reverse items-center justify-evenly p-3  pt-8 md:flex-row">
                <div className="flex h-full flex-col items-center justify-evenly rounded-md border border-[var(--main-color)] bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
                    <h1 className="m-4 text-2xl font-bold text-[var(--main-color)]">Showcase</h1>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                        {emojiPaths.map((path, index) => (
                            <img key={index} src={path} alt={`emoji-${index}`} className="m-2 h-[50px] w-[50px]" />
                        ))}
                    </div>

                    <h2 className="flex flex-row items-center justify-center">
                        We are using{' '}
                        <Link target="_blank" to="https://react-icons.github.io/react-icons/" className={iconLinkStyle}>
                            <FaReact className="mr-1" size="2rem" /> React-Icons
                        </Link>
                    </h2>
                </div>
                <div className="flex h-full max-w-[300px] flex-col items-center justify-evenly">
                    <h1 className="m-4 text-2xl font-bold text-[var(--main-color)]">𝗩oxify 𝗘moji 𝗠aker</h1>
                    <p className="text-md m-4 font-semibold text-[var(--description-color)]">Create Emojis for your Discord server with ease</p>
                    <hr className="my-2 h-1 w-full border-0 bg-gray-400" />
                    <Link
                        className="group relative mb-2 me-2 mt-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
                        to="/create"
                    >
                        <span className="relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
                            ➕ Create 🅴🅼🅾🅹🅸
                        </span>
                    </Link>
                </div>
            </section>
        </header>
    );
}
