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
    mapping(uint=>address[]) public schoolsByPin;
    mapping(uint=>localAdmin) public lAdmins;
    mapping(address=>uint) public pincodeByAddress;
    mapping(address=>Proposal[]) public proposalsForSchool;
    mapping(string=>manufacturer) public manufacturers;
    mapping(address=>string) public manufacturerIds;
    mapping(uint=>NeedyStudent) public NeedyStudents;
    mapping(address=>uint[]) public NeedyStudentsBySchool;


    constructor() public{
        admin=msg.sender;
        proposalCount=0;
    }

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function acceptDonation(address _saddress,uint _pid) public payable{
        require(proposalsForSchool[_saddress][_pid].cost>=(schools[_saddress].balance+msg.value),'You cant donate more than capped ether!');
        schools[_saddress].balance+=msg.value;
    }

    function createLocal(address _address,uint _pincode,string memory _name,uint _aadhaar) public{
         require(msg.sender==admin,"Forbidden");
         lAdmins[_pincode]=localAdmin(_pincode,_address,_name,_aadhaar);
         pincodeByAddress[_address]=_pincode;
    }

    function createManufacturer(address payable _address,string memory _name,string memory _cin) public{
         require(msg.sender==admin,"Forbidden");
        require(string_check(manufacturers[_cin].cin,''),'Manufacturer already exists');
        manufacturers[_cin]=manufacturer(_address,_name,_cin);
        manufacturerIds[_address]=_cin;
    }

    function createSchool(uint _pincode,address _address,string memory _name,uint _total) public{
        require(msg.sender==lAdmins[_pincode].lAdmin,'Forbidden');
        require(schools[_address].id==address(0),"School id already exist");
        schools[_address]=school(_pincode,_address,_name,_total,0,0,true,0);
        schoolsByPin[_pincode].push(_address);
        proposalsForSchool[_address].push(Proposal('null','null','null','null','null','Filler',0,address(0)));
    }

    function getSchoolsByPin(uint _pincode) public returns(address[] memory){
        return(schoolsByPin[_pincode]);
    }

    function createNeedy(uint _aadhaar,uint _avgIncome,string memory _ipfs) public{
        require(!string_check(schools[msg.sender].name,''),'Only Schools can add Needy');
        require(NeedyStudents[_aadhaar].aadhaar_id==0,"Needy already Created");
        NeedyStudents[_aadhaar]=NeedyStudent(_aadhaar,msg.sender,_avgIncome,_ipfs,0,false);
        NeedyStudentsBySchool[msg.sender].push(_aadhaar);
        schools[msg.sender].needyCount+=1;
    }

    function createProposal(address _saddress,string memory _descreption,string memory _ipfshash,uint _costPerPerson) public {
        require(!string_check(manufacturerIds[msg.sender],''),'Only authorized manufacturers can give proposals');
        proposalCount+=1;
        proposalsForSchool[_saddress].push(Proposal(schools[_saddress].name,manufacturerIds[msg.sender],_descreption,_ipfshash,'','Proposed',_costPerPerson,manufacturers[manufacturerIds[msg.sender]].man_address));
    }

     function acceptProposal(uint _pid) public {
        require(!string_check(schools[msg.sender].name,''),'Only Schools can accept proposals');
        require(schools[msg.sender].active==true,'Your quota is on next academic year');
        require(string_check(schools[msg.sender].name,proposalsForSchool[msg.sender][_pid].forSchl),'This is not your consignment');
        require(string_check(proposalsForSchool[msg.sender][_pid].status,'Proposed'),'Proposal already accepted/acknowledged');
        require(schools[msg.sender].currentConsignment==0,'You already have an active consignment');
        schools[msg.sender].currentConsignment=_pid;
        proposalsForSchool[msg.sender][_pid].cost*=schools[msg.sender].needyCount;
        for(uint itr=1;itr<proposalsForSchool[msg.sender].length;itr++){
            if(itr==_pid)
            proposalsForSchool[msg.sender][_pid].status='Accepted';
            else
            proposalsForSchool[msg.sender][itr].status='Rejected';
        }
    }

    function resetConsignment(uint _pincode,address _address,bool _activeKey) public {
        require(msg.sender==lAdmins[_pincode].lAdmin,'Forbidden');
        require(schools[_address].id!=address(0),'School doesnot exist!');
        schools[_address].active=_activeKey;
        if(!_activeKey){
        require(!string_check(proposalsForSchool[_address][schools[_address].currentConsignment].status,'Completed'),'Consignment once completed cannot be rejected!');
        proposalsForSchool[_address][schools[_address].currentConsignment].status='Rejected';
        schools[_address].currentConsignment=0;
        }
    }

    function flagNeedy(uint _pincode,uint _aadhaar,bool _key) public {
        require(msg.sender==lAdmins[_pincode].lAdmin,'Forbidden');
        require(NeedyStudents[_aadhaar].schAddr!=address(0),'Needy doesnot exist');
        NeedyStudents[_aadhaar].flagged=_key;
    }

    function updateTotal(uint _pincode,address _saddress,uint _count) public {
        require(msg.sender==lAdmins[_pincode].lAdmin,'Forbidden');
        require(schools[_saddress].id!=address(0),'School doesnot exist');
        schools[_saddress].totalStudents=_count;
    }

    function confirmReceipt(uint _pincode,address  _saddress,uint _pid,string memory _ipfs) public{
      require(msg.sender==lAdmins[_pincode].lAdmin,'Forbidden');
      require(schools[_saddress].balance==proposalsForSchool[_saddress][_pid].cost,'Donation yet to be received');
      require(string_check(proposalsForSchool[_saddress][_pid].status,'Accepted'),'Proposal not accepted!');
      require(string_check(proposalsForSchool[_saddress][_pid].receiptHash,''),'Already confirmed');
      proposalsForSchool[_saddress][_pid].status='Received';
      proposalsForSchool[_saddress][_pid].receiptHash=_ipfs;
    }

    function proofOfWork(uint _pid,uint _aadhaar,string memory _ipfs) public payable {
        require(!string_check(schools[msg.sender].name,''),'Only Schools can modify proposals');
        require(schools[msg.sender].active==true,'Your quota is on next academic year');
        require(string_check(schools[msg.sender].name,proposalsForSchool[msg.sender][_pid].forSchl),'This is not your consignment');
        require(string_check(proposalsForSchool[msg.sender][_pid].status,'Received'),'Stock not yet received!');
        require(schools[msg.sender].currentConsignment!=0,'You dont have an active consignment');
        require(NeedyStudents[_aadhaar].schAddr!=address(0),'Needy doesnot exist!');
        require(NeedyStudents[_aadhaar].flagged==false,'Needy is black-listed!');
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

    function getSchoolsCount(uint _pin) public view returns(uint){
        return(schoolsByPin[_pin].length);
    }

    // function getProposalsCount(address _addr) public view returns(uint){
    //     return(proposalsForSchool[_addr].length);
    // }

    // function getNeedyCount(address _addr) public view returns(uint){
    //     return(NeedyStudentsBySchool[_addr].length);
    // }

}
