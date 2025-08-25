import { NextRequest, NextResponse } from "next/server";
import  { db }  from "../../lib/db";

const COINS = process.env.NFT_COINS;

export async function POST(req: NextRequest) {
    
  try {
    const { wallet_address } = await req.json();

    if ( !wallet_address) {
      return NextResponse.json({ message: "Missing input" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const  [exist]: any = await db.query("SELECT is_nft_claimed FROM users WHERE wallet_address = ? AND is_quest_completed = ?", [wallet_address, 1]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if((exist as any[]).length > 0){
       
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const is_claimed = (exist as any[])[0];

      if(is_claimed.is_nft_claimed === 0){
        
        await db.query("UPDATE users SET  points = points + ?, is_nft_claimed = 1 WHERE wallet_address = ?", [COINS, wallet_address]);
       return NextResponse.json({ message: 'NFT Coins Credited Successfully' }, { status: 200 });

      }else{
        return NextResponse.json({ message: 'Already Claimed  NFT Coins'}, { status: 200 });
      }

    }else{

    return NextResponse.json({ message: 'Something is wrong!' }, { status: 400 });

    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("API Error:", err.message);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
