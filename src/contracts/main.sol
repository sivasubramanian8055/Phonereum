pragma solidity ^0.5.16;

contract main{

    address public admin;
    uint proposalCount;

    struct NeedyStudent{
        uint aadhaar_id;
        address schAddr;
        uint averageFamilyIncome;
        string ipfsHash;
        uint consignment;
        bool flagged;
    }

    struct school{
        uint pincode;
        address id;
        string name;
        uint totalStudents;
        uint needyCount;
        uint currentConsignment;
        bool active;
        uint balance;
    }

    struct localAdmin{
        uint pincode;
        address lAdmin;
        string name;
        uint aadhaar_id;
    }


    struct manufacturer{
        address payable man_address;
        string compName;
        string cin;
    }

    struct Proposal{
        string forSchl;
        string byManfac;
        string description;
        string prototypeHash;
        string receiptHash;
        string status;
        uint cost;
        address payable merchant;
    }

    mapping(address=>school) public schools;
    mapping(uint=>localAdmin) public lAdmins;
    mapping(address=>Proposal[]) public proposalsForSchool;
    mapping(string=>manufacturer) public manufacturers;
    mapping(address=>string) public manufacturerIds;
    mapping(uint=>NeedyStudent) public NeedyStudents;

    constructor() public{
        admin=msg.sender;
        proposalCount=0;
    }

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function createLocal(address _address,uint _pincode,string memory _name,uint _aadhaar) public{
         lAdmins[_pincode]=localAdmin(_pincode,_address,_name,_aadhaar);

    }

    function createManufacturer(address payable _address,string memory _name,string memory _cin) public{
        manufacturers[_cin]=manufacturer(_address,_name,_cin);
        manufacturerIds[_address]=_cin;
    }

    function createSchool(uint _pincode,address _address,string memory _name,uint _total) public{
        schools[_address]=school(_pincode,_address,_name,_total,0,0,true,0);
    }

    function createNeedy(uint _aadhaar,uint _avgIncome,string memory _ipfs) public{
        NeedyStudents[_aadhaar]=NeedyStudent(_aadhaar,msg.sender,_avgIncome,_ipfs,0,true);
    }

    function createProposal(address _saddress,string memory _descreption,string memory _ipfshash,uint _costPerPerson) public {
        proposalCount+=1;
        proposalsForSchool[_saddress].push(Proposal(schools[_saddress].name,manufacturerIds[msg.sender],_descreption,_ipfshash,'','Proposed',_costPerPerson,manufacturers[manufacturerIds[msg.sender]].man_address));
    }

     function acceptProposal(uint _pid) public {
        schools[msg.sender].currentConsignment=_pid;
        proposalsForSchool[msg.sender][_pid].cost*=schools[msg.sender].needyCount;
        for(uint itr=1;itr<proposalsForSchool[msg.sender].length;itr++){
            if(itr==_pid)
            proposalsForSchool[msg.sender][_pid].status='Accepted';
            else
            proposalsForSchool[msg.sender][itr].status='Rejected';
        }
    }

    function confirmReceipt(address  _saddress,uint _pid,string memory _ipfs) public{
      proposalsForSchool[_saddress][_pid].status='Received';
      proposalsForSchool[_saddress][_pid].receiptHash=_ipfs;
    }

    function proofOfWork(uint _pid,uint _aadhaar,string memory _ipfs) public payable {
        NeedyStudents[_aadhaar].ipfsHash=_ipfs;
        NeedyStudents[_aadhaar].consignment=_pid;
        schools[msg.sender].needyCount-=1;
        if(schools[msg.sender].needyCount==0){
            address payable merchant = proposalsForSchool[msg.sender][_pid].merchant;
            merchant.transfer(schools[msg.sender].balance);
            proposalsForSchool[msg.sender][_pid].status='Completed';
            schools[msg.sender].balance=0;
            schools[msg.sender].currentConsignment=0;
            schools[msg.sender].active=false;
        }
    }

}