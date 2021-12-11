pragma solidity ^0.5.0;

contract TodoList {
    //class variables
    uint256 public taskCount = 0; //state variable
    //definng custom data type
    struct Task {
        uint Id;
        string content;
        bool completed;
    }
    //hash map of tasks
    mapping(uint=>Task) public tasks;

    constructor() public{
        createTask("Delete this Task");
    }

    function createTask(string memory _content) public{
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }

}
