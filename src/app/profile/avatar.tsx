'use client';

import { RandomAvatar } from "react-random-avatars";

export const Avatar = ({ email }: { email: string }) => {
    return (
        <RandomAvatar name={email} size={96}/>
    )
}