import Account from "@/components/settings/account/Account";
import DeleteCard from "@/components/settings/account/DeleteCard";
import * as React from "react";
import {Toaster} from 'sonner';

function AccountSection() {
    const [showDeleteCard, setShowDeleteCard] = React.useState(false);

    return (
        <>
            {showDeleteCard && <DeleteCard onClose={() => setShowDeleteCard(false)} />}
            <div className="bg-white rounded-lg p-6 mb-6 items-center">
                <Account onDeleteClick={() => setShowDeleteCard(true)} />
            </div>
            <Toaster position="bottom-right"  />
        </>
    );
}

export default AccountSection;
