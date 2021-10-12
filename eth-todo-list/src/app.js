App = {
  load: async () => {
    await App.loadWeb3();
    await App.loadAccount();
    await App.loadContract();
    
  },
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        // Request account access if needed
        await ethereum.enable();
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        });
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      });
    }
    // Non-dapp browsers...
    else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  },
  loadAccount: async () => {
    App.account = web3.eth.getAccounts().then(e=>{
        console.log(e[0])
    });
    
  },
  loadContract: async () => {
      const todoList = await $.getJSON('TodoList.json')
        console.log(todoList);
      
  },
};
$(() => {
  $(window).load(() => {
    App.load();
  });
});
