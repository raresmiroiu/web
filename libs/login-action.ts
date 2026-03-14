"use server"

import { signIn } from "../auth"
import { executeAction } from "./executeAction"
import {redirect} from "next/navigation"

export async function LoginAction(formData:FormData) {
    const res = await executeAction({
        actionFn: async() =>{
            await signIn("credentials",{
                email:formData.get("email"),
                password:formData.get("password"),
                redirect:false,
            });
        },
    });
    if(res.success){
        redirect("/me")
    }
    return res;
}