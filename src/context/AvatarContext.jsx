"use client"

import Avatar from "@/ui/Avatar";

const { createContext, useContext, useState } = require("react")

const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
    const [avatarUrl, setAvatarUrl] = useState(null);

    return (
        <AvatarContext.Provider value={{ avatarUrl, setAvatarUrl }}>
            {children}
        </AvatarContext.Provider>
    )
}

export const useAvatar = () => useContext(AvatarContext);

export function AvatarWrapper() {
  const { avatarUrl } = useAvatar();
  return <Avatar src={avatarUrl || "/frontend/public/images/ezgif-1-bbb826fb1b.jpg"} />;
}