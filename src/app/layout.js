import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import log from 'xac-loglevel'

import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MountedWrapper from "@/components/MountedWrapper";
import getAuth from "@/lib/auth";
import ENVS from "@/lib/envs";

export default function RootLayout({ children }) {
  
  log.setConfig({level: ENVS.logLevel})

  return (
    <html lang="en" >
      <body>
      
        <ErrorBoundary>
          <AntdRegistry>
            <MountedWrapper auth={getAuth()}>
               {children}
            </MountedWrapper>
          </AntdRegistry>
        </ErrorBoundary>
        </body>
    </html>
  );
}
