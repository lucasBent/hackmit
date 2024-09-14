import { CapacitorHttp } from '@capacitor/core'

const HOST = import.meta.env.VITE_BACKEND_HOST
const PORT = import.meta.env.VITE_BACKEND_PORT

function getBackendApiUrl() {
    return `${HOST}:${PORT}/`
}

class backend {
    static async doGet(url: string) {
        const options = {
            url: `${getBackendApiUrl()}${url}`,
            headers: { 'Accept': 'application/json', 'Access-Control-Allow-Origin': getBackendApiUrl() },
        }

        const response = await CapacitorHttp.get(options)
        return response
    }
    static async doPost(url: string, data: any) {
        const options = {
            url: `${getBackendApiUrl()}${url}`,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': getBackendApiUrl() },
            data: data,
        }

        const response = await CapacitorHttp.post(options)
        return response
    }
}

export default backend
