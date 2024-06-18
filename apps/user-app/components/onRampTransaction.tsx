import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">   
        <div >
            {transactions.map((t,index) => <div key={index.toString()} className="py-2 flex justify-between border-b  border-slate-300 ">
                <div className="flex items-center gap-5">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div>
                        <Status status={t.status}></Status>
                        <div className="text-xs" >By {t.provider}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}
function Status({status}:{status:string}){
    if(status=="Success"){
        return <div className="text-green-600">Success</div>
    }
        else return <div className="text-red-600">Processing</div>
}