import { registerGuest } from "./server";

export const createGuestUser = async () => {
    const genRanHex = (size:number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    //need a username and email
    const guestId = genRanHex(4);
    const guestName = `Guest ${guestId}`;

    localStorage.setItem('guestId', guestId); //store guestId in local storage
    await registerGuest(guestName); //register guestId in database

}