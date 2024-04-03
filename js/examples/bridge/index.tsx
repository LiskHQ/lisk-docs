import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  http,
  Address,
  Account,
  Hash,
  TransactionReceipt,
  createPublicClient,
  createWalletClient,
  custom,
  parseEther,
  stringify,
  Hex,
} from 'viem'
import { sepolia, liskSepolia } from 'viem/chains'
import {
  getL2TransactionHashes,
  publicActionsL2,
  publicActionsL1,
  walletActionsL1,
  walletActionsL2,
  getWithdrawals,
} from 'viem/op-stack'
import 'viem/window'

export type Withdrawal = {
  nonce: bigint
  sender: Hex
  target: Hex
  value: bigint
  gasLimit: bigint
  data: Hex
  withdrawalHash: Hex
}

export const publicClientL1 = createPublicClient({
  chain: sepolia,
  transport: http(),
}).extend(publicActionsL1())

export const walletClientL1 = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum!),
}).extend(walletActionsL1())

export const walletClientL2 = createWalletClient({
  chain: liskSepolia,
  transport: custom(window.ethereum!),
}).extend(walletActionsL2())

export const publicClientL2 = createPublicClient({
  chain: liskSepolia,
  transport: http(),
}).extend(publicActionsL2())

function Example() {
  const [account, setAccount] = useState<Address>()
  /** Deposit variables */
  const [l1Hash, setL1Hash] = useState<Hash>()
  const [l1Receipt, setL1Receipt] = useState<TransactionReceipt>()
  const [l2Receipt, setL2Receipt] = useState<TransactionReceipt>()
  const [state, setState] = useState<
    'idle' | 'preparing' | 'processingL1' | 'processingL2' | 'success'
  >('idle')
  /** Withdraw variables */
  const [wd, setWd] = useState<Withdrawal | undefined>(undefined);
  const [secondsTilProve, setSecondsTilProve] = useState<number>()
  const [l2HashWD, setL2HashWD] = useState<Hash>()
  const [l1HashWD, setL1HashWD] = useState<Hash>()
  const [l1ReceiptWD, setL1ReceiptWD] = useState<TransactionReceipt>()
  const [l2ReceiptWD, setL2ReceiptWD] = useState<TransactionReceipt>()
  const [finalReceiptWD, setFinalReceiptWD] = useState<TransactionReceipt>()
  const [stateWithdraw, setStateWithdraw] = useState<
    'idle' | 'preparing withdraw' | 'processing withdraw L2' | 'proving withdraw' | 'prove success' | 'finalizing withdraw' | 'withdraw success'
  >('idle')

  const addressInput = React.createRef<HTMLInputElement>()
  const valueInput = React.createRef<HTMLInputElement>()

  const connect = async () => {
    const [address] = await walletClientL1.getAddresses()
    setAccount(address)
  }

  const depositTransaction = async () => {
    setState('preparing');
    const request = await publicClientL2.buildDepositTransaction({
      account,
      mint: parseEther(valueInput.current!.value as `${number}`),
      to: addressInput.current!.value as Address,
    });
    const hash = await walletClientL1.depositTransaction(request);
    setL1Hash(hash);
  }

  const withdrawTransaction = async () => {
    setStateWithdraw('preparing withdraw');
    const request = await publicClientL1.buildInitiateWithdrawal({ 
      account, 
      to: addressInput.current!.value as Address,
      value: parseEther(valueInput.current!.value as `${number}`),
    });
    const hash = await walletClientL2.initiateWithdrawal(request)
    setL2HashWD(hash)
  }

  const checkWithdraw = async () => {
    if (!l2ReceiptWD) return
    const receipt = await publicClientL2.getTransactionReceipt({
      hash: l2ReceiptWD.transactionHash as `0x${string}`
    })
     
    const { 
      interval, 
      seconds, 
      timestamp
    } = await publicClientL1.getTimeToProve({ 
      receipt, 
      targetChain: publicClientL2.chain, 
    })

    setSecondsTilProve(seconds);
  }

  const proveWithdraw = async () => {
    if (!l2ReceiptWD) return
    setStateWithdraw('proving withdraw');
    const receipt = await publicClientL2.getTransactionReceipt({ 
      hash: l2ReceiptWD.transactionHash as `0x${string}`
    })
    // Wait until the withdrawal is ready to prove.
    const { output, withdrawal } = await publicClientL1.waitToProve({
      receipt,
      targetChain: walletClientL2.chain
    })
    const args = await publicClientL2.buildProveWithdrawal({ 
      account, 
      output, 
      withdrawal, 
    }) 
    setWd(withdrawal);
    const hash = await walletClientL1.proveWithdrawal(args)
    setL1HashWD(hash)
  }

  const finalizeWithdraw = async () => {
      if (!(l1ReceiptWD && wd && account)) return
      setStateWithdraw('finalizing withdraw')

      // Wait until the withdrawal is ready to finalize. (this seems buggy, it's not waiting for the withdrawal to be ready to finalize)
      await publicClientL1.waitToFinalize({
        targetChain: walletClientL2.chain,
        withdrawalHash: wd.withdrawalHash as `0x${string}`,
      })

      // Finalize the withdrawal.
      const finalizeHash = await walletClientL1.finalizeWithdrawal({
        account,
        targetChain: walletClientL2.chain,
        withdrawal: wd,
      })
      
      // Wait until the withdrawal is finalized.
      const receipt = await publicClientL1.waitForTransactionReceipt({
        hash: finalizeHash
      })
      setFinalReceiptWD(receipt)
      setStateWithdraw('withdraw success')
  };

  /** Deposit */

  useEffect(() => {
    ;(async () => {
      if (!l1Hash) return
      setState('processingL1')
      const receipt = await publicClientL1.waitForTransactionReceipt({
        hash: l1Hash,
      })
      setL1Receipt(receipt)
    })()
  }, [l1Hash])

  useEffect(() => {
    ;(async () => {
      if (!l1Receipt) return
      setState('processingL2')
      const [l2Hash] = getL2TransactionHashes(l1Receipt)
      const receipt = await publicClientL2.waitForTransactionReceipt({
        hash: l2Hash,
      })
      setL2Receipt(receipt)
      setState('success')
    })()
  }, [l1Receipt])

  /** Withdraw */

  /** Initialization */

  useEffect(() => {
    ;(async () => {
      if (!l2HashWD) return
      setStateWithdraw('processing withdraw L2')
      // Wait for the initiate withdrawal transaction receipt.      
      const receipt = await publicClientL2.waitForTransactionReceipt({
        hash: l2HashWD,
      })
      setL2ReceiptWD(receipt)
    })()
  }, [l2HashWD])

  /** Prove */

  useEffect(() => {
    ;(async () => {
      if (!l1HashWD) return
      const receipt = await publicClientL1.waitForTransactionReceipt({
        hash: l1HashWD,
      })
      setL1ReceiptWD(receipt)
      setStateWithdraw('prove success')
    })()
  }, [l1HashWD])

  /** User Interface */

  if (account)
    return (
      <>
        <div>Connected: {account}</div>
        <input ref={addressInput} placeholder="address" />
        <input ref={valueInput} placeholder="value (ether)" />
        <h2>Deposit</h2>
        <p>For depositing, change the network in Metamask to L1 (Sepolia)</p>
        <button
          disabled={
            state === 'preparing' ||
            state === 'processingL1' ||
            state === 'processingL2'
          }
          onClick={depositTransaction}
        >
          {state === 'preparing'
            ? 'Preparing...'
            : state === 'processingL1' || state === 'processingL2'
              ? 'Processing...'
              : 'Deposit'}
        </button>
        <h2>Withdraw</h2>

        {(
        <div>
          <div>
            Seconds until Prove:{' '}
            <p>{ secondsTilProve }</p>
          </div>
       </div>
      )}

        <p>For initializing the withdraw, change the network in Metamask to L2 (Lisk Sepolia) and click the Withdraw button</p>
        <button
          disabled={
            stateWithdraw === 'preparing withdraw' ||
            stateWithdraw === 'processing withdraw L2'
          }
          onClick={withdrawTransaction}
        >
          {stateWithdraw === 'preparing withdraw' ? 'Preparing Withdraw...'
            : stateWithdraw === 'processing withdraw L2' ? 'Processing Withdraw...'
            : 'Withdraw'}
        </button>
        <p>Check, if the withdraw is ready to be proven.</p>
        <button
          disabled={
            stateWithdraw !== 'processing withdraw L2' 
          }
          onClick={checkWithdraw}
        >
          Check Withdraw Proving
        </button>
        <p>For proving the withdraw, change the network in Metamask to L1 (Sepolia)</p>
        <button
          disabled={
            stateWithdraw !== 'processing withdraw L2' 
          }
          onClick={proveWithdraw}
        >
          {stateWithdraw === 'proving withdraw' ? 'Proving Withdraw...'
            : 'Prove Withdraw'}
        </button>
        <p>Finalize the withdraw:</p>
        <button
          disabled={
            stateWithdraw !== 'prove success' 
          }
          onClick={finalizeWithdraw}
        >
          {stateWithdraw === 'finalizing withdraw' ? 'Finalizing Withdraw...'
            : 'Finalize Withdraw'}
        </button>
        
        {/* Deposit Flow */}

        {state === 'processingL1' && <div>Processing L1 transaction...</div>}
        {l1Receipt && (
          <div>
            L1 Receipt:{' '}
            <pre>
              <code>{stringify(l1Receipt, null, 2)}</code>
            </pre>
          </div>
        )}

        {state === 'processingL2' && <div>Processing L2 transaction...</div>}
        {l2Receipt && (
          <div>
            L2 Receipt:{' '}
            <pre>
              <code>{stringify(l2Receipt, null, 2)}</code>
            </pre>
          </div>
        )}

      {/* Withdraw Flow */}

      {stateWithdraw === 'processing withdraw L2' && <div>Initiating withdraw L2...</div>}
      {l2ReceiptWD && (
        <div>
          L2 Withdraw Receipt:{' '}
          <p>For proving the withdraw, change the network in Metamask to L1 (Sepolia)</p>
          <pre>
            <code>{stringify(l2ReceiptWD, null, 2)}</code>
          </pre>
          
        </div>
      )}

      {stateWithdraw === 'proving withdraw' && <div>Proving withdraw transaction L1...</div>}
      {l1HashWD && (
        <div>
          L1 Hash:{' '}
          <pre>
            <code>{stringify(l1HashWD, null, 2)}</code>
          </pre>
        </div>
      )}

      {stateWithdraw === 'prove success' && <div>Proving success L1...</div>}
      {wd && l1ReceiptWD && (
        <div>
          L1 Prove Receipt:{' '}
          <pre>
            <code>{stringify(l1ReceiptWD, null, 2)}</code>
          </pre>
          <p>Withdrawal:</p>
          <pre>
            <code>{stringify(wd, null, 2)}</code>
          </pre>
        </div>
      )}

      {stateWithdraw === 'finalizing withdraw' && <div>Finalizing withdraw transaction L1...</div>}
      {finalReceiptWD && (
        <div>
          L1 Finalize Receipt:{' '}
          <pre>
            <code>{stringify(finalReceiptWD, null, 2)}</code>
          </pre>
        </div>
      )}
      </>
    )
  return <button onClick={connect}>Connect Wallet</button>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Example />,
)
