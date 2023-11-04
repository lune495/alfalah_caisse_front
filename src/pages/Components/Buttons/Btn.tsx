import { FunctionComponent } from "react";

const Btn:FunctionComponent<BtnProps> = ({handleAction,size="sm",title,color="btn-outline-primary"}) => {

    return (
        <button type="button" className={`btn btn-${size} ${color}`} onClick={handleAction}>
            {title}
        </button>
    )

}

export default Btn;

interface BtnProps {
    title?: string;
    color?: string;
    size?: string;
    handleAction:any
}