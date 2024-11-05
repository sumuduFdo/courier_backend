// interface for consistent shape of data sent to client
export default interface HttpResponse {
    error: {status: number, message: string} | null;
    data: any;
}
