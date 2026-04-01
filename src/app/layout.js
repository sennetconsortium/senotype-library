import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import "./main.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import MountedWrapper from "@/components/MountedWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body>
      
        <ErrorBoundary>
          <MountedWrapper>
            {children}
          </MountedWrapper>
          
        </ErrorBoundary>
        </body>
    </html>
  );
}
