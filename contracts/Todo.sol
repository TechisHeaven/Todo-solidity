pragma solidity ^0.8.9;

// SPDX-License-Identifier:UNLICENSED

contract Todo {
    // make struct for todo array where description and state have
    struct TodoList {
        string description;
        bool isCompleted;
        uint256 timestamp;
    }

    mapping(address => TodoList[]) public todoList;

    function addTodo(string memory description) public {
        todoList[msg.sender].push(
            TodoList(description, false, block.timestamp)
        );
    }

    function editTodo(string memory description, uint index) public {
        todoList[msg.sender][index].description = description;
    }

    function completeTodo(uint index) public {
        todoList[msg.sender][index].isCompleted = true;
    }

    function removeTodo(uint index) public {
        require(index < todoList[msg.sender].length, "Index out of bounds");

        for (uint i = index; i < todoList[msg.sender].length - 1; i++) {
            todoList[msg.sender][i] = todoList[msg.sender][i + 1];
        }

        todoList[msg.sender].pop();
        //error came here so testing
        // delete todoList[msg.sender][index];
    }

    function getTodo() public view returns (TodoList[] memory) {
        return todoList[msg.sender];
    }
}
