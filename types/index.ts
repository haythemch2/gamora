export type TransactionType = {
    from: string;
    to: string;
    amount: number;
    Hash: string;
    token: Token;
    timestamp: string | null;
  };
  
  export type Token = {
    address: string;
    decimals: number;
    logo?: {
      src: string;
      width?: string;
      height?: string;
      ipfs_hash?: string;
    };
    name: string;
    social?: {
      blog?: string;
      chat?: string;
      facebook?: string;
      forum?: string;
      github?: string;
      gitter?: string;
      instagram?: string;
      linkedin?: string;
      reddit?: string;
      slack?: string;
      telegram?: string;
      twitter?: string;
      youtube?: string;
    };
    support?: {
      email?: string;
      url?: string;
    };
    symbol: string;
    website?: string;
  };
  
  export interface TokenList {
    [key: string]: Token;
  }
  