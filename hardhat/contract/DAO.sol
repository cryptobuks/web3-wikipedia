pragma solidity ^0.8.0;

contract DAO {
    event proposalCreated(bytes32 indexed _proposalId, bytes32 _contentId, address _owner, uint256 _remainingDays);
    event proposalUpdated(bytes32 indexed _proposalId, bytes32 _contentId, address _owner, uint256 _remainingDays, uint256 _upVotes, uint256 _downVotes);
    event proposalFinished(bytes32 indexed _proposalId, bytes32 _contentId, address _owner, uint256 _finalUpVotes, uint256 _finalDownVotes);

    struct proposal {
        address proposalOwner;
        // bytes32 proposalId;
        bytes32 contentId;
        uint256 remainingDays;
        uint256 upVotes;
        uint256 downVotes;
        bool isExist;
    }

    mapping (bytes32 => proposal) proposalRegistry; 

    constructor() {}

    function openProposal(string calldata _proposalUri, string calldata _contentUri, uint256 _remainingDays) external {
        address _owner = msg.sender;
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        bytes32 _contentId = keccak256(abi.encode(_contentUri));

        require(proposalRegistry[_proposalId].isExist == false);  // The proposal does not exist

        proposalRegistry[_proposalId].proposalOwner = _owner;
        proposalRegistry[_proposalId].contentId = _contentId;
        proposalRegistry[_proposalId].remainingDays = _remainingDays;
        proposalRegistry[_proposalId].upVotes = 0;
        proposalRegistry[_proposalId].downVotes = 0;
        proposalRegistry[_proposalId].isExist = true;

        emit proposalCreated(_proposalId, _contentId, _owner, _remainingDays);
    }

    function updateProposal(string calldata _proposalUri, uint256 _upVotes, uint256 _downVotes) external {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        if (proposalRegistry[_proposalId].remainingDays == 0) {
            closeProposal(_proposalUri);
        } else {
            proposalRegistry[_proposalId].remainingDays -= 1;
            proposalRegistry[_proposalId].upVotes += _upVotes;
            proposalRegistry[_proposalId].downVotes += _downVotes;
            emit proposalUpdated(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].remainingDays, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
        }
    }

    // Close the proposal 7 days after proposal opened
    function closeProposal(string calldata _proposalUri) public {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].remainingDays == 0);
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        emit proposalFinished(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
    }
}
