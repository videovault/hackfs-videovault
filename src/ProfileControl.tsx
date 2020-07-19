import React, { useState } from "react";
import Box from "3box";
import { Profile } from "./App";
import ProfileCard from "./ProfileCard";

const PUBLIC_NAME = "public-name";

interface ProfileControlProps {
  box: Box.Box;
}

export default function ProfileControl(props: ProfileControlProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({ publicName: "" });
  async function handleLogin(_: unknown) {
    const [address] = await (window as any).ethereum.enable();
    setAddress(address);
    console.log(address);
    await props.box.auth([], { address });
    await props.box.syncDone;
    await loadProfileFromBox();
    setIsLoggedIn(true);
  }

  async function loadProfileFromBox() {
    const publicName = await props.box.public.get(PUBLIC_NAME);
    setProfile({ publicName });
  }

  async function writeProfileToBox(profile: Profile) {
    console.log(profile);
    await props.box.public.set(PUBLIC_NAME, profile.publicName);
  }

  return isLoggedIn ? (
    address && (
      <ProfileCard
        address={address}
        profile={profile}
        setProfile={writeProfileToBox}
      />
    )
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
}
