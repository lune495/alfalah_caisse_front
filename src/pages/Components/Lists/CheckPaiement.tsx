import { truncate } from "fs/promises";
import { Fragment,FunctionComponent, useState } from "react";

 
const CheckPaiement:FunctionComponent<BtnProps>=({lastMois=0,service,handleValidate,estAnnuel})=> {

    const [select, setSelect] = useState<any>({
        septembre:false,
        octobre:false,
        novembre:false,
        decembre:false,
        janvier:false,
        fevrier:false,
        mars:false,
        avril:false,
        mai:false,
        juin:false,
    });
    const [init] = useState<any>({
        septembre:false,
        octobre:false,
        novembre:false,
        decembre:false,
        janvier:false,
        fevrier:false,
        mars:false,
        avril:false,
        mai:false,
        juin:false,
    });

    const [mouthNum] = useState<any>({
        octobre:0,
        novembre:1,
        decembre:2,
        janvier:3,
        fevrier:4,
        mars:5,
        avril:6,
        mai:7,
        juin:8,
    });
   
    const [current, setCurrent] = useState<any>(false);
    const [mois, setMois] = useState<any>([
        {id:1,label:"Octobre",value:"octobre"},
        {id:2,label:"Novembre",value:"novembre"},
        {id:3,label:"Décembre",value:"decembre"},
        {id:4,label:"Janvier",value:"janvier"},
        {id:5,label:"Février",value:"fevrier"},
        {id:6,label:"Mars",value:"mars"},
        {id:7,label:"Avril",value:"avril"},
        {id:8,label:"Mai",value:"mai"},
        {id:9,label:"Juin",value:"juin"},
    ]);

    const handleCurrent=(e:any)=>{
        const index1=mois[mouthNum[e]-1]
        const index2=mois[mouthNum[e]+1]

        if(service.estObligatoire===true && mouthNum[e]!==lastMois){
          
            if(select[index1?.value]===true && select[index2?.value]===false && select[e]===true){
                setSelect({...select,[e]:false})
                handleValidate({...select,[e]:false})
            }else if(select[index2?.value]===false && select[e]===false){
                setSelect({...select,[e]:true})
                handleValidate({...select,[e]:true})
            }
            else if(mouthNum[e]===9 && select[e]===true){
                setSelect({...select,[e]:false})
                handleValidate({...select,[e]:false})
            }
            else if(mouthNum[e]===9 && select[index1?.value]===true && select[e]===false){
                setSelect({...select,[e]:true})
                handleValidate({...select,[e]:true})
            }

        }else if(service.estObligatoire===true && mouthNum[e]===lastMois){
            if(select[index2?.value]===false && select[e]===true){
                setSelect({...select,[e]:false})
                handleValidate({...select,[e]:false})
            }else if(select[index2?.value]===false && select[e]===false){
                setSelect({...select,[e]:true})
                handleValidate({...select,[e]:true})
            }
           
        }else if(service.estObligatoire===false){
            setSelect({...select,[e]:!select[e]})
            handleValidate({...select,[e]:!select[e]})
        }
        
       
        let all={...select,[e]:!select[e]}
        // for(var i=lastMois;i<mois.length;i++){
        //     all={...all,[mois[i].value]:!current}
        //     if(i<mois.length-1 && all[mois[i].value]===false){
        //         setCurrent(false)
        //         return
        //     }else
        //     if(i===mois.length-1 && all[mois[i].value]===true){
        //         setCurrent(true)
        //     }
            
        // }
       
    }
    const handleAllCurrent=()=>{
        setCurrent(!current)
        if(!current){
            let all=init
            for(var i=lastMois;i<mois.length;i++){
                all={...all,[mois[i].value]:!current}
            }
            handleValidate(all)
            setSelect(all)
        }else{
            handleValidate(init)
            setSelect(init)
        }
       
    }
    

    return (
       <div className="p-1">
             {estAnnuel===false?<div style={{width:"90%"}} className="flex flex-wrap flex-row justify-between   mt-3">
                {mois.map((val:any,id:number)=>(
                   val?.id<=lastMois? <div key={id} className="mb-5  mt-3" style={{width:70}}>
                        <label htmlFor="occupation">{val?.label}</label>
                        <input onChange={(e:any)=>e}  style={{color:"red",backgroundColor:'red'}}  disabled={true} checked={select[val.value]} type="checkbox" onClick={()=>handleCurrent(val.value)} className="form-checkbox"  />
                    </div>:
                    <div key={id}  className="mb-5  mt-3" style={{width:70}}>
                        <label htmlFor="occupation">{val?.label}</label>
                        <input onChange={(e:any)=>e}  disabled={false} checked={select[val.value]} type="checkbox" onClick={()=>handleCurrent(val.value)} className="form-checkbox"  />
                    </div>
                ))
                }
               <div  className="mb-5  mt-3 ml-3" style={{width:80}}>
                        <label style={{color:"blue"}} htmlFor="occupation">TOUT</label>
                        <input onChange={(e:any)=>e}  disabled={lastMois>=10?true:false} checked={current} type="checkbox" onClick={()=>handleAllCurrent()} className="form-checkbox ml-3"  />
                </div>
            </div>:
            <div style={{width:"100%"}} className="flex ml-9 flex-wrap flex-row justify-center  mt-3">
                    {lastMois<10?<div  className="mb-5  mt-3 ml-3 w-full" style={{width:250}}>
                        <label style={{color:"blue"}} htmlFor="occupation">Toute l'année scolaire</label>
                        <input onChange={(e:any)=>e} style={{backgroundColor:'blue',marginLeft:70}}  disabled={true} checked={true} type="checkbox"  className="form-checkbox ml-15"  />
                    </div>:
                    <div  className="mb-5  mt-3 ml-3 w-full" style={{width:250}}>
                      <label style={{color:"green"}} htmlFor="occupation">Service déja payé</label>
                   </div>
                    }
            </div>
            }
       </div> 
    )

}
export default CheckPaiement;

interface BtnProps {
    handleValidate?: any;
    service?: any;
    lastMois?: number;
    estAnnuel:boolean
    
    
}