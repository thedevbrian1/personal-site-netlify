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

export async function createContact(email) {
    const Mailjet = require('node-mailjet');
    const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

    let res = null;
    try {
        res = await mailjet
            .post("contact", { 'version': 'v3' })
            .request({
                "IsExcludedFromCampaigns": "true",
                "Email": `${email}`
            });
        console.log('New contact: ', res.body);
    } catch (err) {
        throw new Response(err, { status: err.statusCode })
    }
    return res.body;
}

export async function addContactToList(contactEmail) {
    const Mailjet = require('node-mailjet');
    const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

    try {
        const res = await mailjet
            .post("listrecipient", { 'version': 'v3' })
            .request({
                "IsUnsubscribed": "false",
                // "ContactID": "478938490",
                "ContactAlt": `${contactEmail}`,
                "ListID": "47814",
                // "ListAlt": "abcdef123"
            });
        console.log('New subscriber: ', res.body);
    } catch (err) {
        throw new Response(err, { status: err.statusCode });
    }
}

export async function sendEmail({ name, email, message }) {
    const Mailjet = require('node-mailjet');
    const mailjet = Mailjet.apiConnect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

    try {
        const res = await mailjet
            .post("send", { 'version': 'v3' })
            .request({
                "FromEmail": "brayomwas95@gmail.com",
                "FromName": "thedevbrian Website",
                "Recipients": [
                    {
                        "Email": "mwangib041@gmail.com",
                        "Name": "Brian Mwangi"
                    }
                ],
                "Subject": "Test email",
                "Text-part": "This is the text part of this email",
                "Html-part": `
            <h3>Message from website</h3>
            <p>${message}</p>
            <p>Here are my contact details: </p>
            <p>Name: ${name} </p>
            <p>Email: ${email} </p>
            `
            });
        console.log('Email response: ', res.body);
    } catch (err) {
        throw new Response(err, { status: err.statusCode })
    }

}