import React from 'react';

interface TabButtonGroupProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

function TabButtonGroup({ activeTab, onTabChange }: TabButtonGroupProps) {
    const tabs = [
        { id: 'profile', label: 'Perfil' },
        { id: 'account', label: 'Cuenta' },
    ];


    return (
        <div className="w-full border-b border-gray-200">
            <nav className="w-full flex justify-evenly">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`w-full px-6 py-4 text-md font-medium text-center transition-colors ${
                            activeTab === tab.id
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );

}

export default TabButtonGroup;
