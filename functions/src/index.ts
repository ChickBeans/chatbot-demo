import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// import { object } from 'firebase-functions/lib/providers/storage';
// adminの初期化処理
admin.initializeApp();
// admin権限でfirestoreを操作する、定数にいれることで、メモリを先に確保する
const db = admin.firestore();

const sendResponse = (response: functions.Response, statusCode: number, body: any) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    })
}

export const addDataset = functions.https.onRequest(async (req: any, res: any) => {
    if(req.method !== 'POST') {
        sendResponse(res, 405, {error: 'Invalid Request!'})
    } else {
        const dataset = req.body
        for (const key of Object.keys(dataset)) {
            const data = dataset[key]
            await db.collection('questions').doc(key).set(data)
        }
        sendResponse(res, 200, {message: 'Successfully added dataset!'})
    }
})