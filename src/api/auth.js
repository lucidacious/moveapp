//@flow
import * as firebase from "firebase/app";
import "firebase/auth";
import { ProviderType,UserIDType,UserType} from './schema'



export const getProviders=():ProviderType[]=>{
    return[
        {
            name:'email'
        },
        {
            name:'facebook',
            providerInfo: new firebase.auth.FacebookAuthProvider()
        },
        {
            name:'github',
            providerInfo: new firebase.auth.GithubAuthProvider()
        },
        {
            name:'google',
            providerInfo: new firebase.auth.GoogleAuthProvider()
        }
    ]
};

export const setEmailProviderCredentials=(email:string,password:string):ProviderType=>{
  return {
      name:'email',
      providerInfo:{
          email:email,
          password:password
      }

  }
};

export const login= async (provider:ProviderType) => {
    const info = provider.providerInfo;
    if (provider.name === 'email'){
        try {
            await firebase.auth().createUserWithEmailAndPassword(info.email, info.password);
        } catch (err) {
            console.error(err);
            throw err;
        }

    }
    else{
        try {
            await firebase.auth().signInWithPopup(info);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

};
export const logout = () => firebase.auth().signOut();


export const authObserver = (onSuccess:(user:any)=>{},onError:(err:any)=>{}): ()=>void => {
    function normalize(fbUser:any):UserType{
        const meta =fbUser.metadata;
        const user:UserType={ userID:fbUser.uid, name:fbUser.displayName,lastSignOn:meta.lastSignInTime,created:meta.creationTime,avatar:fbUser.photoURL,email:fbUser.email,emailVerified:fbUser.emailVerified}
        onSuccess(user)
    }
    return  firebase.auth.onAuthStateChanged(normalize, onError)
};


export const deleteUser=async(userID:UserIDType)=>{
    try
        await fir
}

export const changePassword=()=>{}

export const changeName=()=>{}