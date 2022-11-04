pragma solidity ^0.8.0;


contract DAO {
    event documentCreated(bytes32 indexed _documentId, address _documentOwner, uint256 _version);
    event documentUpdated(bytes32 indexed _documentId, address _documentOwner, uint256 _version);
    event proposalCreated(bytes32 indexed _proposalId, bytes32 _contentId, address _proposalOwner, uint256 _remainingDays);
    event proposalInfo(bytes32 indexed _proposalId, bytes32 _contentId, address _proposalOwner, uint256 _remainingDays, uint256 _upVotes, uint256 _downVotes);
    event proposalFinished(bytes32 indexed _proposalId, bytes32 _contentId, address _proposalOwner, uint256 _finalUpVotes, uint256 _finalDownVotes);

    struct document {
        bytes32 contentId;
        address documentOwner;
        uint256 version;
        bool isExist;
    }

    struct proposal {
        bytes32 contentId;
        address proposalOwner;
        uint256 remainingDays;
        uint256 upVotes;
        uint256 downVotes;
        bool isExist;
    }

    mapping (bytes32 => document) documentRegistry;
    mapping (bytes32 => proposal) proposalRegistry; 

    constructor() {}

    function createDocument(string calldata _documentUri, string calldata _contentUri) external {
        bytes32 _documentId = keccak256(abi.encode(_documentUri));
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        address _owner = msg.sender;
        require(proposalRegistry[_documentId].isExist == false);  // The proposal does not exist

        documentRegistry[_documentId].contentId = _contentId;
        documentRegistry[_documentId].documentOwner = _owner;
        documentRegistry[_documentId].version = 0;
        documentRegistry[_documentId].isExist = true;

        emit documentCreated(_contentId, _owner, 0);
    }

    function updateDocument(string calldata _documentUri) external {
        bytes32 _documentId = keccak256(abi.encode(_documentUri));
        require(documentRegistry[_documentId].isExist == true);  // The proposal does not exist

        documentRegistry[_documentId].version += 1;
        emit documentUpdated(documentRegistry[_documentId].contentId, documentRegistry[_documentId].documentOwner, documentRegistry[_documentId].version);
    }

    function openProposal(string calldata _proposalUri, string calldata _contentUri, uint256 _remainingDays) external {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        address _owner = msg.sender;
        require(proposalRegistry[_proposalId].isExist == false);  // The proposal does not exist

        proposalRegistry[_proposalId].contentId = _contentId;
        proposalRegistry[_proposalId].proposalOwner = _owner;
        proposalRegistry[_proposalId].remainingDays = _remainingDays;
        proposalRegistry[_proposalId].upVotes = 0;
        proposalRegistry[_proposalId].downVotes = 0;
        proposalRegistry[_proposalId].isExist = true;

        emit proposalCreated(_proposalId, _contentId, _owner, _remainingDays);
    }

    function voteProposal(string calldata _proposalUri, bool isUpVotes) external {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        if (isUpVotes) {
            proposalRegistry[_proposalId].upVotes += 1;
        } else {
            proposalRegistry[_proposalId].downVotes += 1;
        }
        emit proposalInfo(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].remainingDays, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
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
            emit proposalInfo(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].remainingDays, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
        }
    }

    // Close the proposal 7 days after proposal opened
    function closeProposal(string calldata _proposalUri) public {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].remainingDays == 0);
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        proposalRegistry[_proposalId].isExist = false;
        emit proposalFinished(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
    }

    function forceClose(string calldata _proposalUri) external {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        proposalRegistry[_proposalId].remainingDays = 0;
        closeProposal(_proposalUri);
    }
    
    function viewProposalInformation(string calldata _proposalUri) external {
        bytes32 _proposalId = keccak256(abi.encode(_proposalUri));
        require(proposalRegistry[_proposalId].isExist == true);  // The proposal exists

        emit proposalInfo(_proposalId, proposalRegistry[_proposalId].contentId, proposalRegistry[_proposalId].proposalOwner, proposalRegistry[_proposalId].remainingDays, proposalRegistry[_proposalId].upVotes, proposalRegistry[_proposalId].downVotes);
    }
}
