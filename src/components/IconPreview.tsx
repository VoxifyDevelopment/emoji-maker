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

import { ChangeEvent, Suspense, FC, useState } from 'react';
import { IconContext, IconBaseProps } from 'react-icons';

import * as ai from 'react-icons/ai';
import * as bi from 'react-icons/bi';
import * as bs from 'react-icons/bs';
import * as cg from 'react-icons/cg';
import * as ci from 'react-icons/ci';
import * as di from 'react-icons/di';
import * as fa from 'react-icons/fa';
import * as fa6 from 'react-icons/fa6';
import * as fc from 'react-icons/fc';
import * as fi from 'react-icons/fi';
import * as gi from 'react-icons/gi';
import * as go from 'react-icons/go';
import * as gr from 'react-icons/gr';
import * as hi from 'react-icons/hi';
import * as hi2 from 'react-icons/hi2';
import * as im from 'react-icons/im';
import * as io from 'react-icons/io';
import * as io5 from 'react-icons/io5';
import * as lia from 'react-icons/lia';
import * as lu from 'react-icons/lu';
import * as md from 'react-icons/md';
import * as pi from 'react-icons/pi';
import * as ri from 'react-icons/ri';
import * as rx from 'react-icons/rx';
import * as si from 'react-icons/si';
import * as sl from 'react-icons/sl';
import * as tb from 'react-icons/tb';
import * as tfi from 'react-icons/tfi';
import * as ti from 'react-icons/ti';
import * as vsc from 'react-icons/vsc';
import * as wi from 'react-icons/wi';

type DynamicIconComponent = FC<IconBaseProps>;

const icons: Record<string, Record<string, DynamicIconComponent>> = {
    ai,
    bi,
    bs,
    cg,
    ci,
    di,
    fa,
    fa6,
    fc,
    fi,
    gi,
    go,
    gr,
    hi,
    hi2,
    im,
    io,
    io5,
    lia,
    lu,
    md,
    pi,
    ri,
    rx,
    si,
    sl,
    tb,
    tfi,
    ti,
    vsc,
    wi
};

const IconPreview: FC = () => {
    const [inputValue, setInputValue] = useState<string>('fa/FaGithub');

    const [libraryName, iconName] = inputValue.split('/');

    const libraryIcons = icons[libraryName];

    const DynamicIcon = libraryIcons ? libraryIcons[iconName] : null;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div>
            <div>
                <label htmlFor="searchInput">Search Icon: </label>
                <input type="text" id="searchInput" value={inputValue} onChange={handleSearchChange} />
            </div>
            <div>
                <p>IconPreview:</p>
                <Suspense fallback={<p>Loading...</p>}>
                    <div style={{ fontSize: '3em' }}>
                        <IconComponentWrapper DynamicIcon={DynamicIcon} />
                    </div>
                </Suspense>
            </div>
        </div>
    );
};

interface IconComponentWrapperProps {
    DynamicIcon: DynamicIconComponent | null;
}

const IconComponentWrapper: FC<IconComponentWrapperProps> = ({ DynamicIcon }: IconComponentWrapperProps) => {
    return (
        <div>
            <IconContext.Provider value={{ size: '3em' }}>{DynamicIcon ? <DynamicIcon /> : <span>Icon not found</span>}</IconContext.Provider>
        </div>
    );
};

export default IconPreview;
