import { IAuthInformations } from "./types";

export function setAuthLocalStorage(user: IAuthInformations | null) {
    localStorage.setItem('u', JSON.stringify(user));
}


export function getAuthLocalStorage() {
    const json = localStorage.getItem('u');

    if (!json) {
        return null;
    }

    const auth: IAuthInformations = JSON.parse(json);
    return auth ?? null;
}