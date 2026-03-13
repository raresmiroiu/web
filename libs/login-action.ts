"use server"

import { signIn } from "./auth"
import { executeAction } from "./executeAction"

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
    console.log(res);
    return res;
}