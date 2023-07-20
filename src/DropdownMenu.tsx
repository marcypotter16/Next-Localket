import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function DropdownMenu({selected, select}) {
    return (
        <Menu as='div' className='flex items-center text-left'>
            <div className='flex items-center'>
                <Menu.Button
                    className='flex h-full justify-center rounded-l bg-blue-900 px-3 py-2 text-sm font-semibold text-gray-400 hover:bg-gray-50'>
                    {selected}
                    <ChevronDownIcon
                        className='-mr-1 ml-1 h-5 w-5 text-gray-400 bg-transparent'
                        aria-hidden='true'
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='absolute ml-12 origin-top-left rounded-md border bg-black focus:outline-none'>
                    <div className='bg-transparent'>
                        {["kg", "g", "l", "ml", "pz"].map((unit) => (
                            <Menu.Item key={unit}>
                                {({active}) => (
                                    <a
                                        onClick={() => {
                                            console.log("Pz");
                                            select("pz");
                                        }}
                                        className={classNames(
                                            active ? "bg-teal-400 text-gray-900" : "text-gray-100",
                                            "block px-4 text-xs cursor-pointer"
                                        )}
                                    >
                                        {unit}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
