import React, { FC, ReactNode } from 'react';
import { IconContext, IconBaseProps } from 'react-icons';

import { toBlob } from 'html-to-image';

import { toast } from 'react-toastify';

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

const EmojiCreator: FC = () => {
    const [inputValue, setInputValue] = React.useState<string>('github');
    const [cachedResults, setCachedResults] = React.useState<Record<string, Array<DynamicIconComponent>>>({});
    const [filteredIcons, setFilteredIcons] = React.useState<Array<DynamicIconComponent>>([]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [UsedIconForEmoji, setUsedIconForEmoji] = React.useState<DynamicIconComponent | null>(null);

    const drawResult = () => {
        const value = inputValue.toLowerCase();

        // Check if result is cached
        const cachedResult = cachedResults[value];
        if (cachedResult) {
            setFilteredIcons(cachedResult);
            return;
        }

        const iconsMatchingSearch: Array<DynamicIconComponent> = [];

        if (value !== '' && value.length > 3) {
            for (const [library, libIcons] of Object.entries(icons)) {
                for (const [icon, comp] of Object.entries(libIcons)) {
                    if (`${library}/${icon}`.toLowerCase().includes(value)) {
                        iconsMatchingSearch.push(comp);
                    }
                }
            }
        }

        // Cache the result
        setCachedResults({ ...cachedResults, [value]: iconsMatchingSearch });

        setFilteredIcons(iconsMatchingSearch);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        drawResult();
    };

    const handleDownload = () => {
        if (!UsedIconForEmoji) {
            toast.warn('Please select an icon first.');
            return;
        }
        const renderElement = document.getElementById('export');
        if (!renderElement) {
            toast.error('Something went wrong while processing the render element.');
            return;
        }
        const downloadButton: HTMLButtonElement | null = document.getElementById('download-emoji') as HTMLButtonElement | null;
        if (!downloadButton) {
            toast.error('Something went wrong while processing the download button click.');
            return;
        }

        const oldText = '' + downloadButton.innerText;

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        downloadButton.disabled = true;
        downloadButton.innerText = 'Crafting Emoji...';
        downloadButton.appendChild(spinner);

        toBlob(renderElement)
            .then(function (createdImageBlob) {
                if (!createdImageBlob) {
                    toast.error('An error occurred while creating the image.');
                    return;
                }
                // console.log(createdImageBlob);

                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(createdImageBlob);
                link.target = '_blank';
                link.download = `emoji-${Date.now()}`;
                document.body.appendChild(link);
                downloadButton.innerText = 'Downloading Emoji...';
                downloadButton.appendChild(spinner);
                link.click();
                setTimeout(() => {
                    try {
                        document.body.removeChild(link);
                    } catch (error) {
                        // empty
                    }
                    downloadButton.innerText = oldText;
                    try {
                        downloadButton.removeChild(spinner);
                    } catch (error) {
                        // empty
                    }
                    downloadButton.disabled = false;
                }, 500);
            })
            .catch(console.error);
    };

    // Invalidate cache after 1 min
    React.useEffect(() => {
        const cacheInvalidationTimer = setTimeout(() => {
            setCachedResults({});
        }, 120000);

        return () => {
            clearTimeout(cacheInvalidationTimer);
        };
    }, [cachedResults]);

    React.useEffect(drawResult);

    // React.useEffect(() => {
    //     console.log(typeof UsedIconForEmoji);
    //     console.log(UsedIconForEmoji);
    // }, [UsedIconForEmoji]);

    // TODO custom image import

    return (
        <div className="flex w-screen flex-row items-start justify-evenly">
            <div className="mt-8 flex max-w-[70vw] flex-col items-center justify-center">
                <div className="relative flex flex-col items-center justify-center ">
                    <form onSubmit={handleSearchSubmit} className="max-w-md">
                        <label htmlFor="searchInput" className="text-silver block text-sm font-medium">
                            Search Icon: {'(TODO add custom image upload as custom icon)'}
                        </label>
                        <input
                            type="text"
                            id="searchInput"
                            value={inputValue}
                            onChange={handleSearchChange}
                            className="mt-1 w-full rounded-md border border-gray-300 bg-gray-900 p-2 text-[var(--white-color)]"
                        />
                    </form>
                    <div className="mt-4 max-h-[60vh] max-w-[70vw] overflow-y-auto rounded-md pt-2 shadow shadow-gray-300">
                        <p className="mb-2 text-center text-xl font-semibold">Icon Preview</p>
                        <div className="justify-even flex flex-row items-center bg-gray-900 p-4">
                            {filteredIcons.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {filteredIcons.map((icon, index) => (
                                        <IconComponentWrapper
                                            key={index}
                                            DynamicIcon={icon}
                                            chooseCallback={() => {
                                                setUsedIconForEmoji(icon);
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <span className="text-red-500">No matching icons found</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center">
                <div className="absolute top-[-1500px]">
                    <div id="export" className="export h-[512px] w-[512px] flex-col items-center justify-center">
                        {UsedIconForEmoji ? (
                            // Ignore the linting error it works...
                            <SelectedIcon key="selected-icon" size="510px" DynamicIcon={UsedIconForEmoji} />
                        ) : (
                            <span className="text-center text-red-600">Select Icon</span>
                        )}
                    </div>
                </div>
                <div className="preview h-[260px] w-[260px] flex-col items-center justify-center border-white bg-black p-[2px]">
                    {UsedIconForEmoji ? (
                        // Ignore the linting error it works...
                        <SelectedIcon key="selected-icon" size="250px" DynamicIcon={UsedIconForEmoji} />
                    ) : (
                        <span className="text-center text-red-600">Select Icon</span>
                    )}
                </div>
                <button
                    onClick={handleDownload}
                    id="download-emoji"
                    className="m-2 rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 disabled:border-red-500 disabled:text-red-500"
                >
                    Create and Download Emoji
                </button>
                <input
                    type="text"
                    id="fileNameInput"
                    value="TODO fileNameInput"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-900 p-2 text-[var(--white-color)]"
                />
                <input
                    type="text"
                    id="backgroundInput"
                    value="TODO backgroundInput"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-900 p-2 text-[var(--white-color)]"
                />
                <input
                    type="text"
                    id="iconColorInput"
                    value="TODO iconColorInput"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-900 p-2 text-[var(--white-color)]"
                />
            </div>
        </div>
    );
};

interface IconComponentWrapperProps {
    DynamicIcon: DynamicIconComponent | null;
    chooseCallback: () => void;
}
const IconComponentWrapper: FC<IconComponentWrapperProps> = ({ DynamicIcon, chooseCallback }: IconComponentWrapperProps) => {
    return (
        <div className="justify-even flex flex-col items-center p-3 shadow">
            <div className="justify-even m-2 flex flex-row items-center rounded border p-4">
                <IconContext.Provider value={{ size: '3em' }}>
                    {DynamicIcon ? <DynamicIcon /> : <span className="text-red-600">Icon not found</span>}
                </IconContext.Provider>
                <button
                    onClick={chooseCallback}
                    className="ml-2 rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200"
                >
                    Use Icon
                </button>
            </div>
            {/* {DynamicIcon ? <span>{DynamicIcon.name || 'unknown'}</span> : <span></span>} */}
        </div>
    );
};

interface SelectedIconProps {
    DynamicIcon: DynamicIconComponent | ReactNode;
    size?: string;
}

const SelectedIcon: FC<SelectedIconProps> = ({ DynamicIcon, size }: SelectedIconProps) => {
    DynamicIcon = DynamicIcon as ReactNode;
    return <div style={{ fontSize: size }}>{DynamicIcon}</div>;
};

export default EmojiCreator;
