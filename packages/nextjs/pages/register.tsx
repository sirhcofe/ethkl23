import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";


export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [walletAddress, setWalletAddress] = useState("");
	const [supportingDoc, setSupportingDoc] = useState("");

	const { writeAsync, isLoading, isSuccess } = useScaffoldContractWrite({
    contractName: "SFGContract",
    functionName: "registerNPO",
		args: [walletAddress, name]
  });

	const onSubmit = () => {
    if (!name || !email || walletAddress.length != 42 || !supportingDoc) {
			notification.warning("Invalid Fields!!");
		} else {
      writeAsync();
    }
  };

	return (
		<div className="flex flex-col justify-center items-center h-full flex-1 py-10">
			<div className="flex flex-col gap-4 items-center p-10 w-[45rem] border-2 rounded-3xl border-black bg-base-100">
			{isSuccess ? (
            <>
              <p className="font-bold text-3xl">🧡 Registration Complete! 🧡</p>
              <p className="font-bold text-lg text-center">Please allow us some time to process your documents.<br/>Take this time to browse around!</p>
            </>
          ) : (
						<>
							<p className="font-bold text-3xl">🧡 Register 🧡</p>
							<p className="text-center max-w-[400px]">
								Register your Non-Profit Organization to be able to participate in our donation lottery!
							</p>
							<div className="flex flex-col w-full gap-4">
								<div className="flex flex-col gap-2">
									<label htmlFor="name">NPO Name</label>
									<input
										type="text"
										name="name"
										id="name"
										className="border-2 border-black bg-base-100 rounded-lg px-2 py-1"
										placeholder="ABC Old Folks Home"
										required
										onInput={(e) => setName(e.currentTarget.value)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										name="email"
										id="email"
										className="border-2 border-black bg-base-100 rounded-lg px-2 py-1"
										placeholder="abc@gmail.com"
										required
										onInput={(e) => setEmail(e.currentTarget.value)}
									/>
								</div>
								<div className="flex flex-col gap-2 w-full">
									<label htmlFor="name">Wallet Address</label>
									<input
										type="text"
										name="name"
										id="name"
										className="border-2 border-black bg-base-100 rounded-lg px-2 py-1"
										placeholder="0x30c0114Ba7Afa450Dd32ba0c576a888379312BfB"
										required
										onInput={(e) => setWalletAddress(e.currentTarget.value)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="name">Supporting Documentations</label>
									<input
										type="file"
										name="file"
										id="file"
										className="border-2 border-black bg-base-100 rounded-lg px-2 py-1"
										required
										onInput={(e) => setSupportingDoc(e.currentTarget.value)}
									/>
								</div>
								<div className="flex flex-col gap-2">
									<label htmlFor="name">Additional Information</label>
									<textarea
										name="name"
										id="name"
										className="border-2 border-black bg-base-100 rounded-lg px-2 py-1"
										placeholder="Please provide any additional information you would like us to know."
									/>
								</div>
								<button
									className="btn btn-outline btn-secondary"
									onClick={() => onSubmit()}
									disabled={isLoading}
								>
									Submit
								</button>
							</div>
						</>
					)}
			</div>
		</div>
	)
}
					