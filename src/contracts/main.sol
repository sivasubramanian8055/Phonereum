pragma solidity ^0.5.16;

contract main{

    address public admin;

    struct NeedyStudent{
        uint aadhaar_id;
        uint averageFamilyIncome;
        string ipfsHash;
    }

    struct school{
        uint pincode;
        address id;
        string name;
        uint totalStudents;
        uint needyCount;
        uint currentConsignment;
    }

    struct localAdmin{
        uint pincode;
        address lAdmin;
        string name;
    }


    struct manufacturer{
        address payable man_address;
        string compName;
        string cin;
    }

    constructor() public{
        admin=msg.sender;
    }

    function string_check(string memory str1, string memory str2) pure internal returns (bool) {
        return (keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2)));
    }

    function createLocal(address _address,uint _pincode,string memory _name) public{
        localAdmin(_pincode,_address,_name);
    }

    function createSchool(uint _pincode,address _address,string memory _name,uint _total) public{
        school(_pincode,_address,_name,_total,0,0);
    }

}