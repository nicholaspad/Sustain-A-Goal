import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBH52fYwnC9Y6HfGj4CVMDVlwdzBS285R0",
    authDomain: "cruzhacks-2021-sn.firebaseapp.com",
    projectId: "cruzhacks-2021-sn",
    storageBucket: "cruzhacks-2021-sn.appspot.com",
    messagingSenderId: "323432439022",
    appId: "1:323432439022:web:1e803cccf566d37ed567ff",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const updateGoalStatus = (goalString, currStatus, goalType) => {
    const userId = localStorage.getItem("uid");

    const updates = {};
    updates[`/users/${userId}/${goalType}-goals/${goalString}/fulfilled`] = !currStatus;

    return db.ref().update(updates);
};

export const getGoals = (goalType, setGoals) => {
    const userId = localStorage.getItem("uid");

    const goalsRef = db.ref(`/users/${userId}/${goalType}-goals`);
    goalsRef.on("value", (snapshot) => {
        console.log(snapshot.val());
        setGoals(snapshot.val() || {});
    });
};

export const updateGoals = (goalString, goalType, impactVal, alreadyDoing) => {
    const userId = localStorage.getItem("uid");

    const postData = {
        goalType: goalType,
        impactVal: impactVal,
        fulfilled: false,
        alreadyDoing: alreadyDoing,
    };

    const updates = {};
    updates[`/users/${userId}/${goalType}-goals/${goalString}`] = postData;

    return db.ref().update(updates);
};

export const createUser = (email, password, history, setErrorState) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in
            const userId = res.user.uid;

            // Add user to DB
            db.ref("users/" + userId).set({
                email: email,
            });

            localStorage.setItem("uid", res.user.uid);

            // Go to home page
            history.push("/home");
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-email") {
                setErrorState({
                    error: true,
                    errorType: "email",
                    errorMessage: "This is not a valid email.",
                });
            } else if (errorCode === "auth/email-already-in-use") {
                setErrorState({
                    error: true,
                    errorType: "email",
                    errorMessage: "Email is already in use.",
                });
            } else if (errorCode === "auth/weak-password") {
                setErrorState({
                    error: true,
                    errorType: "password",
                    errorMessage: "Password must be at least 6 characters.",
                });
            }
        });
};

export const fetchUser = (email, password, history, setErrorState) => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            localStorage.setItem("uid", res.user.uid);

            // Go to home page
            history.push("/home");
        })
        .catch((error) => {
            var errorCode = error.code;
            if (errorCode === "auth/invalid-email") {
                setErrorState({
                    error: true,
                    errorType: "email",
                    errorMessage: "This is not a valid email.",
                });
            } else if (errorCode === "auth/user-not-found") {
                setErrorState({
                    error: true,
                    errorType: "email",
                    errorMessage: "Email does not match any user.",
                });
            } else if (errorCode === "auth/wrong-password") {
                setErrorState({
                    error: true,
                    errorType: "password",
                    errorMessage: "Password is incorrect.",
                });
            }
        });
};

export const logoutUser = (history) => {
    firebase.auth().signOut();
    history.push("/landing");
};
