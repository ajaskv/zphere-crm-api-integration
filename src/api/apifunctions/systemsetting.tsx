import serverConnectAPI from '../config/server-connect-api';

const updateSettings = (settingsValues: any) => {
    return serverConnectAPI.post('SettingUpdate', settingsValues);
}



export default {
    updateSettings
};