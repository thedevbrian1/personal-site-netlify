import { json } from "@remix-run/node";

export function validateEmail(email) {
    if (!email) {
        return 'Email cannot be empty';
    } else if ((typeof email === "string" && email.length > 3 && email.includes("@")) !== true) {
        return 'Invalid email';
    }
}

export function validateName(name) {
    if (!name) {
        return 'Name cannot be empty';
    } else if (typeof name !== "string") {
        return 'Name must be a string';
    } else if (name.length < 2) {
        return 'Name must be at least two characters long';
    }
}

export function validateMessage(message) {
    if (!message) {
        return 'Message cannot be empty';
    } else if (typeof message !== "string") {
        return 'Message must be a string';
    }
}

export function badRequest(data) {
    return json(data, { status: 400 });
}