import axios from "axios"

const ApiReq =async (config)=>{
    try {
        const res = await axios(config)
        // console.log("res: ", res);
        return res
    } catch (error) {
        console.log("error", error);
    }
}
export default ApiReq;