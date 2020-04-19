import { Expo, ExpoPushMessage } from 'expo-server-sdk'

const expo = new Expo()

export interface PushToken {
  title: string
  body: string
  token?: string
  tokens?: string[]
}

export const handlePushOnOrderComplete = async ({
  title,
  body,
  token,
}: PushToken) => {
  const notification: ExpoPushMessage = {
    to: token || '',
    sound: 'default',
    title,
    body,
    data: { message: body },
  }

  try {
    await expo.sendPushNotificationsAsync([notification])
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

// Push multiple toekns
// export const handlePushTokens = ({ title, body, tokens }: PushToken) => {
//   const notifications: ExpoPushMessage[] = []

//   tokens.map(token => {
//     if (!Expo.isExpoPushToken(token)) {
//       console.error(`Push token ${token} is not a valid Expo push token`)
//     } else {
//       notifications.push({
//         to: token,
//         sound: 'default',
//         title,
//         body,
//         data: { body },
//       })
//     }
//   })

//   const chunks = expo.chunkPushNotifications(notifications)

//   chunks.map(async chunk => {
//     try {
//       const receipts = await expo.sendPushNotificationsAsync(chunk)
//     } catch (error) {
//       console.error(error)
//     }
//   })
// }
