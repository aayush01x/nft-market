use ink_lang::contract;
use ink_storage::collections::HashMap;

#[cfg(not(feature = "ink-as-dependency"))]
#[ink::contract]
mod nft_market {
    #[ink(storage)]
    pub struct NftMarket {
        owner: AccountId,
        nfts: HashMap<TokenId, AccountId>,
    }

    #[ink(event)]
    pub struct Transfer {
        from: AccountId,
        to: AccountId,
        token_id: TokenId,
    }

    #[ink(event)]
    pub struct Mint {
        to: AccountId,
        token_id: TokenId,
    }

    #[ink(event)]
    pub struct ListForSale {
        token_id: TokenId,
        price: Balance,
    }

    #[ink(event)]
    pub struct Buy {
        buyer: AccountId,
        seller: AccountId,
        token_id: TokenId,
        price: Balance,
    }

    #[ink(impl)]
    impl SimpleNFT {
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            Self {
                owner: caller,
                nfts: HashMap::new(),
            }
        }

        #[ink(message)]
        pub fn mint(&mut self, to: AccountId, token_id: TokenId) {
            let caller = self.env().caller();
            assert_eq!(caller, self.owner, "Only the owner can mint new NFTs");
            assert!(!self.nfts.contains_key(&token_id), "Token ID already exists");

            self.nfts.insert(token_id, to);
            self.env().emit_event(Mint { to, token_id });
        }

        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, token_id: TokenId) {
            let caller = self.env().caller();
            let current_owner = self.nfts.get(&token_id).cloned().unwrap_or(caller);
            assert_eq!(current_owner, caller, "Only the owner can transfer the NFT");

            self.nfts.insert(token_id, to);
            self.env().emit_event(Transfer {
                from: current_owner,
                to,
                token_id,
            });
        }

        #[ink(message)]
        pub fn list_for_sale(&mut self, token_id: TokenId, price: Balance) {
            let caller = self.env().caller();
            assert_eq!(self.nfts.get(&token_id).cloned(), Some(caller), "You can only list your own NFTs for sale");

            self.env().emit_event(ListForSale { token_id, price });
        }

        #[ink(message)]
        pub fn buy(&mut self, token_id: TokenId) {
            let caller = self.env().caller();
            let seller = self.nfts.get(&token_id).cloned().expect("Token not found");
            let price = self.env().transferred_balance();

            self.env().transfer(seller, price).expect("Transfer failed");
            self.nfts.insert(token_id, caller);

            self.env().emit_event(Buy {
                buyer: caller,
                seller,
                token_id,
                price,
            });
        }

        #[ink(message)]
        pub fn get_owner(&self, token_id: TokenId) -> AccountId {
            self.nfts.get(&token_id).cloned().unwrap_or(AccountId::from([0; 32]))
        }
    }
}
