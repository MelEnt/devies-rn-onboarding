import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import DefaultTodoTemplate from "../JsonData/DefaultTodoTemplate.json";
import DataStructure from "../JsonData/DataStructure.json";
import { IToDoItem } from '../Components/ToDoItem';


const DATA_KEY = "employees";

interface DataProviderProps {
    children: React.ReactNode
}

interface DataContextProps {
    employees: Employee[],
    addEmployee: (name: string) => Promise<Employee>,
    updateTodo: (userId: string, todoId: string, isChecked: boolean) => Promise<void>,
    loadData: () => Promise<void>,
    getTodos: (userId: string) => ToDoItemProps[]
}

export type ToDoItemProps = {
    id: string,
    title: string,
    deadline: string,
    done: boolean,
    description: string
};

export type Employee = {
    name: string,
    id: string,
    todos: ToDoItemProps[]
};

export const DataContext = React.createContext<DataContextProps>({} as DataContextProps);


function handleAddEmployee(name: string) {
    const employeeId = uuid.v4().toString();
    const newEmployee: Employee = {
        id: employeeId,
        name,
        todos: DefaultTodoTemplate.map(i => ({ ...i, id: uuid.v4().toString(), description: "lorem".repeat(20) }))
    }

    console.log("created new", newEmployee);
    return newEmployee
}

async function handlePersistData(newData: Employee[]) {
    const data = JSON.stringify(newData);
    try {
        await AsyncStorage.setItem(DATA_KEY, data);
    } catch (e) {
        console.error("ERRAH", e);
    }
}

async function handleLoadData() {
    try {
        const data = await AsyncStorage.getItem(DATA_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error("ERRAH", e);
        return [];
    }
}

export function DataProvider({ children }: DataProviderProps) {
    const [employees, setEmployees] = useState<Employee[]>([]);
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
            updateTodo: async (userId, todoId, isChecked) => {
                const todos = employees.filter(i => i.id === userId)[0].todos;
                const todo = todos.filter(i => i.id === todoId)[0];
                todo.done = isChecked;
                await handlePersistData(employees);
                // might need to reassign new todo/todos to override existing todo/todos to persist value
            },
            getTodos: (userId) => {
                return employees.filter(i => i.id === userId)[0].todos;
            }
        }}>
            {children}
        </DataContext.Provider>
    );
}