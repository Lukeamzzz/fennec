import BasicLink from "@/stories/BasicLink";

const InvestmentOpportunities = () => {
    return (
        <div>
            <div className="flex items-center justify-between w-full my-6 mx-2 pr-5">
                <h3 className="pl-2 text-2xl font-medium text-black">
                    Investment Opportunities
                </h3>

                <BasicLink
                    text="Ver más"
                    href="/dashboard/investment-opportunities"
                />
            </div>
        </div>

    );
}


export default InvestmentOpportunities;