import serverConnectAPI from '../config/server-connect-api';


const getZoomMeetingData = (params: {}, sort = null, pageSize = null, pageNumber = null) => {
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
    return serverConnectAPI.get('ZoomMeeting', params);
};

const addZoomMeetingData = (zoomValues: any) => {
    return serverConnectAPI.post('ZoomMeeting-store', zoomValues);
}

const updateZoomData = (data: any) => {
    return serverConnectAPI.post('ZoomMeeting-edit', data);
}

const removeZoomData = (id: number) => {
    return serverConnectAPI.post('ZoomMeeting-del', id);
}

export default {
    getZoomMeetingData,
    addZoomMeetingData,
    removeZoomData,
    updateZoomData
};