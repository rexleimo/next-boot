// 定义 hook 的返回类型
export interface UseSSEReturn<T = any> {
    data: T | null;
    error: Event | null;
    close: () => void;
}
