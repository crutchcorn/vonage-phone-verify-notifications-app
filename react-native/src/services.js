import {SERVER_BASE} from "./constants";

/**
 * Returns {requestId} to store and use in the "verify" request
 */
export const request = ({
                            phoneNumber,
                        }) => {
    return fetch(`${SERVER_BASE}/request`, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            number: phoneNumber
        })
    })
};


export const verify = ({
                           requestId,
                           code,
                       }) => {
    return fetch(`${SERVER_BASE}/verify`, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            requestId,
            code
        })
    })
};


export const invite = ({
                           phoneNumber,
                       }) => {
    return fetch(`${SERVER_BASE}/invite`, {
        method: 'post',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            number: phoneNumber
        })
    })
};
