import { createContext, useContext } from "react"

export interface Question {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
    chosenAnswer?: string;
}

export type GlobalContent = {
    questions: Question[]
    setQuestions:(q: Question[]) => void
}

export const GlobalContext = createContext<GlobalContent>({
    questions: [], // set a default value
    setQuestions: () => {},
})
export const useGlobalContext = () => useContext(GlobalContext)
