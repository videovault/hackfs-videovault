pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract nft is ERC721 {

    struct ContentCreator{
        uint256 UserID;
        string Username;
        address payable Useraddress;
    }
    ContentCreator[] public creators;

    struct Subscriber{
        uint256 SubsID;
        string Subsname;
        address payable Subsaddress;
    }
    Subscriber[] public subscribers;

    uint256 userId = 1;
    uint256 consumerId = 1;
    uint256 amount = 0.005 ether;

    mapping(string => bool) _CreatorExists;
    mapping(string => bool) _SubscriberExists;
    mapping(uint256 => Subscriber[]) _SubscriberList;
    mapping(uint256 => ContentCreator[]) _SubscriptionList;

    constructor() ERC721("Video-Valut", "VIVA") public {
    }

    fallback() external payable { }
    receive() external payable { }

    function AccountCredentials(string memory _name) public {
        require(!_CreatorExists[_name]);
        creators.push(ContentCreator(userId,_name,msg.sender));
        _mint(msg.sender,userId);
        _CreatorExists[_name] = true;
        userId++;
    }

    function Association(uint256 _consumerId, uint256[] memory _creatorsList) public {
        uint256[] memory list = _creatorsList;
        for(uint i = 0; i<list.length;i++){
            _SubscriptionList[_consumerId].push(ContentCreator(list[i],creators[i].Username,creators[i].Useraddress));
        }
        
        for(uint i = 0; i<list.length;i++){
            _SubscriberList[list[i]].push(Subscriber(list[i],subscribers[i].Subsname,subscribers[i].Subsaddress));
        }
    }
    
    function MakePayment(uint256[] memory _creatorsList) public {
        require(msg.sender.balance>amount);
        uint256[] memory subscribed = _creatorsList;
        uint256 len = subscribed.length;
        for(uint i = 0; i < len; i++){
            creators[subscribed[i]].Useraddress.transfer(amount);
        }
    }

    function Subscribe(string memory _subsname) public {
        require(!_SubscriberExists[_subsname]);
        subscribers.push(Subscriber(consumerId,_subsname,msg.sender));
        _SubscriberExists[_subsname] == true;
        consumerId++;
    }
}