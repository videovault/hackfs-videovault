import React, { useState, ChangeEvent } from "react";
import { Profile } from "./App";

interface ProfileCardProps {
  address: string;
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

export default function ProfileCard(props: ProfileCardProps) {
  const [publicName, setPublicName] = useState(props.profile.publicName);
  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    props.setProfile({ publicName });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    setPublicName(e.target.value);
  }

  return (
    <>
      <h1>ProfileCard</h1>
      <dl>
        <dt>Address:</dt>
        <dd>{props.address}</dd>
      </dl>
      <form onSubmit={handleSubmit}>
        <label>
          Public Name:
          <input
            name="public-name"
            value={publicName}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
