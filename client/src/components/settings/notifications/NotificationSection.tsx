import MailNotifications from "@/components/settings/notifications/MailNotifications";
import TypeNotifications from "@/components/settings/notifications/TypeNotifications";

function NotificationSection(){
    return(
        <div>
            <MailNotifications/>
            <TypeNotifications/>
        </div>
    )
}

export default NotificationSection;