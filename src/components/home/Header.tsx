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
import { Link } from 'react-router-dom';

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
        <header className="mt-10 flex h-full flex-col items-center justify-center">
            <section className="flex h-full w-screen flex-col items-center justify-evenly p-3  pt-8 md:flex-row">
                <div className="flex h-full flex-col items-center justify-evenly rounded-md border border-[var(--main-color)] bg-gray-400 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter">
                    <h1 className="m-4 text-2xl font-bold text-[var(--main-color)]">Showcase</h1>
                    <div className="grid grid-cols-6">
                        {emojiPaths.map((path, index) => (
                            <img key={index} src={path} alt={`emoji-${index}`} className="m-2 h-[50px] w-[50px]" />
                        ))}
                    </div>
                </div>
                <div className="flex h-full flex-col items-center justify-evenly">
                    <h1 className="m-4 text-2xl font-bold text-[var(--main-color)]">Voxify Emoji Maker</h1>
                    <p className="text-md m-4 font-semibold text-[var(--description-color)]">Create Emojis for your Discord server with ease</p>
                    <hr className="my-2 h-1 w-full border-0 bg-gray-400" />
                    <Link
                        className="group relative mb-2 me-2 mt-4 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 group-hover:from-cyan-500 group-hover:to-blue-500 dark:text-white dark:focus:ring-cyan-800"
                        to="/create"
                    >
                        <span className="relative rounded-md bg-gray-900 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0">
                            ➕ Start Creating New Discord Emojis Now!
                        </span>
                    </Link>
                </div>
            </section>
        </header>
    );
}
