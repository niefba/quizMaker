import { useState, useEffect } from 'react';
import QuizQuestion from './quiz-question';

interface Category {
    id: number;
    name: string;
}

export default function QuizSelector() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [category, setCategory] = useState(0);
    const [difficulty, setDifficulty] = useState('');


    // API call to get the list of categories
    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
        .then(response => response.json())
        .then(data => {
            if (data.trivia_categories) {
                setCategories(data.trivia_categories);
            }
        })
        .catch(error => {
            console.log('Failed to retrieve categories: ' + error);
        });
    }, [])

    // Changing the selected category
    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement >) => {
        setSelectedCategory(Number(e.target.value));
    }

    // Changing the selected difficulty
    const handleChangeDifficulty =  (e: React.ChangeEvent<HTMLSelectElement >) => {
        setSelectedDifficulty(e.target.value);
    }

    // Handle the create quiz button click
    const handleClickCreateQuiz = () => {
        setCategory(selectedCategory);
        setDifficulty(selectedDifficulty);
    }    
    
    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">QUIZ MAKER</h1>
            </div>
            { categories.length === 0 && <div>Loading...</div> }
            { categories.length > 0 && // Check if categories have been loaded
                <div className="grid grid-cols-3 h-10 mb-4">
                    <SelectCategory
                        selectedCategory={selectedCategory}
                        categories={categories}
                        handleChange={handleChangeCategory}
                    />
                    <SelectDifficulty
                        selectedDifficulty={selectedDifficulty}
                        handleChange={handleChangeDifficulty}
                    />
                    <button id='createBtn'
                        disabled={selectedCategory === 0 || selectedDifficulty === ''}
                        onClick={handleClickCreateQuiz}
                        className='cursor-pointer border border-gray-400 rounded-r-lg hover:bg-gray-200 active:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'>
                            Create
                    </button>
                </div>
            }
            { category !== 0 && difficulty !== '' && // Render or re-render the quiz question component only when create button is clicked
                <QuizQuestion category={category} difficulty={difficulty} />
            }
        </>
    );
}

function SelectCategory({selectedCategory, categories, handleChange}: {selectedCategory: number, categories: Category[], handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
  return (
    <select
      id='categorySelect'
      className='border border-gray-300 rounded-l-lg'
      value={selectedCategory}
      onChange={handleChange}
    >
      { selectedCategory === 0 && <option>Select a category</option> }
      { categories.map( (item) => {
        return <option key={item.id} value={item.id}>{item.name}</option>
      } )}
    </select>
  )
}

function SelectDifficulty({selectedDifficulty, handleChange}: {selectedDifficulty: string, handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}) {
  return (
    <select
      id='difficultySelect'
      className='border-y border-gray-300'
      value={selectedDifficulty}
      onChange={handleChange}
    >
      { selectedDifficulty === '' && <option>Select difficulty</option> }
      <option value='easy'>Easy</option>
      <option value='medium'>Medium</option>
      <option value='hard'>Hard</option>
    </select>
  )
}