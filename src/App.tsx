import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen animated-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white/60 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              My Tasks
            </h1>

            <form onSubmit={addTodo} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
                >
                  <PlusCircle size={20} />
                  Add
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                    todo.completed ? 'bg-gray-50/80' : 'bg-white/70'
                  } border border-white/20 hover:border-blue-500/50 group backdrop-blur-sm hover:shadow-lg`}
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="flex-shrink-0"
                  >
                    {todo.completed ? (
                      <CheckCircle2 className="text-green-500" size={24} />
                    ) : (
                      <XCircle className="text-gray-400" size={24} />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-gray-800 ${
                      todo.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              {todos.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tasks yet. Add one above!
                </div>
              )}
            </div>
          </div>
          
          {todos.length > 0 && (
            <div className="px-6 py-4 bg-gray-50/70 backdrop-blur-sm border-t border-white/20">
              <p className="text-sm text-gray-600">
                {todos.filter(t => t.completed).length} of {todos.length} tasks completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;