import { create } from "apisauce";
import appConfig from './appConfig';
import { getValue } from "./storage";

const serverConnectAPI = create({
    baseURL: appConfig.webServerURL + "/api/",
    headers: { "Content-Type": 'application/json; charset=utf-8' },
});

serverConnectAPI.addAsyncRequestTransform(async (request) => {
    const authToken = await getValue('zphere_token');
    if (!authToken) return;
    request.headers['x-auth-token'] = authToken;
});

export default serverConnectAPI;