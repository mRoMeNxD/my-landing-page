"use client";

import { defaultProfile } from "@/lib/profile";
import { IdentityScene } from "@/components/IdentityScene";

export default function Home() {
  return <IdentityScene profile={defaultProfile} />;
}
