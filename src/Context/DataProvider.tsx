import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import DefaultTodoTemplate from "../Data/DefaultTodoTemplate.json";


const DATA_KEY = "employees";

interface DataProviderProps {
    children: React.ReactNode
}

interface DataContextProps {
    employees: Employee[],
    addEmployee: (name: string) => Promise<Employee>,
    /**
     * 
     */
    updateTodo: (userId: string, todoId: string, newTodoItem: ToDoItemProps) => Promise<void>,
    loadData: () => Promise<void>,
    /**
     * Returns list of Todos based on userId
     * @param userId
     * @returns
     */
    getTodosByUserId: (userId: string) => ToDoItemProps[],
    getTodoById: (userId: string, todoId: string) => ToDoItemProps,
    selectedEmployeeId: string,
    setSelectedEmployeeId: React.Dispatch<React.SetStateAction<string>>
}

export type IdItem = {
    id: string
}

export interface ToDoItemProps extends IdItem {
    title: string,
    deadline: string,
    done: boolean,
    description: string,
    hasNotification: boolean
}

export interface Employee extends IdItem {
    name: string,
    todos: ToDoItemProps[]
};

export const DataContext = React.createContext<DataContextProps>({} as DataContextProps);


function handleAddEmployee(name: string) {
    const employeeId = uuid.v4().toString();
    const newEmployee: Employee = {
        id: employeeId,
        name,
        todos: DefaultTodoTemplate.map(i =>
        ({
            ...i,
            hasNotification: false,
            id: uuid.v4().toString(),
            description: "lorem".repeat(20),
            deadline: new Date().toJSON()
        }))
    }

    console.log("created new", newEmployee);
    return newEmployee
}

async function handlePersistData(newData: Employee[]) {
    const data = JSON.stringify(newData);
    try {
        await AsyncStorage.setItem(DATA_KEY, data);
    } catch (e) {
        console.error("ERRAH persist", e);
    }
}

async function handleLoadData() {
    try {
        const data = await AsyncStorage.getItem(DATA_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("ERRAH load", e);
        return [];
    }
}

export function DataProvider({ children }: DataProviderProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

    function getTodosByUserId(userId: string) {
        return employees.filter(i => i.id === userId)[0].todos;
    }

    function getTodoById(userId: string, todoId: string) {
        const userTodos = getTodosByUserId(userId);
        return userTodos.filter(i => i.id === todoId)[0];
    }

    return (
        <DataContext.Provider value={{
            employees,
            addEmployee: async (name) => {
                const newEmployee = handleAddEmployee(name);
                const newList = [...employees, newEmployee];
                setEmployees(newList);
                await handlePersistData(newList);
                return newEmployee;
            },
            loadData: async () => {
                const loadedData = await handleLoadData();
                setEmployees(loadedData);
            },
            /**
             * Update todoItem based on userId
             * @param userId 
             * @param todoId 
             * @param newTodoItem 
             */
            updateTodo: async (userId, todoId, newTodoItem) => {
                const todos = getTodosByUserId(userId);
                let todo = todos.filter(i => i.id === todoId)[0];
                // todo.done = isChecked;
                todo = { ...todo, ...newTodoItem };
                await handlePersistData(employees);
                // might need to reassign new todo/todos to override existing todo/todos to persist value
            },
            /**
             * Returns list of Todos based on userId
             * @param userId
             * @returns
             */
            getTodosByUserId,
            /**
             * Returns list of Todos based on todoId
             * @param todoId
             * @returns
             */
            getTodoById,
            setSelectedEmployeeId,
            selectedEmployeeId
        }}>
            {children}
        </DataContext.Provider>
    );
}