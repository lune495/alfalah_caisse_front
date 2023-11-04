import { FunctionComponent } from "react";

const HR:FunctionComponent<BtnProps> = ({size=1,mt=0,mb=0,color="grey"}) => {

    return (
       <div style={{height:0,marginTop:mt,marginBottom:mb,borderBottomWidth:size,borderColor:color}}>

       </div>
    )

}

export default HR;

interface BtnProps {
    title?: string;
    color?: string;
    size?: number;
    mt?: number;
    mb?: number;
}