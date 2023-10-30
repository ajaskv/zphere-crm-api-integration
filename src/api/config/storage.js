export const storeData = async (key, value) => {
    try {
        //alert("x-auth-token storage storeData"+key+" "+value);
        const jsonValue = JSON.stringify(value)
        if(!userDatas){
  userDatas ='{"userData":{"id":2,"firstName":"admin","lastName":"admin","email":"admin@techtaliya.com","phone":"8547533484","aadharNumber":null,"panNumber":null,"esi":null,"pf":null,"branchId":null,"departmentId":null,"designation":null,"employeeId":null,"reportingManagerId":null,"reportingManagerName":null,"address":null,"userType":"SuperAdmin","roleId":null,"dob":null,"status":"Active","username":"admin@techtaliya.com","emergencyContactPerson":null,"emergencyContactNumber":null,"photo":null,"bloodGroup":null,"grade":null,"zone":null,"salary":null,"password":"$2a$10$O.Xj6M6UsuE9iOwbtR1nfOODzjeMkQ2MERteGGAsy.CiBWPu7jReW","referralCode":null,"createdAt":"2022-08-17T18:30:00.000Z","updatedAt":"2022-08-17T18:30:00.000Z","deletedAt":null,"role":null},"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHRlY2h0YWxpeWEuY29tIiwiaWF0IjoxNjY1MTIyNDE4LCJleHAiOjI1NjY1MTIyNDE4fQ.LcwFHbRmmwpfoufDpgkYbOUUD8npAw7sgR7RXse6eC8"}';
  localStorage.setItem('userDatas',userDatas);
  userDatas = JSON.parse(localStorage.getItem('userDatas'));
}
        await localStorage.setItem(key, jsonValue)
    } catch (e) {
    }
}

export const getData = async (key) => {
    try {
        
        const jsonValue = await localStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}

export const removeData = async (key) => {
    try {
        await localStorage.removeItem(key)
    } catch (e) {
    }
}


export const storeValue = async (key, value) => {
    try {
        await localStorage.setItem(key, value)
    } catch (e) {
    }
}

export const getValue = async (key) => {
    try
    {
        return await localStorage.getItem(key)
    } catch (e) {
        console.log("Error", e);
        return null;
    }
}
