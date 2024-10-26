'use server'

import { cookies } from "next/headers";
import { randomUUID } from "crypto";

type User = {
    id: string;
}

const COOKIE_NAME = "user_id";

export async function getUser() {
    const cookieStore = await cookies();
    if (!cookieStore.has(COOKIE_NAME)) {
        try {
            cookieStore.set(COOKIE_NAME, randomUUID());
        } catch {}
    }
    const userID = cookieStore.get(COOKIE_NAME)?.value;
    return {
        id: userID
    } as User
}