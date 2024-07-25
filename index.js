const btn = document.querySelector("button");
btn.addEventListener("click", function () {
    // alert("You clicked me!");
    // Notification object-->1. request permission from user
    Notification.requestPermission().then(perm => {
        // alert(perm);    //tells if user allowed/denied notifications
        if (perm === "granted") {
            // create notification using this Notification object
            // new Notification('This is a new notification.');
            const newNotif = new Notification('This is a new notification.', {
                body: "To add more info to this new notification after button click",
                data: {
                    // cutsom objects
                    hello: "world"
                },
                icon: "logo.png",//to add a logo/icon
                tag: "First Notification",//no matter how many times u click it will overwrite ur notif itself
                // silent:,//for silent notifications
                // vibrate:,//to vibrate phone
            });

            newNotif.addEventListener("close", e => {
                // when user closes the notification
                console.log(e);
            })
        } else {
            // perm==="denied"
        }
    })

})

// add a notification whenever user leaves our page
let userAppear;
// also map time
let interval;
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        let leaveDate = new Date();
        interval = setInterval(() => {
            userAppear = new Notification('Come back!!', {
                body: `We are missing you since ${Math.round(((new Date()) - (leaveDate)) / 1000)} seconds😭`,
                // convert ms to s
                tag: "Come back",
            })
        }, 1000)
    } else {
        // when user comes back then automatically close this notification
        if (userAppear) userAppear.close();
        if (interval) clearInterval(interval);
    }
})