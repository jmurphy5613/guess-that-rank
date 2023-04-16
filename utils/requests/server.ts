import axios from "axios"
import { requestURL } from "../constants"


export const registerGuest = async (guestId: string) => {
    await axios.post(`${requestURL}/users`, {
        username: guestId,
    })
}