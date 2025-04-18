import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useLayoutEffect } from "react";
import { api, apiMultiPart } from "~/api";
import { refreshToken, useToken } from "~/api/client.auth";

export default function AuthProvider({access_token, children}: { access_token?: string, children: React.ReactNode }) {
    useQuery({
        initialData: access_token || "",
        queryKey: ['access-token'],
        queryFn: () => refreshToken(),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const [token, setToken] = useToken();

    useLayoutEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config: any) => {
                config.headers.Authorization = !config['_retry'] && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        );

        const interceptorMultiPart = apiMultiPart.interceptors.request.use(
            (config: any) => {
                config.headers.Authorization = !config['_retry'] && token ? `Bearer ${token}` : config.headers.Authorization;
                return config;
            }
        );

        return () => {
            api.interceptors.request.eject(interceptor);
            apiMultiPart.interceptors.request.eject(interceptorMultiPart);
        }
    }, [token]);

    useLayoutEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                const original = error.config;

                if(error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await refreshToken();
                        setToken(response);

                        original.headers.Authorization = `Bearer ${response}`;
                        original._retry = true;

                        return api(original);
                    } catch {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        const interceptorMultiPart = apiMultiPart.interceptors.response.use(
            (response) => response,
            async (error) => {
                const original = error.config;

                if(error.response.status === 401 && error.response.data.message === 'Unauthorized') {
                    try {
                        const response = await refreshToken();
                        setToken(response);

                        original.headers.Authorization = `Bearer ${response}`;
                        original._retry = true;

                        return apiMultiPart(original);
                    } catch {
                        setToken(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
            apiMultiPart.interceptors.response.eject(interceptorMultiPart);
        }
    }, []);

    return children;
}