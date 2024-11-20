import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import { Backend_ApiURl } from '../config';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableView, setTableView] = useState(true);

  // const ApiUrl = 'http://localhost:4000/books';
  useEffect(() => {
    setLoading(true);
    axios
      .get(Backend_ApiURl)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      {/* Navigation bar */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>

      {/* View change Button */}
      <div className='flex justify-left items-center gap-x-4'>
        { tableView ? (
          <button
            className='bg-green-400 hover:bg-green-500 px-4 py-1 rounded-lg'
            onClick={() => setTableView(false)}
            >
            Card View
          </button>) : (
          <button
            className='bg-green-400 hover:bg-green-500 px-4 py-1 rounded-lg'
            onClick={() => setTableView(true)}
            >
            Table View
          </button>
        ) }
      </div>

      {/* Based on action view showed */}
      {loading ? (
        <Spinner />
      ) : tableView === true ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
