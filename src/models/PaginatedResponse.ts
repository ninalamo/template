export interface PaginatedResponse<T>
{
    data: T[],
    total_count: number,
    page_number: number,
    page_size: number
}