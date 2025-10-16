type UserAgent = {
    userAgent: string;
    ip?: string;
}

export function useUserAgent(): UserAgent | null {
    if (import.meta.server) {
        const nuxtApp = useNuxtApp()

        const request = nuxtApp.ssrContext?.event.node.req
        if (nuxtApp.ssrContext && request) {
            const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

            const userAgent = request.headers['user-agent']

            return {
                userAgent: userAgent || 'unknown',
                ip: typeof ip == 'string' ? ip : ip?.[0]
            }
        }
    } else {
        return {
            userAgent: navigator.userAgent
        }
    }

    return null
}