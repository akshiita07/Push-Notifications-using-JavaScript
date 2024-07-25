# Push-Notifications-using-JavaScript
This project is a demonstration of browser notification functionality using the JavaScript `Notification` API. The goal is to showcase how to request permission from users to display notifications, create custom notifications, and use notifications to re-engage users when they navigate away from the page.

### Project Overview

The project consists of two main parts:

1. **Button-Triggered Notification**: When the user clicks a button, a notification is displayed. This notification includes custom text, an icon, and additional data. The user’s permission is requested first, ensuring that notifications can be displayed. If permission is granted, a notification is created and displayed. Additionally, an event listener is added to log an event when the notification is closed.

2. **Page Visibility Notifications**: When the user leaves the page (i.e., the page visibility state changes to "hidden"), a periodic notification is displayed every second, urging the user to return. This notification includes a dynamic message that indicates how many seconds the user has been away. When the user returns to the page, the notifications stop, and any displayed notification is closed.

### Detailed Explanation

#### Button-Triggered Notification

When the user clicks the button, the following steps occur:

1. **Request Permission**: The browser requests permission to display notifications. This is essential because browsers need user consent to show notifications.

    ```javascript
    Notification.requestPermission().then(perm => {
        // handle permission response
    });
    ```

2. **Create Notification**: If the user grants permission (`perm === "granted"`), a new notification is created with a title, body, icon, and tag. The tag ensures that repeated clicks on the button overwrite the existing notification instead of creating multiple notifications.

    ```javascript
    const newNotif = new Notification('This is a new notification.', {
        body: "To add more info to this new notification after button click",
        data: { hello: "world" },
        icon: "logo.png",
        tag: "First Notification",
    });
    ```

3. **Event Listener for Notification Close**: An event listener is added to log a message when the notification is closed.

    ```javascript
    newNotif.addEventListener("close", e => {
        console.log(e);
    });
    ```

#### Page Visibility Notifications

This part handles notifications when the user leaves or returns to the page:

1. **Visibility Change Event**: An event listener is added to monitor changes in page visibility.

    ```javascript
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            // user has left the page
        } else {
            // user has returned to the page
        }
    });
    ```

2. **Hidden State Handling**: When the page becomes hidden, a timestamp is recorded. A notification is created every second to inform the user how long they have been away.

    ```javascript
    if (document.visibilityState === "hidden") {
        let leaveDate = new Date();
        interval = setInterval(() => {
            userAppear = new Notification('Come back!!', {
                body: `We are missing you since ${Math.round(((new Date()) - leaveDate) / 1000)} seconds 😭`,
                tag: "Come back",
            });
        }, 1000);
    }
    ```

3. **Visible State Handling**: When the user returns to the page, the interval is cleared, and the notification is closed.

    ```javascript
    if (document.visibilityState === "visible") {
        if (userAppear) userAppear.close();
        if (interval) clearInterval(interval);
    }
    ```

### Conclusion

This project provides a practical demonstration of how to use the `Notification` API to engage users. It covers requesting permission, creating notifications, and using page visibility events to manage notifications dynamically. By implementing these features, developers can enhance user interaction and keep users engaged even when they navigate away from the page.
