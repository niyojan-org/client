"use client"

import { SWRConfig } from "swr"
import fetcher from "@/lib/fetcher"

export default function ProvidersSwr({ children }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                revalidateOnFocus: true,   // when tab gets focus, refresh data
                shouldRetryOnError: true,  // retry on errors
                dedupingInterval: 2000,    // prevent excessive refetching (2s gap)
            }}
        >
            {children}
        </SWRConfig>
    )
}