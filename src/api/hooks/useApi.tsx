import { useState, useContext } from "react";
// import Router from 'next/router';


//import GlobalPropsContext from '../GlobalPropsContext';

const useApi = (apiFunc:any) => {
  //const { setAlertParams } = useContext(GlobalPropsContext);
  const [requestCalled, setRequestCalled] = useState(false);
  const [data, setData] = useState(null);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorHandled, setErrorHandled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [manualStart, setManualStart] = useState(false);
  const [inputArgs, setInputArgs] = useState({});
  const [callCount, setCallCount] = useState(0);

  const request = async (...args:any) => {
    if (!loading) {
      setRequestCalled(true);
      setInputArgs({ ...args });
      setLoading(true);
      try {
        setCallCount(callCount + 1);
        console.log("API Started");
        const response = await apiFunc(...args);
        console.log("API END and response", response);
        if ((response)) {
          if (response.data == "SUCCESS") {
            response.data.ok = true;
            setData(response.data);
            setErrorStatus(false);
            setErrorMessage('');
          } else {
            response.data.ok = false;
            setData(null);
            setErrorStatus(true)
          }
        } else {
          if (response)
            response.data.ok = false;
          else
            console.log("API Error - ...args", { ...args });
          setData(null);
          setErrorStatus(true);
          setErrorHandled(false);
          setErrorMessage('Sorry an Error Occured While connecting to server');
          setAlertParams_Later({ type: "danger", icon: "", title: "Sorry... Something went wrong.", message: "Server connection error! If the problem persists, please check your internet connectivity.", showAlert: true, callBack: () => { window.location.reload(); } });

        }
        setManualStart(false);
        setLoading(false);
        return ((response) && (response.hasOwnProperty('data')) && (response.data)) ? response.data : { ok: false };
      } catch (err) {
        console.log("err", err);
        // alert('here')
        setData(null);
        setErrorStatus(true);
        setErrorHandled(false);
        setErrorMessage('Sorry an Error Occured While connecting to server');
        // setAlertParams_Later({ type: "danger", icon: "", title: "Sorry... Something went wrong.", message: "Server connection error! If the problem persists, please check your internet connectivity. (" + err.message + ")", showAlert: true, callBack: () => { Router.reload(); } });
        setManualStart(false);
        setLoading(false);
        return { ok: false };
      }
    }
  };

  const setAlertParams_Later = (args:any) => {
    setTimeout(() => { alert(args.message) }, 100)
    //setTimeout(() => { setAlertParams(...args) }, 100)
  }

  return { data, errorStatus, errorMessage, errorHandled, loading, requestCalled, inputArgs, manualStart, callCount, setLoading, setManualStart, setCallCount, setErrorMessage, request };
};

export default useApi;