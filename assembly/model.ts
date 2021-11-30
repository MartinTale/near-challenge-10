import { context, u128, PersistentUnorderedMap } from "near-sdk-as";

@nearBindgen
export class User {
  premium: boolean;
  // deposits: Deposit[];
  timestamp: u64;
  votes: number;
  constructor(
    public name: string,
    public avatar: string
  ) {
    this.premium = context.attachedDeposit >= u128.from("10000000000000000000000");
    // this.deposits.push(new Deposit());
    this.timestamp = context.blockTimestamp / 1e6;
    this.votes = 0;
  }
}

export const users = new PersistentUnorderedMap<string, User>("m");
