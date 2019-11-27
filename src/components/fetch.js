import  {useEffect, useState} from 'react';
function FetchData({renderComponent,renderError,fetchCommand,initialData=[],dependencies}) {
    const [dataContext, setData] = useState({data: initialData, error: null, isFetching: false});
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({data: dataContext.data, error: null, isFetching: true});
                const response = fetchCommand();
                setData({data: response.data, error: null, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({data: dataContext.data, error: e, isFetching: false});
            }
        };
        fetchData().then(() => {
        });
    }, []);
    return (dataContext.error) ? renderError(dataContext.error) : renderComponent(dataContext.data)
}
export default FetchData