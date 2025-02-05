import { useState, useEffect, useRef } from 'react';
import {UseSSEReturn} from "@/hooks/useSSE/types";

/**
 * useSSE hook
 *
 * @param url - SSE 服务端的 URL
 * @param options - 可选的 EventSource 配置参数(EventSourceInit)
 * @returns 当前接收到的 data，可能的 error 以及关闭连接的方法 close
 *
 * 使用示例:
 * const { data, error, close } = useSSE("http://your-sse-endpoint", { withCredentials: true });
 */
function useSSE<T = any>(
    url: string,
    options?: EventSourceInit
): UseSSEReturn<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Event | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!url) return;

        // 创建 EventSource 实例
        const eventSource = new EventSource(url, options);
        eventSourceRef.current = eventSource;

        // 监听消息事件，并更新数据
        eventSource.onmessage = (event: MessageEvent) => {
            // 注意根据实际情况处理传回的数据格式（例如 json 字符串需要 parse）
            try {
                const parsedData = JSON.parse(event.data);
                setData(parsedData);
            } catch {
                // 当数据不是 JSON 格式时，直接设置为字符串
                setData(event.data as any);
            }
        };

        // 监听错误事件
        eventSource.onerror = err => {
            setError(err);
            // 遇到错误时关闭连接，防止重复连接导致多余的流量
            eventSource.close();
        };

        // 清理函数，在组件卸载或 url 变化时关闭 SSE 连接
        return () => {
            eventSource.close();
        };
    }, [url, options]);

    // 对外提供手动关闭 SSE 连接的 API
    const close = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
        }
    };

    return { data, error, close };
}
export default useSSE;
