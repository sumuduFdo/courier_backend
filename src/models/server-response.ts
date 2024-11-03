export interface ServerResponse {
    error: boolean;
    errorInfo: {
        status: number | undefined,
        message: string | undefined
    },
    data: any;
}