import * as z from 'zod'
import { sendRedirect } from 'h3'

export default function useRedirect(url: string, code: number = 302): Promise<void> {
    const validUrl = z.url().parse(url)
    if (validUrl) {
        if (import.meta.server) {
            const nuxtApp = useNuxtApp()
            if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
                return nuxtApp.callHook('app:redirected').then(() => {
                    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
                        return sendRedirect(nuxtApp.ssrContext.event, url, code)
                    }
                })
            }
        } else {
            window.location.href = url
        }
    } else {
        throw new Error('Redirection failed')
    }
}