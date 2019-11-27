//@flow
import * as firebase from "firebase/app";
import "firebase/firestore";
import { BoxType, IDType, MoveType, MoveUpdateType,MoveCursorType} from './schema'
import generateID from "../utils/generateID";
const db = firebase.firestore();


//mutations
export const addBox = (moveID: IDType, box: BoxType): Promise<any> => {
    const obj={};
    obj[generateID()]=box;
    return db.collection("moves").doc(moveID).set({boxes:{obj}},{merge:true})
};
export const deleteBox = (moveID: IDType, boxID:IDType): Promise<any> => {
    const updates={};
    updates[`boxes.${boxID}`]=firebase.firestore.FieldValue.delete();
    return db.collection("moves").doc(moveID).update(updates)
};
export const updateBox = (moveID: IDType, boxID:IDType,box: BoxType): Promise<any> => {
    const obj={};
    const updates={};
    updates[`boxes.${boxID}`]=box;
    return db.collection("moves").doc(moveID).set({boxes:{obj}},{merge:true})
};
export const addMove = (move: MoveType): Promise<any> => {
    return db.collection("moves").add(move)
};
export const deleteMove = (moveID: IDType): Promise<any> => {
    return db.collection('moves').doc(moveID).delete()
};
export const updateMove = (moveID: IDType, move: MoveUpdateType): Promise<any> => {
    return db.collection("moves").doc(moveID).update(move)
};


//cursors
export const initCursor= (limit:number):MoveCursorType=>({limit:limit});
export const movesCursor = async (userID: IDType, cursor: MoveCursorType): MoveCursorType => {
        const moves = [];

        const query = db.collection('moves')
            .where("user", "==", userID)
            .orderBy("date", "desc")
            .limit(cursor.limit);


        if (cursor && cursor.last) {
            query.startAfter(cursor.last)
        }
        const qSnap = await query.get();
        const last = qSnap.docs[qSnap.docs.length - 1];
        qSnap.forEach((doc) => {
            moves.push(doc.data());
        });


        return {limit: cursor.limit, last: last, moves: moves}
    };

//observers
export const moveObserver = (moveID: IDType, onSuccess:(move:MoveType)=>void,onError:(err)=>void): ()=>void => {
    return db.collection('moves').doc(moveID).onSnapshot((doc)=>onSuccess(doc.data()),(err)=>onError(err))

};






