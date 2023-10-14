import React, { useCallback, useState } from "react";
import ButtonMarquee from "~~/components/ButtonMarquee";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function Donate() {
  const [donateVal, setDonateVal] = useState(0.001);

  // const adjustDonateVal = (val: number) => {
  //   const res = donateVal + val;
  //   if (res > 0) setDonateVal(parseFloat(res.toFixed(5)));
  //   // else notification.warning("")
  // };

  const multiplyBy1e18 = useCallback((value: any) => {
    if (!value) {
      return;
    }
    if (typeof value === "bigint") {
      return value * 10n ** 18n;
    }
    return BigInt(Math.round(Number(value) * 10 ** 18));
  }, []);

  const { writeAsync, isLoading, isSuccess } = useScaffoldContractWrite({
    contractName: "SFGContract",
    functionName: "donate",
    value: multiplyBy1e18(donateVal),
  });

  const onDonate = () => {
    if (donateVal > 0) {
      writeAsync();
    } else {
      notification.warning("You didn't set an amount to donate!");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full flex-1 py-10">
        <div className="flex flex-col gap-4 items-center py-8 px-4 md:p-10 w-full max-w-[45rem] border-2 rounded-3xl border-black bg-base-100">
          {isSuccess ? (
            <>
              <p className="font-bold text-3xl">🧡 Thank you for your donation🧡</p>
            </>
          ) : (
            <>
              <p className="font-bold text-3xl">🧡 Make a donation 🧡</p>
              <p className="text-center max-w-[400px]">
                Your awesome donation means you&apos;re in for a chance to join our fun lottery and score some prizes as
                our way of saying thanks for your support!
              </p>

              <div className="flex-1 w-full flex-col flex items-center">
                <p className="text-sm opacity-70 w-full text-center mb-1">Donation distribution</p>
                <div className="w-full max-w-[400px] flex rounded-xl overflow-clip">
                  <div className="bg-yellow-500 w-[75%] h-8 flex justify-center items-center">
                    <span className="text-yellow-200 font-bold">Donation</span>
                  </div>
                  <div className="bg-purple-500 w-[25%] h-8 flex justify-center items-center">
                    <span className="text-purple-200 font-bold">Prize</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 my-2 w-auto flex flex-col">
                <label className="ml-3 font-bold">Donation Amount</label>
                <div className="mt-1 flex items-center input input-bordered bg-base-100 w-[360px]">
                  <label className="ml-2 font-bold text-xl select-none mr-2">ETH</label>
                  <input
                    className="w-[120px] font-bold text-xl bg-base-100"
                    type="number"
                    value={donateVal}
                    onChange={e => setDonateVal(parseFloat(e.currentTarget.value))}
                  />
                </div>
                <span className="ml-3 mt-2 text-accent">{`ETH${(donateVal * 0.75).toFixed(5)} into Donation`}</span>
                <span className="ml-3  text-primary">{`ETH${(donateVal * 0.25).toFixed(5)} into Prize`}</span>
              </div>
              {/* 
              <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col gap-2">
                  <button
                    className="btn btn-outline btn-secondary"
                    disabled={donateVal <= 0.1}
                    onClick={() => adjustDonateVal(-0.1)}
                  >
                    - 0.1
                  </button>
                  <button
                    className="btn btn-outline btn-secondary"
                    disabled={donateVal <= 0.01}
                    onClick={() => adjustDonateVal(-0.01)}
                  >
                    - 0.01
                  </button>
                  <button
                    className="btn btn-outline btn-secondary"
                    disabled={donateVal <= 0.001}
                    onClick={() => adjustDonateVal(-0.001)}
                  >
                    - 0.001
                  </button>
                </div>
                <div className="divider divider-horizontal"></div>

                <div className="flex flex-col gap-2">
                  <button className="btn btn-outline btn-accent" onClick={() => adjustDonateVal(0.1)}>
                    + 0.1
                  </button>
                  <button className="btn btn-outline btn-accent" onClick={() => adjustDonateVal(0.01)}>
                    + 0.01
                  </button>
                  <button className="btn btn-outline btn-accent" onClick={() => adjustDonateVal(0.001)}>
                    + 0.001
                  </button>
                </div>
              </div> */}
              <ButtonMarquee isLoading={isLoading} disabled={isLoading} onClick={() => onDonate()} text="Donate" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
