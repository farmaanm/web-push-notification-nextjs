import { NextResponse } from 'next/server';
import webpush from 'web-push';

// web-push generate-vapid-keys

export async function POST(request) {
    const { subscription } = await request.json();

    console.log("SUBSCRIPTION");
    console.log(subscription);

    const notificationPayload = JSON.stringify({
        title: "Yippee 🎉",
        body: "You just received a new message",
        icon: "https://some-image-url.jpg",
        data: {
            url: "https://example.com",
        },
    });

    const options = {
        vapidDetails: {
            subject: "mailto:test@gmail.com",
            publicKey: 'YOUR_PUBLIC_KEY',
            privateKey: 'YOUR_PRIVATE_KEY',
        },
        timeout: 5000,
        TTL: 3600,
        contentEncoding: 'aes128gcm',
        urgency: 'high',
        topic: 'new-message',
        proxy: null,
        agent: null,
    };

    try {
        await webpush.sendNotification(subscription, notificationPayload, options);
        return NextResponse.json({ message: "Notification sent successfully." });
    } catch (error) {
        console.error("Error sending notification", error);
        return NextResponse.error();
    }
}
