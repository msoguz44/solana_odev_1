import * as fs from 'fs';
import { Keypair, Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js';

const connection = new Connection('https://api.devnet.solana.com');

const WALLET_FILE_PATH = 'wallet.json';

interface Wallet {
    privateKey: string;
    publicKey: string;
    balance: number;
}

let currentWallet: Wallet | null = null;

const loadWallet = (): Wallet | null => {
    try {
        const walletData = fs.readFileSync(WALLET_FILE_PATH, 'utf-8');
        return JSON.parse(walletData);
    } catch (error) {
        return null;
    }
};

const saveWallet = (wallet: Wallet): void => {
    fs.writeFileSync(WALLET_FILE_PATH, JSON.stringify(wallet, null, 2));
};

const createWallet = async (): Promise<void> => {
    const keypair = Keypair.generate();
    const publicKey = keypair.publicKey.toBase58();
    const balance = await connection.getBalance(publicKey);
    const wallet: Wallet = {
        privateKey: keypair.secretKey.toString(),
        publicKey: publicKey,
        balance: balance
    };
    saveWallet(wallet);
    console.log('Wallet created and saved successfully.');
    console.log(wallet);
};

const airdrop = async (amount: number = 1): Promise<void> => {
    if (!currentWallet) {
        console.error('No wallet found. Please create or load a wallet first.');
        return;
    }

    const publicKey = new PublicKey(currentWallet.publicKey);
    await connection.requestAirdrop(publicKey, amount * 1000000000); // SOL to lamports
    console.log(`${amount} SOL airdropped to wallet: ${currentWallet.publicKey}`);
};

const checkBalance = async (): Promise<void> => {
    if (!currentWallet) {
        console.error('No wallet found. Please create or load a wallet first.');
        return;
    }

    const publicKey = new PublicKey(currentWallet.publicKey);
    const balance = await connection.getBalance(publicKey);
    console.log(`Balance for wallet ${currentWallet.publicKey}: ${balance} SOL`);
};

const transfer = async (recipientPublicKey: string, amount: number): Promise<void> => {
    if (!currentWallet) {
        console.error('No wallet found. Please create or load a wallet first.');
        return;
    }

    const fromPublicKey = new PublicKey(currentWallet.publicKey);
    const toPublicKey = new PublicKey(recipientPublicKey);
    const fromKeypair = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(currentWallet.privateKey)));
    const recentBlockhash = await connection.getRecentBlockhash();
    
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports: amount * 1000000000 // SOL to lamports
        })
    );

    transaction.feePayer = fromPublicKey;
    transaction.recentBlockhash = recentBlockhash.blockhash;
    
    const signedTransaction = await window.solana.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());
    await connection.confirmTransaction(signature);
    
    console.log(`${amount} SOL transferred from ${currentWallet.publicKey} to ${recipientPublicKey}. Transaction signature: ${signature}`);
};

// Load or create wallet
currentWallet = loadWallet();
if (!currentWallet) {
    createWallet();
}

// Sample usage
airdrop(1);
checkBalance();
// transfer('recipientPublicKey', 0.5);
