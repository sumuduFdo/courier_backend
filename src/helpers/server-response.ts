export interface ServerResponse {
    error: boolean;
    errorInfo: {
        status: number | null,
        message: string | null
    } | null,
    data: any;
}
