// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
pragma experimental ABIEncoderV2;

contract Test {

    uint maxNumber = 4;
    uint minNumber = 1;

    struct User {
        uint coins;
    }

    mapping(address => User) public users;

    event noteCreated(
        string description
    );


function createUser(uint _coins, address _user) public {
    users[_user] = User (
        _coins
    );
}


function game (uint _state) public {
    uint machineOptions = random();

    address user = msg.sender;
    require(users[user].coins > 0, "Zero coins");

    if (_state == 1 &&  machineOptions == 3) {
        users[user].coins += 1;
        emit noteCreated("ganaste");
    } else if(_state == 2 && machineOptions == 1) {
        users[user].coins += 1;
        emit noteCreated("ganaste");
    } else if(_state == 3 && machineOptions == 2) {
        users[user].coins += 1;
        emit noteCreated("ganaste");
    } else if(_state == 1 && machineOptions == 2) {
        users[user].coins -= 1;
        emit noteCreated("perdiste");
    } else if(_state == 2 && machineOptions == 3) {
        users[user].coins -= 1;
        emit noteCreated("perdiste");
    } else if(_state == 3 && machineOptions == 1) {
        users[user].coins -= 1;
        emit noteCreated("perdiste");
    } else {
        emit noteCreated("empate");
    }
}  


function random() public view returns (uint amount) {
    amount = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number))) % (maxNumber-minNumber);
    amount = amount + minNumber;
    return amount;
    } 
}
