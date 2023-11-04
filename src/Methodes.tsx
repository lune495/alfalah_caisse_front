import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = "http://45.63.94.164/alfalah_caisse_front";
const fileUrl = "http://192.99.37.218/poster/";
//const baseUrl = process.env.REACT_APP_BASE_URL;
//const webUrl = process.env.REACT_APP_WEB_URL


export const getFileUrl = () => {
	return fileUrl;
};



export const getApiUrl = () => {
	return apiUrl;
};



export var sendData:any = async(route:string, dataBody?:object, type?:string) => {
	const token= ""
	const el:any=localStorage.getItem("chiffaa_user")
	const userPars=JSON.parse(el)
	const config = {
			headers:{
				'Authorization': userPars?.token? `Bearer ${userPars?.token}`:"",
				// 'content-type': 'application/x-www-form-urlencoded'
				'Accept': 'application/json',
			}
		  }
	if(type)	  {
		return axios.put(`${apiUrl}/${route}`, dataBody,config);
	}
	return axios.post(`${apiUrl}/${route}`, dataBody,config);
};



export var getData = async(route:string) => {
	const el:any=localStorage.getItem("chiffaa_user")
	const userPars=JSON.parse(el)
	const token=userPars?.token
	const config = {
			headers:{
				'Authorization': token? `Bearer ${token}`:"",
				// 'content-type': 'application/x-www-form-urlencoded'
				// 'Accept': 'application/json',
			}
		  }
	console.log("token",config)
	return axios.get(`${apiUrl}/${route}`, config);
};
export var removeData = (route:string,config:any) => {
	return axios.delete(`${apiUrl}/${route}`,config);
};

export const ConfirmAction=async(open?:boolean)=>{

	if (open) {
        Swal.fire({
            icon: 'warning',
            title: 'Etes vous sur?',
            text: "Cette d'action est irreversible!",
            showCancelButton: true,
            confirmButtonText: 'Suprimer',
			cancelButtonText: "Annuler",
            showLoaderOnConfirm: true,
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                Swal.fire({ title: 'Supprimé!', text: 'Element supprimé avec succès.', icon: 'success', customClass: 'sweet-alerts' });
            }
        });
    }
   
  }

  export const handleFormatTextDate=(e:any)=>{
	
	if(e){
		let date=e.split("-")
		return date[2]+"/"+date[1]+"/"+date[0]
	}
	return e
}

export const handleFormatDate=(e:any)=>{
	console.log("date",e)
	let date=e.split("-")
	return date[2]+"-"+date[1]+"-"+date[0]
}

