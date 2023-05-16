import { useState, useEffect } from 'react';
import axios from 'axios';
import ListTable from '../../components/ListTable';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function index({ posts }) {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    setTimeout(() => {
      setData(posts.usersList);
      setStatus('resolved');
    }, 500);
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/delete/${userId}`);
      console.log(res.status, res);
      if (res.status === 200) {
        const updatedData = data.filter((item) => item._id !== userId);
        setData(updatedData);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (status === 'pending') {
    return (
      <div className="flex flex-col justify-center h-screen items-center">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-blue-900 text-3xl"
        />
      </div>
    );
  }

  return (
    <div>
      <ListTable allUsers={data} deletedUser={handleDeleteUser} />
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:5000/all-users');
  const posts = res.data;
  return {
    props: {
      posts,
    },
  };
}
