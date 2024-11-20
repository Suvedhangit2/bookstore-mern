import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Backend_ApiURl } from '../config';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(Backend_ApiURl + `/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex w-200 mx-auto flex-col border-2 border-blue-700 bg-blue-100 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Title :</span>
            <span className='font-bold text-2xl text-blue-600'>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Id :</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Author :</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Published Year :</span>
            <span>{book.publishedYear}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Create Time : </span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-blue-500'>Last Update Time :</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
