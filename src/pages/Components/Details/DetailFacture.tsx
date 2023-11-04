import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
import FactureDuService from "../FactureDuService";


const DetailFacture:FunctionComponent<BtnProps> = ({data={},open,setOpen}) => {

    const [params, setParams] = useState<any>(data);
    const [value1, setValue1] = useState(
        ''
    );
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        // handleAction({ ...params, [id]: value })
        setParams({ ...params, [id]: value });
    };
    const options5 = [
        { value: 'Ambassade de France', label: 'Indicateur 1' },
        { value: 'white', label: 'Indicateur 2' },
        { value: 'purple', label: 'Indicateur 3' },
    ];

  

    useEffect(() => {
        console.log("data facture",params)
     }, []);

    return (
        <div>
             
             <Transition appear show={open} as={Fragment}>
                <Dialog as="div" open={open} onClose={() => setOpen()} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-8xl text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setOpen()}
                                        className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                    </button>
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                      <FactureDuService data={data} isDetail={true}/>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )

}

export default DetailFacture;

interface BtnProps {
    setOpen?: any;
    open?: boolean;
    data?: any;
}