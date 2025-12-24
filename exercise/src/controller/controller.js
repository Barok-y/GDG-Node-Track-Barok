export const Tasks= [{
    id:1,
    task: "Learn Node.js",
    priority: "High",
    completed: false
},
{
    id:2,
    task: "Learn Rest Api",
    priority: "low",
    completed: true
},
{
    id:3,
    task: "Learn express.js",
    priority: "medium",
    completed: false
}
]


export const getAllTasks=(req,res)=>{
    let filteredTask = [...Tasks]
    let index=-1;
    if (req.query.completed){
        let isCompleted = req.query.completed === "true";
        filteredTask=filteredTask.filter((task) => task.completed === isCompleted)
    }

    if(req.query.priority){
        filteredTask=filteredTask.filter((task) => task.priority.toLowerCase() === req.query.priority.toLowerCase())
    }

    return res.status(200).json({
        message : "All Tasks with the filter \n",
        filteredTask: filteredTask
    })

}

export const getTask= (req,res) => {
    const task=Tasks.find((task) => task.id == req.params.id);
    if(!task){
        return res.status(404).json({
            success : false,
            message : "Id not FOund"
        })
    }
    return res.status(200).json(task);
}
const generateId=()=>{
    return Tasks.length ? (Tasks[Tasks.length-1].id+1):1;
}

export const postTask = (req,res)=>{
    const newTask={
        id: generateId(),
        ...req.body
    };
    Tasks.push(newTask);

    return res.status(201).json({
        message : "Successfully added new task",
        newTask
    })

};

export const updateTask = (req,res) => {
    let findIndex = Tasks.findIndex(task=>task.id == Number(req.params.id))
    if(findIndex == -1){
        return res.status(404).json({
            success : false,
            message: " Id not found"
        })
    }

    Tasks[findIndex]={...Tasks[findIndex],...req.body}

    return res.status(200).json({
        message: "successfully updated",
        task:Tasks[findIndex]
    })
}

