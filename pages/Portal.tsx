import { Suspense } from "react";
import PortalTest from "../components/3d/PortalTest";

export default function Portal() {
  return (
    <div>
      <Suspense fallback={null}>
        <PortalTest></PortalTest>
      </Suspense>
    </div>
  );
}
