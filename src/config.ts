const Config = {
    isDev: import.meta.env.DEV,
    serverUrl: import.meta.env.VITE_SERVER_URL,
    serverApi: `${import.meta.env.VITE_SERVER_URL}/${import.meta.env.VITE_SERVER_API_PREFIX}`
};
export default Config;
