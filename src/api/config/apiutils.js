import useApi from "../hooks/useApi";

export default useApi;

export const validateData = (objectApi, lengthCheckObject, firstTimeOnly = false) => {
    if (((!objectApi.loading) || ((firstTimeOnly) && (objectApi.callCount > 1))) && (!objectApi.errorStatus) && (objectApi.data) && (objectApi.data.hasOwnProperty("requestedData")) && ((!lengthCheckObject) || ((objectApi.data.requestedData.hasOwnProperty(lengthCheckObject)) && ((!Array.isArray(objectApi.data.requestedData[lengthCheckObject])) || (objectApi.data.requestedData[lengthCheckObject].length > 0))))) {
        //if ((!lengthCheckObject) || (objectApi.data[objectInfo][lengthCheckObject].length > 0)) {
        console.log("Validate Success objectApi:", objectApi);
        return true;
        //}
    }
}

export const SafeBox = ({ objectApi, lengthCheckObject, noDataMessage, errorBlockClass, spinnerBlockClass, firstTimeOnly, children }) => {
    if (validateData(objectApi, lengthCheckObject, firstTimeOnly)) {
        return children;
    } else if (objectApi.loading) {
        return <ErrorBox children={<div className="lds-dual-ring2"></div>} extraClass={spinnerBlockClass} />
    } else if (objectApi.errorStatus) {
        return <ErrorBox children={<span style={{ width: "100%", textAlign: "center", color: "#E02020" }}>Error : {objectApi.errorMessage}!</span>} extraClass={errorBlockClass} />
    } else if ((!objectApi.data) || (objectApi.data.hasOwnProperty("requestedData"))) {
        if (noDataMessage)
            return <ErrorBox children={<span style={{ width: "100%", textAlign: "center", color: "#E02020" }}>{noDataMessage}</span>} extraClass={errorBlockClass} />
        else
            return <></>
    } else if ((lengthCheckObject) && (objectApi.data.requestedData[lengthCheckObject].length == 0)) {
        if (noDataMessage)
            return <ErrorBox children={<span style={{ width: "100%", textAlign: "center", color: "#E02020" }}>{noDataMessage}</span>} extraClass={errorBlockClass} />
        else
            return <></>
    } else {
        return <ErrorBox children={<span style={{ width: "100%", textAlign: "center", color: "#E02020" }}>Error : something went wrong!</span>} extraClass={errorBlockClass} />
    }
}

export const BusyBlock = ({ iAmBusy }) => ((iAmBusy) && <div style={{ position: 'absolute', backgroundColor: 'rgba(244, 244, 244, 0.7)', width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", paddingTop: "100px" }}><ErrorBox><div className="lds-dual-ring2"></div></ErrorBox>  </div> || <></>)

export const BusyBlockAUtoHeight = ({ iAmBusy }) => ((iAmBusy) && <div style={{ position: 'absolute', backgroundColor: 'rgba(244, 244, 244, 0.7)', width: '100%', height: '100%', justifyContent: 'center', alignItems: "center", display: "flex" }}><div className="lds-dual-ring2"></div> </div> || <></>)

export const AttachSafeBox = ({ objectApi, lengthCheckObject = false, firstTimeOnly = false, children, ...rest }) => <SafeBox noDataMessage="Sorry.. No Records found found!" objectApi={objectApi} lengthCheckObject={lengthCheckObject} firstTimeOnly={firstTimeOnly} children={children} {...rest}> {validateData(objectApi, lengthCheckObject, firstTimeOnly) && children} </SafeBox>

export const ErrorMessage = ({ extraClass, children }) => (
    <ErrorBox extraClass={extraClass}>
        <span style={{ width: "100%", textAlign: "center", color: "#E02020" }}> {children}</span>
    </ErrorBox>
)

const ErrorBox = ({ extraClass, children }) => (
    <div className={`row text-center ${(extraClass) ? extraClass : ''}`}>
        <div className="gap-50"></div>
        <div className="gap-50" style={{ height: "auto" }}>{children}</div>
        <div className="gap-50"></div>
    </div>
)

