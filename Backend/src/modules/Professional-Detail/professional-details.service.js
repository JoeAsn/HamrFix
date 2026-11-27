import proDetailRepo from "./professional-details.repository.js";
export default async function proDetailService(professionalId){
    professionalId = Number(professionalId) ;
    if(typeof professionalId != "number" || professionalId < 1 ){
        return {
            success : false ,
            message : "Invalid PorfessionalId"
        }
    }
    const result = await proDetailRepo(professionalId) ;
    return result ;
}