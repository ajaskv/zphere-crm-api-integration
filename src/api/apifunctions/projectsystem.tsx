import serverConnectAPI from '../config/server-connect-api';


const getProjectSystemData = (params: {}, sort = null, pageSize = null, pageNumber = null) => {
    // if (sort) {
    //     params.sb = sort
    // }
    // if (pageSize) {
    //     params.ps = pageSize
    // }
    // if (pageNumber) {
    //     params.page = pageNumber
    //     if (pageNumber == "1") {
    //         params.cnt = "1";
    //     }
    // }
    return serverConnectAPI.get('project', params);
};


export default {
    getProjectSystemData,
};