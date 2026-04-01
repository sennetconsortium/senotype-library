"use client";
import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";

function MountedWrapper({children}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)

    document.getElementById('__temp')?.remove()
  }, []);

  return (
    <ConfigProvider>
      <style
        id="__temp"
        dangerouslySetInnerHTML={{
          __html: `*, *::before, *::after {transition: none!important;}`,
        }}
      />
    <div style={{visibility: !mounted ? 'hidden' : 'visible'}}>
      {children}
    </div>
  </ConfigProvider>
  )
}

export default MountedWrapper