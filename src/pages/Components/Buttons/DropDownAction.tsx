
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Dropdown from "../../../components/Dropdown";
import { IRootState } from "../../../store";
import { NavLink } from "react-router-dom";

const DropDownAction:FunctionComponent<DropProps> = ({handleEdit,handleOpenLink,handleView,handleDeleteConfirm,link,url}) => {
 
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;



    return (
        <div className="dropdown">
            <Dropdown
                offset={[0, 5]}
                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                btnClassName="text-warning"
                button={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-90 opacity-70">
                        <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                }
            >
                <ul className="text-sm font-medium z-5">
                    <li>
                        <button type="button" onClick={handleEdit}>
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 ltr:mr-2 rtl:ml-2"
                            >
                                <path
                                    d="M15.2869 3.15178L14.3601 4.07866L5.83882 12.5999L5.83881 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021L2.05445 20.6042C1.92743 20.9852 2.0266 21.4053 2.31063 21.6894C2.59466 21.9734 3.01478 22.0726 3.39584 21.9456L4.19792 21.6782L7.47918 20.5844L7.47919 20.5844C8.25353 20.3263 8.6407 20.1973 9.00498 20.0237C9.43469 19.8189 9.84082 19.5679 10.2162 19.2751C10.5344 19.0269 10.8229 18.7383 11.4001 18.1612L11.4001 18.1612L19.9213 9.63993L20.8482 8.71306C22.3839 7.17735 22.3839 4.68748 20.8482 3.15178C19.3125 1.61607 16.8226 1.61607 15.2869 3.15178Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    opacity="0.5"
                                    d="M14.36 4.07812C14.36 4.07812 14.4759 6.04774 16.2138 7.78564C17.9517 9.52354 19.9213 9.6394 19.9213 9.6394M4.19789 21.6777L2.32178 19.8015"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Editer
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={handleDeleteConfirm}>
                            <svg className="ltr:mr-2 rtl:ml-2" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.5"
                                    d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                    d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            Supprimer
                        </button>
                    </li>
                   {link? <li>
                        <NavLink onClick={handleOpenLink} to={""+url}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-3 rtl:ml-3">
                                <path
                                    opacity="0.5"
                                    d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Voir
                        </NavLink>
                    </li>:
                    <li>
                        <button type="button" onClick={handleView}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ltr:mr-3 rtl:ml-3">
                                <path
                                    opacity="0.5"
                                    d="M3.27489 15.2957C2.42496 14.1915 2 13.6394 2 12C2 10.3606 2.42496 9.80853 3.27489 8.70433C4.97196 6.49956 7.81811 4 12 4C16.1819 4 19.028 6.49956 20.7251 8.70433C21.575 9.80853 22 10.3606 22 12C22 13.6394 21.575 14.1915 20.7251 15.2957C19.028 17.5004 16.1819 20 12 20C7.81811 20 4.97196 17.5004 3.27489 15.2957Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                            </svg>
                            Voir
                        </button>
                    </li>}
                   
                    
                </ul>
            </Dropdown>
        </div>

        )

}

export default DropDownAction;

interface DropProps {
    handleView?:any,
    handleEdit?:any,
    handleOpenLink?:any,
    handleDeleteConfirm?:any,
    link?:boolean,
    url?:string
}