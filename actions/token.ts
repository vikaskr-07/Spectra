'use server'

import { v4 } from 'uuid';
import { AccessToken } from 'livekit-server-sdk';
import { getSelf } from '@/lib/auth-service';
import { getUserById } from '@/lib/user-service';
import { isBlockedByUser } from '@/lib/block-service';

export async function createViewerToken(hostIdentity: string) {
    let self;
    try {
        self = await getSelf();
    } catch {
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        self = { id, username };
    }

    const host = await getUserById(hostIdentity);
    if (!host) {
        throw new Error('User not found');
    }

    const isBlocked = await isBlockedByUser(host.id);
    if (isBlocked) {
        throw new Error('User is blocked');
    }

    const isHost = self.id === host.id;

    // Log the keys for debugging
    console.log("LiveKit API Key:", process.env.LIVEKIT_API_KEY);
    console.log("LiveKit API Secret:", process.env.LIVEKIT_API_SECRET);

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        throw new Error("LiveKit API Key and Secret must be set");
    }

    const token = new AccessToken(apiKey, apiSecret, {
        identity: isHost ? `host-${self.id}` : self.id,
        name: self.username
    });
    
    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true
    });

    return token.toJwt();
}
