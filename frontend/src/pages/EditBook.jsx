import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// import { Backend_ApiURl } from '../config';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://bookstore-mern-skms.onrender.com/${id}`)
    .then((response) => {
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishedYear(response.data.publishedYear);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .put(`https://bookstore-mern-skms.onrender.com/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-blue-300 bg-blue-100 rounded-lg w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 rounded-lg w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 rounded-lg w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-blue-500'>Published Year</label>
          <input
            type='number'
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 rounded-lg w-full '
          />
        </div>
        <button className='p-2 bg-green-500 hover:bg-green-600 m-8 rounded-lg' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook
