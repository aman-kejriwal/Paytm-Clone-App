"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import createP2Ptransaction from "../../lib/actions/createP2Ptransaction";

export default function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [numError, setError]=useState("");
    const [insuffFund, setInsuffFund]=useState("");
    return <div className="h-[90vh] w-full">
        <Center>
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <div>
                        <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
                            setNumber(value)
                            setError("")
                            }} />
                        <div className="text-red-600 text-sm">{numError}</div>
                    </div>
                    <div>
                        <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                            setAmount(value)
                            setInsuffFund("");
                        }} />
                        <div className="text-red-600 text-sm">{insuffFund}</div>
                    </div>
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res=await createP2Ptransaction(number,Number(amount));
                            if(res==="errorPhone"){
                                setError("Number not found");
                            }
                            else if(res==="errorYourNum"){
                                setError("It's your number")
                            }
                            else if(res==="errorInsuffiFund"){
                                setInsuffFund("Insufficient Fund")
                            }
                            else 
                            window.location.href='/transfer'
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}