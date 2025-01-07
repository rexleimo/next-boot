"use client";
import { useEffect, useState } from 'react';

function InstallPWA() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      // 阻止浏览器默认的安装提示
      e.preventDefault();
      // 保存安装提示事件
      setPromptInstall(e as never);
      setSupportsPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) {
      return;
    }
    // 显示安装提示
    promptInstall.prompt();
    // 等待用户响应
    await promptInstall.userChoice;
    // 清理提示
    setPromptInstall(null);
  };

  if (!supportsPWA) {
    return null;
  }

  return (
    <button className="install-button" onClick={onClick}>
      安装应用
    </button>
  );
}

export default InstallPWA;
