import fetch from "node-fetch";

export default async (endpoint: string): Promise<any> => {
    const response = await fetch(endpoint);
    if (response.ok) {
        // response can be read once, so we make a copy to read it again if necessary;
        const clonedResponse = response.clone();
        try {
            // await to catched if json() failed
            return await clonedResponse.json();
        } catch (err) {
            return response.text();
        }
    } else {
        return Promise.reject(response);
    }
}
