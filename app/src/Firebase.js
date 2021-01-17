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

export const getImpact = (setImpact) => {
    const userId = localStorage.getItem("uid");

    const impactRef = db.ref(`/users/${userId}/impact`);
    impactRef.on("value", (snap) => {
        setImpact(snap.val() || {})
    })
}

export const getFulfilledImpact = (setFulfilledImpact) => {
    const userId = localStorage.getItem("uid");

    const fulfilledImpactRef = db.ref(`/users/${userId}/fulfilledImpact`);
    fulfilledImpactRef.on("value", (snap) => {
        setFulfilledImpact(snap.val() || {})
    })
}

export const updateImpact = (addImpact) => {
    const userId = localStorage.getItem("uid");

    const impactRef = db.ref(`/users/${userId}/impact`);
    impactRef.once("value").then(function(snap) {
        if(snap.val() === null)
            impactRef.set({emissions: addImpact})
        else {
            impactRef.set({emissions: snap.val().emissions + addImpact})
        }
    })
}

export const getGoals = (setGoals) => {
    const userId = localStorage.getItem("uid");

    const goalsRef = db.ref(`/users/${userId}/goals`);
    goalsRef.on("value", (snapshot) => {
        setGoals(snapshot.val() || {})
    });
}

export const updateGoalStatus = (goal, currStatus) => {
    const userId = localStorage.getItem("uid");
    const impactRef = db.ref(`/users/${userId}/fulfilledImpact`);
    const goalImpactRef = db.ref(`/users/${userId}/goals/${goal}/reducedBy`);

    const updates = {};
    updates[`/users/${userId}/goals/${goal}/fulfilled`] = !currStatus;
    
    impactRef.once("value").then((snap) => {
        let fulfilledImpact = 0;
        if(snap.val() !== null)
            fulfilledImpact = snap.val().emissions
        goalImpactRef.once("value").then((snap) => {
                const diffImpact = snap.val()
                if(currStatus)
                    impactRef.set({emissions: fulfilledImpact-diffImpact})
                else impactRef.set({emissions: fulfilledImpact+diffImpact})
            })
        }   
    )

    return db.ref().update(updates);
};

export const getSlideSeries = (setAllSlideSeries) => {
    const userId = localStorage.getItem("uid");

    const seriesRef = db.ref(`/users/${userId}/slideSeries`);
    seriesRef.on("value", (snapshot) => {
        setAllSlideSeries(snapshot.val() || [])
    });
};

export const updateSlideSeries = (allSlideSeries) => {
    const userId = localStorage.getItem("uid");

    const updates = {};
    updates[`/users/${userId}/slideSeries`] = allSlideSeries.slice(1, allSlideSeries.length);

    return db.ref().update(updates);
};

export const updateSlideSeriesMaybeLater = (allSlideSeries) => {
    const userId = localStorage.getItem("uid");

    const updates = {};
    let copy = [...allSlideSeries];
    copy.push(copy.splice(0, 1)[0]);
    updates[`/users/${userId}/slideSeries`] = copy;

    return db.ref().update(updates);
};

export const updateSlideSeriesUpgrade = (allSlideSeries, currGoal, nextGoal) => {
    const userId = localStorage.getItem("uid");

    const updates = {};
    updates[`/users/${userId}/slideSeries`] = allSlideSeries.slice(1, allSlideSeries.length);

    const goalsRef = db.ref(`/users/${userId}/goals`);
    goalsRef.child(currGoal).once("value").then(function(snap) {
        const data = snap.val();
        const update = {};
        update[currGoal] = null;
        update[nextGoal] = data;
        goalsRef.update(update);
    });

    return db.ref().update(updates);
}

export const updateGoals = (goalString, goalType, reducedBy, alreadyDoing) => {
    const userId = localStorage.getItem("uid");

    /* update specific goal entry for user */
    const postData = {
        goalType: goalType,
        fulfilled: false,
        reducedBy: reducedBy,
        alreadyDoing: alreadyDoing,
    };

    const updates = {};
    updates[`/users/${userId}/goals/${goalString}`] = postData;
    db.ref().update(updates);
};

export const createUser = (email, password, history, setErrorState) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in
            const userId = res.user.uid;

            // Add user to DB
            db.ref(`users/${userId}`).set({
                email: email,
                goals: [],
            });

            db.ref(`/users/${userId}/slideSeries`).set([0, 1])
            db.ref(`/users/${userId}/impact`).set({emissions: 0})
            db.ref(`/users/${userId}/fulfilledImpact`).set({emissions: 0})

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
    localStorage.clear();
    history.push("/landing");
};
