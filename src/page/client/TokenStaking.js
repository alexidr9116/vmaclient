import GradientButton from "../../component/GradientButton";
import Page from "../../component/Page";

export default function TokenStaking() {
    return (
        <Page title="Token Staking" className="flex flex-col md:flex-row gap-4 p-8 lg:gap-8 lg:p-16 mb-10">
            <div className=" border-yellow-1 border-4 rounded-2xl flex flex-col p-8">
                <label className="font-bold text-lg mb-4">KOMO Token Staking</label>
                <label className="font-bold text-sm mb-2">Balance</label>
                <label className="font-bold text-lg mb-4">10,000 KOMO</label>
                <label className="font-bold text-sm mb-2">Stake Amount</label>
                <div className="flex justify-between gap-2 items-end mb-4">
                    <input className="input input-bordered input-sm rounded-none w-[150px] sm:w-full text-black"></input>
                    <label className="font-bold text-lg"> KOMO</label>
                </div>
                <label className="font-bold text-sm mb-2">Duration</label>
                <div className="grid grid-cols-2 gap-2 mb-4" >
                    <GradientButton className='btn-sm' text="7 days" />
                    <GradientButton className='btn-sm' text="14 days" disabled={true} />
                    <GradientButton className='btn-sm' text="30 days" disabled={true} />
                    <GradientButton className='btn-sm' text="90 days" disabled={true} />
                    <GradientButton className='btn-sm' text="180 days" disabled={true} />
                    <GradientButton className='btn-sm' text="365 days" disabled={true} />

                </div>
                <label className="font-bold text-sm mb-2">APY</label>
                <label className="font-bold text-lg mb-4">50% APY</label>
                <GradientButton className='' text="STake Token" />
            </div>
            <div className=" border-yellow-1 border-4 rounded-2xl flex flex-col p-2 sm:p-4 md:p-8  w-full items-start">
                <label className="font-bold text-lg mb-8 text-center w-full">Portfolio</label>
                <div className="flex flex-col md:flex-row w-full  border-b border-white p-2 items-center gap-2">
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex flex-col">
                            <label className="text-sm">Stake Amount/Duration</label>
                            <label className="">500 KOMO/ 7days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Remaining</label>
                            <label className="">5 days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">APY</label>
                            <label className="">50%</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Reward</label>
                            <label className="">+0.52 KOMO</label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <GradientButton className={'btn-sm min-w-[120px]'} text={'Get Reward'} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full   border-b border-white p-2  items-center gap-2">
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex flex-col">
                            <label className="text-sm">Stake Amount/Duration</label>
                            <label className="">500 KOMO/ 90days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Remaining</label>
                            <label className="">26 days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">APY</label>
                            <label className="">50%</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Reward</label>
                            <label className="">+120.75 KOMO</label>
                        </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <GradientButton className={'btn-sm min-w-[120px]'} text={'Get Reward'} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row w-full   border-b border-stone-200 p-2  items-center gap-2">
                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex flex-col">
                            <label className="text-sm">Stake Amount/Duration</label>
                            <label className="">500 KOMO/ 365days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Remaining</label>
                            <label className="">342 days</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">APY</label>
                            <label className="">50%</label>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm">Reward</label>
                            <label className="">+10.75 KOMO</label>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <GradientButton className={'btn-sm min-w-[120px]'} text={'Get Reward'} />
                    </div>

                </div>
            </div>
        </Page>
    )
}